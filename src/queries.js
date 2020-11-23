import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    products {
      id
      title
      image_url
      price(currency: USD)
    }
  }
`;
