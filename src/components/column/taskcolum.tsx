"use client"

import type React from "react"
import { useState } from "react"
import TaskCard from "@/components/card/taskcard/index"

interface Task {
  id: string
  title: string
  tag: string
  tagColor: string
  commentCount: number
  attachmentCount: number
  status: "todo" | "done" | "progress" | "review"
}

interface TaskColumnProps {
  title: string
  count: number
  tasks: Task[]
  color: string
  onAddTask?: (task: Task) => void
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, count, tasks, color, onAddTask }) => {
  const [isCreating, setIsCreating] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return

    if (onAddTask) {
      const status =
        title === "To Do" ? "todo" : title === "Done" ? "done" : title === "On Progress" ? "progress" : "review"

      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        tag: "New Task",
        tagColor: "blue",
        commentCount: 0,
        attachmentCount: 0,
        status: status as "todo" | "done" | "progress" | "review",
      }

      onAddTask(newTask)
      setNewTaskTitle("")
      setIsCreating(false)
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
        {isCreating ? (
          <div className="mb-3 bg-white p-3 rounded-lg shadow-sm">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded" onClick={handleCreateTask}>
                Add
              </button>
            </div>
          </div>
        ) : (
          <button
            className="w-full py-2 mb-3 text-purple-600 border border-dashed border-purple-300 rounded-lg flex items-center justify-center"
            onClick={() => setIsCreating(true)}
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
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            tag={task.tag}
            tagColor={task.tagColor}
            commentCount={task.commentCount}
            attachmentCount={task.attachmentCount}
            status={task.status}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskColumn

