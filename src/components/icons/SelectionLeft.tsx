import React from "react";

interface ISelectionLeftProps {
  className?: string;
}

const SelectionLeft: React.FC<ISelectionLeftProps> = ({ className }) => (
  <svg width="323" height="116" className={className} viewBox="0 0 323 116" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_615_10)">
      <path className={`stroke-pink`} d="M37.2471 48.1973C-9.25289 79.1972 91.7469 83.1973 150.247 79.6973C208.747 76.1974 261.747 64.6973 298.247 48.1973" strokeWidth="8" strokeLinecap="round"/>
    </g>
    <defs>
    <clipPath id="clip0_615_10">
      <rect width="323" height="116" fill="white"/>
    </clipPath>
    </defs>
  </svg>
)

export default SelectionLeft;