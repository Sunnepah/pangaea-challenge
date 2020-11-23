import React from 'react';

const SingleProduct = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image_url} alt="product" />
      <p className="product__title"> {product.title}</p>
      <p className="product__price">From ${product.price.toFixed(2)}</p>

      <button>Add To Cart</button>
    </div>
  );
};

export default SingleProduct;
