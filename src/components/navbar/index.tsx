import Link from "next/link"
import Image from "next/image"
import Logo from "@/assets/icon/Logo.svg"
import Button from "../button"

export default function Navbar () {
    return (
        <section >
            <div className="flex justify-between items-center py-5 px-10  mx-auto ">
                <div className="flex items-center justify-center gap-3" >
                <Image src={Logo}alt="logo" />
                <h1 className="font-bold font-poppins text-2xl">Kelarin</h1>
                </div>
                <ul className="flex gap-10 items-center text-[#5D5A88]"> 
                    <li>Home</li>
                    <li>About</li>
                    <li>Pricing</li>
                    <li>Contact</li>
                <Button className="bg-purple-800 p-3 font-poppins font-semibold rounded-md text-white cursor-pointer" 
                text="Get Started"
                /> 
                </ul> 
            </div>
        </section>
    )
}