"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Input from "@/components/input/index"
import { createWorkspace, inviteToWorkspace } from "@/services/workspace"
import { X } from "lucide-react"

interface CreateWorkspaceModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (workspaceData: any) => void
}

const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [workspaceType, setWorkspaceType] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [workspaceName, setWorkspaceName] = useState("")
  const [description, setDescription] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInviting, setIsInviting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inviteMessage, setInviteMessage] = useState<string | null>(null)

  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen])

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleInvite = async () => {
    if (!email.trim()) {
      setError("Email is required to invite")
      return
    }

    if (!validateEmail(email.trim())) {
      setError("Invalid email format")
      return
    }

    setError(null)
    setInviteMessage(null)
    setIsInviting(true)

    try {
      setInviteMessage("Email added. Invitation will be sent when workspace is created.")
    } catch (err) {
      console.error("Error adding email for invitation:", err)
      setError("Failed to add email. Please try again.")
    } finally {
      setIsInviting(false)
    }
  }

  const handleCreate = async () => {
    if (!workspaceName.trim()) {
      setError("Workspace name is required")
      return
    }

    if (!workspaceType) {
      setError("Please select a workspace type")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const workspaceData = {
        title: workspaceName.trim(),
        purpose: workspaceType,
        description: description.trim(),
        collaborator: email.trim() || undefined,
      }

      const response = await createWorkspace(workspaceData)
      console.log("Workspace created successfully:", response)
      if (email.trim() && validateEmail(email.trim())) {
        try {
          await inviteToWorkspace(response.id, email.trim())
          console.log(`Invitation sent to ${email.trim()}`)
        } catch (inviteErr) {
          console.error("Error sending invitation:", inviteErr)
        }
      }

      setWorkspaceName("")
      setDescription("")
      setEmail("")
      setWorkspaceType(null)
      setInviteMessage(null)

      onCreate(response)
      onClose()
    } catch (err) {
      console.error("Error creating workspace:", err)
      setError("Failed to create workspace. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return isModalOpen ? (
    <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6 sm:p-8 relative">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Input
            type="text"
            label=""
            classname="text-xl font-semibold text-gray-800 focus:outline-none border-b border-black w-56"
            value={workspaceName}
            placeholder="Workspace Name"
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add Description"
          className="border-2 border-dashed border-gray-300 rounded-xl w-full bg-gray-100 min-h-[120px] p-4 sm:p-5 focus:outline-none mb-6"
        />

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
            <button
              className={`bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 py-2 sm:px-6 sm:py-3 flex items-center justify-center ${isInviting ? "opacity-70 cursor-not-allowed" : ""}`}
              onClick={handleInvite}
              disabled={isInviting}
            >
              {isInviting ? "Adding..." : "Invite"}
            </button>
          </div>
          {inviteMessage && <p className="mt-2 text-sm text-green-600">{inviteMessage}</p>}
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">How do you want to use this workspace?</h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {["Group Project", "Planner", "Lesson Plan"].map((type) => (
              <button
                key={type}
                className={`px-6 py-3 rounded-lg border-2 text-base ${
                  workspaceType === type
                    ? "border-purple-500 bg-purple-50 text-purple-700 font-medium"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setWorkspaceType(type)}
                type="button"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <button
          className={`w-full bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-3 sm:py-4 text-base sm:text-lg font-medium ${
            isLoading || !workspaceName.trim() || !workspaceType ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleCreate}
          disabled={isLoading || !workspaceName.trim() || !workspaceType}
        >
          {isLoading ? "Creating..." : "Create Workspace"}
        </button>
      </div>
    </div>
  ) : null
}

export default CreateWorkspaceModal
