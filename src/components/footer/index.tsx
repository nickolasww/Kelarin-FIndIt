import Image from "next/image"
import Logo from "@/assets/icon/Logo.svg"

export default function Footer(){ 
    return ( 
        <div className="flex justify-between p-5 mx-20 items-center text-center "> 
            <div className="flex justify-center items-center gap-3"> 
                <Image src={Logo} alt="logo" className="w-7 h-7" />
                <h1 className="font-bold text-xl">Kelarin</h1> 
            </div>
            <p className="text-[#5D5A88] font-poppins">Copyright © 2025 Kelarin | All Rights Reserved </p>
        </div>
    )
}