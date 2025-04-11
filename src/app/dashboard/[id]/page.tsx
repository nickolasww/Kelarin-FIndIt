'use client';

import React, { useState } from 'react';
import WorkspaceSidebar from '@/app/dashboard/partials/workspaceside';
import Chat from '@/app/dashboard/[id]/chat/page';
import InviteModal from '@/components/modal/invitemodal'; 
import Workspace from '@/app/dashboard/[id]/workspace/page'
import DeleteModal from '@/components/modal/deletemodal';
import Header from '@/app/dashboard/partials/header';
import StreakModal from '@/components/modal/streakmodal';

const DashboardPage = () => {
  const [activeContent, setActiveContent] = useState< 'workspace' | 'call' | 'chat' | 'settings' | 'users' | null>('users');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);

  const handleNavigation = (content: 'workspace' | 'users' | 'call' | 'chat' | 'settings' | 'logout') => {
    if (content === 'users') {
      console.warn(`Navigation to ${content} is not implemented.`);
      return;
    }
    if (content === 'logout') {
      console.log('Logging out...');
      // Add logout logic here
      return;
    }
    setActiveContent(content);
  };

  const OpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const CloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const OpenStreakModal = () => { 
    setIsStreakModalOpen(true);
  }
  const CloseStreakModal = () => {
    setIsStreakModalOpen(false);
  }

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

  let contentToRender;
  switch (activeContent) {
    case 'workspace': 
    contentToRender = <Workspace params={{
      id: '1'
    }} />;
      break;  
    case 'chat':
      contentToRender = <Chat />;
      break;
    case 'call':
      // contentToRender = <CallContent />;
      contentToRender = <div>Halaman Panggilan akan datang!</div>; // Placeholder
      break;
    default:
      contentToRender = <Workspace params={{
        id: '1'
      }} />;
      break;
  }

  return (
    <>
    <Header OpenInviteModal={OpenInviteModal} OpenStreakModal={OpenStreakModal}/> 
    <div className="flex h-screen font-sans">
      <WorkspaceSidebar onNavigate={handleNavigation} OpenDeleteModal={OpenDeleteModal} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 pt-20 px-5">
        {contentToRender}
        </div>
        </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={CloseDeleteModal}
        onCreate={(name: string) => console.log()}
        />

        <InviteModal
        isOpen={isInviteModalOpen}
        onClose={CloseInviteModal}
        onInvite={handleInviteFriend}
      />

      <StreakModal 
        isOpen={isStreakModalOpen}
        onClose={CloseStreakModal}
        onCreate={(name: string) => console.log()}
      />
    </div>
        </>
  );
};

export default DashboardPage;