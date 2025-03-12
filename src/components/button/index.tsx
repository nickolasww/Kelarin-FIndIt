import React from 'react'

interface ButtonProps {
  text: string;
  className?: string;

}

const Button: React.FC<ButtonProps> = ({ text,className }) => {
    return (
        <button
        className={className}
      >
        {text}
      </button>
  )
}

export default Button
