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
    <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6 sm:p-8 relative">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl underline">Workspace Name</h1>
          <button onClick={onClose}>
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
        </div>
        <Input
          type="text"
          value=""
          label=""
          placeholder="Add Description"
          classname="border-2 border-dashed border-gray-300 rounded-xl w-full bg-gray-100 pb-16 sm:pb-20 p-4 sm:p-5 focus:outline-none"
        />

        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Share this Workspace</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="type your friend email here"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-2">
              <span>Invite</span>
            </button>
          </div>
        </div>

        {/* Workspace type section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">How do you want to use this workspace?</h2>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {['Group Project', 'Planner', 'Lesson Plan'].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg border text-sm sm:text-base ${
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

        {/* Create button */}
        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-3 sm:py-4 text-base sm:text-lg font-medium">
          Create Workspace
        </button>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;