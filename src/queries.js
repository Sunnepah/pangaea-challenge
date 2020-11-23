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

export const GET_ALL_CURRENCY = gql`
  query GET_ALL_CURRENCY {
    currency
  }
`;
