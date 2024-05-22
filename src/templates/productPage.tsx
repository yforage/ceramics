import React, { useMemo, useState } from "react";
import { ICartApi, ICategorieApi, IProductApi } from "../customTypes/api";
import ItemsRow from "../components/ItemsRow";
import Content from "../components/layout/Content";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import BreadCrumb from "../components/product/BreadCrumb";
import ImagesPreview from "../components/product/ImagesPreview";
import Button from "../components/shared/Button";
import QtySelector from "../components/shared/QtySelector";
import { ELinks } from "../constants";

interface IData {
  product: IProductApi;
  proposedItems: {
    nodes: IProductApi[];
  }
  categorie: Pick<ICategorieApi, 'name'>;
  cart: ICartApi;
}

interface IPageContext {
  id: IProductApi['id'];
  slug: IProductApi['slug'];
  categorieSlug: ICategorieApi['slug'];
}

const ProductPage: React.FC = () => {
  const [qty, setQty] = useState(1);

  return null;

  const { name, description, price, specs, rules, images } = data.product;

  const handleQtyChange = (newQty: number) => setQty(newQty);

  const processedImages = useMemo(() => images.map((data: ImageDataLike) => getImage(data)).filter((img): img is IGatsbyImageData => !!img), [images]);

  return (
    <>
      <Header activePage={ELinks.CATALOG} />
      <Content className={`pt-6 pb-20 space-y-8`}>
        <BreadCrumb crumbs={[{ name: 'Каталог', link: ELinks.CATALOG }, { name: data.categorie.name, link: `${ELinks.CATALOG}/?categorie=${pageContext.categorieSlug}` }, { name, link: '' }]} />
        <div className={`flex space-x-4 mt-6`}>
          <ImagesPreview className={`w-2/5 shrink-0`} images={processedImages} />
          <div className={`space-y-4`}>
            <div className={`h-[74%] py-4 flex flex-col items-start space-y-4`}>
              <p className={`font-virilica text-4xl`}>{name}</p>
              <div className={`flex-grow`}>
                {description}
              </div>
              <p className={`font-virilica text-4xl`}>{price}$</p>
              <div className={`flex space-x-4`}>
                <QtySelector value={qty} onChange={handleQtyChange} max={50} min={1} />
                <Button size="large">Добавить в корзину</Button>
              </div>
            </div>
            <div className={`flex space-x-12`}>
              <div className={`flex-1 space-y-1`}>
                {specs}
              </div>
              <div className={`flex-1	space-y-1`}>
                {rules}
              </div>
            </div>
          </div>
        </div>
        <ItemsRow title="Также Вам может понравится" isCentered={false} items={data.proposedItems.nodes} />
      </Content>
      <Footer />
    </>
  )
}

export default ProductPage;

// export const query = graphql`
//   query($id: String!, $categorieId: String!) {
//     product: contentfulProduct(id: { eq: $id }) {
//       id
//       name
//       price
//       description {
//         raw
//       }
//       images {
//         gatsbyImageData(placeholder: DOMINANT_COLOR)
//       }
//       specs {
//         raw
//       }
//       rules {
//         raw
//       }
//     }
//     proposedItems: allContentfulProduct(limit: 3) {
//       nodes {
//         id
//         price
//         name
//         slug
//         product_categorie {
//           slug
//         }
//         images {
//           gatsbyImageData(width: 500, placeholder:DOMINANT_COLOR, aspectRatio: 1)
//         }
//       }
//     }
//     categorie: contentfulProductCategorie(id: { eq: $categorieId }) {
//       name
//     }
//     cart: contentfulCart {
//       ...CartData
//     }
//   }
// `
