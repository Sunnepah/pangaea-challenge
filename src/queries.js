import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;

export const GET_ALL_CURRENCY = gql`
  query GET_ALL_CURRENCY {
    currency
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;
