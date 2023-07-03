import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const logInHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });
      setUser(response.data);
      setRedirect(true);
      alert("Log in successful");
    } catch (error) {
      alert("Error while logging in");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className='mt-8 flex grow justify-around items-center'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center'>Log in</h1>
        <form className='my-2 mx-auto max-w-md' onSubmit={logInHandler}>
          <input
            type='email'
            placeholder='email'
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className='primary'>Log in</button>
          <div className='py-2 text-center text-gray-500'>
            Don't have an account?{" "}
            <Link to='/register' className='text-black underline'>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogInPage;
