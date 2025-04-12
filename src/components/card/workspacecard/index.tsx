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