"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/icon/Logo.svg";
import Button from "../button";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section>
      <div className="flex justify-between items-center py-5 px-10 mx-auto">
        <div className="flex items-center justify-center gap-3">
          <Image src={Logo} alt="logo" width={30} height={30} />
          <h1 className="font-bold font-poppins text-2xl">Kelarin</h1>
        </div>

        {/* Hamburger Menu Icon (Mobile/Tablet) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links (Mobile/Tablet) */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50`}>
          <div className="flex justify-between items-center p-4">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              <FaTimes size={24} />
            </button>
          </div>

          <ul className="flex flex-col gap-4 p-4 text-black">
            <li>Home</li>
            <li>About</li>
            <li>Pricing</li>
            <li>Contact</li>
            <Button
              className="bg-purple-800 p-3 font-poppins font-semibold rounded-md text-white cursor-pointer"
              text="Get Started"
            />
          </ul>
        </div>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex gap-10 items-center text-[#5D5A88]">
          <li>Home</li>
          <li>About</li>
          <li>Pricing</li>
          <li>Contact</li>
          <a href="/login"><Button 
            className="bg-purple-800 p-3 font-poppins font-semibold rounded-md text-white cursor-pointer"
            text="Get Started"
          /></a>
        </ul>
      </div>
    </section>
  );
}