import React, { useEffect, useRef, useState } from "react"
import { type HeadFC, type PageProps } from "gatsby"
import { useQueryParamString } from "react-use-query-param-string"
import Gallery from "../components/gallery/Gallery";
import Header from "../components/layout/Header";
import Quote from "../components/shared/Quote";
import TextBlock from "../components/shared/TextBlock";
import { ELinks } from "../constants";
import Content from "../components/layout/Content";
import { useQuery } from "@tanstack/react-query";
import { fetchIndexData } from "../api/requests";
import Footer from "../components/layout/Footer";
import ItemsRow from "../components/ItemsRow";
import { AboutBlockContent, DeliveryBlockContent } from "../constants/content";
import ItemLargePreview from "../components/ItemLargePreview";

const IndexPage: React.FC<PageProps> = () => {
  const [block] = useQueryParamString('block', '');

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const deliveryRef = useRef<HTMLDivElement | null>(null);

  const { isPending, data } = useQuery({
    queryKey: ['indexData'],
    queryFn: fetchIndexData,
  })

  useEffect(() => {
    if (block === 'about' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (block === 'delivery' && deliveryRef.current) {
      deliveryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [block])

  return (
    <>
      <Header activePage={ELinks.HOME} />
      <Content className={`py-4 pb-10 space-y-8 lg:space-y-24`}>
        <Gallery />
        <Quote author="Иоганн Вольганг Гете" text="В любом произведении искусства, великом или малом, всё до последних мелочей зависит от замысла." />
        {!isPending && data && <ItemsRow title="Популярные товары" items={data.popularItems} />}
        <TextBlock {...AboutBlockContent} ref={aboutRef} />
        {!isPending && data &&  <ItemLargePreview {...data.popularItems[0]} />}
        <TextBlock {...DeliveryBlockContent} ref={deliveryRef} />
      </Content>
      <Footer activePage={ELinks.HOME} />
    </>
  )
}

export default IndexPage;

export const Head: HeadFC = () => <title>Блюдце в пастель</title>
