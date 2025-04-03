import { useState } from 'react';

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-12 ">
      <div className="bg-white p-8 rounded-md w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Workspace Name</h2>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        </div>
        <input
          type="text"
          placeholder="Add Description"
          className="border rounded-md p-2 w-full mb-4"
        />
        <h3 className="text-md font-semibold mb-2">Share this Workspace</h3>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="type your friend email here"
            className="border rounded-md p-2 flex-1 mr-2"
          />
          <button className="bg-purple-600 text-white py-2 px-4 rounded-md">
            + Invite
          </button>
        </div>
        <h3 className="text-md font-semibold mb-2">How do you want to use this workspace?</h3>
        <div className="flex justify-between mb-4">
          <button className="border rounded-md p-2">Group Project</button>
          <button className="border rounded-md p-2">Planner</button>
          <button className="border rounded-md p-2">Lesson Plan</button>
        </div>
        <button className="bg-purple-600 text-white py-2 px-4 rounded-md w-full">
          Create Workspace
        </button>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;