import { useState } from 'react';
import Input from '@/components/input/index';

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  const [workspaceType, setWorkspaceType] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  return (
    <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-2xl lg:max-w-3xl p-6 md:p-8 relative">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-semibold">Workspace Name</h1>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        <Input
          type="text"
          value=""
          label=""
          placeholder="Add Description"
          classname="border border-gray-300 rounded-md w-full bg-gray-100 p-3 mb-4"
        />

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Share this Workspace</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="type your friend email here"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-md px-4 py-2">
              + Invite
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">How do you want to use this workspace?</h2>
          <div className="flex flex-wrap gap-2">
            {['Group Project', 'Planner', 'Lesson Plan'].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-md border text-sm ${
                  workspaceType === type
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 text-gray-700'
                }`}
                onClick={() => setWorkspaceType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-md py-3 font-semibold">
          Create Workspace
        </button>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;