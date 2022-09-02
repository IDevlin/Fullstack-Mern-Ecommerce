import  { StoreContext } from './Store';
import Nav from 'react-bootstrap/Nav'
import { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import HomeScreen from './screens/HomeScreen';
import Badge from 'react-bootstrap/esm/Badge';
import Container from 'react-bootstrap/Container';
import ProductScreen from './screens/ProductScreen';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CartScreen from './screens/CartScreen';


function App() {
  const {state} = useContext(StoreContext)
  const {cart}= state

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Mi Tienda</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  {
                    cart.cartItems.length > 0 && (
                      <Badge pill bg='danger'>
                        {cart.cartItems.reduce((acc, curr)=> acc + curr.quantity, 0)}
                      </Badge>
                    )
                  }
                </Link>
              </Nav>
            </Container>
          </Navbar>
          <Link to="/">Mi Tienda</Link>
        </header>
        <main>
          
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
         
        </main>
        <footer>
          <div className='text-center'>Todos los derechos reservados</div>
        </footer>
      </div>
    
    </BrowserRouter>
  );
}

export default App;
