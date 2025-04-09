"use client"; 

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

interface DeleteModalProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (name: string) => void
  }

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onCreate }) => {
      const [isModalOpen, setIsModalOpen] = useState(false)

        useEffect(() => {
          setIsModalOpen(isOpen)
        }, [isOpen])

  return isModalOpen ? (
    <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
      <div className="flex items-center justify-between ">
      <h1> Ini modal delete </h1>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
    </div>
  </div>
  </div>
) : null;
};

export default DeleteModal
