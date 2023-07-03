import React, { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccomodationPage from "./AccomodationPage";
import AccountNav from "../components/AccountNav";

const AcountPage = () => {
  let { subpage } = useParams();
  if (subpage == undefined) subpage = "account";

  const [redirect, setRedirect] = useState(false);
  const { user, setUser, IsUserDataReady } = useContext(UserContext);

  if (!IsUserDataReady) return <p>Loading..</p>;

  if (IsUserDataReady && !user && !redirect) {
    return <Navigate to='/login' />;
  }

  const logOutHandler = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      setRedirect(true);
    } catch (error) {
      alert("Failed to log out, try again later!");
    }
  };

  if (redirect) return <Navigate to='/' />;

  const profile = (
    <div className='mx-auto max-w-md text-center mt-16 border border-gray-300 py-4 px-2 rounded-md shadow-md shadow-gray-300'>
      <p>Logged in as {user.name}</p>
      <button
        className='max-w-sm mt-6 primary rounded-full'
        onClick={logOutHandler}
      >
        Log out
      </button>
    </div>
  );

  return (
    <div>
      <AccountNav />
      {subpage == "account" && profile}
      {subpage == "accomodations" && <AccomodationPage />}
    </div>
  );
};

export default AcountPage;
