import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUpHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });

      alert("Registration succesfull now you can Log in");
      navigate("/login");
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className='mt-8 flex grow justify-around items-center'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center'>Sign up</h1>
        <form className='my-2 mx-auto max-w-md' onSubmit={signUpHandler}>
          <input
            type='text'
            placeholder='your name'
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <button className='primary'>Sign up</button>
          <div className='py-2 text-center text-gray-500'>
            Already have an account?{" "}
            <Link to='/login' className='text-black underline'>
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
