//import React, { useState } from 'react';
import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Navbar from '../components/Navbar';
import SingleProductModal from '../components/modal/SingleProductModal';
import useProductScreen from '../hooks/useProduct';
import ProductScreen from './ProductScreen';
//import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const HomeScreen = () => {
  
  const [modal, setModal] = useState(false)

  const [slug, setSlug] = useState('')

  
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log(products)
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        //setProducts(result);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  const modalHandler = (product)=> {
    const  productItem= products.find((item)=> item.slug === product.slug)
    setSlug(productItem.slug)
    setModal(!modal)
  }


  return (
    <div >
      <Helmet>
        <title>Shop</title>
      </Helmet>
   
      <h1>Productos Destacados</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          products.map((product) => (
            <Product key={product.slug} product={product} slug={slug} setSlug={setSlug} modalHandler={modalHandler}></Product>
            
          ))
        )}
      </div>
     {modal && <ProductScreen slug={slug}></ProductScreen>}
    </div>
  );
};

export default HomeScreen;
