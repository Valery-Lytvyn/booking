import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routing/routes";
import { SVG_ICONS } from "../../data";

const AddPlaceLink: React.FC = () => {
  return (
    <Link
      to={`${ROUTES["new-place"]}`}
      className="mx-auto my-4  inline-flex max-w-lg  gap-1 rounded-full bg-primary px-8 py-2 text-white"
    >
      {SVG_ICONS.plus}
      Add new places
    </Link>
  );
};

export default AddPlaceLink;
