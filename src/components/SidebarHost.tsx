"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";

const SidebarHost: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-[70px] left-6 z-50 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 border border-white/20 backdrop-blur-sm"
        >
          <span className="text-xl font-bold">☰</span>
        </button>
      )}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SidebarHost; 