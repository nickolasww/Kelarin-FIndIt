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
          <div className="relative m-2 bg-gradient-to-br from-purple-100 to-purple-600 rounded-3xl p-8 shadow-2xl flex flex-col items-start justify-center">
            <div className="absolute top-8 left-8 flex items-center">
              <a href="/home">
                <Image
                  src={Logo}
                  alt="Logo Kelarin"
                  className="w-12 h-12 mr-2 cursor-pointer"
                />
              </a>
              <h1 className="text-2xl font-bold text-white">Kelarin</h1>
            </div>
            <div className="mt-20">
              <h2 className="text-5xl font-semibold mb-4">
                Turn Every Task into an{" "}
                <span className="text-purple-800 font-bold">Achievement!</span>
              </h2>
              <p className="text-md pr-20">
                Boost productivity with a gamified Kanban system! Manage tasks,
                earn points, and unlock rewards as you progress. Stay organized,
                stay motivated, and level up your workflow - all in one place!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full md:w-[70%] mx-auto">
          <h1 className="text-3xl mb-2">Get Started</h1>
          <p className="text-gray-500 mb-6 text-lg">Create your account now</p>

          <div className="pt-6 md:pt-10 ml-5">
            <Input
              label="Full Name"
              placeholder=""
              type="fullname"
              value={email}
              classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />

            <Input
              placeholder=""
              label="Email"
              type="email"
              value={email}
              classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />

            <Input
              label="Password"
              placeholder=""
              type="password"
              value={password}
              classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
            />

            <div className="flex flex-col items-center">
              <Button
                text="Sign Up"
                className="mt-6 w-full bg-purple-800 p-3 font-semibold rounded-lg text-white cursor-pointer"
              />
            </div>
          </div>

          <p className="text-center pt-8 md:pt-10">
            have an account?{" "}
            <a href="/login" className="text-purple-500">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
