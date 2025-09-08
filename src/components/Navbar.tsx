import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex flex-row items-center justify-between px-4">
      <div className="logo text-3xl flex font-bold">Alumni App</div>
      <div className="welcome">Welcome</div>
    </div>
  );
};

export default Navbar;
