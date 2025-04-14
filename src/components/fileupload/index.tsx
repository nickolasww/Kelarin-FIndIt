import React, { useState, useRef, ChangeEvent } from 'react';

interface FileUploadProps {
  id?: string;
  label?: string;
  acceptedTypes?: string;
  onFileUploaded?: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id = 'file-upload',
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
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md border-purple-300 bg-white">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-medium mb-2 text-center"
      >
        Drag and drop PNG/JPG files to upload
      </label>
      <button
        type="button"
        className="border-2 border-purple-500  text-purple-500 font-bold py-1 px-8 rounded focus:outline-none focus-shadow-outline"
        onClick={handleCustomButtonClick}
      >
        Select Files
      </button>
      <input
        id={id}
        type="file"
        className="hidden"
        accept={acceptedTypes}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {selectedFile && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-500">Selected file:</p>
          <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
          <p className="text-xs text-gray-500">
            ({Math.round(selectedFile.size / 1024)} KB)
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;