import React from "react";
import Image from "./Image";

const PlaceImg = ({ acc, index = 0, className = null }) => {
  if (!acc.photos?.length > 0) return "";
  if (!className) className = "rounded-md object-cover";
  return (
    <div>
      {acc.photos.length > 0 && (
        <Image className={className} path={acc.photos[index]} />
      )}
    </div>
  );
};

export default PlaceImg;
