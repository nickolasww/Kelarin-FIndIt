'use client';

import React from 'react'
import { useState } from 'react';
import Image from "next/image";
import StreakIcon from "@/assets/icon/StreakIcon.svg";

interface HeaderProps {
  OpenInviteModal: () => void;
  OpenStreakModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ OpenInviteModal, OpenStreakModal }) => {
  return (
    <div className='relative'>
      <header className="py-3 px-4 sm:px-6 flex items-center absolute top-2 right-0 "> 
        <div className="flex items-center space-x-4 sm:space-x-9"> {/* Responsive spacing */}
          <button
            className="bg-purple-600 text-white px-3 py-2 sm:px-4 rounded-sm flex items-center text-sm sm:text-base" 
            onClick={OpenInviteModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 sm:h-5 sm:w-5" 
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

          <div className="flex items-center gap-2">
            <span role="img" aria-label="fire" className="text-xl sm:text-2xl cursor-pointer" > 
              <Image
                src={StreakIcon}
                alt='Streak Icon'
                onClick={OpenStreakModal}
              />
            </span>
            <span className="font-bold text-sm sm:text-base ml-1">365 Days</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;