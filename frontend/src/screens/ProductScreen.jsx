import React from 'react';
import { useParams } from 'react-router-dom';
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Rating from '../components/Rating';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const params = useParams();
  const {slug} = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return ( loading ? 
    <div>Loading...</div>
   : error ? 
    <div>{error}</div>
   : 
    <div>
      <Row>
        <Col md={6}>
          <img className='img-large'
          src={product.image} alt={product.name}/>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
             <ListGroup.Item>
              <h1>{product.name}</h1>
             </ListGroup.Item>
             <Rating  rating={product.rating} numReviews={product.numReviews}>
             </Rating>
             <ListGroup.Item>
              Descripción: 
              <p>{product.description}</p>
             </ListGroup.Item>
          </ListGroup>
       </Col>
        <Col md={3}>
        <Card className='mt-2'>
          <Card.Body>
            <ListGroup variant='flush'>
                 <ListGroup.Item>
                  <Row>
                    <Col>Precio:</Col>
                    <Col>Precio: ${product.price}</Col>
                  </Row>
                 </ListGroup.Item>
                 <ListGroup.Item >
                  <Row>
                    <Col>Status:</Col>
                    <Col> {product.countInStock > 0? 
                    <Badge bg='success'>Success</Badge> : <Badge bg='danger'>Agotado</Badge>}</Col>
                  </Row>
                 </ListGroup.Item>
                 {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button variant='primary'>
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                 )}
            </ListGroup>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
