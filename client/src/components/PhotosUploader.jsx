import React from "react";
import { useState } from "react";
import UploadIcon from "../assets/UploadIcon";
import axios from "axios";
import { OutlineStar, SolidStar, TrashIcon } from "../assets/Icons";
import Image from "./Image";

function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  const uploadFromDeviceHandler = async (ev) => {
    const data = new FormData();
    const files = ev.target.files;

    for (const file of files) {
      data.append("photos", file);
    }

    try {
      const { data: uploadedPhotos } = await axios.post(
        "/upload-from-device",
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      onChange((prevState) => [...prevState, ...uploadedPhotos]);
    } catch (err) {
      alert(`${err}`);
    }
  };

  const uploadPhotByLinkHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      onChange((prevState) => {
        return [...prevState, data];
      });
      setPhotoLink("");
    } catch (error) {
      alert("Uploading photo failed!");
    }
  };

  const deletePhotoHandler = (ev, fileName) => {
    ev.preventDefault();
    onChange((prevState) => [...prevState.filter((curr) => curr !== fileName)]);
  };

  const selectCover = (ev, fileName) => {
    ev.preventDefault();
    onChange([fileName, ...addedPhotos.filter((curr) => curr !== fileName)]);
  };

  return (
    <>
      <div className='flex gap-2'>
        <input
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type='text'
          placeholder='link to your photo'
        />
        <button
          onClick={uploadPhotByLinkHandler}
          className='bg-gray-200 rounded-full px-3 py-1'
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className='grid gap-2 mt-2 grid-cols-3 md:grid-cols-5 lg:grid-cols-6 text-gray-500'>
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo) => (
            <div key={photo} className='relative'>
              {/* <img
                className='rounded-xl w-full object-cover'
                // src={"http://127.0.0.1:4000/uploads/" + photo}
                src={photo}
                alt=''
              /> */}
              <Image path={photo} className='rounded-xl w-full object-cover' />
              <button
                onClick={(ev) => {
                  deletePhotoHandler(ev, photo);
                }}
                className='bg-black py-1 px-2 rounded-2xl absolute bottom-1 right-1 bg-opacity-50 cursor-pointer text-white'
              >
                <TrashIcon />
              </button>
              <button
                onClick={(ev) => {
                  selectCover(ev, photo);
                }}
                className='bg-black py-1 px-2 rounded-2xl absolute bottom-1 left-1 bg-opacity-50 cursor-pointer text-white'
              >
                {photo === addedPhotos[0] ? <SolidStar /> : <OutlineStar />}
              </button>
            </div>
          ))}
        <label className='inline-flex items-center justify-center gap-1 mt-2 border bg-transparent p-6 rounded-xl cursor-pointer hover:bg-gray-100'>
          <input
            onChange={uploadFromDeviceHandler}
            type='file'
            multiple
            className='hidden cursor-pointer'
          />
          <UploadIcon />
          Upload
        </label>
      </div>
    </>
  );
}

export default PhotosUploader;
