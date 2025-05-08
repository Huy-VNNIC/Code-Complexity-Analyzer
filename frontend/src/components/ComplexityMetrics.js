import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const ComplexityMetrics = ({ totalComplexity, totalLOC, functionCount }) => {
  const getComplexityLevel = (complexity) => {
    if (complexity < 5) return { level: 'Low', class: 'success', text: 'Good' };
    if (complexity < 10) return { level: 'Moderate', class: 'warning', text: 'Moderate' };
    return { level: 'High', class: 'danger', text: 'Complex' };
  };
  
  const complexityInfo = getComplexityLevel(totalComplexity || 0);
  
  return (
    <div className="mb-4">
      <h3 className="mb-3">Code Complexity Summary</h3>
      
      <Row>
        <Col md={4}>
          <Card className={`metrics-card bg-light`}>
            <Card.Body>
              <h3>Complexity</h3>
              <div className={`value text-${complexityInfo.class}`}>{totalComplexity || 0}</div>
              <div className="mt-2">{complexityInfo.level} Complexity</div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="metrics-card bg-light">
            <Card.Body>
              <h3>LOC</h3>
              <div className="value">{totalLOC || 0}</div>
              <div className="mt-2">Lines of Code</div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="metrics-card bg-light">
            <Card.Body>
              <h3>Functions</h3>
              <div className="value">{functionCount || 0}</div>
              <div className="mt-2">{functionCount === 1 ? 'Function' : 'Functions'} Analyzed</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ComplexityMetrics;