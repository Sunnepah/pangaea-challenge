import React from 'react';

const SingleProduct = ({ product, currencySymbol, handleAddToCart }) => {
  return (
    <>
      <div className="product">
        <img src={product.image_url} alt="product" />
        <p className="product__title"> {product.title}</p>
        <p className="product__price">
          From {currencySymbol.symbol}
          <span>{product.price.toFixed(2)}</span>
        </p>

        <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
      </div>
    </>
  );
};

export default SingleProduct;
