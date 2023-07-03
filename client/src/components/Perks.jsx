import React from "react";
import WifiIcon from "../assets/WifiIcon";

const Perks = ({ selected, onSelectPerk }) => {
  const checkBoxHandler = (ev) => {
    const { name, checked } = ev.target;

    if (checked) {
      onSelectPerk((prev) => [...prev, name]);
    } else {
      onSelectPerk((prev) => [...prev.filter((curr) => curr !== name)]);
    }
  };
  return (
    <>
      <label className='inline-flex justify-center items-center gap-2 border py-2 px-8 text-gray-600 rounded-md cursor-pointer cursor-pointer'>
        <input
          type='checkbox'
          checked={selected.includes("wifi")}
          name='wifi'
          onChange={checkBoxHandler}
        />
        <WifiIcon />
        wifi
      </label>

      <label className='inline-flex justify-center items-center gap-2 border py-2 px-6 text-gray-600 rounded-md'>
        <input
          type='checkbox'
          checked={selected.includes("perking")}
          name='perking'
          onChange={checkBoxHandler}
        />
        <WifiIcon />
        wifi
      </label>

      <label className='inline-flex justify-center items-center gap-2 border py-2 px-8 text-gray-600 rounded-md cursor-pointer'>
        <input
          type='checkbox'
          checked={selected.includes("breakfast")}
          name='breakfast'
          onChange={checkBoxHandler}
        />
        <WifiIcon />
        wifi
      </label>

      <label className='inline-flex justify-center items-center gap-2 border py-2 px-8 text-gray-600 rounded-md cursor-pointer'>
        <input
          type='checkbox'
          checked={selected.includes("tv")}
          name='tv'
          onChange={checkBoxHandler}
        />
        <WifiIcon />
        wifi
      </label>

      <label className='inline-flex justify-center items-center gap-2 border py-2 px-8 text-gray-600 rounded-md cursor-pointer'>
        <input
          type='checkbox'
          checked={selected.includes("kitchen")}
          name='kitchen'
          onChange={checkBoxHandler}
        />
        <WifiIcon />
        wifi
      </label>

      <label className='inline-flex justify-center items-center gap-2 border py-2 px-8 text-gray-600 rounded-md cursor-pointer'>
        <input
          type='checkbox'
          checked={selected.includes("games")}
          name='games'
          onChange={checkBoxHandler}
        />
        <WifiIcon />
        wifi
      </label>
    </>
  );
};

export default Perks;
