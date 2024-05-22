import React from "react";

interface ISelectionRightProps {
  className?: string;
}

const SelectionRight: React.FC<ISelectionRightProps> = ({ className }) => (
  <svg width="236" height="75" className={className} viewBox="0 0 236 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_616_12)">
      <path className={`stroke-teal`} d="M187.469 28.4887C204.968 33.9887 218.469 32.9886 218.469 42.9886C218.468 57.4887 136.969 66.4887 96.9687 61.9888C56.9686 57.489 37.4686 47.4887 14.9683 28.4887" strokeWidth="8" strokeLinecap="round"/>
    </g>
    <defs>
    <clipPath id="clip0_616_12">
      <rect width="236" height="75" fill="white"/>
    </clipPath>
    </defs>
  </svg>
)

export default SelectionRight;