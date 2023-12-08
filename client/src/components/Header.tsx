import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="flex border-b h-16 w-full justify-between items-center px-20">
        <h1 className="font-semibold text-gray-800 text-xl tracking-wider">
          BIOVERSE <span className="tracking-wider">TICKET SUPPORT</span>
        </h1>
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
