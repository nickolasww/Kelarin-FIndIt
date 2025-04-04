"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Input from "@/components/input/index"

interface CreateWorkspaceModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string) => void
}

const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [workspaceType, setWorkspaceType] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [workspaceName, setWorkspaceName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen])

  const handleCreate = () => {
    if (workspaceName.trim()) {
      onCreate(workspaceName)
      // Reset form fields after creating
      setWorkspaceName("")
      setEmail("")
      setWorkspaceType(null)
      onClose()
    }
  }

  return isModalOpen ? (
    <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6 sm:p-8 relative">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl underline">Workspace Name</h1>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Workspace name/description textarea */}
        <textarea
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          placeholder="Add Description"
          className="border-2 border-dashed border-gray-300 rounded-xl w-full bg-gray-100 min-h-[120px] p-4 sm:p-5 focus:outline-none mb-6"
        />

        {/* Share workspace section */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Share this Workspace</h2>
          <div className="flex flex-col sm:flex-row gap-3">
          <input
              type="email"
              placeholder="type your friend email here"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 py-2 sm:px-6 sm:py-3 flex items-center justify-center">
              Invite
            </button>
          </div>
        </div>

        {/* Workspace type section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">How do you want to use this workspace?</h2>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {["Group Project", "Planner", "Lesson Plan"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg border text-sm sm:text-base ${
                  workspaceType === type
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-700"
                }`}
                onClick={() => setWorkspaceType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Create button */}
        <button
          className={`w-full bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-3 sm:py-4 text-base sm:text-lg font-medium ${
            !workspaceName.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleCreate}
          disabled={!workspaceName.trim()}
        >
          Create Workspace
        </button>
      </div>
    </div>
  ) : null
}

export default CreateWorkspaceModal

