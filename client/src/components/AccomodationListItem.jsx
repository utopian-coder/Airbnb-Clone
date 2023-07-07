import React from "react";
import { Link } from "react-router-dom";
import PlaceImg from "./PlaceImg";

function AccomodationListItem({ acc }) {
  return (
    <Link
      to={"/account/accomodations/" + acc._id}
      className='flex flex-wrap md:flex-nowrap gap-3 bg-gray-100 rounded-xl p-4 mt-6 cursor-pointer'
    >
      <div className='w-full h-full md:w-64 bg-gray-300 p-1 rounded-xl shrink-0'>
        <PlaceImg acc={acc} />
      </div>
      <div className='shrink'>
        <h2 className='text-xl font-medium'>{acc.title}</h2>
        <p className='text-sm mt-2'>{acc.description}</p>
      </div>
    </Link>
  );
}

export default AccomodationListItem;
