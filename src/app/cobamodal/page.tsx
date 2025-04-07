'use client';

// Example of how to use the TaskModal in a parent component
import React, { useState } from 'react';
import EditTaskModal from '@/components/modal/edittaskmodal';

const ParentComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskComment, setTaskComment] = useState('');
  const [taskAttachments, setTaskAttachments] = useState<string[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateTask = (comment: string, attachments: string[]) => {
    console.log('Updating task with comment:', comment, 'and attachments:', attachments);
    setTaskComment(comment);
    setTaskAttachments(attachments);
    handleCloseModal();
    // In a real application, you would send this data to your backend
  };

  const handleRemoveTask = () => {
    console.log('Removing task');
    handleCloseModal();
    // In a real application, you would handle task removal logic
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Task Modal</button>
      {isModalOpen && (
        <EditTaskModal
          onClose={handleCloseModal}
          onUpdate={handleUpdateTask}
          onRemove={handleRemoveTask}
        />
      )}
    </div>
  );
};

export default ParentComponent;