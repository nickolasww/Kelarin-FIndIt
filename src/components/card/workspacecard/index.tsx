"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Trash2 } from "lucide-react"
import type { Workspace } from "@/services/workspace"
import { deleteWorkspace } from "@/services/workspace"

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

  // Use title as primary, fallback to name, or use "Unnamed Workspace" if both are missing
  const workspaceName = workspace.title || workspace.name || "Unnamed Workspace"

  // Get the first character for the avatar, or use "U" as fallback
  const firstChar = workspaceName.charAt(0) || "U"

  // Handle regular click to navigate to workspace
  const handleClick = () => {
    if (!isDeleting) {
      router.push(`/dashboard/${workspace.id}`)
    }
  }

  // Handle right click to show context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
    setShowContextMenu(true)
  }

  // Handle delete action
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDeleting(true)

    try {
      await deleteWorkspace(workspace.id)
      setShowContextMenu(false)
      onDelete(workspace.id)
    } catch (error) {
      console.error("Failed to delete workspace:", error)
      alert("Failed to delete workspace. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setShowContextMenu(false)
      }
    }

    if (showContextMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showContextMenu])

  return (
    <div
      className="relative rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="h-12 bg-gradient-to-b from-gray-700 to-gray-900"></div>
      <div className="bg-gray-200 rounded-md p-4 relative pb-10">
        <div className="absolute -top-6 bg-teal-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
          <span className="text-xl font-semibold text-white uppercase">{firstChar}</span>
        </div>
        <p className="text-lg font-bold mt-2">{workspaceName}</p>
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed bg-purple-700 rounded-md shadow-lg z-50 py-1 min-w-[150px]"
          style={{
            top: `${contextMenuPosition.y}px`,
            left: `${contextMenuPosition.x}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
            className="w-full text-left px-4 py-2 text-white flex items-center gap-2"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            {isDeleting ? "Deleting..." : "Delete Workspace"}
          </button>
        </div>
      )}
    </div>
  )
}
