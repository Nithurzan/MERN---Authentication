import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="mb-6 w-36 h-36 rounded-full"
      />
      <h1 className="flex items-center gap-2 font-medium mb-2 text-xl sm:text-3xl">
        Hey.. {userData ? userData.name : "Developers"}!
        <img className="w-8 aspect-square" src={assets.hand_wave} />
      </h1>
      <h2 className="text-3xl sm:text-5xl mb-4 font-serif">
        Welcome to our app
      </h2>
      <p className="mb-8 max-w-md">
        let's start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
