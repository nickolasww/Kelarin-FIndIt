"use client"

import type React from "react"
import { useState } from "react"
import TaskCard from "@/components/card/taskcard/index"
import AddTaskModal from "@/components/modal/addtaskmodal/index"
import EditTaskModal from "@/components/modal/edittaskmodal/index"

interface Task {
  id: string
  title: string
  tag: string
  tagColor: string
  commentCount: number
  attachmentCount: number
  status: "todo" | "done" | "progress" | "review"
  deskripsi?: string
  attachments?: string[]
  comment?: string
}

interface TaskColumnProps {
  title: string
  count: number
  tasks: Task[]
  color: string
  onAddTask?: (task: Task) => void
  onUpdateTask?: (taskId: string, updatedTask: Partial<Task>) => void
  onRemoveTask?: (taskId: string) => void
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  count,
  tasks,
  color,
  onAddTask,
  onUpdateTask,
  onRemoveTask,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null)
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    deskripsi: "",
    attachments: [] as string[],
    comment: "",
  })

  // handle Open Modal
  const handleOpenCreateModal = () => {
    setNewTaskData({
      title: "",
      deskripsi: "",
      attachments: [],
      comment: "",
    })
    setCurrentTaskId(null)
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  // handle Open Edit Modal
  const handleOpenEditModal = (task: Task) => {
    setCurrentTaskId(task.id)
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

  //handle save
  const handleSaveTask = (data: {
    deskripsi: string
    attachments: string[]
    comment: string
  }) => {
    if (currentTaskId) {
      if (onUpdateTask) {
        onUpdateTask(currentTaskId, {
          deskripsi: data.deskripsi,
          attachments: data.attachments,
          comment: data.comment,
          attachmentCount: data.attachments.length,
          title: newTaskData.title, // Ensure title is updated
        })
      }
    } else {
      if (onAddTask) {
        const status =
          title === "To Do" ? "todo" : title === "Done" ? "done" : title === "On Progress" ? "progress" : "review"

        const newTask: Task = {
          id: Date.now().toString(),
          title: newTaskData.title || "New Task",
          tag: "Task",
          tagColor: "purple",
          commentCount: data.comment ? 1 : 0,
          attachmentCount: data.attachments.length,
          status: status as "todo" | "done" | "progress" | "review",
          deskripsi: data.deskripsi,
          attachments: data.attachments,
          comment: data.comment,
        }
        onAddTask(newTask)
      }
    }
    setModalOpen(false)
  }

  const handleTitleChange = (title: string) => {
    setNewTaskData((prev) => {
      if (prev.title !== title) {
        return { ...prev, title }
      }
      return prev
    })
  }

  // Updated to handle task removal with taskId parameter
  const handleRemoveTask = (taskId: string) => {
    if (taskId && onRemoveTask) {
      console.log("Removing task with ID:", taskId)

      // Call onRemoveTask to update the parent component's state
      onRemoveTask(taskId)

      // Close the appropriate modal
      if (editModalOpen) {
        setEditModalOpen(false)
      } else if (modalOpen) {
        setModalOpen(false)
      }
    }
  }

  // update Edit task
  const handleUpdateEditTask = (data: {
    title: string
    description: string
    attachments: string[]
    comment: string
  }) => {
    if (currentTaskId && onUpdateTask) {
      onUpdateTask(currentTaskId, {
        title: data.title,
        deskripsi: data.description,
        attachments: data.attachments,
        comment: data.comment,
        commentCount: data.comment ? 1 : 0,
        attachmentCount: data.attachments.length,
      })
    }
    setEditModalOpen(false)
  }

  // update comment
  const handleUpdateComment = (comment: string, attachments: string[]) => {
    if (currentTaskId && onUpdateTask) {
      onUpdateTask(currentTaskId, {
        comment,
        attachments,
        commentCount: comment ? 1 : 0,
        attachmentCount: attachments.length,
      })
    }
  }

  const handleUpdateTask = (comment: string, attachments: string[]) => {
    if (currentTaskId && onUpdateTask) {
      onUpdateTask(currentTaskId, {
        comment,
        attachments,
        commentCount: comment ? 1 : 0,
        attachmentCount: attachments.length,
      })
    }
  }

  return (
    <div className="flex-1 min-w-[250px]">
      <div className="flex items-center mb-4">
        <div className={`w-4 h-4 rounded-full ${color} mr-2`}></div>
        <h2 className="font-medium">{title}</h2>
        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${color} text-white`}>{count}</span>
        <button className="ml-auto text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
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
            onclick={() => {
              // Open modal for editing existing task
              setCurrentTaskId(task.id)
              setNewTaskData({
                title: task.title,
                deskripsi: task.deskripsi || "",
                attachments: task.attachments || [],
                comment: task.comment || "",
              })
              setEditModalOpen(true)
            }}
          />
        ))}
      </div>
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
        taskId={currentTaskId || ""} // Pass the current task ID to the modal
      />

      <EditTaskModal
        cardId={currentTaskId ? Number.parseInt(currentTaskId, 10) || 0 : 0}
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleUpdateEditTask}
        onRemove={(cardId) => handleRemoveTask(cardId.toString())}
        onUpdate={handleUpdateComment}
        initialTitle={newTaskData.title}
        initialDescription={newTaskData.deskripsi}
        initialAttachments={newTaskData.attachments}
        initialComment={newTaskData.comment}
      />
    </div>
  )
}

export default TaskColumn
