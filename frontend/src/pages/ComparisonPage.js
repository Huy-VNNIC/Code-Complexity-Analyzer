import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';

const ComparisonPage = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Compare Analysis Results</h1>
      
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Analysis Results</h5>
            <Button>Add Result</Button>
          </div>
        </Card.Header>
        <Card.Body>
          <p className="text-center">
            This feature will allow you to compare multiple analysis results.
            <br />
            Coming soon!
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ComparisonPage;