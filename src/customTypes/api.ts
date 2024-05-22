export interface IProductApi {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  slug: string;
  categorie: ICategorieApi;
  specs: string;
  rules: string;
}

export interface ICategorieApi {
  id: string;
  name: string;
  productCollection: {
    edges: {
      node: IProductApi;
    }[]
  };
  slug: string;
}

export enum EProductSortings {
  AVAILABLE = 'available',
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
}

export interface IAllContentfulProduct {
  allContentfulProduct: {
    nodes: IProductApi[];
  }
}

export interface ICartApi {
  id: string;
  content: IProductApi[];
}