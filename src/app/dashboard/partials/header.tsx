'use client';

import React from 'react'
import { useState } from 'react';

interface HeaderProps {
    OpenInviteModal: () => void;
  }

const header:  React.FC<HeaderProps> = ({OpenInviteModal}) => {
  return (
    <div className='relative'>
       <header className="py-3 px-6 flex items-center absolute top-2 right-0">
          <div className="flex items-center space-x-4">
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-sm flex items-center"
              onClick={OpenInviteModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Invite
            </button>

            <div className="flex items-center">
              <span role="img" aria-label="fire" className="text-2xl">
                🔥
              </span>
              <span className="font-bold ml-1">365 Days</span>
            </div>
          </div>
        </header>
    </div>
  )
}

export default header
