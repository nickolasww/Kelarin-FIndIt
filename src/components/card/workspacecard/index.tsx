"use client"
import { useRouter } from "next/navigation"
import type { Workspace } from "@/services/workspace"

interface WorkspaceCardProps {
  workspace: Workspace
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter()

  const workspaceName = workspace.title || workspace.name || "Unnamed Workspace"
  const firstChar = workspaceName.charAt(0) || "U"

  const handleClick = () => {
    router.push(`/dashboard/${workspace.id}`)
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
