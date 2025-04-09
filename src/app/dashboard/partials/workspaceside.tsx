// partials/workspaceside.tsx
import type React from "react";
import Link from "next/link";
import { FaThLarge, FaPhone, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Image from "next/image";
import Logo from "@/assets/icon/Logo.svg";

interface WorkspaceSidebarProps {
  onNavigate: (content: 'workspace' | 'call' | 'chat' | 'settings') => void;
  OpenDeleteModal: () => void;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ onNavigate, OpenDeleteModal }) => {
  return (
    <>
    <div className=" pl-5 bg-white flex flex-col items-center py-4">
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
          <FaThLarge className="h-6 w-6" />
        </button>

        {/* Call Button */}
        <button
          className="w-10 h-10 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => onNavigate('call')}
        >
          <FaPhone className="h-6 w-6" />
        </button>

        {/* Users Button */}
        <button
          className="w-10 h-10 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => onNavigate('chat')}
        >
          <FaUsers className="h-6 w-6" />
        </button>

        {/* Settings Button */}
        <button
          className="w-10 h-10 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={OpenDeleteModal}
        >
          <FaCog className="h-6 w-6" />
        </button>
      </div>

        {/* Logout Button */}
        <button className="w-10 h-10 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <FaSignOutAlt className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default WorkspaceSidebar;