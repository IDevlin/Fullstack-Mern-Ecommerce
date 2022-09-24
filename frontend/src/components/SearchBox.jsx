
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../Store';
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/esm/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';


const SearchBox = () => {
  window.addEventListener('scroll', () => {
    const search = document.querySelector('.search')
    search.classList.toggle('active', window.scrollY > 100)
})
  
const {state, dispatch} = useContext(StoreContext)
const {cart, userInfo} = state
console.log(state)

const signoutHandler = () => {
  dispatch({ type: 'USER_SIGNOUT' });
  localStorage.removeItem('userInfo');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('paymentMethod');
  window.location.href = '/signin';
};

  return (
    <header>
      <Navbar className='search f_flex'  bg="ligth" variant="ligth" expand="lg" >
        <Container>
          <Link to="/">
            {<img className='image' src="./public/logo.png"/>}
          </Link>
          <div className="search-box">
                        <i className="fa fa-search"></i>
                        <input class="form_contol " type="text" placeholder='Search ' />
                        <span>All Category</span>
                    </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-100 justify-content-end" >
              <Link to="/cart" className="nav-link" style={{color:  'black'}}>
                Cart{' '}<i className="fa fa-shopping-bag icon_circle"></i>
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce(
                      (acc, curr) => acc + curr.quantity,
                      0
                    )}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link style={{color:  'black'}}
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Sing Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/signin" style={{color:  'black'}}>
                  Sign In
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default SearchBox;
