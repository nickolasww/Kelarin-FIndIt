"use client"

import type React from "react"
import { useState } from "react"
import CreateWorkspaceModal from "@/components/modal/createworkspace"
import TableModal from "@/components/modal/addtablemodal"
import TaskModal from "@/components/modal/addtaskmodal"
import UpgradeModal from "@/components/modal/upgrademodal"

interface SidebarProps {
  onCreate: (name: string) => void
}

interface AddTableData {
  name: string;
  description: string;
  inviteEmail: string;
  usage: string | null;
  image: File | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

  const handleCreate = (formData: AddTableData) => {
    console.log('Data Workspace yang Dibuat:', formData);
    // Di sini Anda bisa mengirimkan data ke backend atau melakukan tindakan lain
    setIsModalOpen(false);
  };

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center mb-6 sm:mb-8">
          <div className="flex items-center">
            <p className="font-semibold">Rheza Agung L</p>
          </div>
        </div>
        <button className="bg-purple-600 text-white py-2 px-4 rounded-md w-full mb-3 sm:mb-4" onClick={openModal}>
          + Create Workspace
        </button>
        <div className="flex items-center mb-4">
          <p>BCC Nekad</p>
        </div>

        <div className="flex-grow"></div>

        <button className="text-sm text-gray-500 mt-auto flex items-center cursor-pointer" onClick={openUpgradeModal}>Upgrade Plan         
        </button>
      </div>

      <CreateWorkspaceModal isOpen={isModalOpen} onClose={closeModal} onCreate={onCreate} />
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={closeUpgradeModal} />
    </>
  )
}

export default Sidebar

