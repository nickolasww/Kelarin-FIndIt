"use client";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@/components/button/index";
import DeleteIcon from "@/assets/icon/DeleteIcon.svg";
import Image from "next/image";
import StreakCard from "@/components/card/streakcard";
import StreakFire from "@/assets/images/Streakfire.svg"

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const StreakModal: React.FC<StreakModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return isModalOpen ? (
    <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute top-4 right-4 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center justify-center text-center">
            <Image 
            src={StreakFire}
            alt="Streak Fire"
            />
          <h1>
            Streak has been going for{" "}
            <span className="text-3xl text-purple-800 font-bold">365</span> days
          </h1>
          <p className="px-24">
            keep your momentum going! Streaks track your daily activity-complete
            tasks consistently to build your streak and unlock exclusive
            rewards.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2 ">
        <StreakCard
        title="Custom Avatar"
        description="Personalize your profile with a unique avatar that represents your style"
        claimed={true}
        />
        <StreakCard
        title="Custom Header for dashboard"
        description="Make your dashboard more expensive with custom header images"
        claimed={false}
        />
        <StreakCard
        title="Upload up to 20MB"
        description="Enjoy more flexibility by uploading larger files like PDFs, images, and notes-up to 20MB per file."
        claimed={false}
        />
        <StreakCard
        title="Upload videos"
        description="Share progress, presentations, or personal notes through video uploads, with a maximum size of 20MB."
        claimed={false}
        />
        </div>
      </div>
    </div>
  ) : null;
};

export default StreakModal;
