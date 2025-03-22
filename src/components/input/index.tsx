'use client';

import React from 'react';

interface CustomInputProps {
  label: string;
  value: string;
  type?: 'text' | 'password' | 'email' | 'fullname';
  classname ?: string;
}

const Input: React.FC<CustomInputProps> = ({ label, type = 'text',classname }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        className={classname}
        type={type}  
      />
    </div>
  );
};

export default Input;