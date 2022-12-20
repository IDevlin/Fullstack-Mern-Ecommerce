import { useContext, useRef, useState } from 'react';
import Badge from 'react-bootstrap/esm/Badge';
import { Link, NavLink } from 'react-router-dom';
import { StoreContext } from '../Store';

const Navbar = () => {
  const nav = useRef(null);
  const { state, dispatch } = useContext(StoreContext);

  const { cart, userInfo } = state;
  console.log(userInfo);

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
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
    console.log('ok')
  };
  return (
    <div>
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
              </li> (
                <li
                  className="nav__item dropdown "
                  onClick={() => dropdownMenu()}
                >
                   (
                    <li className="nav__item dropdown ">
                     
                      <ul className="dropdown__menu hide">
                   
                        <li className="dropdown__item">
                          <Link to="/profile" onClick={() => mobileToggle()}>
                            Edit Profile
                          </Link>
                        </li>
                        <li className="dropdown__item">
                          <Link
                            to="/orderhistory"
                            onClick={() => mobileToggle()}
                          >
                            Order History
                          </Link>
                        </li>

                        <li className="dropdown__item">
                          <Link to="/signin" onClick={() => signout()}>
                            Sign Out
                          </Link>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <span className="nav__link dropdown__link">
                      {userInfo.name}
                      <i className="bx bx-chevron-down dropdown__icon icon_rotate"></i>
                    </span>
                  )
                </li>
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
              )
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
