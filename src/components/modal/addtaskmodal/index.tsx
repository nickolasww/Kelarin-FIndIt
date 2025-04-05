"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Input from "@/components/input/index";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    deskripsi: string;
    attachments: string[];
    comment: string;
  }) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deskripsi, setDeskripsi] = useState("");
  const [attachmentInput, setAttachmentInput] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [comment, setComment] = useState("");

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
    <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
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

        {/* Nama Task */}
        <h2 className="text-xl font-semibold mb-4">Nama Task</h2>

        {/* Deskripsi */}
        <div className="mb-4">
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        {/* Attachment */}
        <div className="mb-4">
          <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
            Attachment
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="attachment"
              placeholder="paste link or file here"
              value={attachmentInput}
              onChange={(e) => setAttachmentInput(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={handleAddAttachment}
              className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              + Add
            </button>
          </div>
          {attachments.length > 0 && (
            <div className="mt-2">
              {attachments.map((link, index) => (
                <div
                  key={index}
                  className="inline-flex items-center bg-gray-100 text-gray-700 rounded-md py-1 px-2 mr-2 mt-1"
                >
                  <span>{`Link ${index + 1}`}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
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
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="comment"
              placeholder="type your comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              + Post
            </button>
          </div>
        </div>

        {/* Save Change Button */}
        <button
          onClick={handleSave}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Save Change
        </button>
      </div>
    </div>
  ) : null;
};

export default TaskModal;