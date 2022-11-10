/* eslint-disable react/prop-types */
import React from 'react';

const SingleProduct = ({ product, currency, handleAddToCart }) => {
  return (
    <>
      <div className="product">
        <img src={product.image_url} alt="product" />
        <p className="product__title"> {product.title}</p>
        <p className="product__price">
          From {currency.symbol}
          <span>{product.price.toFixed(2)}</span>
        </p>

        <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
      </div>
    </>
  );
};

export default SingleProduct;
