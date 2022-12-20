import logo from '/images/logo.png'
import { Link, NavLink } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';
import Badge from 'react-bootstrap/esm/Badge';
import { useState, useContext, useRef, useEffect } from 'react';

const HeaderMenu = () => {
  const nav = useRef(null);
  const [sideMenu, setSideMenu] = useState(false);

  const dropdownMenu = () => {
    const dropdown = document.querySelector('.dropdown__menu');
    const dropdownIcon = document.querySelector('.dropdown__icon');
    dropdown.classList.toggle('hide');
    dropdownIcon.classList.toggle('icon_rotate');
  };

  /*window.addEventListener('scroll', () => {
    const header = document.querySelector('');
    header.classList.toggle('', window.scrollY > 100);
  });*/

  const { state, dispatch } = useContext(StoreContext);

  const { cart, userInfo } = state;
  console.log(userInfo);

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    //window.location.href = '/signin';
  };

  const mobileToggle = () => {
    nav.current.classList.toggle('show');
    nav.current.classList.value.includes('show')
      ? setSideMenu(false)
      : setSideMenu(true);
  };

  const signout = () => {
    mobileToggle();
    signoutHandler();
  };

  return (
    <header className="header_menu">
      <Link to="/">
        <img className="image" src={logo} alt="logo" />
      </Link>
      {!sideMenu ? (
        <i
          className="bx bx-menu header__toggle"
          id="header-toggle"
          onClick={() => mobileToggle()}
        ></i>
      ) : (
        <i
          className="bx bx-x header__toggle"
          onClick={() => mobileToggle()}
        ></i>
      )}{' '}
      <nav className="nav" id="nav-menu" ref={nav}>
        <div className="nav__content bd-grid">
          <div className="nav__img">
            <img className="image" src="./images/logo.png" />
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
                <NavLink to="/cart" onClick={() => mobileToggle()}>
                  <span>
                    Cart <i className="fa fa-shopping-bag icon_circle"></i>
                  </span>

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
              
                <ul
                  className="nav__item dropdown "
                  onClick={() => dropdownMenu()}
                >
                  {userInfo.isAdmin ? (
                    <li className="nav__item dropdown ">
                      <span className="nav__link dropdown__link">
                        Admin
                        <i className="bx bx-chevron-down dropdown__icon icon_rotate"></i>
                      </span>
                    </li>
                  ) : (
                    <span className="nav__link dropdown__link">
                      {userInfo.name}
                      <i className="bx bx-chevron-down dropdown__icon icon_rotate"></i>
                    </span>
                  )}

                  <ul className="dropdown__menu ">
                    {userInfo.isAdmin && (
                      <li className="dropdown__item">
                        <Link
                          to="/admin/dashboard"
                          onClick={() => mobileToggle()}
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li className="dropdown__item">
                      <Link to="/profile" onClick={() => mobileToggle()}>
                        Edit Profile
                      </Link>
                    </li>
                    <li className="dropdown__item">
                      <Link to="/orderhistory" onClick={() => mobileToggle()}>
                        Order History
                      </Link>
                    </li>

                    <li className="dropdown__item">
                      <Link to="/signin" onClick={() => signout()}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </ul>
               
              ) : (
             
                <li className="nav__item">
                  <Link
                    className="nav-link"
                    to="/signin"
                    onClick={() => mobile()}
                  >
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

export default HeaderMenu;
