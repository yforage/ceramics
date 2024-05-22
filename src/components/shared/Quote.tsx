import React from "react";
import CloseQuoteIcon from "../icons/CloseQuoteIcon";
import OpenQuoteIcon from "../icons/OpenQuoteIcon";

interface IQuoteProps {
  text: string;
  author: string;
}

const Quote: React.FC<IQuoteProps> = ({ text, author }) => {
  return (
    <div className={`relative py-8 px-2 lg:py-14 lg:px-8 lg:text-center`}>
      <OpenQuoteIcon className={`absolute top-[5%] left-0 w-1/12 h-auto`} />
      <CloseQuoteIcon className={`absolute bottom-1/4 lg:bottom-[33%] right-0 w-1/12 h-auto`} />
      <div className={`font-virilica text-2xl lg:text-4xl`}>
        {text}
      </div>
      <p className={`text-lg lg:text-xl mt-2.5`}>
        {author}
      </p>
    </div>
  )
}

export default Quote;
