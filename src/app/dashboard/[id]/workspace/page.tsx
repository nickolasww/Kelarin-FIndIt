"use client"

import type React from "react"
import { useState, useEffect } from "react"
import TaskColumn from "@/components/column/taskcolum"
import { useRouter } from "next/navigation"
import Image from "next/image"
import EditIcon from "@/assets/icon/EditIcon.png"
import Notification from "@/assets/icon/Notification.png"
import TableModal from "@/components/modal/addtablemodal"
import NotificationModal from "@/components/modal/notificationmodal"
import AddTable from "@/components/column/addtable"
import { getAuthToken } from "@/services/validation"

interface WorkspaceDetailPageProps {
  params: {
    id: string
  }
  searchParams?: Record<string, string | string[] | undefined>
  onDeleteWorkspace?: (workspaceId: number) => void
}

interface Workspace {
  id: number
  name: string
  title?: string
  purpose?: string
  description?: string
}

interface Task {
  id: string
  title: string
  tag: string
  tagColor: string
  commentCount: number
  attachmentCount: number
  status: string
  deskripsi?: string
  attachments?: string[]
  comment?: string
}

interface AddTableData {
  name: string
  description: string
  inviteEmail: string
  usage: string | null
  image: File | null
}

const WorkspaceDetailPage: React.FC<WorkspaceDetailPageProps> = ({ params, onDeleteWorkspace }) => {
  const router = useRouter()
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [tasks, setTasks] = useState<Record<string, Task[]>>({
    todo: [],
    done: [],
    progress: [],
    review: [],
  })
  const [isTableModalOpen, setIsTableModalOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [links, setLinks] = useState([
    { title: "Link Meet", url: "clips.id/Meet_BCC-Nekad", selected: false },
    { title: "Link Dive", url: "clips.id/Nekad", selected: true },
  ])
  const [retryCount, setRetryCount] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const [customColumns, setCustomColumns] = useState<string[]>([])
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState("")

  const toggleHeader = () => {
    setIsHeaderExpanded(!isHeaderExpanded)
  }

  const toggleLinkSelection = (index: number) => {
    const updatedLinks = links.map((link, i) => ({
      ...link,
      selected: i === index,
    }))
    setLinks(updatedLinks)
  }

  const openTableModal = () => {
    setIsTableModalOpen(true)
  }
  const closeTableModal = () => {
    setIsTableModalOpen(false)
  }

  const openNotification = () => {
    setIsNotificationOpen(true)
  }
  const closeNotification = () => {
    setIsNotificationOpen(false)
  }

  const handleCreate = (formData: AddTableData) => {
    console.log("Data Workspace yang Dibuat:", formData)
    setIsTableModalOpen(false)
  }

  const openAddColumnModal = () => {
    setIsAddColumnModalOpen(true)
  }

  const closeAddColumnModal = () => {
    setIsAddColumnModalOpen(false)
    setNewColumnTitle("")
  }

  const handleAddColumn = (title: string) => {
    if (title.trim()) {
      const newColumns = [...customColumns, title]
      setCustomColumns(newColumns)

      // Create a column key for the new column
      const columnKey = title.toLowerCase().replace(/\s+/g, "_")

      // Update tasks state to include the new column
      const updatedTasks = { ...tasks }
      updatedTasks[columnKey] = []
      setTasks(updatedTasks)

      // Save to localStorage
      localStorage.setItem(`tasks_${params.id}`, JSON.stringify(updatedTasks))
      localStorage.setItem(`custom_columns_${params.id}`, JSON.stringify(newColumns))

      closeAddColumnModal()

      // Show success message
      setStatusMessage({
        type: "success",
        message: "Column added successfully",
      })

      // Clear message after 3 seconds
      setTimeout(() => {
        setStatusMessage(null)
      }, 3000)
    }
  }

  // Handle column deletion
  const handleDeleteColumn = (columnTitle: string) => {
    const columnKey = columnTitle.toLowerCase().replace(/\s+/g, "_")
    const updatedColumns = customColumns.filter((col) => col !== columnTitle)
    setCustomColumns(updatedColumns)
    const updatedTasks = { ...tasks }
    delete updatedTasks[columnKey]
    setTasks(updatedTasks)

    localStorage.setItem(`tasks_${params.id}`, JSON.stringify(updatedTasks))
    localStorage.setItem(`custom_columns_${params.id}`, JSON.stringify(updatedColumns))

    setStatusMessage({
      type: "success",
      message: `Column "${columnTitle}" deleted successfully`,
    })
    setTimeout(() => {
      setStatusMessage(null)
    }, 3000)
  }

  const fetchWorkspaceFromAPI = async (workspaceId: number) => {
    try {
      console.log("Fetching workspace from API:", workspaceId)
      setIsLoading(true)

      const token = getAuthToken()
      if (!token) {
        console.error("No authentication token found")
        setStatusMessage({
          type: "error",
          message: "Authentication failed. Please log in again.",
        })
        setIsLoading(false)
        return null
      }

      const response = await fetch(`https://kelarin.bccdev.id/api/workspace/${workspaceId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch workspace: ${response.status}`)
      }

      const data = await response.json()
      console.log("Workspace data from API:", data)

      const processedWorkspace = {
        ...data,
        name: data.title || data.name || "Unnamed Workspace",
        title: data.title || data.name || "Unnamed Workspace",
      }
      const savedWorkspaces = localStorage.getItem("workspaces")
      let workspaces: Workspace[] = []

      if (savedWorkspaces) {
        try {
          workspaces = JSON.parse(savedWorkspaces) as Workspace[]
          const existingIndex = workspaces.findIndex((w) => w.id === processedWorkspace.id)
          if (existingIndex >= 0) {
            workspaces[existingIndex] = processedWorkspace
          } else {
            workspaces.push(processedWorkspace)
          }
        } catch (error: unknown) {
          console.error("Error parsing workspaces from localStorage:", error)
          workspaces = [processedWorkspace]
        }
      } else {
        workspaces = [processedWorkspace]
      }

      localStorage.setItem("workspaces", JSON.stringify(workspaces))
      return processedWorkspace
    } catch (error: unknown) {
      console.error("Error fetching workspace from API:", error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const workspaceId = Number.parseInt(params.id, 10)

    if (isNaN(workspaceId)) {
      console.error("Invalid workspace ID:", params.id)
      setStatusMessage({ type: "error", message: "Invalid workspace ID" })
      return
    }

    const loadWorkspace = async () => {
      setIsLoading(true)

      const savedWorkspaces = localStorage.getItem("workspaces")
      let foundWorkspace = null

      if (savedWorkspaces) {
        try {
          const parsedWorkspaces = JSON.parse(savedWorkspaces) as Workspace[]
          foundWorkspace = parsedWorkspaces.find((w) => w.id === workspaceId)

          if (foundWorkspace) {
            console.log("Found workspace in localStorage:", foundWorkspace)

            foundWorkspace = {
              ...foundWorkspace,
              name: foundWorkspace.title || foundWorkspace.name || "Unnamed Workspace",
              title: foundWorkspace.title || foundWorkspace.name || "Unnamed Workspace",
            }

            setWorkspace(foundWorkspace)
            setIsInitialized(true)
          }
        } catch (error: unknown) {
          console.error("Error parsing workspaces from localStorage:", error)
        }
      }

      if (!foundWorkspace) {
        console.log("Workspace not found in localStorage, fetching from API")
        const apiWorkspace = await fetchWorkspaceFromAPI(workspaceId)

        if (apiWorkspace) {
          setWorkspace(apiWorkspace)
          setIsInitialized(true)
        } else if (retryCount < 3) {
          console.log(`Retry attempt ${retryCount + 1} for workspace ${workspaceId}`)
          setRetryCount(retryCount + 1)
          setTimeout(() => {
            loadWorkspace()
          }, 1000)
        } else {
          console.log("Workspace not found after retries, redirecting to dashboard")
          setStatusMessage({
            type: "error",
            message: "Workspace not found. Redirecting to dashboard...",
          })

          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        }
      }

      loadTasks()
      setIsLoading(false)
    }

    loadWorkspace()
  }, [params.id, router, retryCount])

  const loadTasks = () => {
    const savedTasks = localStorage.getItem(`tasks_${params.id}`)
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (error: unknown) {
        console.error("Error parsing tasks from localStorage:", error)
        initializeEmptyTasks()
      }
    } else {
      initializeEmptyTasks()
    }

    const savedCustomColumns = localStorage.getItem(`custom_columns_${params.id}`)
    if (savedCustomColumns) {
      try {
        setCustomColumns(JSON.parse(savedCustomColumns))
      } catch (error: unknown) {
        console.error("Error parsing custom columns from localStorage:", error)
      }
    }
  }

  const initializeEmptyTasks = () => {
    const emptyTasks = {
      todo: [],
      done: [],
      progress: [],
      review: [],
    }

    setTasks(emptyTasks)
    localStorage.setItem(`tasks_${params.id}`, JSON.stringify(emptyTasks))
  }

  const handleAddTask = (newTask: Task) => {
    const updatedTasks = { ...tasks }

    if (!updatedTasks[newTask.status]) {
      updatedTasks[newTask.status] = []
    }

    updatedTasks[newTask.status] = [...updatedTasks[newTask.status], newTask]
    setTasks(updatedTasks)
    localStorage.setItem(`tasks_${params.id}`, JSON.stringify(updatedTasks))
  }

  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    console.log("Updating task with ID:", taskId, "with data:", updatedTask)

    const updatedTasks = { ...tasks }

    let statusKey: string | null = null
    for (const key in tasks) {
      if (Object.prototype.hasOwnProperty.call(tasks, key) && tasks[key].some((task) => task.id === taskId)) {
        statusKey = key
        break
      }
    }

    if (statusKey) {
      updatedTasks[statusKey] = updatedTasks[statusKey].map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task,
      )

      setTasks(updatedTasks)
      localStorage.setItem(`tasks_${params.id}`, JSON.stringify(updatedTasks))
    }
  }

  const handleRemoveTask = (taskId: string) => {
    console.log("Removing task with ID:", taskId)

    const updatedTasks = { ...tasks }

    for (const key in tasks) {
      if (updatedTasks[key].some((task) => task.id === taskId)) {
        updatedTasks[key] = updatedTasks[key].filter((task) => task.id !== taskId)
        break
      }
    }

    setTasks(updatedTasks)
    localStorage.setItem(`tasks_${params.id}`, JSON.stringify(updatedTasks))

    setStatusMessage({
      type: "success",
      message: "Task removed successfully",
    })

    setTimeout(() => {
      setStatusMessage(null)
    }, 3000)
  }

  // Fungsi untuk menghapus workspace
  const handleDeleteWorkspaceClick = () => {
    if (workspace && onDeleteWorkspace) {
      console.log("Requesting deletion of workspace ID:", workspace.id)
      onDeleteWorkspace(workspace.id)
    } else {
      console.error("Cannot delete workspace: workspace is null or onDeleteWorkspace is not provided")
    }
  }

  if (!isInitialized && isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading workspace...</div>
  }

  if (!workspace && !isLoading) {
    return <div className="flex justify-center items-center h-screen">Workspace not found</div>
  }

  return (
    <div className="flex h-screen bg-purple-100 rounded-t-lg">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Workspace Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm cursor-pointer" onClick={toggleHeader}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-purple-700">{workspace?.name || "Loading..."}</h2>
                <p className="text-gray-600">{workspace?.description || "Description"}</p>
              </div>

              <div className="flex gap-3">
                <div className="">
                  <Image
                    src={EditIcon || "/placeholder.svg"}
                    alt="editIcon"
                    className="cursor-pointer"
                    width={24}
                    height={24}
                    onClick={(e) => {
                      e.stopPropagation()
                      openTableModal()
                    }}
                  />
                </div>

                <div>
                  <Image
                    src={Notification || "/placeholder.svg"}
                    alt="kolaborasi"
                    className="cursor-pointer"
                    width={24}
                    height={24}
                    onClick={(e) => {
                      e.stopPropagation()
                      openNotification()
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isHeaderExpanded ? "max-h-96 opacity-100 border-gray-200" : "max-h-0 opacity-0 border-gray-200"
              }`}
            >
              <div className="mt-6 pt-4 border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-1/2 flex items-center">
                    <span className="text-purple-700 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-list"
                      >
                        <line x1="8" x2="21" y1="6" y2="6" />
                        <line x1="8" x2="17" y1="12" y2="12" />
                        <line x1="8" x2="21" y1="18" y2="18" />
                      </svg>
                    </span>
                    <span className="font-medium text-purple-700">Title</span>
                  </div>
                  <div className="w-1/2 flex items-center">
                    <span className="text-purple-700 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-link"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </span>
                    <span className="font-medium text-purple-700">URL</span>
                  </div>
                </div>

                {links.map((link, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <div className="w-1/2">
                      <span className="font-medium">{link.title}</span>
                    </div>
                    <div className="w-1/2 flex justify-between items-center">
                      <span className="text-purple-700">{link.url}</span>
                      <div
                        className={`w-5 h-5 rounded ${link.selected ? "bg-purple-700" : "border border-gray-300"}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLinkSelection(index)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex justify-between">
                  <button
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-red-600 rounded-md text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteWorkspaceClick()
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trash"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                    Delete Workspace
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-purple-600 rounded-md text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      openAddColumnModal()
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add Table
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-6">
            <TaskColumn
              title="To Do"
              count={tasks.todo?.length || 0}
              tasks={tasks.todo || []}
              color="bg-gray-400"
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onRemoveTask={handleRemoveTask}
              onDeleteColumn={handleDeleteColumn}
              isCustomColumn={false}
            />

            <TaskColumn
              title="Done"
              count={tasks.done?.length || 0}
              tasks={tasks.done || []}
              color="bg-green-400"
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onRemoveTask={handleRemoveTask}
              onDeleteColumn={handleDeleteColumn}
              isCustomColumn={false}
            />

            <TaskColumn
              title="On Progress"
              count={tasks.progress?.length || 0}
              tasks={tasks.progress || []}
              color="bg-yellow-400"
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onRemoveTask={handleRemoveTask}
              onDeleteColumn={handleDeleteColumn}
              isCustomColumn={false}
            />

            <TaskColumn
              title="In Review"
              count={tasks.review?.length || 0}
              tasks={tasks.review || []}
              color="bg-blue-400"
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onRemoveTask={handleRemoveTask}
              onDeleteColumn={handleDeleteColumn}
              isCustomColumn={false}
            />

            {/* Render custom columns */}
            {customColumns.map((columnTitle) => {
              const columnKey = columnTitle.toLowerCase().replace(/\s+/g, "_")
              return (
                <TaskColumn
                  key={columnKey}
                  title={columnTitle}
                  count={tasks[columnKey]?.length || 0}
                  tasks={tasks[columnKey] || []}
                  color="bg-purple-400"
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                  onRemoveTask={handleRemoveTask}
                  onDeleteColumn={handleDeleteColumn}
                  isCustomColumn={true}
                />
              )
            })}

            <button
              className="fixed bottom-0 right-0 m-10 flex-shrink-0 flex items-center justify-center gap-2 px-6 py-2 bg-purple-600 rounded-sm text-white"
              onClick={(e) => {
                e.stopPropagation()
                openAddColumnModal()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p>Add Table</p>
            </button>
          </div>
        </div>
      </div>

      <TableModal isOpen={isTableModalOpen} onClose={closeTableModal} onSubmit={handleCreate} />
      <NotificationModal isOpen={isNotificationOpen} onClose={closeNotification} />
      <AddTable
        isOpen={isAddColumnModalOpen}
        onClose={closeAddColumnModal}
        onSubmit={handleAddColumn}
        columnTitle={newColumnTitle}
        setColumnTitle={setNewColumnTitle}
      />

      {statusMessage && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
            statusMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {statusMessage.message}
        </div>
      )}
    </div>
  )
}

export default function Page({ params, onDeleteWorkspace }: WorkspaceDetailPageProps) {
  return <WorkspaceDetailPage params={params} onDeleteWorkspace={onDeleteWorkspace} />
}
