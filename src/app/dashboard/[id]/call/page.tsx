"use client";

import React, { useState } from "react";
import InviteModal from "@/components/modal/invitemodal";


const CallContent = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

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