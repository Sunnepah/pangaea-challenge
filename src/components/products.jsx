import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_PRODUCTS } from '../queries';
import SingleProduct from './single-product';
import getSymbolFromCurrency from 'currency-symbol-map';
import { cartItemsVar } from '../apollo';
import Cart from './cart';

const Products = () => {
  const [displayCart, setDisplayCart] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState(
    getSymbolFromCurrency('USD')
  );
  const { data, refetch: refetchProducts } = useQuery(GET_PRODUCTS, {
    variables: { currency: 'USD' },
  });

  const getItem = (item) => {
    const cartItems = cartItemsVar();
    return cartItems.find((cartItem) => cartItem.id === item.id);
  };

  const handleAddToCart = (product) => {
    setDisplayCart(true);
    addItemToCart(product);
  };

  const removeItemFromCart = (product) => {
    const cartItem = getItem(product);
    if (cartItem.quantity > 1) {
      cartItem.quantity = cartItem.quantity - 1;
      cartItem.totalAmount = product.price * cartItem.quantity;
      cartItemsVar([...cartItemsVar()]);
    } else {
      deleteCartItem(product);
    }
  };

  const deleteCartItem = (product) => {
    const cartItems = cartItemsVar();
    const filteredCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== product.id
    );
    cartItemsVar([...filteredCartItems]);
  };

  const addItemToCart = (product) => {
    const cartItem = getItem(product);
    if (!cartItem) {
      const updatedProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      cartItemsVar([...cartItemsVar(), updatedProduct]);
    } else {
      cartItem.quantity = cartItem.quantity + 1;
      cartItem.totalAmount = product.price * cartItem.quantity;
      cartItemsVar([...cartItemsVar()]);
    }
  };

  return (
    <div>
      {displayCart && (
        <Cart
          hideCart={() => setDisplayCart(false)}
          addToCart={addItemToCart}
          removeFromCart={removeItemFromCart}
          refetchProducts={refetchProducts}
          deleteCartItem={deleteCartItem}
          setCurrencySymbol={setCurrencySymbol}
          currencySymbol={currencySymbol}
        />
      )}
      <section className="products__header">
        <div>
          <h1>All Products</h1>
          <p>A 360° look at Lumin</p>
        </div>
      </section>

      <section className="products__container">
        <div className="products__container--list">
          {data?.products?.length
            ? data?.products.map((product) => {
                return (
                  <SingleProduct
                    product={product}
                    key={product.id}
                    refetchProducts={refetchProducts}
                    currencySymbol={currencySymbol}
                    setCurrencySymbol={setCurrencySymbol}
                    handleAddToCart={handleAddToCart}
                  />
                );
              })
            : ''}
        </div>
      </section>
    </div>
  );
};

export default Products;
