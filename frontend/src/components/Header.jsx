import React from 'react'
import { useContext } from 'react';
import { StoreContext } from '../Store';
import { Link } from 'react-router-dom';
import Head from '../components/Head';
import Navbar from '../components/Navbar';
import './Header.css'
import HeaderMenu from './HeaderMenu';

const Header = () => {
    const { state, dispatch } = useContext(StoreContext);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  return (
    <div>
    <Head/>
    <HeaderMenu/>
    </div>
  )
}

export default Header