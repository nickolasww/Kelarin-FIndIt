"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/icon/Logo.svg";
import WokrspaceIcon from "@/assets/icon/WorkSpaceIcon.svg";
import ChatIcon from "@/assets/icon/ChatIcon.svg";
import CallIcon from "@/assets/icon/Callicon.svg";
import SettingsIcon from "@/assets/icon/SettingIcon.svg";
import LogoutIcon from "@/assets/icon/logoutIcon.svg";

interface WorkspaceSidebarProps {
  onNavigate: (content: 'workspace' | 'call' | 'chat' | 'settings'| 'logout') => void;
  OpenDeleteModal: () => void;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ onNavigate, OpenDeleteModal }) => {
  const [activeMenu, setActiveMenu] = useState<'workspace' | 'call' | 'chat' | 'settings' | 'logout'>('workspace');

  const handleMenuClick = (menu: 'workspace' | 'call' | 'chat' | 'settings' | 'logout') => {
    setActiveMenu(menu);
    onNavigate(menu);
  };

  return (
    <div className="pl-5 bg-white flex flex-col items-center min-h-screen pt-4">
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
          className={`w-10  h-10 text-purple-600 rounded-lg flex items-center justify-center relative ${activeMenu === 'workspace' ? 'active' : ''}`}
          onClick={() => handleMenuClick('workspace')}
        >
          {activeMenu === 'workspace' && <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-1 h-8  bg-purple-600 rounded-r-md" />}
          <Image
            src={WokrspaceIcon}
            alt="Workspace Icon"
          />
        </button>

        {/* Call Button */}
        <button
          className={`w-10 h-10 text-purple-600  flex items-center justify-center relative ${activeMenu === 'call' ? 'active' : ''}`}
          onClick={() => handleMenuClick('call')}
        >
          {activeMenu === 'call' && <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-lg " />}
          <Image
            src={ChatIcon}
            alt="Chat Icon"
          />
        </button>

        {/* Users Button */}
        <button
          className={`w-10 h-10 text-purple-600  flex items-center justify-center relative ${activeMenu === 'chat' ? 'active' : ''}`}
          onClick={() => handleMenuClick('chat')}
        >
          {activeMenu === 'chat' && <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-lg " />}
          <Image
            src={CallIcon}
            alt="Call Icon"
          />
        </button>

        {/* Settings Button */}
        <button
          className={`w-10 h-10 text-purple-600 flex items-center justify-center relative ${activeMenu === 'settings' ? 'active' : ''}`}
          onClick={() => { handleMenuClick('settings'); OpenDeleteModal(); }}
        >
          {activeMenu === 'settings' && <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-lg" />}
          <Image
            src={SettingsIcon}
            alt="Settings Icon"
          />
        </button>
      </div>

      {/* Logout Button */}
      <button className= {`w-10 h-10 text-purple-600 flex items-center justify-center relative ${activeMenu === 'logout' ? 'active' : ''}`}
        onClick={() => handleMenuClick('logout')}
      >
        {activeMenu === 'logout' && <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-lg " />}
        <Image
          src={LogoutIcon}
          alt="Logout Icon"
        />
      </button>
    </div>
  );
};

export default WorkspaceSidebar;