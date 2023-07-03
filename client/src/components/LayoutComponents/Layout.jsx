import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className='py-6 px-16 flex flex-col min-h-screen'>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
