"use client";
import { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import Logo from "@/assets/icon/Logo.svg";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="flex">
      <div className="hidden lg:block lg:w-[40rem]">
        <div className="relative w-full h-screen flex justify-center">
          <div className="relative m-2 bg-gradient-to-br from-purple-200 to-purple-800 rounded-3xl p-8 shadow-2xl flex flex-col items-start justify-center">
            {/* Logo di Pojok Kiri Atas */}
            <div className="absolute top-8 left-8 flex items-center">
              <Image src={Logo} alt="Logo Kelarin" className="w-12 h-12 mr-2" />
              <h1 className="text-2xl font-bold text-white">Kelarin</h1>
            </div>

            {/* Konten Utama */}
            <div className="mt-20"> {/* Tambahkan margin top untuk memberi ruang dari logo */}
              <h2 className="text-5xl font-semibold mb-4">
                Turn Every Task into an <span className="text-purple-800 font-bold">Achievement!</span>
              </h2>
              <p className="text-md pr-20">
                Boost productivity with a gamified Kanban system! Manage tasks, earn points, and unlock rewards as you progress. Stay organized, stay motivated, and level up your workflow - all in one place!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full md:w-[70%] mx-auto">
          <h1 className="text-3xl mb-2">Welcome back!</h1>
          <p className="text-gray-500 mb-6">Log in to continue your journey</p>

          <div className="pt-6 md:pt-10 ml-5">
            <Input
              label="Email"
              type="email"
              value={email}
              classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
            />

            <div className="flex flex-col items-center">
              <Button
                text="Sign In"
                className="mt-6 w-full bg-purple-800 p-3 font-semibold rounded-lg text-white cursor-pointer"
              />
            </div>
          </div>

          <p className="text-center pt-8 md:pt-10">
            Don't have an account? <a href="/register" className="text-purple-500">Sign Up</a>
          </p>
        </div>
      </div>
    </section>
  );
}