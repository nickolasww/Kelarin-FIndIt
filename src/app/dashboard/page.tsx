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

  useEffect(() => {
    const savedWorkspaces = localStorage.getItem("workspaces")
    if (savedWorkspaces) {
      try {
        setWorkspaces(JSON.parse(savedWorkspaces))
      } catch (error) {
        console.error("Error parsing workspaces from localStorage:", error)
        initializeDefaultWorkspaces()
      }
    } else {
      initializeDefaultWorkspaces()
    }
  }, [])

  const initializeDefaultWorkspaces = () => {
    const defaultWorkspaces = [
      { id: 1, name: "BCC Nekad" },
    ]
    setWorkspaces(defaultWorkspaces)
    localStorage.setItem("workspaces", JSON.stringify(defaultWorkspaces))
  }

  useEffect(() => {
    if (workspaces.length > 0) {
      localStorage.setItem("workspaces", JSON.stringify(workspaces))
    }
  }, [workspaces])

  const handleCreateWorkspace = (name: string) => {
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

