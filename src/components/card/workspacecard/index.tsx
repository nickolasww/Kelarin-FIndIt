"use client"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import type { Workspace } from "@/services/workspace"

interface WorkspaceCardProps {
  workspace: Workspace
  onDelete: (workspaceId: number) => void
}

export default function WorkspaceCard({ workspace, onDelete }: WorkspaceCardProps) {
  const router = useRouter()
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [isDeleting, setIsDeleting] = useState(false)
  const contextMenuRef = useRef<HTMLDivElement>(null)

  // Ensure we're using the title from the workspace object
  const workspaceName = workspace.title || workspace.name || "Unnamed Workspace"

  // Log the workspace data to help with debugging
  useEffect(() => {
    console.log("WorkspaceCard rendering with data:", workspace)
  }, [workspace])

  // Get the first character for the avatar, or use "U" as fallback
  const firstChar = workspaceName.charAt(0) || "U"

  // Handle regular click to navigate to workspace
  const handleClick = () => {
    if (!isDeleting) {
      // Save the workspace data to localStorage before navigation
      // This ensures the workspace detail page can find it even if API calls fail
      const savedWorkspaces = localStorage.getItem("workspaces")
      let workspaces = []

      if (savedWorkspaces) {
        try {
          workspaces = JSON.parse(savedWorkspaces)
          // Check if workspace already exists in localStorage
          const existingIndex = workspaces.findIndex((w: any) => w.id === workspace.id)
          if (existingIndex >= 0) {
            // Update existing workspace
            workspaces[existingIndex] = workspace
          } else {
            // Add new workspace
            workspaces.push(workspace)
          }
        } catch (error) {
          console.error("Error parsing workspaces from localStorage:", error)
          workspaces = [workspace]
        }
      } else {
        workspaces = [workspace]
      }

      // Save updated workspaces to localStorage
      localStorage.setItem("workspaces", JSON.stringify(workspaces))
      console.log("Saved workspace to localStorage before navigation:", workspace)

      // Navigate to the workspace detail page
      router.push(`/dashboard/${workspace.id}`)
    }
  }

  return (
    <div
      className="relative rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="h-12 bg-gradient-to-b from-gray-700 to-gray-900"></div>
      <div className="bg-gray-200 rounded-md p-4 relative pb-10">
        <div className="absolute -top-6 bg-teal-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
          <span className="text-xl font-semibold text-white uppercase">{firstChar}</span>
        </div>
        <p className="text-lg font-bold mt-2">{workspaceName}</p>
      </div>
    </div>
  )
}
