import React from "react";
import classnames from "classnames";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size: 'small' | 'large';
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ children, className, size, onClick, ...props }) => {
  const paddings = {
    small: 'py-1 px-2',
    large: 'py-2.5 px-5',
  }
  return (
    <button
      {...props}
      onClick={onClick}
      className={classnames(paddings[size], className, `flex items-center justify-center bg-white active:bg-teal active:text-white lg:hover:bg-teal lg:hover:text-white lg:active:bg-zinc-300 transition-colors rounded-xl rounded-lg border-2 border-teal`)}
    >
      {children}
    </button>
  )
}

export default Button;