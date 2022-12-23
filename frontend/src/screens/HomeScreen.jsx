//import React, { useState } from 'react';
import { useReducer, useEffect, useState, useCallback, useMemo, lazy, Suspense } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
const ProductScreenLazy = lazy(() => import('./ProductScreen'));


const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: payload };
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

  useEffect(() => {
   document.querySelector('html').style.overflow = 'auto' //active overflow in this view
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

  const modalHandler = useCallback((product) => {
    const productItem = products.find((item) => item.slug === product.slug);
    setSlug(productItem.slug);
    setModal(!modal);
  }, [modal, products]);

  const productElements = useMemo(
    () =>
      products.map((product) => (
        <Product
          key={product.slug}
          product={product}
          slug={slug}
          setSlug={setSlug}
          modalHandler={modalHandler}
        ></Product>
      )),
    [products, slug, setSlug, modalHandler]
  );


  return (
    <div className='home_container'>
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
         productElements
        )}
      </div>
      {modal && (
  <Suspense fallback={<LoadingBox />}>
    <ProductScreenLazy slug={slug} />
  </Suspense>
)}
    </div>
  );
};

export default HomeScreen;
