import React, { Suspense } from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Loader from "../components/loader/Loader";

const Layout: React.FC = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col overflow-hidden border py-4">
      <div className="lg mx-4 sm:mx-16 lg:mx-32 ">
        <Header />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
