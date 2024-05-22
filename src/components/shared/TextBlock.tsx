import React, { forwardRef } from "react";
import ListIcon from "../icons/ListIcon";
import { ERichTextBlocks, IRichTextBlock } from "../../customTypes/richText";
import { handleRichText } from "../../utils";

export interface ITextBlockProps {
  title: string;
  subtitle: string;
  text: IRichTextBlock;
  image: string;
  imagePosition: 'left' | 'right';
  isSquare?: boolean;
}

const renderNode = {
  [ERichTextBlocks.PARAGRAPH]: (children: React.ReactNode) => <p className={`mb-2 whitespace-pre-wrap`}>{children}</p>,
  [ERichTextBlocks.UL_LIST]: (children: React.ReactNode) => <ul className={`space-y-2 lg:space-y-4 my-4`}>{children}</ul>,
  [ERichTextBlocks.LIST_ITEM]: (children: React.ReactNode) => <li className="flex items-center group max-lg:w-11/12"><ListIcon className="w-8 h-8 lg:w-10 lg:h-10 mr-1 lg:mr-4 shrink-0" />{children}</li>,
  [ERichTextBlocks.SPACE]: () => <br className={`hidden lg:block`} />
}

const TextBlock = forwardRef<HTMLDivElement, ITextBlockProps>(({ title, subtitle, text, image, imagePosition, isSquare }, ref) => {
  return (
    <div ref={ref}>
      <div className="lg:text-center">
        <h1 className={`py-2 lg:py-8 font-virilica text-3xl lg:text-4xl`}>{title}</h1>
        {subtitle}
      </div>
      <div className={`mt-6 flex flex-col lg:flex-row items-center justify-between ${imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        <img className={`rounded-2xl w-full lg:w-[45%] ${isSquare ? 'aspect-square object-cover' : ''}`} src={image} alt={title} />
        <div className={`w-full max-lg:mt-4 lg:w-[45%] whitespace-pre-line`}>
          {handleRichText(text, renderNode)}
        </div>
      </div>
    </div>
  )
})

export default TextBlock;
