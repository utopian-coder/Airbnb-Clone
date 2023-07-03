import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image";

function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/all-accomodations").then(({ data }) => {
      console.log(data);
      setPlaces([...data]);
    });
  }, []);

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 mt-16 '>
      {places.length > 0 &&
        places.map((curr) => (
          <Link to={`/accomodation/${curr._id}`} key={curr._id}>
            <div className='rounded-2xl bg-gray-500 mb-2'>
              {curr.photos?.[0] && (
                <Image
                  className='rounded-2xl aspect-square object-cover'
                  path={curr.photos[0]}
                />
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <h2 className='font-bold'>{curr.address}</h2>
              <p className='text-sm truncate text-gray-500'>{curr.title}</p>
              <p>
                <span className='font-bold'>₹{curr.price}</span> per night
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage;
