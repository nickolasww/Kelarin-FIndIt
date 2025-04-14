"use client"
import type React from "react"
import { useState, useRef } from "react"
import { useEffect } from "react"

interface TaskModalProps {
  onClose: () => void
  onUpdate: (comment: string, attachments: string[]) => void
  onRemove: (taskId: string) => void
  initialTitle?: string
  initialDescription?: string
  initialAttachments?: string[]
  initialComment?: string
  isOpen: boolean
  onSave: (data: {
    deskripsi: string
    attachments: string[]
    comment: string
  }) => void
  onTitleChange?: (title: string) => void
  taskId?: string
}

const AddTaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  onRemove,
  onSave,
  initialTitle = "",
  initialDescription = "",
  initialAttachments = [],
  initialComment = "",
  onTitleChange,
  taskId,
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [deskripsi, setDeskripsi] = useState(initialDescription || "")
  const [attachmentInput, setAttachmentInput] = useState("")
  const [attachments, setAttachments] = useState<string[]>(initialAttachments || [])
  const [comment, setComment] = useState(initialComment || "")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<string | null>(null)

  // Use a ref to track if this is the initial render
  const initialRender = useRef(true)
  // Use a ref to track if title was changed by user vs. prop change
  const userChangedTitle = useRef(false)

  useEffect(() => {
    setIsModalOpen(isOpen)
    if (isOpen) {
      // Initialize fields with props when modal opens
      setTitle(initialTitle || "")
      setDeskripsi(initialDescription || "")
      setAttachments(initialAttachments || [])
      setComment(initialComment || "")
      setIsError(null)
      // Reset the user changed flag when modal opens
      userChangedTitle.current = false
    }
  }, [isOpen, initialTitle, initialDescription, initialAttachments, initialComment])

  // Only notify parent of title changes when user explicitly changes the title
  // and not on initial render or when props change
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (userChangedTitle.current && onTitleChange) {
      onTitleChange(title)
    }
  }, [title, onTitleChange])

  // Handle title change from input
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    userChangedTitle.current = true
    setTitle(newTitle)
  }

  const handleAddAttachment = () => {
    if (!attachmentInput.trim()) return

    setIsLoading(true)
    setIsError(null)

    try {
      // Skip the API call that's causing the 500 error
      // Instead, directly add the attachment to the local state
      setAttachments((prevAttachments) => [...prevAttachments, attachmentInput.trim()])
      setAttachmentInput("")
      console.log("Attachment added successfully:", attachmentInput.trim())
    } catch (error: any) {
      setIsError(error.message || "Failed to add attachment")
      console.error("Error adding attachment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle save button click
  const handleSave = () => {
    try {
      setIsLoading(true)
      onSave({
        deskripsi,
        attachments,
        comment,
      })
      onClose()
    } catch (error: any) {
      setIsError(error instanceof Error ? error.message : "Failed to save changes")
      console.error("Error saving changes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle remove task
  const handleRemoveTask = () => {
    if (taskId) {
      console.log("Removing task with ID:", taskId)
      onRemove(taskId)
      onClose()
    } else {
      console.error("Cannot remove task: No taskId provided")
      setIsError("Cannot remove task: No task ID provided")
    }
  }

  // Handle remove attachment
  const handleRemoveAttachment = (index: number) => {
    setAttachments((prevAttachments) => prevAttachments.filter((_, i) => i !== index))
  }

  // Handle post comment
  const handlePostComment = async () => {
    if (!comment.trim()) return

    try {
      onUpdate(comment, attachments)
      setComment("")
    } catch (error: any) {
      setIsError(error instanceof Error ? error.message : "Failed to post comment")
      console.error("Error posting comment:", error)
    }
  }

  return isModalOpen ? (
    <div className="fixed z-50 inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="text-xl font-semibold text-gray-800 focus:outline-none border-b border-black w-56"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter task title"
          />
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea
            className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none h-24"
            placeholder="Enter task description"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>

        {/* Attachment */}
        <div className="mb-4">
          <label htmlFor="attachment" className="block text-sm font-medium text-black mb-3">
            Attachment
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="attachment"
              placeholder="paste link or file here"
              value={attachmentInput}
              onChange={(e) => setAttachmentInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-sm text-sm text-gray-700 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleAddAttachment}
              className={`ml-7 bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none w-30 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={isLoading || !attachmentInput.trim()}
            >
              {isLoading ? "Adding..." : "+ Add"}
            </button>
          </div>
          {isError && <p className="mt-2 text-red-500 text-sm">{isError}</p>}
          {attachments.length > 0 && (
            <div className="mt-3 mb-6 flex flex-wrap gap-2">
              {attachments.map((link, index) => (
                <div
                  key={index}
                  className="inline-flex items-center border-[1px] border-gray-700 text-black font-semibold rounded-sm py-2 px-5"
                >
                  <span>{`Link ${index + 1}`}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="ml-4 mt-1 text-black focus:outline-none"
                    disabled={isLoading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-black mb-2">
            Comment
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="comment"
              className="w-full p-2 border border-gray-300 rounded-sm text-sm text-gray-700 focus:outline-none"
              placeholder="type your comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handlePostComment}
              className={`ml-7 bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none w-30 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={isLoading || !comment.trim()}
            >
              + Post
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-2 mt-9">
          {/* Add Remove button if taskId is provided */}
          {taskId && (
            <button
              onClick={handleRemoveTask}
              className="border border-purple-500 text-purple-500 font-semibold py-2 px-20 rounded focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Removing..." : "Remove"}
            </button>
          )}
          <button
            onClick={handleSave}
            className={`bg-purple-700 text-white font-semibold py-2 px-20 rounded focus:outline-none ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Change"}
          </button>
        </div>
      </div>
    </div>
  ) : null
}

export default AddTaskModal
