"use client"

import { useState, useEffect } from "react"
import WorkspaceSidebar from "@/app/dashboard/partials/workspaceside"
import Chat from "@/app/dashboard/[id]/chat/page"
import InviteModal from "@/components/modal/invitemodal"
import WorkspaceDetailPage from "@/app/dashboard/[id]/workspace/page"
import DeleteModal from "@/components/modal/deletemodal"
import Header from "@/app/dashboard/partials/header"
import StreakModal from "@/components/modal/streakmodal"
import { useRouter, useParams } from "next/navigation"
import { getAuthToken, isAuthenticated } from "@/services/validation"
import Call from "@/app/dashboard/[id]/call/page"

interface WorkspaceData {
  id: number
  name?: string
}

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
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (currentPageId) {
      const numericId = Number.parseInt(currentPageId, 10)
      if (!isNaN(numericId)) {
        setCurrentWorkspaceId(numericId)
        console.log("Set current workspace ID from URL:", numericId)

        const savedWorkspaces = localStorage.getItem("workspaces")
        if (savedWorkspaces) {
          try {
            const parsedWorkspaces = JSON.parse(savedWorkspaces) as WorkspaceData[]
            const foundWorkspace = parsedWorkspaces.find((w: WorkspaceData) => w.id === numericId)

            if (!foundWorkspace) {
              console.log("Workspace not found in localStorage, checking if it's a new workspace")
              const tempWorkspace = sessionStorage.getItem(`temp_workspace_${numericId}`)
              if (tempWorkspace) {
                console.log("Found temporary workspace data in sessionStorage")
                try {
                  const parsedTempWorkspace = JSON.parse(tempWorkspace) as WorkspaceData
                  parsedWorkspaces.push(parsedTempWorkspace)
                  localStorage.setItem("workspaces", JSON.stringify(parsedWorkspaces))
                  sessionStorage.removeItem(`temp_workspace_${numericId}`)
                } catch (error: unknown) {
                  console.error("Error parsing temporary workspace data:", error)
                }
              }
            }
          } catch (error: unknown) {
            console.error("Error parsing workspaces from localStorage:", error)
          }
        }
      }
    }
    setIsInitialized(true)
  }, [currentPageId])

  useEffect(() => {
    if (!isAuthenticated()) {
      console.warn("User is not authenticated")
    }
  }, [])

  const handleNavigation = (content: "workspace" | "users" | "call" | "chat" | "settings" | "logout") => {
    if (content === "users") {
      console.warn(`Navigation to ${content} is not implemented.`)
      return
    }
    if (content === "logout") {
      console.log("Logging out...")
      return
    }
    setActiveContent(content)
  }

  const openDeleteModal = (workspaceId?: number) => {
    // Pastikan workspaceId valid, jika tidak gunakan currentWorkspaceId dari URL
    const idToDelete = workspaceId || (currentPageId ? Number.parseInt(currentPageId, 10) : undefined)

    if (!idToDelete || isNaN(idToDelete)) {
      console.error("Invalid workspace ID for deletion")
      setStatusMessage({
        type: "error",
        message: "Invalid workspace ID. Cannot delete workspace.",
      })
      return
    }

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
    closeInviteModal()
  }

  const handleDeleteWorkspace = async (workspaceId: number) => {
    if (!workspaceId || isNaN(workspaceId)) {
      console.error("Invalid workspace ID:", workspaceId)
      setStatusMessage({
        type: "error",
        message: "Invalid workspace ID. Cannot delete workspace.",
      })
      setIsDeleting(false)
      return
    }

    console.log("Starting delete operation for workspace ID:", workspaceId)
    setIsDeleting(true)

    try {
      const apiUrl = `https://kelarin.bccdev.id/api/workspace/${workspaceId}`
      console.log("Making DELETE request to:", apiUrl)

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

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Delete API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API error response:", errorText)

        if (response.status === 401) {
          setStatusMessage({
            type: "error",
            message: "Your session has expired. Please log in again.",
          })
        } else if (response.status === 404) {
          // Jika workspace tidak ditemukan di server, tetap hapus dari localStorage
          console.log("Workspace not found on server, removing from local storage")
          removeWorkspaceFromLocalStorage(workspaceId)
          setStatusMessage({
            type: "success",
            message: "Workspace removed from local storage",
          })

          setTimeout(() => {
            closeDeleteModal()
            router.push("/dashboard")
          }, 1500)
          return
        } else {
          throw new Error(`Failed to delete workspace: ${response.status} - ${errorText}`)
        }
        return
      }

      console.log("Workspace deleted successfully")
      setStatusMessage({ type: "success", message: "Workspace deleted successfully" })

      // Hapus workspace dari localStorage
      removeWorkspaceFromLocalStorage(workspaceId)

      setTimeout(() => {
        closeDeleteModal()
        router.push("/dashboard")
      }, 1500)
    } catch (error: unknown) {
      console.error("Error deleting workspace:", error)
      setStatusMessage({ type: "error", message: "Failed to delete workspace. Please try again." })
    } finally {
      setIsDeleting(false)
    }
  }

  // Fungsi untuk menghapus workspace dari localStorage
  const removeWorkspaceFromLocalStorage = (workspaceId: number) => {
    const savedWorkspaces = localStorage.getItem("workspaces")
    if (savedWorkspaces) {
      try {
        const parsedWorkspaces = JSON.parse(savedWorkspaces) as WorkspaceData[]
        const updatedWorkspaces = parsedWorkspaces.filter((w: WorkspaceData) => w.id !== workspaceId)
        localStorage.setItem("workspaces", JSON.stringify(updatedWorkspaces))
        console.log("Updated localStorage after deletion")
      } catch (error: unknown) {
        console.error("Error updating localStorage:", error)
      }
    }
  }

  if (!isInitialized) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  let contentToRender
  switch (activeContent) {
    case "workspace":
      contentToRender = (
        <WorkspaceDetailPage params={{ id: currentPageId || "1" }} onDeleteWorkspace={openDeleteModal} />
      )
      break
    case "chat":
      contentToRender = <Call />
      break
    case "call":
      contentToRender = <Chat />
      break
    default:
      contentToRender = (
        <WorkspaceDetailPage params={{ id: currentPageId || "1" }} onDeleteWorkspace={openDeleteModal} />
      )
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

        <StreakModal isOpen={isStreakModalOpen} onClose={closeStreakModal} />
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
