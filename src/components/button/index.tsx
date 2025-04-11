import React from 'react'

interface ButtonProps {
  text: string;
  className?: string;
  onclick?: () => void;
  disabled?: boolean;

}

const Button: React.FC<ButtonProps> = ({ text,className,onclick,disabled }) => {
    return (
        <button
        className={className}
        onClick={onclick}
        disabled={disabled}
      >
        {text}
      </button>
  )
}

export default Button
