"use client"

import { useState, useEffect } from "react"
import WorkspaceSidebar from "@/app/dashboard/partials/workspaceside"
import Chat from "@/app/dashboard/[id]/chat/page"
import InviteModal from "@/components/modal/invitemodal"
import Workspace from "@/app/dashboard/[id]/workspace/page"
import DeleteModal from "@/components/modal/deletemodal"
import Header from "@/app/dashboard/partials/header"
import StreakModal from "@/components/modal/streakmodal"
import { useRouter, useParams } from "next/navigation"
import { getAuthToken, isAuthenticated } from "@/services/validation"

const DashboardPage = () => {
  const router = useRouter()
  const params = useParams()
  const currentPageId = params?.id as string

  const [activeContent, setActiveContent] = useState<"workspace" | "call" | "chat" | "settings" | "users" | null>(
    "workspace",
  )
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false)
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<number | undefined>(undefined)
  const [isDeleting, setIsDeleting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Set the current workspace ID from the URL parameter when the component mounts
  useEffect(() => {
    if (currentPageId) {
      const numericId = Number.parseInt(currentPageId, 10)
      if (!isNaN(numericId)) {
        setCurrentWorkspaceId(numericId)
        console.log("Set current workspace ID from URL:", numericId)
      }
    }
  }, [currentPageId])

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      console.warn("User is not authenticated")
      // Optionally redirect to login
      // router.push("/login")
    }
  }, [])

  const handleNavigation = (content: "workspace" | "users" | "call" | "chat" | "settings" | "logout") => {
    if (content === "users") {
      console.warn(`Navigation to ${content} is not implemented.`)
      return
    }
    if (content === "logout") {
      console.log("Logging out...")
      // Add logout logic here
      return
    }
    setActiveContent(content)
  }

  const openDeleteModal = (workspaceId?: number) => {
    // If a specific workspaceId is provided, use it
    // Otherwise, use the current workspace ID from the URL
    const idToDelete = workspaceId || currentWorkspaceId
    console.log("Opening delete modal for workspace ID:", idToDelete)

    setCurrentWorkspaceId(idToDelete)
    setIsDeleteModalOpen(true)
    setStatusMessage(null)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const openStreakModal = () => {
    setIsStreakModalOpen(true)
  }

  const closeStreakModal = () => {
    setIsStreakModalOpen(false)
  }

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const openInviteModal = () => {
    setIsInviteModalOpen(true)
  }

  const closeInviteModal = () => {
    setIsInviteModalOpen(false)
  }

  const handleInviteFriend = (email: string) => {
    console.log("Inviting friend with email:", email)
    // logic to invite friend
    closeInviteModal()
  }

  const handleDeleteWorkspace = async (workspaceId: number) => {
    console.log("Starting delete operation for workspace ID:", workspaceId)
    setIsDeleting(true)

    try {
      console.log("Making DELETE request to:", `https://kelarin.bccdev.id/api/workspace/${workspaceId}`)

      // Get the authentication token using your existing method
      const token = getAuthToken()

      if (!token) {
        console.error("No authentication token found")
        setStatusMessage({
          type: "error",
          message: "Authentication failed. Please log in again.",
        })
        setIsDeleting(false)
        return
      }

      const response = await fetch(`https://kelarin.bccdev.id/api/workspace/${workspaceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the authentication token
        },
      })

      console.log("Delete API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API error response:", errorText)

        // Handle specific error cases
        if (response.status === 401) {
          setStatusMessage({
            type: "error",
            message: "Your session has expired. Please log in again.",
          })

          // Optionally redirect to login page
          // setTimeout(() => {
          //   router.push("/login")
          // }, 2000)
        } else {
          throw new Error(`Failed to delete workspace: ${response.status} - ${errorText}`)
        }
        return
      }

      // Handle successful deletion
      console.log("Workspace deleted successfully")
      setStatusMessage({ type: "success", message: "Workspace deleted successfully" })

      // Remove from localStorage if you're using it
      const savedWorkspaces = localStorage.getItem("workspaces")
      if (savedWorkspaces) {
        try {
          const parsedWorkspaces = JSON.parse(savedWorkspaces)
          const updatedWorkspaces = parsedWorkspaces.filter((w: any) => w.id !== workspaceId)
          localStorage.setItem("workspaces", JSON.stringify(updatedWorkspaces))
          console.log("Updated localStorage after deletion")
        } catch (error) {
          console.error("Error updating localStorage:", error)
        }
      }

      // Close the modal after a short delay to show the success message
      setTimeout(() => {
        closeDeleteModal()
        // Navigate back to the dashboard
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      console.error("Error deleting workspace:", error)
      setStatusMessage({ type: "error", message: "Failed to delete workspace. Please try again." })
    } finally {
      setIsDeleting(false)
    }
  }

  let contentToRender
  switch (activeContent) {
    case "workspace":
      contentToRender = <Workspace params={{ id: currentPageId || "1" }} onDeleteWorkspace={openDeleteModal} />
      break
    case "chat":
      contentToRender = <Chat />
      break
    case "call":
      contentToRender = <div>Halaman Panggilan akan datang!</div> // Placeholder
      break
    default:
      contentToRender = <Workspace params={{ id: currentPageId || "1" }} onDeleteWorkspace={openDeleteModal} />
      break
  }

  return (
    <>
      <Header OpenInviteModal={openInviteModal} OpenStreakModal={openStreakModal} />
      <div className="flex h-screen font-sans">
        <WorkspaceSidebar onNavigate={handleNavigation} OpenDeleteModal={openDeleteModal} />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 pt-20 px-5">{contentToRender}</div>
        </div>

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          workspaceId={currentWorkspaceId}
          onDelete={handleDeleteWorkspace}
          isDeleting={isDeleting}
        />

        <InviteModal isOpen={isInviteModalOpen} onClose={closeInviteModal} onInvite={handleInviteFriend} />

        <StreakModal isOpen={isStreakModalOpen} onClose={closeStreakModal} onCreate={(name: string) => console.log()} />
      </div>

      {/* Status message display */}
      {statusMessage && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
            statusMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {statusMessage.message}
        </div>
      )}
    </>
  )
}

export default DashboardPage
