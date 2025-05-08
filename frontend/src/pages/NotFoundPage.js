import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button as={Link} to="/" variant="primary">
        Go to Home Page
      </Button>
    </Container>
  );
};

export default NotFoundPage;