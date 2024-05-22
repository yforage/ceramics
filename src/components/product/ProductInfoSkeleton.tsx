import React from "react"

const ProductInfoSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4 w-full flex flex-col">
    <div className={`h-[74%] py-4 flex flex-col items-start space-y-4`}>
      <div className="order-1 w-full h-14 bg-zinc-200 rounded-md" />
      <div className="order-3 max-lg:h-6 lg:order-2 w-9/12 lg:w-3/5 grow bg-zinc-200 rounded-md" />
      <div className="order-2 lg:order-3 w-32 h-14 bg-zinc-200 rounded-md" />
      <div className={`order-4 flex space-x-4 w-full h-16 lg:h-14`}>
        <div className="basis-28 bg-zinc-200 rounded-xl" />
        <div className="grow lg:basis-44 bg-zinc-200 rounded-xl" />
      </div>
    </div>
    <div className={`flex space-x-12 grow`}>
      <div className={`flex-1 space-y-1 bg-zinc-200 rounded-md`} />
      <div className={`flex-1	space-y-1 bg-zinc-200 rounded-md`} />
    </div>
  </div>
)

export default ProductInfoSkeleton;