import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../data/Surge-logos_white.png';
import ReCAPTCHA from 'react-google-recaptcha';
import { Footer } from '../components';

const Login = () =>{

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const [token,setToken] = useState('');

  const recaptcha = useRef();
  //const location = useLocation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if(!localStorage.getItem("_grecaptcha")){
      alert("You must verify the reCaptcha");
      return;
    }


    try {
      const {data} = await axios.post('http://localhost:8060/', {
        email,
        password,
      });
      localStorage.setItem('token', JSON.stringify(data));
      window.location ="/feed"
    } catch (errors) {
      setError(true);
    }
  };
    return(
        <div>
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

      <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5 bg-main-dark-bg">
        <div className=" text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-red-500 py-10 px-10">
            <img className ="w-400 h-200" src={logo}>
            </img>
            
            </div>
            <div className="w-full md:w-1/2 py-5 px-5 md:px-10 bg-gray-100">

              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900 mb-2">
                  USER LOGIN
                </h1>
                <p>Enter your login credentials</p>
              </div>
              <form onSubmit={submitHandler}>
                <div>
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
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-cyan-500 mb-2"
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
                                Please check your email and password.
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
                        ref={recaptcha}
                        onChange={token => setToken(token)}
                        onExpired = {e => setToken("")}
                        sitekey="6LftnC8kAAAAAL1VT2WcSRAjQH59O6OmFrqdfCn7"
                        callback = "onSubmit"
                        
                      />
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <button className="block w-full max-w-xs mx-auto bg-red-500 hover:bg-cyan-700 focus:bg-cyan-700 text-white rounded-lg px-3 py-3 font-semibold">
                        Login
                      </button>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500">
                    Don't have an account?{'  '}
                    <Link
                      to="/Register"
                      className="text-cyan-700 hover:text-cyan-700 focus:text-cyan-700 transition duration-200 ease-in-out"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10" />
      
    </body>
        </div>
    )
}

export default Login;