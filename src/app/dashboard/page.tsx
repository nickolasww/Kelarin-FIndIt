"use client"

import { useState, useEffect, useCallback } from "react"
import Sidebar from "@/app/dashboard/partials/sidebar"
import MainContent from "@/app/dashboard/partials/maincontent"
import { getWorkspaces, type Workspace } from "@/services/workspace"

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkspaces = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getWorkspaces()
      const processedWorkspaces = Array.isArray(data)
        ? data.map((workspace) => ({
            ...workspace,
            id: workspace.id || Math.floor(Math.random() * 100000),
            title: workspace.title || workspace.name || "Unnamed Workspace",
          }))
        : []

      console.log("Processed workspaces in dashboard:", processedWorkspaces)
      setWorkspaces(processedWorkspaces)
    } catch (err) {
      console.error("Error fetching workspaces:", err)
      setError("Failed to load workspaces")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWorkspaces()
  }, [fetchWorkspaces])

  const handleWorkspaceCreated = (newWorkspace: Workspace) => {
    console.log("New workspace created:", newWorkspace)

    const processedWorkspace = {
      ...newWorkspace,
      id: newWorkspace.id || Math.floor(Math.random() * 100000),
      title: newWorkspace.title || newWorkspace.name || "Unnamed Workspace",
    }

    console.log("Processed new workspace:", processedWorkspace)

    setWorkspaces((prevWorkspaces) => {
      const workspaceArray = Array.isArray(prevWorkspaces) ? prevWorkspaces : []
      return [...workspaceArray, processedWorkspace]
    })
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
      <Sidebar workspaces={workspaces} onWorkspaceCreated={handleWorkspaceCreated} />

      <div className="flex-1 relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p>Loading workspaces...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <MainContent workspaces={workspaces} />
        )}
      </div>
    </div>
  )
}
