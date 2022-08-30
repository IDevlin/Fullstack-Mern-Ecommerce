import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
 

function App() {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Mi Tienda</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
          <Link to="/">Mi Tienda</Link>
        </header>
        <main>
          
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
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
