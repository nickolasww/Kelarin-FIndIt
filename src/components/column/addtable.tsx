"use client"

import type React from "react"

interface AddTableProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string) => void
  columnTitle: string
  setColumnTitle: (title: string) => void
}

const AddTable: React.FC<AddTableProps> = ({ isOpen, onClose, onSubmit, columnTitle, setColumnTitle }) => {
  if (!isOpen) return null

  const handleSubmit = () => {
    if (columnTitle.trim()) {
      onSubmit(columnTitle.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h3 className="text-xl font-bold text-purple-700 mb-4">Add New Table</h3>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Table Title</label>
          <input
            type="text"
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter column title"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 rounded-md text-white hover:bg-purple-700"
            disabled={!columnTitle.trim()}
          >
            Add Column
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTable
