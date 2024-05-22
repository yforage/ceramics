import React from "react";
import { ELinks } from "../constants";
import { IProductApi } from "../customTypes/api";
import FloatedBlock from "./gallery/FloatedBlock";

interface IItemLargePreviewProps extends IProductApi {}

const ItemLargePreview: React.FC<IItemLargePreviewProps> = ({ imageUrls, name, slug, categorie, ...floatedProps }) => {
  return (
    <div className="relative">
      <img className={`w-full lg:aspect-video object-cover rounded-2xl lg:rounded-md`} src={imageUrls[0]} alt="background" />
      <FloatedBlock
        {...floatedProps}
        className="lg:absolute lg:w-6/12 lg:-translate-y-1/2 lg:top-1/2 lg:right-8"
        button="Показать в каталоге"
        title={name}
        link={`${ELinks.CATALOG}/${categorie.slug}/${slug}`}
      />
    </div>
  )
}

export default ItemLargePreview;