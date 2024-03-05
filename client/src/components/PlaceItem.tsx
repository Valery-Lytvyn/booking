import React from "react";
import { PlaceItemProps } from "../types";
import { Link } from "react-router-dom";
import { ROUTES } from "../routing/routes";
import PlaceImage from "./PlaceImage";

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  const { _id, title, address, photos, price } = place;
  return (
    <Link to={ROUTES.place(_id)}>
      <div className="relative mb-2 overflow-hidden rounded-2xl bg-gray-500">
        {photos[0] && (
          <PlaceImage fileName={photos[0]} variant="aspect-square" />
        )}
      </div>

      <h2 className="font-bold">{address}</h2>
      <h3 className="truncate text-sm text-gray-500">{title}</h3>
      <div>
        <span className="text-bold mt-1 pr-2">${price}</span>
        per night
      </div>
    </Link>
  );
};

export default PlaceItem;
