import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BookingWidget from "../components/BookingWidget";
import PhotoGallery from "../components/PhotoGallery";

const AccomodationDetailsPage = () => {
  const [accomodation, setAccomodation] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/accomodation/${id}`).then(({ data }) => setAccomodation(data));
  }, [id]);

  if (!accomodation) return;

  return (
    <div className='px-2 py-4 mt-2 rounded-lg  md:-mx-16:mt-8:px-32:py-16 bg-gray-100'>
      <PhotoGallery accomodation={accomodation} />
      <div>
        <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-6 gap-4 '>
          <div>
            <h2 className='font-bold text-lg'>Description</h2>
            <p>{accomodation.description}</p>
            <div className='flex flex-col gap-1 mt-2'>
              <p>Check In - {accomodation.checkIn}</p>
              <p>Check Out - {accomodation.checkOut}</p>
              <p>Max guests allowed - {accomodation.maxGuests}</p>
            </div>
          </div>
          <div>
            <BookingWidget accom={accomodation} />
          </div>
        </div>
        <div className='mt-4'>
          <h2 className='font-bold text-lg'>Extra Info</h2>
          <p>{accomodation.extraInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default AccomodationDetailsPage;
