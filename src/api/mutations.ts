import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { ICartProduct, CartContext } from "../context/CartContext";

interface IAddToCartMutationFnProps {
  product?: ICartProduct['product'];
  count: ICartProduct['count'];
}

export const useAddToCartMutation = () => {
  const { setCartContent } = useContext(CartContext);

  const mutation = useMutation({
    mutationFn: async ({ product, count }: IAddToCartMutationFnProps) => {
      if (!product?.id) {
        throw new Error('no product');
      };
      const currentStorage = JSON.parse(localStorage.getItem('ceramics-cart') || '') || {};
      if (currentStorage[product.id]) {
        currentStorage[product.id] += count;
      } else {
        currentStorage[product.id] = count;
      }
      localStorage.setItem('ceramics-cart', JSON.stringify(currentStorage));
      return {
        addedProduct: product,
        addedCount: count,
      };
    },
    onSuccess: ({ addedProduct, addedCount }) => {
      setCartContent((prev) => {
        const copy = [...prev];
        const existingIndex = copy.findIndex((stateProduct) => stateProduct.product.id === addedProduct.id);
        if (existingIndex !== -1) {
          copy[existingIndex].count += addedCount;
          return copy;
        }
        return  [...prev, { product: addedProduct, count: addedCount }];
      });
    }
  })

  return mutation;
}