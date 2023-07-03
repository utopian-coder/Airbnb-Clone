import React, { useState } from "react";
import { CloseIcon, LocationIcon, PhotosIcon } from "../assets/Icons";
import Image from "./Image";

function PhotoGallery({ accomodation }) {
  const [showPhotos, setShowPhotos] = useState(false);

  if (showPhotos) {
    return (
      <div className='absolute inset-0 bg-black min-h-screen'>
        <div className='grid gap-4 p-16 bg-black'>
          <div>
            <button
              onClick={() => setShowPhotos(false)}
              className='flex gap-1 bg-white px-6 py-1 rounded-full fixed right-16 top-6 shrink'
            >
              <CloseIcon />
              Close photos
            </button>
          </div>
          {accomodation.photos?.length > 0 &&
            accomodation.photos.map((curr) => (
              <div key={Math.random()}>
                <Image className='rounded-md' path={curr} />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className='relative'>
      <h1 className='text-3xl'>{accomodation.title}</h1>
      <a
        target='_blank'
        className='flex underline font-semibold my-2'
        href={`https://maps.google.com/?q=${accomodation.address}`}
      >
        <LocationIcon />
        {accomodation.address}
      </a>
      <div className='grid grid-cols-[2fr_1fr] rounded-2xl gap-2 overflow-hidden mt-8 cursor-pointer'>
        <div>
          <div>
            {accomodation.photos?.[0] && (
              <Image
                onClick={() => {
                  setShowPhotos(true);
                }}
                className='aspect-square object-cover'
                path={accomodation.photos[0]}
              />
            )}
          </div>
        </div>
        <div className='grid overflow-hidden object-cover'>
          {accomodation.photos?.[1] && (
            <Image
              onClick={() => {
                setShowPhotos(true);
              }}
              className='aspect-square object-cover'
              path={accomodation.photos[1]}
            />
          )}
          <div className='relative top-2 overflow-hidden'>
            {accomodation.photos?.[2] && (
              <Image
                onClick={() => {
                  setShowPhotos(true);
                }}
                className='aspect-square object-cover'
                path={accomodation.photos[2]}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setShowPhotos(true);
          }}
          className='absolute bottom-4 right-4 flex gap-1 px-4 py-2 items-center bg-gray-50 rounded-3xl '
        >
          <PhotosIcon />
          See more photos
        </button>
      </div>
    </div>
  );
}

export default PhotoGallery;
