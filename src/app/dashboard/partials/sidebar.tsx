"use client"

import type React from "react"
import { useState, useEffect } from "react"
import CreateWorkspaceModal from "@/components/modal/createworkspace"
import UpgradeModal from "@/components/modal/upgrademodal"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Workspace } from "@/services/workspace"

interface SidebarProps {
  workspaces: Workspace[]
  onWorkspaceCreated: (workspace: Workspace) => void
}

const Sidebar: React.FC<SidebarProps> = ({ workspaces = [], onWorkspaceCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userName, setUserName] = useState("User")
  const router = useRouter()

  useEffect(() => {
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openUpgradeModal = () => {
    setIsUpgradeModalOpen(true)
  }

  const closeUpgradeModal = () => {
    setIsUpgradeModalOpen(false)
  }

  const handleCreateWorkspace = (workspaceData: Workspace) => {
    onWorkspaceCreated(workspaceData)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <div className="sm:hidden p-4 bg-[#F2E0FF]">
        <button onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 w-full sm:w-64 bg-[#F2E0FF] p-4 min-h-screen flex flex-col fixed sm:static top-0 left-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="sm:hidden flex justify-end mb-4">
          <button onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center mb-6 sm:mb-8">
          <div className="flex items-center">
            <p className="font-semibold">{userName}</p>
          </div>
        </div>
        <button className="bg-purple-600 text-white py-2 px-4 rounded-md w-full mb-3 sm:mb-4" onClick={openModal}>
          + Create Workspace
        </button>

        <div className="space-y-2 mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Workspaces</h3>
          {workspaces && workspaces.length > 0 ? (
            <div>
              {workspaces.map((workspace) => (
                <Link
                  key={workspace.id || `workspace-${Math.random().toString(36).substr(2, 9)}`}
                  href={`/dashboard/${workspace.id || ""}`}
                  className="flex items-center py-1 px-2 rounded-md hover:bg-purple-100 cursor-pointer"
                >
                  <p className="text-sm">{workspace.title || workspace.name || "Unnamed Workspace"}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No workspaces yet</p>
          )}
        </div>

        <div className="flex-grow"></div>

        <button className="text-sm text-gray-500 mt-auto flex items-center cursor-pointer" onClick={openUpgradeModal}>
          Upgrade Plan
        </button>
      </div>

      <CreateWorkspaceModal isOpen={isModalOpen} onClose={closeModal} onCreate={handleCreateWorkspace} />
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={closeUpgradeModal} />
    </>
  )
}

export default Sidebar
