import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../assets/HomeIcon";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import AccomodationListItem from "../components/AccomodationListItem";

function AccomodationPage() {
  const [accomodations, setAccomodations] = useState([]);

  useEffect(() => {
    axios.get("/accomodations").then(({ data }) => {
      setAccomodations(data);
    });
  }, []);

  return (
    <>
      <AccountNav />
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mt-8'>
          <Link
            to='/account/accomodations/new'
            className='inline-flex text-center bg-primary text-white rounded-full py-2 px-6 '
          >
            <HomeIcon />
            Add Places
          </Link>
        </div>
      </div>
      <div>
        {accomodations.length > 0 &&
          accomodations.map((acc) => (
            <AccomodationListItem key={acc._id} acc={acc} />
          ))}
      </div>
    </>
  );
}

export default AccomodationPage;
