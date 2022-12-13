import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import { useContext } from 'react';
import axios from 'axios';
import {StoreContext} from '../Store';


const Product = ({product, slug, setSlug, modalHandler}) => {
  const navigate = useNavigate()

  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async () => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/id/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
  }
  ctxDispatch({
    type: 'CART_ADD_ITEM',
    payload: { ...product, quantity },
  });
  navigate('/cart')
};

  return (
    <div className="product">
      <div  onClick={()=> modalHandler(product)}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </div>
      <div className="product-info">
        <Link to={`product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
        <p>
          <strong>Precio: ${product.price}</strong>
        </p>
       {product.countInStock == 0 ? <Button variant='light' disabled>Sin Stock</Button>:<Button onClick={()=> addToCartHandler()}>Agregar al Carrito</Button> } 
      
      </div>
  
    </div>
  );
};

export default Product;
