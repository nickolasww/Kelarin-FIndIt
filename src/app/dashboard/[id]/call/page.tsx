"use client";

import React, { useState } from "react";
import { FaThLarge, FaPhone, FaUsers, FaCog } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import WorkspaceSidebar from "../../partials/workspaceside";
import { MdNotificationsActive } from "react-icons/md";
import InviteModal from "@/components/modal/invitemodal";
import Input from "@/components/input/index";
import Image from "next/image";
import Notification from '@/assets/icon/Notification.png'
import EditIcon from '@/assets/icon/EditIcon.png'

const CallContent = () => {
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

export default CallContent;