const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const multer = require("multer");
const mime = require("mime-types");

const User = require("./models/User");
const Accomodation = require("./models/Accomodation");
const Booking = require("./models/Booking");

const app = express();
const bcryptSaltRounds = 10;

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

dotenv.config({ path: "./config.env" });

//Upload to S3
const bucket = "utopian-airbnb-clone";

async function uploadToS3(originalFileName, path, mimetype) {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const parts = originalFileName.split(".");
  const extension = parts[parts.length - 1];

  const newFileName = `${Date.now()}.${extension}`;

  const data = await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFileName,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );

  return `https://${bucket}.s3.amazonaws.com/${newFileName}`;
}

const DB = process.env.DB.replace("<password>", "eHUKU8Dpplj8pUlP");

//Registration endpoint
app.post("/api/register", async (req, res) => {
  mongoose.connect(DB);
  const { name, email, password } = req.body;

  try {
    const encryptedPass = bcrypt.hashSync(
      password,
      bcryptSaltRounds,
      (err, pass) => {
        if (err) throw new Error(err);
        return pass;
      }
    );

    if (!encryptedPass) res.json("Server error!");

    const userDoc = await User.create({ name, email, password: encryptedPass });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

//Login
app.post("/api/login", async (req, res) => {
  mongoose.connect(DB);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    return res.json("User not found");
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (!passOk) res.status(422).json("Wrong password");

  const cookieOptions = {
    sameSite: "None",
    secure: true,
    httpOnly: true,
  };

  jwt.sign(
    { name: userDoc.name, email, id: userDoc._id },
    process.env.JWT_SECRET,
    (err, token) => {
      if (err) throw err;
      res.cookie("token", token, cookieOptions).json({
        name: userDoc.name,
        email,
        id: userDoc._id,
      });
    }
  );
});

//Sending profile info after reload
app.get("/api/profile", (req, res) => {
  mongoose.connect(DB);
  const { token } = req.cookies;
  if (!token) return res.status(422).json("Log in failed");

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
});

//Logout endpoint
app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json("Success");
});

//Upload photo using link
app.post("/api/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const fileName = Date.now() + ".jpg";

  const options = {
    url: link,
    dest: `/tmp/${fileName}`,
  };

  try {
    await download.image(options);
    const url = await uploadToS3(
      fileName,
      `/tmp/${fileName}`,
      mime.lookup(`/tmp/${fileName}`)
    );
    res.json(url);
  } catch (error) {
    res.status(422).json(error);
  }
});

//Upload photo from device
const uploadMiddleware = multer({ dest: "/tmp" });
app.post(
  "/api/upload-from-device",
  uploadMiddleware.array("photos", 20),
  async (req, res) => {
    mongoose.connect(DB);
    const files = req.files;
    const uploadedPhotos = [];

    for (let i = 0; i < files.length; i++) {
      const { originalname, path, mimetype } = files[i];

      const url = await uploadToS3(originalname, path, mimetype);
      uploadedPhotos.push(url);

      // const parts = originalname.split(".");
      // const extension = parts[parts.length - 1];
      // const newPath = path + "." + extension;

      // fs.renameSync(path, newPath);
      // uploadedPhotos.push(newPath.replace("uploads\\", ""));
    }

    res.json(uploadedPhotos);
  }
);

//Add new accomodation
app.post("/api/accomodation", (req, res) => {
  mongoose.connect(DB);
  const {
    title,
    address,
    addedPhotos,
    description,
    extraInfo,
    perks,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
    if (err) throw err;
    const accomodationDoc = await Accomodation.create({
      title,
      address,
      photos: addedPhotos,
      description,
      extraInfo,
      perks,
      checkIn,
      checkOut,
      maxGuests,
      owner: user.id,
      price,
    });

    res.json(accomodationDoc);
  });
});

//Update accomodation
app.put("/api/accomodation", (req, res) => {
  mongoose.connect(DB);
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    extraInfo,
    perks,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
    if (err) throw err;
    const accomodation = await Accomodation.findById(id);

    if (user.id === accomodation.owner.toString()) {
      accomodation.set({
        title,
        address,
        photos: addedPhotos,
        description,
        extraInfo,
        perks,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });

      const updatedAccom = await accomodation.save();
      res.json(updatedAccom);
    }
  });
});

//Get all accomodations of user
app.get("/api/accomodations", (req, res) => {
  mongoose.connect(DB);
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
    if (err) throw err;

    const accomodations = await Accomodation.find({ owner: user.id });
    res.json(accomodations);
  });
});

app.get("/api/all-accomodations", async (req, res) => {
  mongoose.connect(DB);
  res.json(await Accomodation.find());
});

//Accomodation details
app.get("/api/accomodation/:id", async (req, res) => {
  mongoose.connect(DB);
  const { id } = req.params;
  const accomDoc = await Accomodation.findById(id);
  res.json(accomDoc);
});

function getUserDataFromToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

app.post("/api/booking", async (req, res) => {
  mongoose.connect(DB);
  const { checkInDate, checkOutDate, place, numberOfGuests, price } = req.body;
  const { token } = req.cookies;

  try {
    const userData = await getUserDataFromToken(token);
    const bookingDoc = await Booking.create({
      user: userData.id,
      place,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      price,
    });

    res.json(bookingDoc);
  } catch (error) {
    res.json("Booking failed");
  }
});

app.get("/api/bookings", async (req, res) => {
  mongoose.connect(DB);
  try {
    const { token } = req.cookies;
    const userData = await getUserDataFromToken(token);
    const bookingDetails = await Booking.find({ user: userData.id }).populate(
      "place"
    );

    res.json(bookingDetails);
  } catch (error) {
    res.json("Booking details fetching failed");
  }
});

// SERVER
const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server is running on PORT 4000");
});
