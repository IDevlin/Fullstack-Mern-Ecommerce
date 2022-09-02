import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { StoreContext } from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

const CartScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);

  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <Helmet>
        <title>Shoping Cart</title>
      </Helmet>
      <h1>Shoping Cart</h1>
      <Row>
        <Col md={2}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart Is Empty <Link to="/">Go Shoping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => {
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={item.quantity == 1}>
                        {' '}
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>
                      <Button variant="light" disabled={item.quantity == 1}>
                        {' '}
                        <i className="fas fa-plus-circle"></i>
                      </Button>{' '}
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                        <Button varian='light'>
                            <i className='fas fa-trash'></i>
                        </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>;
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
};

export default CartScreen;
