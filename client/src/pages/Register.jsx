import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../data/Surge-logos_white.png" 
import ReCAPTCHA from "react-google-recaptcha";
import { Footer } from '../components';

function UserRegistration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const onChange= ()=>{

  }


  const [error, setError] = useState(false);
  //const [role, setRole] = useState('');

  let navigate = useNavigate();

  return (
    <body className="h-screen overflow-hidden flex items-center justify-center bg-main-dark-bg">
      <script
        src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"
        defer
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js" />

      <style>
        @import
        url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')
      </style>

      <div className="min-w-screen min-l-screen  flex items-center justify-center px-5 py-5  bg-main-dark-bg">
        <div className=" text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-red-500 py-10 px-10">
            <img className ="w-400" src={logo}>

            </img>

            
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10 bg-gray-100">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">
                  USER REGISTRATION
                </h1>
                <p>Enter all the user information</p>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const newUser = {
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                  };

                  const {data} = await axios
                    .post('http://localhost:8060/register', newUser)
                    .then((res) => {
                        alert("New Account Created");
                        console.log(res);
                        navigate("/");
                        
                    })
                    .catch((err) => {
                        setError(true);
                      console.log(err);
                      alert('User Registration Failed');
                    });
                    
                    localStorage.setItem('token',JSON.stringify(data));
                    document.location.href = 'http://localhost:3000/';
                    console.log(data);
                    navigate("/");

                }}
              >
                <div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-s font-semibold px-1">
                        First Name
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                        </div>
                        <input
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-cyan-500"
                          placeholder="Name"
                          required="required"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-s font-semibold px-1">
                        Last Name
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                        </div>
                        <input
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-cyan-500"
                          placeholder="Name"
                          required="required"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-s font-semibold px-1">
                        Email
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                        </div>
                        <input
                          type="email"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-cyan-500"
                          placeholder="johnsmith@example.com"
                          required="required"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-s font-semibold px-1">
                        Username
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                        </div>
                        <input
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-cyan-500"
                          placeholder="Name"
                          required="required"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-s font-semibold px-1">
                        Password
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                        </div>
                        <input
                          type="password"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-cyan-500"
                          placeholder="************"
                          required="required"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-8">
                      <div className="flex">
                        {error && (
                          <>
                            <div
                              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative"
                              role="alert"
                            >
                              <strong className="font-bold">
                                This User Already Exists!
                              </strong>

                              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg
                                  className="fill-current h-6 w-6 text-red-500"
                                  role="button"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                />
                              </span>
                            </div>
                            <br />
                          </>
                        )}

                        {/* <input type="text" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Administartor"/> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                    <ReCAPTCHA
                        onChange={onChange()}
                        sitekey="6LftnC8kAAAAAL1VT2WcSRAjQH59O6OmFrqdfCn7"
                        size="invisible"
                        
                      />
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <button className="block w-full max-w-xs mx-auto bg-red-500 hover:bg-cyan-700 focus:bg-cyan-700 text-white rounded-lg px-3 py-3 font-semibold">
                        Register User
                      </button>

                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10" />
    </body>
  );
}

export default UserRegistration;
