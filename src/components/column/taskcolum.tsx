"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import TaskCard from "@/components/card/taskcard/index"
import AddTaskModal from "@/components/modal/addtaskmodal"
import { MoreVertical, Trash2 } from "lucide-react"

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

interface TaskColumnProps {
  title: string
  count: number
  tasks: Task[]
  color: string
  onAddTask: (task: Task) => void
  onUpdateTask: (taskId: string, updatedTask: Partial<Task>) => void
  onRemoveTask: (taskId: string) => void
  onDeleteColumn?: (columnTitle: string) => void
  isCustomColumn?: boolean
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  count,
  tasks,
  color,
  onAddTask,
  onUpdateTask,
  onRemoveTask,
  onDeleteColumn,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    deskripsi: "",
    attachments: [] as string[],
    comment: "",
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen])

  const handleOpenCreateModal = () => {
    setCurrentTaskId(null)
    setCurrentTask(null)
    setNewTaskData({
      title: "",
      deskripsi: "",
      attachments: [],
      comment: "",
    })
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleOpenEditModal = (task: Task) => {
    setCurrentTaskId(task.id)
    setCurrentTask(task)
    setNewTaskData({
      title: task.title,
      deskripsi: task.deskripsi || "",
      attachments: task.attachments || [],
      comment: task.comment || "",
    })
    setEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setEditModalOpen(false)
  }

  const handleTitleChange = (title: string) => {
    setNewTaskData((prev) => ({ ...prev, title }))
  }

  const handleSaveTask = (data: {
    deskripsi: string
    attachments: string[]
    comment: string
  }) => {
    if (currentTaskId && currentTask) {
      onUpdateTask(currentTaskId, {
        title: newTaskData.title,
        deskripsi: data.deskripsi,
        attachments: data.attachments,
        comment: data.comment,
        attachmentCount: data.attachments.length,
        commentCount: data.comment ? 1 : 0,
      })
    } else {
      const statusKey =
        title === "To Do"
          ? "todo"
          : title === "Done"
            ? "done"
            : title === "On Progress"
              ? "progress"
              : title === "In Review"
                ? "review"
                : title.toLowerCase().replace(/\s+/g, "_")

      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskData.title || "New Task",
        tag: "Task",
        tagColor: "purple",
        commentCount: data.comment ? 1 : 0,
        attachmentCount: data.attachments.length,
        status: statusKey,
        deskripsi: data.deskripsi,
        attachments: data.attachments,
        comment: data.comment,
      }
      onAddTask(newTask)
    }
    setModalOpen(false)
    setEditModalOpen(false)
  }

  const handleRemoveTask = (taskId: string) => {
    if (taskId) {
      console.log("Removing task with ID:", taskId)
      onRemoveTask(taskId)
      setModalOpen(false)
      setEditModalOpen(false)
    }
  }

  const handleUpdateTask = (comment: string, attachments: string[]) => {
    if (currentTaskId) {
      onUpdateTask(currentTaskId, {
        comment,
        attachments,
        commentCount: comment ? 1 : 0,
        attachmentCount: attachments.length,
      })
    }
  }

  const handleDeleteColumn = () => {
    const isDefaultColumn = ["To Do", "Done", "On Progress", "In Review"].includes(title)

    let confirmMessage = `Are you sure you want to delete the "${title}" column? All tasks in this column will be deleted.`

    if (isDefaultColumn) {
      confirmMessage = `Warning: "${title}" is a default column. Deleting it may affect the application's functionality. Are you sure you want to proceed?`
    }

    if (window.confirm(confirmMessage)) {
      if (onDeleteColumn) {
        onDeleteColumn(title)
      }
      setMenuOpen(false)
    }
  }

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="flex-1 min-w-[250px]">
      <div className="flex items-center mb-4">
        <div className={`w-4 h-4 rounded-full ${color} mr-2`}></div>
        <h2 className="font-medium">{title}</h2>
        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${color} text-white`}>{count}</span>
        <div className="ml-auto relative" ref={menuRef}>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen(!menuOpen)
            }}
            aria-label="Column options"
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200"
              onClick={handleMenuClick}
            >
              <button
                onClick={handleDeleteColumn}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Column
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white bg-opacity-30 p-3 rounded-lg">
        <button
          className="w-full py-2 mb-3 text-purple-600 border border-dashed border-purple-300 rounded-lg flex items-center justify-center"
          onClick={handleOpenCreateModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Task
        </button>

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            tag={task.tag}
            tagColor={task.tagColor}
            commentCount={task.commentCount}
            attachmentCount={task.attachmentCount}
            status={task.status}
            onclick={() => handleOpenEditModal(task)}
          />
        ))}
      </div>

      {/* Task creation modal */}
      <AddTaskModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        onRemove={handleRemoveTask}
        onUpdate={handleUpdateTask}
        initialTitle={newTaskData.title}
        initialDescription={newTaskData.deskripsi}
        initialAttachments={newTaskData.attachments}
        initialComment={newTaskData.comment}
        onTitleChange={handleTitleChange}
        taskId={currentTaskId || ""}
      />

      {/* Task editing modal */}
      {currentTask && (
        <AddTaskModal
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveTask}
          onRemove={handleRemoveTask}
          onUpdate={handleUpdateTask}
          taskId={currentTaskId || ""}
          initialTitle={currentTask.title}
          initialDescription={currentTask.deskripsi || ""}
          initialAttachments={currentTask.attachments || []}
          initialComment={currentTask.comment || ""}
          onTitleChange={handleTitleChange}
        />
      )}
    </div>
  )
}

export default TaskColumn