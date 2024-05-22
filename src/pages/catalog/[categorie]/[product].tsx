import React, { useCallback, useMemo, useState } from "react";
import Header from "../../../components/layout/Header";
import { ELinks } from "../../../constants";
import Content from "../../../components/layout/Content";
import BreadCrumb from "../../../components/product/BreadCrumb";
import ImagesPreview from "../../../components/product/ImagesPreview";
import { useQuery } from "@tanstack/react-query";
import { fetchIndexData, fetchProductData } from "../../../api/requests";
import QtySelector from "../../../components/shared/QtySelector";
import Button from "../../../components/shared/Button";
import ItemsRow from "../../../components/ItemsRow";
import Footer from "../../../components/layout/Footer";
import ProductInfoSkeleton from "../../../components/product/ProductInfoSkeleton";
import { PageProps } from "gatsby";
import ExpandableText from "../../../components/shared/ExpandableText";
import { useAddToCartMutation } from "../../../api/mutations";

const ProductPage = ({ params }: PageProps) => {
  const { data } = useQuery({
    queryKey: ['productData', params.product],
    queryFn: () => fetchProductData(params.product),
  })

  const popularItems = useQuery({
    queryKey: ['indexData'],
    queryFn: fetchIndexData,
  })

  const [qty, setQty] = useState(1);

  const { mutate: addToCart, isPending: isAddToCartPending } = useAddToCartMutation();

  const handleQtyChange = useCallback((newQty: number) => setQty(newQty), []);

  const crumbs = useMemo(() => {
    const result = [{ name: 'Каталог', link: ELinks.CATALOG }];

    if (!data) return result;

    return [
      ...result,
      { name: data?.product.categorie.name, link: `${ELinks.CATALOG}/?categorie=${params.categorie}` },
      { name: data?.product.name, link: '' },
    ]
  }, [data, params])

  const handleAddClick = useCallback(() => {
    addToCart({
      product: data?.product,
      count: qty,
    })
  }, [addToCart, data?.product, qty])

  return (
    <>
      <Header activePage={ELinks.CATALOG} />
      <Content className={`pt-6 pb-20 space-y-8`}>
        <BreadCrumb crumbs={crumbs} length={3} />
        <div className={`flex max-lg:flex-col lg:space-x-4 mt-6`}>
          <ImagesPreview className={`w-full lg:w-2/5 shrink-0`} images={data?.product.imageUrls} />
          {data && ( 
            <div className={`space-y-4`}>
              <div className={`h-[74%] py-4 flex flex-col items-start space-y-4`}>
                <p className={`font-virilica text-3xl order-1 lg:text-4xl`}>{data?.product.name}</p>
                <div className={`grow order-3 lg:order-2`}>
                  <ExpandableText text={data.product.description} />
                </div>
                <p className={`font-virilica text-3xl order-2 lg:order-3 lg:text-4xl`}>{data?.product.price}$</p>
                <div className={`max-lg:w-full max-lg:h-16 flex space-x-4 order-4 ${isAddToCartPending ? 'animate-pulse' : ''}`}>
                  <QtySelector value={qty} onChange={handleQtyChange} max={50} min={1} disabled={isAddToCartPending} />
                  <Button size="large" className="max-lg:grow" onClick={handleAddClick} disabled={isAddToCartPending}>
                    Добавить в корзину
                  </Button>
                </div>
              </div>
              <div className={`flex space-x-12`}>
                <div className={`flex-1 space-y-1`}>
                  {data?.product.specs}
                </div>
                <div className={`flex-1	space-y-1`}>
                  {data?.product.rules}
                </div>
              </div>
            </div>
          )}
          {!data && <ProductInfoSkeleton />}
        </div>
        <ItemsRow title="Также Вам может понравится" isCentered={false} items={popularItems.data?.popularItems} />
      </Content>
      <Footer activePage={ELinks.CATALOG} />
    </>
  )
}

export default ProductPage;