import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryParamString } from "react-use-query-param-string";
import { EProductSortings, IProductApi } from "../../customTypes/api";
import SelectionLeft from "../../components/icons/SelectionLeft";
import Content from "../../components/layout/Content";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import ProductCard from "../../components/product/ProductCard";
import MenuDropDown from "../../components/shared/MenuDropDown";
import { ELinks } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { fetchCatalogData, processEdge } from "../../api/requests";
import { useAddToCartMutation } from "../../api/mutations";

const CatalogPage: React.FC = () => {
  const { isPending, data } = useQuery({
    queryKey: ['catalogData'],
    queryFn: fetchCatalogData,
  })

  const [categorie, setCategorie] = useQueryParamString('categorie', 'all');
  const [sortBy, setSortBy] = useQueryParamString('sort', EProductSortings.AVAILABLE);

  const [products, setProducts] = useState<IProductApi[]>([]);

  const { mutate: addToCart } = useAddToCartMutation();

  useEffect(() => {
    if (isPending || !data) return;

    let updatedProducts = [];

    if (categorie === 'all') {
      updatedProducts = data.allCategories.reduce<IProductApi[]>((acc, curr) => [...acc, ...curr.productCollection.edges.map(processEdge)], []);
    } else {
      updatedProducts = data.allCategories.find(({ slug }) => slug === categorie)?.productCollection.edges.map(processEdge) ?? [];
    }

    if (sortBy === EProductSortings.AVAILABLE) {
      setProducts(updatedProducts);
      return;
    }
    const sorted = updatedProducts.sort(({ price: a }, { price: b }) => sortBy === EProductSortings.PRICE_ASC ? a - b : b - a);
    setProducts(sorted);
  }, [sortBy, categorie, data, isPending])

  const handleSelectCategorie = useCallback((e: React.MouseEvent<HTMLButtonElement>) => setCategorie(e.currentTarget.value), [setCategorie]);
  const handleSelectSortBy = useCallback((sort: EProductSortings) => setSortBy(sort), [setSortBy]);

  const categories = useMemo(() => {
    if (isPending || !data) return [];
    return [
      {
        id: 'all',
        name: 'Все позиции',
        slug: 'all',
      },
      ...data.allCategories
    ].map(({ id, name, slug }) => (
      <button
        className={`relative shrink-0`}
        key={id}
        value={slug}
        onClick={handleSelectCategorie}
      >
        {name}
        {slug === categorie && <SelectionLeft className="absolute -left-[20%] top-[80%] w-[140%] -translate-y-2/4" />}
      </button>
    ))
  }, [data, categorie, handleSelectCategorie, isPending]);

  return (
    <>
      <Header activePage={ELinks.CATALOG} />
      <Content className={`py-4 lg:py-10`}>
        <p className={`text-3xl font-virilica lg:hidden`}>Каталог</p>
        <div className={`mb-5 lg:flex lg:items-start lg:items-center lg:justify-between`}>
          <div className={`w-full flex overflow-x-auto overflow-y-hidden px-2.5 space-x-4 py-2 ${categories.length === 0 ? 'w-2/6' : ''}`}>
            {categories}
            {categories.length === 0 && <div className="w-full h-7 bg-zinc-200 rounded-md" />}
          </div>
          <MenuDropDown selected={sortBy as EProductSortings} onSelect={handleSelectSortBy} />
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-3 gap-6 ${products.length === 0 ? 'animate-pulse' : ''}`}>
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            )
          })}
          {products.length === 0 && Array.from({ length: 3 }).map(() => (
            <div className="mt-2.5">
              <div className="aspect-square bg-zinc-200 rounded-xl" />
              <div className="h-6 w-4/6 mt-2 mb-1 bg-zinc-200 rounded-md" />
              <div className="h-8 w-[20%] bg-zinc-200 rounded-lg" />
            </div>
          ))}
        </div>
      </Content>
      <Footer activePage={ELinks.CATALOG} />
    </>
  )
}

export default CatalogPage;
