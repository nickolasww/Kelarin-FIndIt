"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getAuthToken } from "@/services/validation"

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (comment: string, attachments: string[]) => void
  onRemove: (cardId: string) => void
  initialTitle?: string
  initialDescription?: string
  initialAttachments?: string[]
  initialComment?: string
  cardId: number
  onSave: (data: {
    title: string
    description: string
    attachments: string[]
    comment: string
  }) => void
}

const EditTaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  onRemove,
  onSave,
  cardId,
  initialTitle = "Membuat PRD 1.0",
  initialDescription = "membuat prd untuk fitur yang akan dijadikan MVP",
  initialAttachments = [],
  initialComment = "",
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [comment, setComment] = useState(initialComment)
  const [attachmentLink, setAttachmentLink] = useState("")
  const [attachments, setAttachments] = useState<string[]>(initialAttachments)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle)
      setDescription(initialDescription)
      setComment(initialComment)
      setAttachments(initialAttachments)
      setError(null)
    }
  }, [isOpen, initialTitle, initialDescription, initialComment, initialAttachments])

  const handleAddAttachment = async () => {
    if (!attachmentLink.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("url", attachmentLink.trim())
      formData.append("file_name", `Attachment ${attachments.length + 1}`)

      const token = await getAuthToken()

      const response = await fetch("https://kelarin.bccdev.id/api/kanban/cards/1/attachment", {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      console.log("Attachment added successfully:", data)

      setAttachments([...attachments, attachmentLink.trim()])
      setAttachmentLink("")
    } catch (err: any) {
      setError(err.message)
      console.error("Error adding attachment:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index)
    setAttachments(newAttachments)
  }

  const handleUpdateTask = () => {
    onSave({
      title,
      description,
      attachments,
      comment,
    })
    onClose()
  }

  const handleRemoveTask = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const token = await getAuthToken()

      console.log(`Attempting to delete card with ID: ${cardId}`)
      console.log(`Using endpoint: https://kelarin.bccdev.id/api/kanban/cards/${cardId}`)

      const response = await fetch(`https://kelarin.bccdev.id/api/kanban/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      console.log("Task removed successfully")
      
      onRemove(cardId.toString())
      onClose()
    } catch (err: any) {
      console.error("Error removing task:", err)
      setError(err.message || "Failed to remove task. Network error or server unavailable.")
      
      console.log("API call failed, but still removing card from UI")
      onRemove(cardId.toString())
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed z-50 inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="text-xl font-semibold text-gray-800 focus:outline-none border-b border-black w-56"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Attachment */}
        <div className="mb-4">
          <label htmlFor="attachment" className="block text-sm font-medium text-black mb-2">
            Attachment
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="attachment"
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none"
              placeholder="paste link or file here"
              value={attachmentLink}
              onChange={(e) => setAttachmentLink(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleAddAttachment}
              className={`ml-7 bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none w-30 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading || !attachmentLink.trim()}
            >
              {isLoading ? "Adding..." : "+ Add"}
            </button>
          </div>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          {attachments.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {attachments.map((link, index) => (
                <div
                  key={index}
                  className="border border-black rounded-sm px-4 py-2 text-sm text-black font-bold flex items-center"
                >
                  {link.length > 20 ? `${link.substring(0, 20)}...` : link}
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="ml-1 text-black focus:outline-none"
                    disabled={isLoading}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              onClick={() => {
                onUpdate(comment, attachments)
                setComment("") // Clear comment after posting
              }}
              className={`ml-7 bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none w-30 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading || !comment.trim()}
            >
              + Post
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-9">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex justify-center gap-2">
            <button
              onClick={handleRemoveTask}
              className="border border-purple-500 text-purple-500 font-semibold py-2 px-20 rounded focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Removing..." : "Remove"}
            </button>
            <button
              onClick={handleUpdateTask}
              className={`bg-purple-700 text-white font-semibold py-2 px-20 rounded focus:outline-none ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              Update Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTaskModal