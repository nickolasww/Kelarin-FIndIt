// partials/workspaceside.tsx
import type React from "react";
import Link from "next/link";
import { FaThLarge, FaPhone, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Image from "next/image";
import Logo from "@/assets/icon/Logo.svg";
import WokrspaceIcon from "@/assets/icon/WorkSpaceIcon.svg";
import ChatIcon from "@/assets/icon/ChatIcon.svg";
import CallIcon from "@/assets/icon/Callicon.svg";
import SettingsIcon from "@/assets/icon/SettingIcon.svg";
import LogoutIcon from "@/assets/icon/logoutIcon.svg";

interface WorkspaceSidebarProps {
  onNavigate: (content: 'workspace' | 'call' | 'chat' | 'settings') => void;
  OpenDeleteModal: () => void;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ onNavigate, OpenDeleteModal }) => {
  return (
    <>
    <div className=" pl-5 bg-white flex flex-col items-center min-h-screen pt-4">
      {/* Navigation Buttons */}
      <div className="flex flex-col items-center space-y-6 flex-grow">
        {/* Logo */}
        <Image 
          src={Logo}
          alt="Logo"
          className="w-10 h-10 mb-7"
        />
        {/* Dashboard Button */}
        <button
          className="w-10 h-10 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => onNavigate('workspace')}
        >
          <Image
          src={WokrspaceIcon}
          alt="Workspace Icon"
          />
        </button>

        {/* Call Button */}
        <button
          className="w-10 h-10 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => onNavigate('call')}
        >
          <Image
          src={ChatIcon}
          alt="Chat Icon"
          />
        </button>

        {/* Users Button */}
        <button
          className="w-10 h-10 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => onNavigate('chat')}
        >
          <Image
          src={CallIcon}
          alt="Call Icon"
          />
        </button>

        {/* Settings Button */}
        <button
          className="w-10 h-10 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={OpenDeleteModal}
        >
          <Image
          src={SettingsIcon}
          alt="Settings Icon"
          />
        </button>
      </div>

        {/* Logout Button */}
        <button className="w-10 pt-96 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <Image
          src={LogoutIcon}
          alt="Logout Icon"
          />
        </button>
      </div>
    </>
  );
};

export default WorkspaceSidebar;