import Image from "next/image";
import Logo from "@/assets/icon/Logo.svg";

export default function Footer() {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between p-4 md:p-5 mx-4 md:mx-20 items-center text-center">
      <div className="flex justify-center items-center gap-3 mb-4 md:mb-0">
        <Image src={Logo} alt="logo" className="w-7 h-7" />
        <h1 className="font-bold text-xl">Kelarin</h1>
      </div>
      <p className="text-[#5D5A88] font-poppins">Copyright © 2025 Kelarin | All Rights Reserved</p>
    </div>
  );
}