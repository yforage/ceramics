import React, { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "gatsby";
import { ELinks } from "../../constants";
import Button from "../shared/Button";
import CartItem from "./CartItem";
import CompactCartItemSkeleton from "./CompactCartItemSkeleton";
import { useClickOutside, useWindowDimensions } from "../../utils";
import { ICartProduct } from "../../context/CartContext";

interface ICartModalProps {
  content?: ICartProduct[];
  isLoading: boolean;
  onClose: () => void;
}

const CartModal: React.FC<ICartModalProps> = ({ content, onClose, isLoading }) => {
  const ref = useRef(null);

  const { width } = useWindowDimensions();
  const isMobile = width < 1024;

  const sum = content ? content.reduce((acc, { product: { price }, count }) => acc += Number(price) * count, 0) : 0;

  useClickOutside(ref, onClose);

  const Content = (
    <div ref={ref} className={`fixed w-[calc(100%-4rem)] max-lg:bottom-8 max-lg:left-1/2 max-lg:-translate-x-2/4 lg:absolute lg:w-60 bg-white flex flex-col lg:right-0 lg:top-[calc(100%+2px)] lg:drop-shadow-md rounded-lg z-10`}>
      <div className={`relative p-6 lg:p-4`}>
        <div className={`flex justify-between mb-2`}>
          <span className={`text-lg`}>Ваши товары</span>
          <button onClick={onClose}>
            <XMarkIcon className={`w-5`} />
          </button>
        </div>
        <div className={`flex flex-col space-y-2 overflow-y-scroll max-h-80 -mr-4 pr-4`}>
          {content && content.map(({ product: { id, ...rest }, count }) => <CartItem {...rest} key={id} id={id} count={count} />)}
          {isLoading && <CompactCartItemSkeleton />}
        </div>
        <div className={`absolute w-full h-0.5 bg-teal left-0`} />
        <div className={`flex justify-between mt-4 mb-2`}>
          <span>Заказ на сумму</span>
          {content && <span>{sum} $</span>}
          {isLoading && <div className={`animate-pulse w-10 h-6 rounded-md bg-zinc-200`} />}
        </div>
        <Link to={ELinks.CHECKOUT}>
          <Button size="large" className={`w-full max-lg:h-16`}>
            Перейти в корзину
          </Button>
        </Link>
      </div>
    </div>
  )

  if (!isMobile) return Content;

  return (
    <div className={`max-lg:fixed max-lg:w-full max-lg:h-[calc(100%-5rem)] max-lg:bottom-0 max-lg:left-0 max-lg:bg-transparent-black`}>
      {Content}
    </div>
  )
}

export default CartModal;