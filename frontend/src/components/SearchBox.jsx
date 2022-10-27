import { Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Badge from 'react-bootstrap/esm/Badge';
import { useState, useRef, useContext, useEffect } from 'react';

const SearchBox = () => {
  window.addEventListener('scroll', () => {
    const search = document.querySelector('.search');
    search.classList.toggle('active', window.scrollY > 100);
  });

  const { state, dispatch } = useContext(StoreContext);
  const { cart, userInfo } = state;

  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };
  }, []);

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <header className="search">
      <Link to="/">{<img className="image" src="./logo.png" />}</Link>
      <div className="search-box">
        <i className="fa fa-search"></i>
        <input className="form_control " type="text" placeholder="Search " />
        <span>All Category</span>
      </div>
      <Link to="/cart" className="nav-link" style={{ color: 'black' }}>
        Cart <i className="fa fa-shopping-bag icon_circle"></i>
        {cart.cartItems.length > 0 && (
          <Badge pill bg="danger">
            {cart.cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
          </Badge>
        )}
      </Link>
      {userInfo ? (
        <>
          <div>
            <h5
              className="menu-trigger"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {userInfo.name} <i class="fa-solid fa-caret-down"></i>{' '}
            </h5>{' '}
          </div>
          <div className="menu-container" ref={menuRef}>
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
    </header>
  );
};

export default SearchBox;
