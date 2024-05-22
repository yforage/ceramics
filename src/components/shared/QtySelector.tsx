import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import classnames from "classnames";

interface IQtySelector {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  className?: string;
  size?: "sm" | "md";
  disabled?: boolean;
}

const QtySelector: React.FC<IQtySelector> = ({ value, onChange, max, min, className, size = 'md', disabled }) => {
  const handleDecrease = () => {
    if (value === min || disabled) return;
    onChange(value - 1);
  }
  const handleIncrease = () => {
    if (value === max || disabled) return;
    onChange(value + 1);
  }

  const paddings = {
    buttons: {
      sm: 'px-1 py-1',
      md: 'px-2 py-2',
    },
    span: {
      sm: 'px-2 py-1',
      md: 'px-3 py-2',
    }
  }
  
  return (
    <div className={classnames(className, `flex items-stretch border-2 border-teal rounded-xl overflow-hidden ${size === 'md' ? 'text-xl' : 'text-sm'}`)}>
      <button
        className={`${paddings.buttons[size]} active:bg-teal active:text-white lg:hover:bg-teal lg:hover:text-white lg:active:bg-zinc-300 transition-colors`}
        onClick={handleDecrease}
        disabled={disabled}
      >
        <MinusIcon className={`w-4`} />
      </button>
      <span className={`${paddings.span[size]} border-x-2 border-teal flex items-center`}>{value}</span>
      <button
        className={`${paddings.buttons[size]} active:bg-teal active:text-white lg:hover:bg-teal lg:hover:text-white lg:active:bg-zinc-300 transition-colors`}
        onClick={handleIncrease}
        disabled={disabled}
      >
        <PlusIcon className={`w-4`} />
      </button>
    </div>
  )
}

export default QtySelector;