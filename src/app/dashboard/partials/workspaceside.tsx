"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Logo from "@/assets/icon/Logo.svg"
import WokrspaceIcon from "@/assets/icon/WorkSpaceIcon.svg"
import ChatIcon from "@/assets/icon/ChatIcon.svg"
import CallIcon from "@/assets/icon/Callicon.svg"
import SettingsIcon from "@/assets/icon/SettingIcon.svg"
import LogoutIcon from "@/assets/icon/logoutIcon.svg"

interface WorkspaceSidebarProps {
  onNavigate: (content: "workspace" | "call" | "chat" | "settings" | "logout") => void
  OpenDeleteModal: (workspaceId?: number) => void // Updated to accept optional workspaceId
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ onNavigate, OpenDeleteModal }) => {
  const [activeMenu, setActiveMenu] = useState<"workspace" | "call" | "chat" | "settings" | "logout">("workspace")

  const handleMenuClick = (menu: "workspace" | "call" | "chat" | "settings" | "logout") => {
    setActiveMenu(menu)

    if (menu === "settings") {
      // Open delete modal without a specific workspace ID
      // This will show a general settings modal or handle current workspace
      OpenDeleteModal()
    } else {
      onNavigate(menu)
    }
  }

  return (
    <div className="pl-5 bg-white flex flex-col items-center min-h-screen pt-4">
      {/* Navigation Buttons */}
      <div className="flex flex-col items-center space-y-6 flex-grow">
        {/* Logo */}
        <Image src={Logo || "/placeholder.svg"} alt="Logo" className="w-10 h-10 mb-7" width={40} height={40} />
        {/* Dashboard Button */}
        <button
          className={`w-10 h-10 text-purple-600 rounded-lg flex items-center justify-center relative ${activeMenu === "workspace" ? "active" : ""}`}
          onClick={() => handleMenuClick("workspace")}
        >
          {activeMenu === "workspace" && (
            <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-md" />
          )}
          <Image src={WokrspaceIcon || "/placeholder.svg"} alt="Workspace Icon" width={24} height={24} />
        </button>

        {/* Call Button */}
        <button
          className={`w-10 h-10 text-purple-600 flex items-center justify-center relative ${activeMenu === "call" ? "active" : ""}`}
          onClick={() => handleMenuClick("call")}
        >
          {activeMenu === "call" && (
            <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-lg" />
          )}
          <Image src={ChatIcon || "/placeholder.svg"} alt="Chat Icon" width={24} height={24} />
        </button>

        {/* Users Button */}
        <button
          className={`w-10 h-10 text-purple-600 flex items-center justify-center relative ${activeMenu === "chat" ? "active" : ""}`}
          onClick={() => handleMenuClick("chat")}
        >
          {activeMenu === "chat" && (
            <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-lg" />
          )}
          <Image src={CallIcon || "/placeholder.svg"} alt="Call Icon" width={24} height={24} />
        </button>

        {/* Settings Button */}
        <button
          className={`w-10 h-10 text-purple-600 flex items-center justify-center relative ${activeMenu === "settings" ? "active" : ""}`}
          onClick={() => handleMenuClick("settings")}
        >
          {activeMenu === "settings" && (
            <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-lg" />
          )}
          <Image src={SettingsIcon || "/placeholder.svg"} alt="Settings Icon" width={24} height={24} />
        </button>
      </div>

      {/* Logout Button */}
      <button
        className={`w-10 h-10 text-purple-600 flex items-center justify-center relative mb-6 ${activeMenu === "logout" ? "active" : ""}`}
        onClick={() => handleMenuClick("logout")}
      >
        {activeMenu === "logout" && (
          <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-lg" />
        )}
        <Image src={LogoutIcon || "/placeholder.svg"} alt="Logout Icon" width={24} height={24} />
      </button>
    </div>
  )
}

export default WorkspaceSidebar
