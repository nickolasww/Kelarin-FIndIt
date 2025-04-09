"use client"; 

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Button from "@/components/button/index";
import DeleteIcon from "@/assets/icon/DeleteIcon.svg";
import Image from "next/image";

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
    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute top-4 right-4 focus:outline-none">
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
    <div className='flex flex-col gap-5 items-center justify-center'>
      <h1 className='font-bold text-3xl text-purple-700 pt-7'>Delete This Workspace?</h1>
      <p className='px-40 text-center mb-5'>Are you sure want to delete this workspace? This action cannot be undone</p>
      <Image
      src={DeleteIcon} 
      alt="Delete Icon"
      />
      <div className='flex gap-10'>
      <Button
        text="Delete"
        className="border-purple-500 border-2 text-purple-500 font-semibold py-2 px-26 rounded mt-4"
      />
      <Button
        text="Cancel"
        className=" bg-purple-800 text-white font-semibold py-2 px-26 rounded mt-4 ml-2"
      />
      </div>
    </div>
    </div>

  </div>
) : null;
};

export default DeleteModal
