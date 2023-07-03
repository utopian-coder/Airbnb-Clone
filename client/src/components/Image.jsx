import React from "react";

function Image({ path, ...rest }) {
  console.log(path);
  const source = path.includes("https://")
    ? path
    : `http://localhost:4000/uploads/${path}`;
  return <img src={source} {...rest} />;
}

export default Image;
