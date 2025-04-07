import React, { useState } from 'react';
import { useEffect } from 'react';
import FileUpload from '@/components/fileupload/index';

interface WorkspaceModalProps {
    isOpen: boolean
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

const AddTableModal: React.FC<WorkspaceModalProps> = ({  isOpen,onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [usage, setUsage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
  
    useEffect(() => {
      setIsModalOpen(isOpen)
    }, [isOpen])

  const handleUsageClick = (selectedUsage: string) => {
    setUsage(selectedUsage);
  };

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
  };

  return isModalOpen ?  (
    <div className="fixed z-50 inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Workspace Name</h2>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              id="description"
              className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none h-32"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          <FileUpload
            id="image-upload"
            label="Upload Workspace Image (JPG or PNG)"
            acceptedTypes="image/jpeg, image/png"
            onFileUploaded={handleImageUploaded}
          />
          <div className='flex items-center justify-center'>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 my-6 rounded focus:outline-none focus:shadow-outline w-96"
          >
            Save Change
          </button>
          </div>
        </form>
      </div>
    </div>
 ) : null
};

export default AddTableModal;