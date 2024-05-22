import React from "react";

interface ICloseQuoteIconProps {
  className?: string;
}

const CloseQuoteIcon: React.FC<ICloseQuoteIconProps> = ({ className }) => (
  <svg width="851" height="448" className={className} viewBox="0 0 851 448" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="stroke-pink" d="M115.472 411C-2.07312 253.524 17.4717 145 79.4723 87.0001C141.473 29 225.473 13 331.472 87.0001C437.472 161 395.472 277 331.472 295C267.472 313 231.472 295 183.472 267" strokeWidth="24"/>
    <path className="stroke-pink" d="M539.778 410.681C422.233 253.205 441.777 144.681 503.778 86.6806C565.779 28.6805 649.779 12.6805 755.778 86.6806C861.778 160.681 819.778 276.681 755.778 294.681C691.778 312.681 655.778 294.681 607.778 266.681" strokeWidth="24"/>
  </svg>
)

export default CloseQuoteIcon;