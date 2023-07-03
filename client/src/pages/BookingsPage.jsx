import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";

import BookingSummary from "../components/BookingSummary";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get("/bookings")
      .then(({ data }) => {
        setBookings([...data]);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className='mt-8'>
        {bookings.length > 0 &&
          bookings.map((booking) => <BookingSummary booking={booking} />)}
      </div>
    </div>
  );
}

export default BookingsPage;
