'use client';

import React, { useState } from 'react';
import { useEffect } from 'react';

interface TaskModalProps {
  onClose: () => void;
  onUpdate: (comment: string, attachments: string[]) => void;
  onRemove: () => void;
  initialTitle?: string;
  initialDescription?: string;
  initialAttachments?: string[];
  initialComment?: string;
  isOpen: boolean;
  onSave: (data: {
    deskripsi: string;
    attachments: string[];
    comment: string;
  }) => void;
}

const AddTaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  onRemove,
  onSave,
  initialTitle = 'Membuat PRD 1.0',
  initialDescription = 'membuat prd untuk fitur yang akan dijadikan MVP',
  initialAttachments = [],
  initialComment = '',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [deskripsi, setDeskripsi] = useState("");
  const [attachmentInput, setAttachmentInput] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    setIsModalOpen(isOpen);
    if (isOpen) {
      // Reset fields when modal opens
      setDeskripsi("");
      setAttachmentInput("");
      setAttachments([]);
      setComment("");
    }
  }, [isOpen]);

  const handleAddAttachment = () => {
    if (attachmentInput.trim()) {
      setAttachments((prevAttachments) => [
        ...prevAttachments,
        attachmentInput.trim(),
      ]);
      setAttachmentInput("");
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const handleSave = () => {
    onSave({ deskripsi, attachments, comment });
    onClose();
  };

  return isModalOpen ? (
    <div className="fixed z-50 inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="text-xl font-semibold text-gray-800 focus:outline-none border-b border-black w-56"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea
            className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none h-24"
            placeholder="membuat prd untuk fitur yang akan dijadikan MVP"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>

        {/* Attachment */}
        <div className="mb-4">
          <label htmlFor="attachment" className="block text-sm font-medium text-black mb-3">
            Attachment
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="attachment"
              placeholder="paste link or file here"
              value={attachmentInput}
              onChange={(e) => setAttachmentInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-sm text-sm text-gray-700 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddAttachment}
              className="ml-7 bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none w-30"
            >
              + Add
            </button>
          </div>
          {attachments.length > 0 && (
            <div className="mt-3 mb-6">
              {attachments.map((link, index) => (
                <div
                  key={index}
                  className="inline-flex items-center border-[1px] border-gray-700 text-black font-semibold rounded-sm py-2 px-5"
                >
                  <span>{`Link ${index + 1}`}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="ml-4 mt-1 text-black focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
              ))}
            </div>
          )}
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-black mb-2">
            Comment
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="comment"
              className="w-full p-2 border border-gray-300 rounded-sm text-sm text-gray-700 focus:outline-none"
              placeholder="type your comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                onUpdate(comment, attachments);
                setComment(''); // Clear comment after posting (optional)
              }}
              className="ml-7 bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none w-30"
            >
              + Post
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-2 mt-9">
          <button
            onClick={handleSave}
            className="bg-purple-700 text-white font-semibold py-2 px-20 rounded focus:outline-none"
          >
            Save Change
          </button>
        </div>
      </div>
    </div>
  ) : null ; 
};

export default AddTaskModal;