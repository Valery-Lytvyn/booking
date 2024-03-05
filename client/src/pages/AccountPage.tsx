import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AccountNav from "../components/accountNav/AccountNav";

const AccountPage: React.FC = () => {
  const { pathname } = useLocation();
  const subPage = pathname.split("/")?.[2] || "account";

  return (
    <div className="flex flex-col gap-4">
      <AccountNav subPage={subPage} />
      <Outlet />
    </div>
  );
};

export default AccountPage;
