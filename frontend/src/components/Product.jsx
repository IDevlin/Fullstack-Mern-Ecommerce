import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = (props) => {
  const { product } = props;
  return (
    <div className="product">
      <Link to={`product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <div className="product-info">
        <Link to={`product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
        <p>
          <strong>Precio: ${product.price}</strong>
        </p>
        <button>Agregar al Carrito</button>
      </div>
    </div>
  );
};

export default Product;
