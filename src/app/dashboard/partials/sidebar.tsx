"use client"

import { useState } from "react"
import CreateWorkspaceModal from "@/components/modal/createworkspace"

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [workspaces, setWorkspaces] = useState<string[]>(["BCC Nekad"])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleCreateWorkspace = (workspaceName: string) => {
    if (workspaceName.trim()) {
      setWorkspaces([...workspaces, workspaceName])
    }
  }

  return (
    <>
      <div className="sm:hidden p-4 bg-[#F2E0FF]">
        <button onClick={toggleSidebar} aria-label="Toggle sidebar">
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
          <button onClick={toggleSidebar} aria-label="Close sidebar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center mb-6 sm:mb-8">
          <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center mr-2">
            <span className="text-purple-700 font-bold">RA</span>
          </div>
          <div className="flex items-center">
            <p className="font-semibold">Rheza Agung L</p>
          </div>
        </div>

        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-md w-full mb-3 sm:mb-4 hover:bg-purple-700 transition-colors"
          onClick={openModal}
        >
          + Create Workspace
        </button>

        <div className="space-y-3">
          {workspaces.map((workspace, index) => (
            <div key={index} className="flex items-center p-2 hover:bg-purple-200 rounded-md cursor-pointer">
              <div className="w-6 h-6 bg-purple-400 rounded-md flex items-center justify-center mr-2">
                <span className="text-white text-xs font-bold">{workspace.charAt(0)}</span>
              </div>
              <p>{workspace}</p>
            </div>
          ))}
        </div>

        <div className="flex-grow"></div>

        <button className="text-sm text-gray-500 mt-auto flex items-center cursor-pointer hover:text-purple-600">
          Upgrade Plan
        </button>

        <CreateWorkspaceModal isOpen={isModalOpen} onClose={closeModal}  />
      </div>
    </>
  )
}

export default Sidebar

