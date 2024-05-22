import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useState } from "react";

interface IExpandableTextProps {
  text: string;
}

const ExpandableText: React.FC<IExpandableTextProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);

  if (text.length < 120) return <p>{text}</p>;

  return (
    <div>
      <p>
        {isExpanded ? text : `${text.slice(0, 120)}...`}
      </p>
      <button onClick={toggleExpanded} className={`flex items-center font-virilica text-lg`}>
        {isExpanded ? 'Свернуть' : 'Подробнее'}
        <ChevronDownIcon className={`h-5 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

export default ExpandableText;