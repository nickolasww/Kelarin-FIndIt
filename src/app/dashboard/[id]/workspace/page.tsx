"use client"

import type React from "react"
import { useState, useEffect } from "react"
import TaskColumn from "@/components/column/taskcolum" // Fixed import path
import { useRouter } from "next/navigation"
import Image from "next/image"
import EditIcon from "@/assets/icon/EditIcon.png"
import Notification from "@/assets/icon/Notification.png"
import TaskModal from "@/components/modal/addtaskmodal"
import TableModal from "@/components/modal/addtablemodal"
import NotificationModal from "@/components/modal/notificationmodal"

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

interface AddTableData {
  name: string
  description: string
  inviteEmail: string
  usage: string | null
  image: File | null
}

interface LinkItem {
  title: string
  url: string
  selected: boolean
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
  const [isTableModalOpen, setIsTableModalOpen] = useState(false)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false)
  const [links, setLinks] = useState([
    { title: "Link Meet", url: "clips.id/Meet_BCC-Nekad", selected: false },
    { title: "Link Dive", url: "clips.id/Nekad", selected: true },
  ])

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

  const openTaskModal = () => {
    setIsTaskModalOpen(true)
  }
  const closeTaskModal = () => {
    setIsTaskModalOpen(false)
  }

  const OpenNotification = () => {
    setIsNotificationOpen(true)
  }
  const CloseNotification = () => {
    setIsNotificationOpen(false)
  }

  const handleCreate = (formData: AddTableData) => {
    console.log("Data Workspace yang Dibuat:", formData)
    // logic backend
    setIsTableModalOpen(false)
  }
  const handleSaveTask = (taskData: {
    deskripsi: string
    attachments: string[]
    comment: string
  }) => {
    console.log("Task Data Saved:", taskData)
    closeTableModal()
  }

  useEffect(() => {
    const savedWorkspaces = localStorage.getItem("workspaces")
    if (savedWorkspaces) {
      try {
        const parsedWorkspaces: Workspace[] = JSON.parse(savedWorkspaces)
        const foundWorkspace = parsedWorkspaces.find((w) => w.id === Number.parseInt(params.id))

        if (foundWorkspace) {
          setWorkspace(foundWorkspace)
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error parsing workspaces from localStorage:", error)
        router.push("/NotFound")
      }
    } else {
      router.push("/dashboard")
    }

    loadTasks()
  }, [params.id, router])

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
    <div className="flex h-screen bg-purple-100 rounded-t-lg">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Workspace Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm cursor-pointer" onClick={toggleHeader}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-purple-700">{workspace.name}</h2>
                <p className="text-gray-600">Description</p>
              </div>

              <div className="flex gap-1">
                <div className="">
                  <Image
                    src={EditIcon}
                    alt="editIcon"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      openTaskModal()
                    }}
                  />
                </div>

                <div>
                  <Image
                    src={Notification}
                    alt="kolaborasi"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      OpenNotification()
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isHeaderExpanded
                  ? "max-h-96 opacity-100 border-gray-200"
                  : "max-h-0 opacity-0 border-gray-200"
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

                <div className="mt-6 flex justify-end">
                  <button
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-purple-600 rounded-md text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Add table logic here
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

            <button className="fixed bottom-0 right-0 m-10 flex-shrink-0 flex items-center justify-center gap-2 px-6 py-2 bg-purple-600 rounded-sm text-white">
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

      <TableModal
        isOpen={isTableModalOpen}
        onClose={closeTableModal}
        onSubmit={handleCreate}
      />
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        onSave={handleSaveTask}
        onRemove={() => {}}
        onUpdate={() => {}}
      />
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={CloseNotification}
        
      />

    </div>
  )
}

export default WorkspaceDetailPage
