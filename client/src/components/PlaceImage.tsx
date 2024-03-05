import React from "react";
import { PlaceImageProps } from "../types";

const PlaceImage: React.FC<PlaceImageProps> = ({ fileName, variant }) => {
  return (
    <img
      src={`http://localhost:3000/uploads/${fileName}`}
      alt={`pic${fileName}`}
      className={`w-full object-cover object-center ${variant}`}
      loading="lazy"
    />
  );
};

export default PlaceImage;
