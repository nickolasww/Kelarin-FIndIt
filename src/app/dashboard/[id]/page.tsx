"use client"

import type React from "react"
import { useState, useEffect } from "react"
import WorkspaceSidebar from "@/app/dashboard/partials/workspaceside"
import TaskColumn from "@/components/column/taskcolum"
import { useRouter } from "next/navigation"
import NotFound from "@/app/NotFound/page"

interface WorkspaceDetailPageProps {
  params: {
    id: string
  }
}

interface Workspace {
  id: number
  name: string
}

interface Task {
  id: string
  title: string
  tag: string
  tagColor: string
  commentCount: number
  attachmentCount: number
  status: "todo" | "done" | "progress" | "review"
}

const WorkspaceDetailPage: React.FC<WorkspaceDetailPageProps> = ({ params }) => {
  const router = useRouter()
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [tasks, setTasks] = useState<{
    todo: Task[]
    done: Task[]
    progress: Task[]
    review: Task[]
  }>({
    todo: [],
    done: [],
    progress: [],
    review: [],
  })

  // Load workspace from localStorage
  useEffect(() => {
    const savedWorkspaces = localStorage.getItem("workspaces")
    if (savedWorkspaces) {
      try {
        const parsedWorkspaces: Workspace[] = JSON.parse(savedWorkspaces)
        const foundWorkspace = parsedWorkspaces.find((w) => w.id === Number.parseInt(params.id))

        if (foundWorkspace) {
          setWorkspace(foundWorkspace)
        } else {
          // Workspace not found, redirect to home
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error parsing workspaces from localStorage:", error)
        router.push("/NotFound")
      }
    } else {
      // No workspaces in localStorage, redirect to home
      router.push("/dashboard")
    }

    // Load tasks for this workspace
    loadTasks()
  }, [params.id, router])

  // Load tasks from localStorage or initialize with defaults
  const loadTasks = () => {
    const savedTasks = localStorage.getItem(`tasks_${params.id}`)
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error)
        initializeDefaultTasks()
      }
    } else {
      initializeDefaultTasks()
    }
  }

  // Initialize with default tasks
  const initializeDefaultTasks = () => {
    const defaultTasks = {
      todo: [
        {
          id: "1",
          title: "Slicing Website 2.0",
          tag: "Front End",
          tagColor: "yellow",
          commentCount: 2,
          attachmentCount: 5,
          status: "todo" as const,
        },
        {
          id: "2",
          title: "Membuat Schema DB",
          tag: "Back End",
          tagColor: "green",
          commentCount: 1,
          attachmentCount: 9,
          status: "todo" as const,
        },
      ],
      done: [
        {
          id: "3",
          title: "Membuat Hi-Fi",
          tag: "Product Design",
          tagColor: "purple",
          commentCount: 5,
          attachmentCount: 10,
          status: "done" as const,
        },
      ],
      progress: [
        {
          id: "4",
          title: "Membuat PRD 2.0",
          tag: "Product Manager",
          tagColor: "blue",
          commentCount: 1,
          attachmentCount: 1,
          status: "progress" as const,
        },
        {
          id: "5",
          title: "Membuat Prototype",
          tag: "Product Design",
          tagColor: "purple",
          commentCount: 3,
          attachmentCount: 5,
          status: "progress" as const,
        },
        {
          id: "6",
          title: "Install Linux",
          tag: "Back End",
          tagColor: "green",
          commentCount: 2,
          attachmentCount: 9,
          status: "progress" as const,
        },
      ],
      review: [
        {
          id: "7",
          title: "Membuat PRD 1.0",
          tag: "Product Manager",
          tagColor: "blue",
          commentCount: 7,
          attachmentCount: 18,
          status: "review" as const,
        },
        {
          id: "8",
          title: "Slicing 1.0",
          tag: "Front End",
          tagColor: "yellow",
          commentCount: 9,
          attachmentCount: 12,
          status: "review" as const,
        },
      ],
    }

    setTasks(defaultTasks)
    localStorage.setItem(`tasks_${params.id}`, JSON.stringify(defaultTasks))
  }

  // Handle adding a new task
  const handleAddTask = (newTask: Task) => {
    const updatedTasks = { ...tasks }
    updatedTasks[newTask.status] = [...tasks[newTask.status], newTask]
    setTasks(updatedTasks)
    localStorage.setItem(`tasks_${params.id}`, JSON.stringify(updatedTasks))
  }

  if (!workspace) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-purple-100">
      <WorkspaceSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white py-3 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">K</span>
            </div>
            <h1 className="text-xl font-bold">Kelarin</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Invite
            </button>

            <div className="flex items-center">
              <span role="img" aria-label="fire" className="text-2xl">
                🔥
              </span>
              <span className="font-bold ml-1">365 Days</span>
            </div>
          </div>
        </header>

        {/* Workspace Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{workspace.name}</h2>
                <p className="text-gray-600">Description</p>
              </div>

              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="flex space-x-4 overflow-x-auto pb-6">
            <TaskColumn
              title="To Do"
              count={tasks.todo.length}
              tasks={tasks.todo}
              color="bg-gray-400"
              onAddTask={handleAddTask}
            />

            <TaskColumn
              title="Done"
              count={tasks.done.length}
              tasks={tasks.done}
              color="bg-green-400"
              onAddTask={handleAddTask}
            />

            <TaskColumn
              title="On Progress"
              count={tasks.progress.length}
              tasks={tasks.progress}
              color="bg-yellow-400"
              onAddTask={handleAddTask}
            />

            <TaskColumn
              title="In Review"
              count={tasks.review.length}
              tasks={tasks.review}
              color="bg-blue-400"
              onAddTask={handleAddTask}
            />

            <button className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-purple-600 rounded-lg text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceDetailPage

