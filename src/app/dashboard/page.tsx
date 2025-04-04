"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/app/dashboard/partials/sidebar"
import MainContent from "@/app/dashboard/partials/maincontent"

interface Workspace {
  id: number
  name: string
}

const HomePage = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  // Load workspaces from localStorage on initial render
  useEffect(() => {
    const savedWorkspaces = localStorage.getItem("workspaces")
    if (savedWorkspaces) {
      try {
        setWorkspaces(JSON.parse(savedWorkspaces))
      } catch (error) {
        console.error("Error parsing workspaces from localStorage:", error)
        // If there's an error parsing, initialize with default workspaces
        initializeDefaultWorkspaces()
      }
    } else {
      // If no workspaces in localStorage, initialize with defaults
      initializeDefaultWorkspaces()
    }
  }, [])

  // Initialize with default workspaces
  const initializeDefaultWorkspaces = () => {
    const defaultWorkspaces = [
      { id: 1, name: "BCC Nekad" },
    ]
    setWorkspaces(defaultWorkspaces)
    localStorage.setItem("workspaces", JSON.stringify(defaultWorkspaces))
  }

  // Save workspaces to localStorage whenever they change
  useEffect(() => {
    if (workspaces.length > 0) {
      localStorage.setItem("workspaces", JSON.stringify(workspaces))
    }
  }, [workspaces])

  const handleCreateWorkspace = (name: string) => {
    // Find the highest ID to ensure new IDs are unique
    const maxId = workspaces.reduce((max, workspace) => (workspace.id > max ? workspace.id : max), 0)

    const newWorkspace = {
      id: maxId + 1,
      name: name,
    }

    const updatedWorkspaces = [...workspaces, newWorkspace]
    setWorkspaces(updatedWorkspaces)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar onCreate={handleCreateWorkspace} />
      <MainContent workspaces={workspaces} />
    </div>
  )
}

export default HomePage

