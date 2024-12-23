import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const {backendUrl,setIsLoggedin,getUserData} = useContext(AppContent)

  const [state, setState] = useState("Sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try{
    
      e.preventDefault() 
      axios.defaults.withCredentials = true

      if (state === "Sign up") {
        const {data} = await axios.post(backendUrl + '/api/auth/register',{name,email,password})

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/auth/login',{email,password})

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }

      
    } catch (error) {

      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-8 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg text-indigo-300 text-sm w-full sm:w-96">
        <h2 className="text-3xl font-semibold text-center mb-3">
          {state === "Sign up" ? "Create account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler} action="">
          {state === "Sign up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email id"
              required
              className="bg-transparent outline-none"
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none"
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="text-indigo-500 mb-4 cursor-pointer"
          >
            Forgot your password?
          </p>

          <button type="submit" className="w-full rounded-full text-white font-medium py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900">
            {state}
          </button>
        </form>

        {state === "Sign up" ? (
          <p className="text-gray-400 text-xs text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-xs text-center mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
