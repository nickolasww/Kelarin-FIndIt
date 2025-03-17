import AboutBg from "@/assets/images/background/AboutBg.svg";
import Image from "next/image";

import { GrDocumentVerified } from "react-icons/gr";
import { PiFire } from "react-icons/pi";
import { GrPowerCycle } from "react-icons/gr";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-5xl font-bold text-purple-800">About Kelarin</h1>
      <p className="text-center text-xl">
        <span className="font-bold">Task management</span> shouldn't be boring
        <span className="font-bold"> -Kelarin</span> makes it fun and rewarding!
      </p>

      <div className="flex justify-between items-center gap-20 pt-10 w-full">
        <div className="flex flex-col gap-10 w-1/2">
          <div className="border-2 border-purple-600 p-3 rounded-2xl flex items-center gap-4 mx-20">
            <GrDocumentVerified className="text-4xl text-purple-600" />
            <div>
              <h1 className="font-bold">Kanban-Based Task Management</h1>
              <p>Organize tasks into To-Do, In Progress, and Done categories.</p>
            </div>
          </div>

          <div className="border-2 border-purple-600 p-3 rounded-2xl flex items-center gap-4 mx-20">
            <PiFire className="text-5xl text-purple-600" />
            <div>
              <h2 className="font-bold">Streak Gamification</h2>
              <p>Earn streak points by uploading daily notes and unlock exclusive features</p>
            </div>
          </div>

          <div className="border-2 border-purple-600 p-3 rounded-2xl mx-20">
            <h3 className="font-bold">Customizable Workspaces</h3>
            <p>Personalize workspaces with avatars, headers, and task labels.</p>
          </div>

          <div className="border-2 border-purple-600 p-3 rounded-2xl flex items-center gap-4 mx-20">
            <GrPowerCycle className="text-5xl text-purple-600" />
            <div>
              <h4 className="font-bold">Integrated Productivity Tools</h4>
              <p>Sync with calendars, voice calls, and centralized links</p>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex justify-end self-end ml-auto"> 
          <Image src={AboutBg} alt="logo" className="w-auto max-w-full" />
        </div>
      </div>
    </div>
  );
}
