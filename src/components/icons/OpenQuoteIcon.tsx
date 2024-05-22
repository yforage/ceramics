import React from "react";

interface IOpenQuoteIconProps {
  className?: string;
}

const OpenQuoteIcon: React.FC<IOpenQuoteIconProps> = ({ className }) => (
  <svg width="851" height="448" className={className} viewBox="0 0 851 448" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="stroke-teal" d="M735.001 411C852.546 253.524 833.001 145 771.001 87.0001C709 29 625 13 519 87.0001C413.001 161 455 277 519 295C583 313 619 295 667.001 267" strokeWidth="24"/>
    <path className="stroke-teal" d="M310.695 410.681C428.24 253.205 408.695 144.681 346.695 86.6806C284.694 28.6805 200.694 12.6805 94.6948 86.6806C-11.3048 160.681 30.6948 276.681 94.6948 294.681C158.695 312.681 194.695 294.681 242.695 266.681" strokeWidth="24"/>
  </svg>
)

export default OpenQuoteIcon;