import React from "react";

const CartItemSkeleton: React.FC = () => (
  <div className={`animate-pulse flex mb-4`}>
    <div className={`aspect-square bg-zinc-200 w-16 h-16 rounded-md`} />
    <div className={`grow flex-col ml-4`}>
      <div className={`bg-zinc-200 h-14 mb-2 rounded-md	`} />
      <div className={`bg-zinc-200 h-8 rounded-md	`} />
    </div>
  </div>
)

export default CartItemSkeleton;