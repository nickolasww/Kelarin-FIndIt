"use client"

import { useState, useEffect, useCallback } from "react"
import Sidebar from "@/app/dashboard/partials/sidebar"
import MainContent from "@/app/dashboard/partials/maincontent"
import { getWorkspaces, type Workspace } from "@/services/workspace"

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch workspaces on component mount
  const fetchWorkspaces = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getWorkspaces()
      console.log("Fetched workspaces in dashboard:", data)

      // Process the workspaces to ensure they have all required fields
      const processedWorkspaces = Array.isArray(data)
        ? data.map((workspace) => ({
            ...workspace,
            // Ensure each workspace has an ID (use a random one if missing)
            id: workspace.id || Math.floor(Math.random() * 100000),
            // Ensure name and title are set
            name: workspace.title || workspace.name || "Unnamed Workspace",
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

    // Make sure both title and name are properly set from the input
    // This is the key fix to ensure the workspace name displays correctly
    const processedWorkspace = {
      ...newWorkspace,
      id: newWorkspace.id || Math.floor(Math.random() * 100000),
      // Ensure we're using the actual title/name from the created workspace
      name: newWorkspace.title || newWorkspace.name || "Unnamed Workspace",
      title: newWorkspace.title || newWorkspace.name || "Unnamed Workspace",
    }

    console.log("Processed new workspace:", processedWorkspace)

    // Update the workspaces state with the new workspace
    setWorkspaces((prevWorkspaces) => {
      // Ensure prevWorkspaces is an array
      const workspaceArray = Array.isArray(prevWorkspaces) ? prevWorkspaces : []
      // Add the new workspace to the array
      return [...workspaceArray, processedWorkspace]
    })
  }

  const handleWorkspaceDeleted = (workspaceId: number) => {
    console.log("Deleting workspace with ID:", workspaceId)

    // Remove the workspace from state
    setWorkspaces((prevWorkspaces) => prevWorkspaces.filter((workspace) => workspace.id !== workspaceId))
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
          <MainContent workspaces={workspaces} onWorkspaceDeleted={handleWorkspaceDeleted} />
        )}
      </div>
    </div>
  )
}
