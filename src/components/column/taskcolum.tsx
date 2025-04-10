"use client"

import type React from "react"
import { useState } from "react"
import TaskCard from "@/components/card/taskcard/index"
import AddTaskModal from "@/components/modal/addtaskmodal/index"; // Import the modal component
import { Onest } from "next/font/google";

interface Task {
  id: string
  title: string
  tag: string
  tagColor: string
  commentCount: number
  attachmentCount: number
  status: "todo" | "done" | "progress" | "review"
  deskripsi?: string;
  attachments?: string[];
  comment?: string;
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
  const [modalOpen, setModalOpen] = useState(false);
  const [tempTaskData, setTempTaskData] = useState<{
    deskripsi: string;
    attachments: string[];
    comment: string;
  }>({ deskripsi: "", attachments: [], comment: "" });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveTask = (data: { deskripsi: string; attachments: string[]; comment: string }) => {
    setTempTaskData(data);
    if (onAddTask) {
      const status =
        title === "To Do" ? "todo" : title === "Done" ? "done" : title === "On Progress" ? "progress" : "review";

      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle || "New Task", // Use the title from the input or default to "New Task"
        tag: "New Task",
        tagColor: "blue",
        commentCount: 0,
        attachmentCount: 0,
        status: status as "todo" | "done" | "progress" | "review",
        deskripsi: data.deskripsi,
        attachments: data.attachments,
        comment: data.comment,
      };

      onAddTask(newTask);
      setNewTaskTitle("");
      setModalOpen(false);
    }
  };

  return (
    <div className="flex-1 min-w-[250px]">
      <div className="flex items-center mb-4">
        <div className={`w-4 h-4 rounded-full ${color} mr-2`}></div>
        <h2 className="font-medium">{title}</h2>
        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${color} text-white`}>{count}</span>
        <button className="ml-auto text-gray-500" >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="bg-white bg-opacity-30 p-3 rounded-lg">
        <button
          className="w-full py-2 mb-3 text-purple-600 border border-dashed border-purple-300 rounded-lg flex items-center justify-center"
          onClick={handleOpenModal}
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
          />
        ))}
      </div>
      <AddTaskModal
  isOpen={modalOpen}
  onClose={handleCloseModal}
  onSave={handleSaveTask}
  initialTitle={newTaskTitle}
  onRemove={() => {}}
  onUpdate={() => {}}
  initialDescription={tempTaskData.deskripsi}
  initialAttachments={tempTaskData.attachments}
  initialComment={tempTaskData.comment}
/>
    </div>
  );
};

export default TaskColumn;