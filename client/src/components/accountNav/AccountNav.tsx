import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routing/routes";
import { AccountNavProps } from "../../types";
import { SVG_ICONS } from "../../data";

const defaultLinkStyle = "inline-flex px-6 py-2 rounded-full gap-1";
const AccountNav: React.FC<AccountNavProps> = ({ subPage }) => {
  return (
    <nav className="mt-8 flex w-full flex-col justify-center gap-2 sm:flex-row">
      <NavLink
        to={ROUTES.profile}
        className={`${defaultLinkStyle} ${subPage === "profile" ? "bg-primary  text-white" : "bg-gray-200"} `}
      >
        {SVG_ICONS.user}
        My profile
      </NavLink>
      <NavLink
        to={ROUTES.bookings}
        className={`${subPage === "bookings" ? "bg-primary  text-white" : "bg-gray-200"} ${defaultLinkStyle}`}
      >
        {SVG_ICONS.list}
        My bookings
      </NavLink>
      <NavLink
        to={ROUTES.places}
        className={`${defaultLinkStyle} ${subPage === "places" ? "bg-primary  text-white" : "bg-gray-200"} `}
      >
        {SVG_ICONS.house}
        My accommodations
      </NavLink>
    </nav>
  );
};

export default AccountNav;
