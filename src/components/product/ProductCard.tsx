import React from "react";
import { Link } from "gatsby";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Button from "../shared/Button";
import { ICartProduct } from "../../context/CartContext";
import { IProductApi } from "../../customTypes/api";
import { ELinks } from "../../constants";

interface IProductCardProps {
  product: IProductApi;
  onAdd: (data: ICartProduct) => void;
}

const ProductCard: React.FC<IProductCardProps> = ({ product, onAdd }) => {
  const handleClickAdd = () => {
    onAdd({
      product,
      count: 1,
    })
  }

  return (
    <div className={`flex flex-col max-lg:basis-52 max-lg:grow-0 max-lg:shrink-0 lg:w-full`}>
      <Link className={`lg:mt-2.5 mb-1`} to={`${ELinks.CATALOG}/${product.categorie.slug}/${product.slug}`}>
        <div className={`w-full aspect-square overflow-hidden rounded-xl group`}>
          <img
            className={`group-hover:scale-125 transition-transform h-full object-cover`}
            src={product.imageUrls[0]}
            alt={product.name}
          />
        </div>
        <p className={`mt-2`}>{product.name}</p>
      </Link>
      <Button size="small" className="self-start" onClick={handleClickAdd}>
        <ShoppingBagIcon className={`w-4`} />
        <span className={`ml-2.5`}>{product.price} $</span>
      </Button>
    </div>
  )
};

export default ProductCard;