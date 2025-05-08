import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

const FunctionsList = ({ functions, onSelect, selectedFunction }) => {
  if (!functions || functions.length === 0) {
    return <p className="text-center">No functions to display</p>;
  }
  
  const getComplexityBadgeColor = (complexity) => {
    if (complexity < 5) return 'success';
    if (complexity < 10) return 'warning';
    return 'danger';
  };
  
  return (
    <div>
      <h4 className="mb-3">Functions</h4>
      <ListGroup>
        {functions.map((func, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => onSelect(func)}
            active={selectedFunction && selectedFunction.name === func.name}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{func.name}</strong>
              <div><small>{func.loc} lines</small></div>
            </div>
            <Badge bg={getComplexityBadgeColor(func.complexity)}>
              {func.complexity}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default FunctionsList;