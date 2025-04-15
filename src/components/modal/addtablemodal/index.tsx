import React, { useState, useEffect } from 'react';
import FileUpload from '@/components/fileupload/index';

interface WorkspaceModalProps {
  isOpen: boolean;
  onSubmit: (formData: WorkspaceFormData) => void;
  onClose: () => void;
}

interface WorkspaceFormData {
  name: string;
  description: string;
  inviteEmail: string;
  usage: string | null;
  image: File | null;
}

const AddTableModal: React.FC<WorkspaceModalProps> = ({ isOpen, onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [usage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);


  const handleImageUploaded = (file: File | null) => {
    setImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: WorkspaceFormData = {
      name,
      description,
      inviteEmail,
      usage,
      image,
    };
    onSubmit(formData);
    onClose();
  };

  return isModalOpen ? (
    <div className="fixed z-50 inset-0 bg-black/50 flex justify-center items-center p-4 md:p-0">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-lg lg:max-w-3xl">
        <div className="flex justify-between items-center mb-4 md:mb-6 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">Workspace Name</h2>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 p-4 md:p-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Workspace Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Enter workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              className="mt-1 block w-full p-2 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none h-24 md:h-32"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="inviteEmail" className="block text-sm font-medium text-gray-700">
              Invite Email (Optional)
            </label>
            <input
              type="email"
              id="inviteEmail"
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="user@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </div>

          <FileUpload
            id="image-upload"
            label="Upload Workspace Image (JPG or PNG)"
            acceptedTypes="image/jpeg, image/png"
            onFileUploaded={handleImageUploaded}
          />

          <div className="flex justify-center mt-4 md:mt-6">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            >
              Save Change
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default AddTableModal;