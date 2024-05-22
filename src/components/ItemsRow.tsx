import React from "react"
import { IProductApi } from "../customTypes/api";
import ProductCard from "./product/ProductCard";
import { useAddToCartMutation } from "../api/mutations";

interface IItemsRowProps {
  title: string;
  items?: IProductApi[];
  isCentered?: boolean;
}

const ItemsRow: React.FC<IItemsRowProps> = ({ items, title, isCentered = true }) => {
  const { mutate: addToCart } = useAddToCartMutation();

  return (
    <div className={`flex flex-col`}>
      <h1 className={`font-virilica text-3xl lg:text-4xl ${isCentered ? 'py-2 lg:text-center lg:py-8' : ''}`}>
        {title}
      </h1>
      <div className={`w-full flex space-x-4 max-lg:overflow-x-auto lg:flex lg:space-x-6`}>
        {items && items.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onAdd={addToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default ItemsRow;
