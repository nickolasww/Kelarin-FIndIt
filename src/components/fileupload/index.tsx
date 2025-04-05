import React, { useState, useRef, ChangeEvent } from 'react';

interface FileUploadProps {
  id?: string;
  label?: string;
  acceptedTypes?: string;
  onFileUploaded?: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id = 'file-upload',
  label = 'Upload File',
  acceptedTypes = 'image/jpeg, image/png',
  onFileUploaded,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    if (onFileUploaded) {
      onFileUploaded(file || null);
    }
  };

  const handleCustomButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-5 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md border-gray-300 bg-gray-50">
    <label htmlFor={id} className="block text-gray-500">
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 005.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02M9 21h.02M16 21h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor={id}
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>Select files</span>
            <input
              id={id}
              name="file-upload"
              type="file"
              className="sr-only"
              accept={acceptedTypes}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">
          PNG, JPG up to 10MB
        </p>
      </div>
    </label>
    {selectedFile && (
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-500">Selected file:</p>
        <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
        <p className="text-xs text-gray-500">({Math.round(selectedFile.size / 1024)} KB)</p>
      </div>
    )}
  </div>
  );
};

export default FileUpload;