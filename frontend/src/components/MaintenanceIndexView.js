import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

const MaintenanceIndexView = ({ maintainabilityIndex }) => {
  if (!maintainabilityIndex && maintainabilityIndex !== 0) {
    return null;
  }
  
  const getProgressVariant = (index) => {
    if (index >= 85) return 'success';
    if (index >= 65) return 'info';
    if (index >= 50) return 'warning';
    return 'danger';
  };
  
  const getRatingText = (index) => {
    if (index >= 85) return 'Highly Maintainable';
    if (index >= 65) return 'Moderately Maintainable';
    if (index >= 50) return 'Slightly Difficult to Maintain';
    return 'Difficult to Maintain';
  };
  
  return (
    <Card>
      <Card.Header>Maintainability Index</Card.Header>
      <Card.Body>
        <div className="text-center mb-2">
          <h3>{maintainabilityIndex.toFixed(1)}</h3>
          <p>{getRatingText(maintainabilityIndex)}</p>
        </div>
        
        <ProgressBar 
          now={maintainabilityIndex} 
          variant={getProgressVariant(maintainabilityIndex)}
          label={`${maintainabilityIndex.toFixed(1)}%`}
        />
        
        <div className="mt-3">
          <small>
            <strong>About this metric:</strong> The Maintainability Index is a composite metric based on
            Halstead Volume, Cyclomatic Complexity, and Lines of Code. 
            Higher values (closer to 100) indicate better maintainability.
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MaintenanceIndexView;