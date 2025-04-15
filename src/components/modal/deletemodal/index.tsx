"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Button from "@/components/button/index"
import DeleteIcon from "@/assets/icon/DeleteIcon.svg"
import Image from "next/image"

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  workspaceId?: number
  onDelete: (id: number) => Promise<void>
  isDeleting?: boolean
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, workspaceId, onDelete, isDeleting = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen])

  const handleDelete = async () => {
    if (workspaceId) {
      await onDelete(workspaceId)
      onClose()
    }
  }

  return isModalOpen ? (
    <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute top-4 right-4 focus:outline-none disabled:opacity-50"
          disabled={isDeleting}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col gap-5 items-center justify-center pt-6 md:pt-8">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-purple-700">Delete This Workspace?</h1>
          <p className="px-6 sm:px-10 md:px-20 text-center text-sm sm:text-base mb-4 md:mb-6">
            Are you sure you want to delete this workspace? This action cannot be undone
          </p>
          <div className="w-16 sm:w-20 md:w-24 lg:w-62">
            <Image src={DeleteIcon || "/placeholder.svg"} alt="Delete Icon" className="w-full h-auto" />
          </div>
          <div className="flex gap-3 sm:gap-6 md:gap-10">
            <Button
              text={isDeleting ? "Deleting..." : "Delete"}
              className="border-purple-500 border-2 text-purple-500 font-semibold py-2 px-4 sm:px-6 md:px-8 rounded mt-4 disabled:opacity-50"
              onClick={handleDelete}
              disabled={isDeleting}
            />
            <Button
              text="Cancel"
              className="bg-purple-800 text-white font-semibold py-2 px-4 sm:px-6 md:px-8 rounded mt-4 disabled:opacity-50"
              onClick={onClose}
              disabled={isDeleting}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default DeleteModal