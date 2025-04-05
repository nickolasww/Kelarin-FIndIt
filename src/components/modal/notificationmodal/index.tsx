import React from 'react';
import { useState, useEffect } from 'react';

interface NotificationModalProps {
    isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

     useEffect(() => {
       setIsModalOpen(isOpen)
     }, [isOpen])

  return isModalOpen ? (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-end items-start  z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-80 mt-30">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Notification</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Payment Success</h3>
          <p className="text-xs text-gray-600">
            Congratulations! Now you can access premium features and enjoy the full experience.
          </p>
        </div>
      </div>
    </div>
  ): null;
};

export default NotificationModal;