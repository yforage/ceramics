import { gql, GraphQLClient } from "graphql-request";
import { ICategorieApi, IProductApi } from "../customTypes/api";

const client = new GraphQLClient(`${process.env.GATSBY_SUPABASE_URL}/graphql/v1`, {
  headers: {
    'apiKey': `${process.env.GATSBY_SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  }
})

export const processEdge = <T>({ node }: { node: T }) => node;

const FRAGMENT_PRODUCT = gql`
  fragment ProductDetails on product {
    id
    name
    price
    slug
    imageUrls
    categorie {
      slug
    }
  }
`

const cartQuery = gql`
`

interface ICartItemsResponse {
  productCollection: {
    edges: {
      node: IProductApi;
    }[]
  }
}

export const fetchCartContent = async (userId?: string) => {
  if (!userId) return;

  const response = await client.request<ICartItemsResponse>(cartQuery, { userId });

  return [];
  // return response.productCollection.edges.map(processEdge).map((product) => ({
  //   product,
  //   count: parsed[product.id],
  // }))
}

const popularItemsQuery = gql`
  query getPopularItems {
    productCollection(orderBy: {totalOrdered: DescNullsLast}) {
      edges {
        node {
          ...ProductDetails
        }
      }
    }
  }
  ${FRAGMENT_PRODUCT}
`
interface IPopularItemsResponse {
  productCollection: {
    edges: {
      node: IProductApi;
    }[]
  }
}

export const fetchIndexData = async () => {
  const response = await client.request<IPopularItemsResponse>(popularItemsQuery);

  return {
    popularItems: response.productCollection.edges.map(processEdge),
  };
}

const catalogQuery = gql`
  query catalogQuery {
    categorieCollection {
      edges {
        node {
          id
          name
          slug
          productCollection {
            edges {
              node {
                ...ProductDetails
              }
            }
          }
        }
      }
    }
  }
  ${FRAGMENT_PRODUCT}
`

interface ICatalogResponse {
  categorieCollection: {
    edges: {
      node: ICategorieApi;
    }[]
  }
}

export const fetchCatalogData = async () => {
  const response = await client.request<ICatalogResponse>(catalogQuery);

  return {
    allCategories: response.categorieCollection.edges.map(processEdge),
  }
}

const productDataQuery = gql`
  query getProductData($slug: String!) {
    productCollection (filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          name
          price
          imageUrls
          description
          specs
          rules
          categorie {
            name
          }
        }
      }
    }
  }
`

interface IProductDataResponse {
  productCollection: {
    edges: {
      node: IProductApi;
    }[]
  }
}

export const fetchProductData = async (slug: IProductApi['slug']) => {
  const cart = await fetchCartContent();
  const response = await client.request<IProductDataResponse>(productDataQuery, { slug });

  return {
    cart,
    product: response.productCollection.edges.map(processEdge)[0],
  }
}


export const addToCart = (id: string, qty?: number) => {
  const currentCart = localStorage.getItem('ceramics-cart');
  const parsed = currentCart ? JSON.parse(currentCart) : {};

  if (parsed[id]) {
    parsed[id] += qty || 1;
  } else {
    parsed[id] = qty || 1;
  }

  localStorage.setItem('ceramics-cart', JSON.stringify(parsed));
}

const catalogLinksDataQuery = gql`
  query getCatalogLinks {
    categorieCollection {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`

interface ICategoriesLinksDataResponse {
  categorieCollection: {
    edges: {
      node: Pick<ICategorieApi, 'id' | 'name' | 'slug'>
    }[]
  }
}

export const fetchCategoriesLinks = async () => {
  const response = await client.request<ICategoriesLinksDataResponse>(catalogLinksDataQuery);

  return {
    categories: response.categorieCollection.edges.map(processEdge)
  }
}