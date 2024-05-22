import React, { useContext } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { IProductApi } from "../../customTypes/api";
import QtySelector from "../shared/QtySelector";
import { useMutation } from "@tanstack/react-query";
import { CartContext } from "../../context/CartContext";

interface ICartItemProps extends IProductApi {
  type?: "compact" | "default";
  count: number;
}

const CartItem: React.FC<ICartItemProps> = ({ id, imageUrls, name, price, type = 'compact', count }) => {
  const { setCartContent } = useContext(CartContext);

  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: async (e: React.MouseEvent<HTMLButtonElement>) => {
      const cart = localStorage.getItem('ceramics-cart');
      const { [id]: current, ...rest } = cart ? JSON.parse(cart) : {};
  
      localStorage.setItem('ceramics-cart', JSON.stringify(rest));

      return id;
    },
    onSuccess: (deletedId) => {
      setCartContent((prev) => prev.filter(({ product }) => product.id !== deletedId));
    }
  })

  const { mutate: changeQty } = useMutation({
    mutationFn: async (qty: number) => {
      const cart = localStorage.getItem('ceramics-cart');
      const cartObj = cart ? JSON.parse(cart) : {};
      cartObj[id] = qty;

      localStorage.setItem('ceramics-cart', JSON.stringify(cartObj));

      return qty;
    },
    onSuccess: (qty: number) => {
      setCartContent((prev) => {
        const copy = [...prev];
        const itemToChange = copy.find(({ product }) => product.id === id);
        if (!itemToChange) return prev;
        itemToChange.count = qty;
        return copy;
      })
    }
  })

  return (
    <div className={`pb-4 flex ${type !== 'compact' ? 'w-full' : ''} ${isPending ? 'animate-pulse' : ''}`}>
      <img src={imageUrls[0]} alt="" className={`shrink-0 ${type === 'compact' ? 'w-16 h-16 rounded-lg' : 'w-32 h-28 rounded-md'}`} />
      <div className={`flex ml-4 lg:ml-2 grow ${type === 'compact' ? 'flex-col' : 'max-lg:flex-col lg:mt-4'}`}>
        <div className={`flex justify-between items-start ${type === 'default' ? 'shrink-0 w-full max-lg:flex-col lg:w-[38%] lg:h-full' : ''}`}>
          <span className={`${type === 'compact' ? 'text-sm pr-4' : ''}`}>{name}</span>
          {type === 'default' && <span className={`lg:hidden`}>{price} $</span>}
          {type === 'compact' && (
            <button onClick={deleteItem} disabled={isPending}>
              <TrashIcon className={`w-5`} />
            </button>
          )}
        </div>
        <div className={`${type === 'default' ? 'grow flex justify-between items-center max-lg:mt-4 lg:items-start' : ''}`}>
          <div className={`flex justify-between ${type === 'compact' ? 'mt-1' : 'max-lg:h-full'}`}>
            <QtySelector min={1} max={99} value={count} onChange={changeQty} size="sm" disabled={isPending} />
            {type === 'compact' && <span>{price} $</span>}
          </div>
          {type === "default" && (
            <>
              <span className={`hidden lg:block`}>{price} $</span>
              <button onClick={deleteItem} disabled={isPending}>
                <TrashIcon className={`w-5`} />
              </button>
            </>
          )}
        </div>
        </div>
    </div>
  )
}

export default CartItem;