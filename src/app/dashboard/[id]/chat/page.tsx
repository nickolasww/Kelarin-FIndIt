"use client";

import React from "react";
import { FaThLarge, FaPhone, FaUsers, FaCog } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import WorkspaceSidebar from "../../partials/workspaceside";
import { MdNotificationsActive } from "react-icons/md";
import { useState } from "react";
import InviteModal from "@/components/modal/invitemodal";
import Input from "@/components/input/index";
import Image from "next/image";
import Notification from '@/assets/icon/Notification.png'
import EditIcon from '@/assets/icon/EditIcon.png'

const ChatContent = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const OpenInviteModal = () => {
    setIsInviteModalOpen(true);
  };
  const CloseInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  const handleInviteFriend = (email: string) => {
    console.log("Inviting friend with email:", email);
    // logic to invite friend
    CloseInviteModal();
  };

  return (
    <div className="flex h-screen font-sans">
      <WorkspaceSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white py-3 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">K</span>
            </div>
            <h1 className="text-xl font-bold">Kelarin</h1>
          </div>

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

        {/* Content */}
        <div className="flex-1 p-4 bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500 relative">
          <div className="bg-white p-6 rounded-xl shadow-md w-full flex justify-between h-40 border-2 border-gray-600">
            <div>
              <h2 className="text-3xl font-bold text-purple-800">BCC Nekad</h2>
              <p className="text-sm text-gray-600 font-bold">Description</p>
            </div>

            <div className="flex gap-1">
            <div className="">
              <Image
              src={EditIcon}
                alt="editIcon"
              /> 
            </div>

            <div>
                <Image
                src={Notification}
                alt="kolaborasi"
                />
            </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              <Input
                type="text"
                label=""
                value=""
                placeholder="type your message here"
                onChange={() => {}}
                classname="border-2 border-gray-500 text-gray-500 rounded-sm py-3 px-4 outline-none w-[1390px]"
              />
              <button
                className="bg-purple-500 text-white p-3 focus:outline-none rounded-full"
                onClick={() => {
                  // Tambahkan logika kirim pesan di sini
                  console.log("Pesan dikirim");
                }}
              >
                <FiSend className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={CloseInviteModal}
        onInvite={handleInviteFriend}
      />
    </div>
  );
};

export default ChatContent;
