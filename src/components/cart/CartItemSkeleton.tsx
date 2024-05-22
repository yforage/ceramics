import React from "react";

const CartItemSkeleton: React.FC = () => (
  <div className={`flex mb-4`}>
    <div className={`w-32 h-28 rounded-md bg-zinc-200`} />
    <div className={`grow flex-col ml-2 mt-6`}>
      <div className={`flex justify-between`}>
        <div className={`bg-zinc-200 h-4 w-[16%] mb-2 rounded-md	`} />
        <div className={`bg-zinc-200 w-16 h-8 rounded-md	`} />
        <div className={`bg-zinc-200 w-12 h-8 rounded-md	`} />
        <div className={`bg-zinc-200 w-6 h-8 rounded-md	`} />
      </div>
    </div>
  </div>
)

export default CartItemSkeleton;