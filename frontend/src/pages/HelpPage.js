import React from 'react';
import { Container, Card } from 'react-bootstrap';

const HelpPage = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Help & Documentation</h1>
      
      <Card className="mb-4">
        <Card.Body>
          <h4>What is Cyclomatic Complexity?</h4>
          <p>
            Cyclomatic Complexity is a software metric developed by Thomas McCabe in 1976. 
            It measures the number of linearly independent paths through a program's source code,
            which correlates with the complexity of the code.
          </p>
          
          <h4>How to Use This Tool</h4>
          <ol>
            <li>Enter or upload your code</li>
            <li>Select the programming language</li>
            <li>Click "Analyze Code"</li>
            <li>Review the complexity metrics and charts</li>
            <li>Select a function to see detailed analysis and refactoring suggestions</li>
          </ol>
          
          <h4>Interpretation of Results</h4>
          <ul>
            <li><strong>Complexity 1-4:</strong> Low complexity - Simple code, easy to understand</li>
            <li><strong>Complexity 5-10:</strong> Moderate complexity - Consider refactoring</li>
            <li><strong>Complexity 11+:</strong> High complexity - Should be refactored</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HelpPage;