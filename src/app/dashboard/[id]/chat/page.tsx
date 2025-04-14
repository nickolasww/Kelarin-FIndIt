"use client";

import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
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
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <div className="flex-1 p-4 bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500 relative rounded-t-lg ">
          <div className="bg-white p-6 rounded-xl shadow-md w-full flex justify-between h-auto sm:h-40">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-800">BCC Nekad</h2>
              <p className="text-sm text-gray-600 font-bold">Description</p>
            </div>

            <div className="flex gap-1">
              <div className="">
                <Image
                  src={EditIcon}
                  alt="editIcon"
                  className="cursor-pointer"
                />
              </div>

              <div>
                <Image
                  src={Notification}
                  alt="kolaborasi"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              <Input
                type="text"
                label=""
                value=""
                placeholder="type your message here"
                onChange={() => {}}
                classname="border-2 border-gray-500 text-gray-500 rounded-sm py-3 px-4 outline-none md:w-[550px] lg:w-[800px] xl:w-[1200px] 2xl:w-[1300px] "
              />
              <button
                className="bg-purple-500 text-white p-3 focus:outline-none rounded-full"
                onClick={() => {
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