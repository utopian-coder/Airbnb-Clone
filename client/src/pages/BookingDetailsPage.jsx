import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotoGallery from "../components/PhotoGallery";
import BookingSummary from "../components/BookingSummary";

const BookingDetailsPage = () => {
  const [bookedPlace, setBookedPlace] = useState(null);
  const { id } = useParams();

  try {
    useEffect(() => {
      axios.get("/bookings").then((res) => {
        const booked = res.data.find(({ _id }) => _id === id);
        setBookedPlace(booked);
      });
    }, [id]);
  } catch (err) {
    alert(err);
  }

  if (!bookedPlace) return <p>Loading...</p>;

  return (
    <article className='mt-16'>
      <BookingSummary booking={bookedPlace} />
      <PhotoGallery accomodation={bookedPlace.place} />
    </article>
  );
};

export default BookingDetailsPage;
