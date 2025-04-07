import React, { useState } from 'react';

interface TaskModalProps {
  onClose: () => void;
  onUpdate: (comment: string, attachments: string[]) => void;
  onRemove: () => void;
  initialTitle?: string;
  initialDescription?: string;
  initialAttachments?: string[];
  initialComment?: string;
}

const EditTaskModal: React.FC<TaskModalProps> = ({
  onClose,
  onUpdate,
  onRemove,
  initialTitle = 'Membuat PRD 1.0',
  initialDescription = 'membuat prd untuk fitur yang akan dijadikan MVP',
  initialAttachments = [],
  initialComment = '',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [comment, setComment] = useState(initialComment);
  const [attachmentLink, setAttachmentLink] = useState('');
  const [attachments, setAttachments] = useState<string[]>(initialAttachments);

  const handleAddAttachment = () => {
    if (attachmentLink.trim() !== '') {
      setAttachments([...attachments, attachmentLink.trim()]);
      setAttachmentLink('');
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const handleUpdateTask = () => {
    const updatedData = {
      title: title,
      description: description,
      comment: comment,
      attachments: attachments,
    };
    console.log('Updated Task Data:', updatedData);
    onUpdate(comment, attachments);
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="text-xl font-semibold text-gray-800 focus:outline-none border-b border-black w-auto"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Attachment */}
        <div className="mb-4">
          <label htmlFor="attachment" className="block text-sm font-medium text-black mb-2">
            Attachment
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="attachment"
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none"
              placeholder="paste link or file here"
              value={attachmentLink}
              onChange={(e) => setAttachmentLink(e.target.value)}
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
            <div className="mt-2 grid grid-cols-3 gap-2 ">
              {attachments.map((link, index) => (
                <div
                  key={index}
                  className="border border-black rounded-sm px-4 py-2 text-sm text-black font-bold flex items-center "
                >
                  {link.length > 20 ? `${link.substring(0, 20)}...` : link}
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="ml-1 text-black focus:outline-none"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
            onClick={onRemove}
            className="border border-purple-500 text-purple-500 font-semibold py-2 px-20 rounded focus:outline-none"
          >
            Remove
          </button>
          <button
            onClick={handleUpdateTask}
            className="bg-purple-700 text-white font-semibold py-2 px-20 rounded focus:outline-none"
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;