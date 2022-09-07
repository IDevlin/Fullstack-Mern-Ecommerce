import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';

export default function SigninScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sing In</title>
      </Helmet>
      <h1 className="my-3">Sing In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" require></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" require></Form.Control>
        </Form.Group>
        <div className="md-3">
          <Button type="submit">Sing In</Button>
        </div>
        <div className="mb-3">
          New Customer{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create You Account</Link>
        </div>
      </Form>
    </Container>
  );
}
