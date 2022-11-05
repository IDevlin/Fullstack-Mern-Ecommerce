import { Link, NavLink } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';
import Badge from 'react-bootstrap/esm/Badge';
import { useState, useRef, useContext, useEffect } from 'react';

const SearchBox = () => {

  const dropdownMenu =() => {
    const dropdown =  document.querySelector('.dropdown__menu')
    const dropdownIcon = document.querySelector('.dropdown__icon')
     dropdown.classList.toggle('hide')
     dropdownIcon.classList.toggle('icon_rotate')
  }

  window.addEventListener('scroll', () => {
    const header = document.querySelector('');
    header.classList.toggle('', window.scrollY > 100);
  });

  const { state, dispatch } = useContext(StoreContext);
  const { cart, userInfo } = state;
  console.log(cart);


  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    this.location.href = '/signin';
  };

  return (
    <header className="header">
     
      <Link to="/">{<img className="image" src="./logo.png" />}</Link>

      <i class="bx bx-menu header__toggle" id="header-toggle"></i>
     
      <nav className="nav" id="nav-menu">
        <div className="nav__content bd-grid">
          <div className="nav__img">
            <img  className="image" src="./logo.png" />
          </div>
          <div className="nav__menu">
            <ul className="nav__list">
            {/*<div className="search-box">
                <i className="fa fa-search" type="submit"></i>
                <input
                  className="form_control "
                  type="text"
                  placeholder="Search "
                />
                <span>All Category</span>
  </div>*/}
              <li className="nav__item">
                <NavLink to="/cart" >
                  {' '}<span>Cart <i className="fa fa-shopping-bag icon_circle"></i></span>
                  
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce(
                        (acc, curr) => acc + curr.quantity,
                        0
                      )}
                    </Badge>
                  )}
                </NavLink>
              </li>
              {userInfo ? (
                <li className="nav__item dropdown" onClick={() => dropdownMenu()}>
                  <span className="nav__link dropdown__link">
                    {userInfo.name}
                    <i class="bx bx-chevron-down dropdown__icon"></i>
                  </span>
                  <ul className="dropdown__menu ">
                    <li class="dropdown__item">
                      <Link to="/profile">Edit Profile</Link>
                    </li>
                    <li class="dropdown__item">
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li class="dropdown__item">
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav__item">
                <Link className="nav-link" to="/signin">
                Sign In
              </Link>
              </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      </header>
/*
      <div className="search-box">
        <i className="fa fa-search" type="submit"></i>
        <input className="form_control " type="text" placeholder="Search " />
        <span>All Category</span>
      </div>
      <div className="heading-rigth">
        <div className="cart">
          <Link to="/cart" style={{ color: 'black' }}>
            Cart <i className="fa fa-shopping-bag icon_circle"></i>
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </Badge>
            )}
          </Link>
        </div>
        <button className="toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? (
            <i className="fas fa-times close home-btn"></i>
          ) : (
            <i className="fa-solid fa-bars open"></i>
          )}{' '}
        </button>

        {userInfo ? (
          <>
            <div className="menu">
              <h5
                className="menu-trigger"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {userInfo.name} <i className="fa-solid fa-caret-down"></i>{' '}
              </h5>{' '}
            </div>

            <div
              className={mobileMenu ? 'box-menu' : 'desactive'}
              ref={menuRef}
            >
              <div className={`dropdown_menu ${open ? 'active' : 'inactive'}`}>
                <ul className="dropdownItem">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li className="dropdownItem">
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li className="dropdownItem">
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        )}
      </div>*/
   
  );
};

export default SearchBox;
