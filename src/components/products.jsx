import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_PRODUCTS } from '../queries';
import SingleProduct from './single-product';

const Products = () => {
  const { data } = useQuery(GET_PRODUCTS);

  return (
    <div>
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
                return <SingleProduct product={product} key={product.id} />;
              })
            : ''}
        </div>
      </section>
    </div>
  );
};

export default Products;
