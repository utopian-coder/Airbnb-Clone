import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookingWidget({ accom }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  let numberOfNights = 0;

  if (checkInDate != "" && checkOutDate != "") {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOutDate),
      new Date(checkInDate)
    );
  }

  const navigate = useNavigate();

  const bookingHandler = async (ev) => {
    ev.preventDefault();

    try {
      await axios.post("/booking", {
        place: accom._id,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        price: numberOfNights * accom.price,
      });

      navigate(`/account/bookings/${accom._id}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='bg-white shadow-md p-4 rounded-lg my-2'>
      <h2 className='font-bold'>₹{accom.price} per night</h2>
      <div className='flex border border-gray-300 rounded-md my-2 overflow-hidden text-sm'>
        <label className='flex flex-col  px-2'>
          Check in
          <input
            type='date'
            className='cursor-pointer'
            onChange={(ev) => setCheckInDate(ev.target.value)}
          />
        </label>

        <label className='flex flex-col border-l  border-gray-500 px-2'>
          Check out
          <input
            type='date'
            className='cursor-pointer'
            onChange={(ev) => setCheckOutDate(ev.target.value)}
          />
        </label>
      </div>
      <div>
        Number of guest
        <input
          type='number'
          max={accom.maxGuests}
          defaultValue={1}
          min={1}
          className='cursor-pointer'
          onChange={(ev) => setNumberOfGuests(ev.target.value)}
        />
      </div>
      <button className='primary' onClick={bookingHandler}>
        Book
        {numberOfNights > 0 && <span> ₹{accom.price * numberOfNights}</span>}
      </button>
    </div>
  );
}

export default BookingWidget;
