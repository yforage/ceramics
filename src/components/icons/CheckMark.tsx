import React from "react";

interface ICheckMarkProps {
  checked?: boolean;
  className?: string;
}

const CheckMark: React.FC<ICheckMarkProps> = ({ checked, className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path strokeDasharray="30" strokeDashoffset="30" className={`${checked ? 'animate-draw' : ''}`} d="M5 11.5C11.5 22.5 17.5 15.5 19.5 6" stroke="currentColor" strokeWidth={2} />
  </svg>
)

export default CheckMark;