import Link from "next/link"

export default function Navbar () {
    return (
        <section >
            <div className="flex justify-between items-center py-5 px-10  mx-auto ">
                <h1>KELARIN </h1>
                <ul className="flex gap-10 items-center"> 
                    <li>Home</li>
                    <li>About</li>
                    <li>Pricing</li>
                    <li>Contact</li>
                <button className="bg-purple-800 p-2 rounded-md">
                    Get Started
                </button>
                </ul> 
            </div>
        </section>
    )
}