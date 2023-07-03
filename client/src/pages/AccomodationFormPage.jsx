import React, { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AccomodationFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    axios.get(`accomodation/${id}`).then(({ data }) => {
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setExtraInfo(data.extraInfo);
      setPerks(data.perks);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const savePlaceHandler = async (ev) => {
    ev.preventDefault();

    const accomodationDetails = {
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
    };

    if (!id) {
      try {
        const { data } = await axios.post("/accomodation", accomodationDetails);
        setRedirect(true);
      } catch (err) {
        alert({ err });
      }
    } else {
      try {
        const { data } = await axios.put("/accomodation", {
          id,
          ...accomodationDetails,
        });
        setRedirect(true);
      } catch (err) {
        alert({ err });
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate("/account/accomodations");
    }
  }, [redirect]);

  const inputHeaders = (title, description) => {
    return (
      <>
        <h2 className='text-xl mt-4'>{title}</h2>
        <p className='text-sm text-gray-500'>{description}</p>
      </>
    );
  };

  return (
    <>
      <AccountNav />
      <form className='mt-8' onSubmit={savePlaceHandler}>
        {inputHeaders(
          "Title",
          "title for you place should be short and catchy"
        )}
        <input
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          type='text'
          placeholder='title, for example - Utopia'
        />

        {inputHeaders("Address", "address to the place")}
        <input
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          type='text'
          placeholder='address'
        />

        {inputHeaders("Photos", "add some nice photos of your place")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {inputHeaders("Description", "add a nice description of your place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          cols='30'
          rows='5'
        />

        {inputHeaders("Perks", "Tick the perks of your place")}
        <div className='grid grid-cols-3 md:grid-cols-4 lg-grid-cols-6 gap-4 mt-4'>
          <Perks selected={perks} onSelectPerk={setPerks} />
        </div>

        {inputHeaders(
          "Extra info",
          "house rules, about who lives in the house etc."
        )}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          cols='30'
          rows='5'
        />

        {inputHeaders(
          "Check in and Check out time",
          "Leave enough time so guests can clean room and be fully prepared"
        )}
        <div className='grid gap-4 mt-2 grid-cols-2 md:grid-cols-4'>
          <div>
            <h3 className='text-lg'>Check in</h3>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              type='text'
              placeholder='14:00'
            />
          </div>
          <div>
            <h3 className='text-lg'>Check out</h3>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              type='text'
              placeholder='14:00'
            />
          </div>
          <div>
            <h3 className='text-lg'>Max guests</h3>
            <input
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              type='number'
              min={1}
              placeholder='e.g. - 2'
            />
          </div>
          <div>
            <h3 className='text-lg'>Price per night</h3>
            <input
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              type='number'
            />
          </div>
        </div>
        <div>
          <button className='primary'>Save</button>
        </div>
      </form>
    </>
  );
}

export default AccomodationFormPage;
