import React from "react";
import { Link } from "gatsby";
import classnames from "classnames";
import Button from "../shared/Button";
import { useWindowDimensions } from "../../utils";

export interface IFloatedBlockProps {
  className?: string;
  title: string;
  description: string;
  price?: number;
  button: string;
  link: string;
}

const FloatedBlock: React.FC<IFloatedBlockProps> = ({ className, title, description, button, price, link }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  return (
    <div className={classnames(className, `lg:p-5 lg:bg-transparent-gray lg:rounded-xl`)}>
      <div className={`max-lg:h-full max-lg:flex max-lg:flex-col space-y-2.5 lg:relative lg:z-1`}>
        <p className={`font-virilica text-3xl max-lg:mt-4 lg:text-4xl`}>{title}</p>
        {isMobile && price && <span className="font-virilica text-3xl lg:text-4xl">{price}$</span>}
        <p className={`max-lg:basis-[35%] max-lg:mt-4`}>{description}</p>
        <div className={`flex items-center ${price ? 'justify-between flex-col lg:flex-row' : ''}`}>
          {!isMobile && price && <span className="font-virilica text-3xl lg:text-4xl">{price}$</span>}
          <Link to={link} className="block max-lg:w-full">
            <Button size="large" className={`w-full py-4`}>
              {button}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FloatedBlock;