'use client';

import React from 'react'
import Image from 'next/image'
import CreateWorkspaceModal from '@/components/modal/createworkspace';
import { useState } from 'react';

const sidebar = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
    
        const openModal = () => {
          setIsModalOpen(true);
        };
      
        const closeModal = () => {
          setIsModalOpen(false);
        };
  return (
    <div className="w-64 bg-white p-4 h-screen flex flex-col">
    <div className="flex items-center mb-8">
      {/* <Image
        src="/rheza-agung-l.jpg" // Ganti dengan path gambar profil
        alt="Rheza Agung L"
        width={40}
        height={40}
        className="rounded-full mr-2"
      /> */}
      <div className='flex items-center'>
        <p className="font-semibold">Rheza Agung L</p>
      </div>
    </div>
    <button
      className="bg-purple-600 text-white py-2 px-4 rounded-md w-full mb-4"
      onClick={openModal}
    >
      + Create Workspace
    </button>
    <div className="flex items-center">
      <Image
        src="/bcc-nekad-icon.png" // Ganti dengan path ikon BCC Nekad
        alt="BCC Nekad"
        width={24}
        height={24}
        className="mr-2"
      />
      <p>BCC Nekad</p>
    </div>

    <div className="flex-grow"></div>

    <button className="text-sm text-gray-500 mt-4 flex items-center cursor-pointer">
        Upgrade Plan
    </button>

    <CreateWorkspaceModal isOpen={isModalOpen} onClose={closeModal} />
  </div>
  )
}

export default sidebar
