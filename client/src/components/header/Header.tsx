import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routing/routes";
import { UserContext } from "../../providers/ContextProvider";
import { SVG_ICONS } from "../../data";

const Header: React.FC = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="flex flex-col justify-between gap-2 md:flex-row">
      <Link to="/" className="flex items-center gap-1 text-red-500">
        {SVG_ICONS.earth}
        <span className="text-xl font-bold">BookinG</span>
      </Link>
      <div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm shadow-md shadow-gray-300 sm:text-base">
        <div>Anywhere</div>
        <div className="border-l border-gray-300" />
        <div>Any week</div>
        <div className="border-l border-gray-300" />
        <div>Add guests</div>
        <button
          aria-label="Search button"
          className="rounded-full bg-primary p-1 text-white"
        >
          {SVG_ICONS.search}
        </button>
      </div>
      <Link
        to={user ? ROUTES.profile : ROUTES.login}
        className="flex items-center gap-2 rounded-full border  border-gray-300 px-4 py-2"
      >
        {SVG_ICONS.menu}
        <div className="overflow-hidden rounded-full border border-gray-500 bg-gray-500 text-white">
          <div className="relative top-1">{SVG_ICONS.user}</div>
        </div>
        {!!user && <p>{user.name}</p>}
      </Link>
    </header>
  );
};

export default Header;
