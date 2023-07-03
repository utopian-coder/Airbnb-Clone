import React from "react";
import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays/index";
import { NightIcon, PriceIcon } from "../assets/Icons";

function BookingSummary({ booking }) {
  return (
    <Link
      key={booking._id}
      to={`/account/bookings/${booking._id}`}
      className='flex gap-4 grow shrink bg-gray-100 rounded-lg p-2'
    >
      <div className=' w-48'>
        <PlaceImg acc={booking.place} />
      </div>
      <div className='flex flex-col gap-1'>
        <div className='border-b font-bold text-lg'>
          <h2>{booking.place.title}</h2>
        </div>
        <div>
          {format(new Date(booking.checkInDate), "yyyy-MM-dd")} &rarr;{" "}
          {format(new Date(booking.checkOutDate), "yyyy-MM-dd")}
        </div>
        <div className='flex gap-1 mt-2'>
          <NightIcon />
          <p>
            {differenceInCalendarDays(
              new Date(booking.checkOutDate),
              new Date(booking.checkInDate)
            )}{" "}
            nights
          </p>
        </div>
        <div className='flex gap-1 '>
          <PriceIcon />
          <p>
            Total price <span className='font-bold'>₹{booking.price}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BookingSummary;
