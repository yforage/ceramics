import classnames from "classnames";
import React from "react";

interface IListIconProps {
  className?: string;
}

const ListIcon: React.FC<IListIconProps> = ({ className }) => (
  <svg width="400" height="400" className={classnames(className, `group-even:-scale-x-100`)} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="stroke-teal group-even:stroke-pink" d="M215.383 29.8709C349.559 117.877 364.87 206.608 333.494 268.429C302.118 330.249 242.132 365.986 140.129 338.808C38.1265 311.63 37.957 210.891 82.0385 179.205C126.12 147.519 158.771 151.277 203.422 159.356" strokeWidth="22" />
  </svg>
)

export default ListIcon;