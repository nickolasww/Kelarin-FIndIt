'use client';

import React from 'react';

interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string;
  type?: 'text' | 'password' | 'email' | 'fullname';
  classname ?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

const Input: React.FC<CustomInputProps> = ({ label, type = 'text',classname, placeholder,onChange,}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        placeholder={placeholder}
        className={classname}
        type={type}  
      />
    </div>
  );
};

export default Input;