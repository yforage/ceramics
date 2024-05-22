import React, { useCallback, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { EProductSortings } from "../../customTypes/api";

const options = {
  [EProductSortings.AVAILABLE]: 'наличию',
  [EProductSortings.PRICE_ASC]: 'цена по возрастанию',
  [EProductSortings.PRICE_DESC]: 'цена по убыванию'
}

interface IMenuDropDownProps {
  selected: keyof typeof options;
  onSelect: (selected: keyof typeof options) => void;
}

const MenuDropDown: React.FC<IMenuDropDownProps> = ({ selected, onSelect }) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpened = useCallback(() => setIsOpened((prev) => !prev), []);

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    onSelect(e.currentTarget.value as typeof selected);
    toggleOpened();
  }

  const handleBlur = (e: React.FocusEvent) => {
    if (isOpened && !e.currentTarget.contains(e.relatedTarget)) {
      toggleOpened();
    }
  }

  return (
    <div className={`relative bg-white rounded-t-lg shrink-0`} onBlur={handleBlur}>
      <button
        onClick={toggleOpened}
        className={`relative flex items-center shrink-0 h-8 px-4 z-20`}
      >
        <span>Сортировка по: {options[selected]}</span>
        <ChevronDownIcon className={`w-4 ml-2 ${isOpened ? 'rotate-180' : ''} transition-transform`} />
      </button>
      {isOpened && (
        <>
          <div className={`absolute top-full left-0 z-20 w-full flex flex-col items-start pb-2 rounded-b-lg bg-white`} >
            {Object.entries(options)
              .filter(([key]) => key !== selected)
              .map(([key, value]) => (
                <button
                  key={key}
                  value={key}
                  onClick={handleSelect}
                  className={`h-8 px-4 w-full text-start`}
                >
                  {value}
                </button>
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-[6.5rem] bg-white drop-shadow-md rounded-lg z-10" />
        </>
      )}
    </div>

  )
}

export default MenuDropDown;


