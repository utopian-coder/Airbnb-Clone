import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className='flex flex-col min-h-screen px-4 py-3 md:px-16 md:py-6'>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
