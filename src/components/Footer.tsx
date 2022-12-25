import React from "react";
import Logo from "../assets/logos/logo.png";

export const Footer = () => (
  <footer className="bg-white border-t-2 border-slate-200 shadow-large py-3 flex items-center justify-center bg-gray-50">
    <img src={Logo} className="h-10 w-10 object-cover rounded-full mr-2" alt="landing" />
    <p className="text-center">&copy; Magic-Quiz 2022</p>
  </footer>
);
