import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const RefactoringSuggestions = ({ selectedFunction }) => {
  if (!selectedFunction) {
    return (
      <div className="text-center p-4">
        <p>Select a function to view refactoring suggestions</p>
      </div>
    );
  }
  
  // Get complexity level description
  const getComplexityLevel = (score) => {
    if (score < 5) return { level: 'Low', class: 'success', description: 'Simple and maintainable' };
    if (score < 10) return { level: 'Moderate', class: 'warning', description: 'Moderate complexity, consider refactoring' };
    return { level: 'High', class: 'danger', description: 'High complexity, refactoring recommended' };
  };
  
  const complexityInfo = getComplexityLevel(selectedFunction.complexity);
  
  // Get refactoring suggestion
  const getSuggestion = (complexity) => {
    if (complexity < 5) {
      return "This function has low cyclomatic complexity, which is good! It should be easy to understand and test. No specific refactoring is needed.";
    } else if (complexity < 10) {
      return "This function has moderate complexity. Consider breaking it down into smaller functions with single responsibilities. Look for repeated logic that can be extracted into helper functions.";
    } else {
      return "This function has high complexity and should be refactored. Consider applying the following techniques:\n\n1. Extract complex conditional logic into separate functions\n2. Use early returns to reduce nesting\n3. Replace complex if-else chains with strategy pattern or lookup tables\n4. Break the function into multiple smaller functions that each do one thing well";
    }
  };
  
  const suggestion = selectedFunction.aiSuggestion || getSuggestion(selectedFunction.complexity);
  
  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            {selectedFunction.name}
          </h5>
          <Badge bg={complexityInfo.class}>
            Complexity: {selectedFunction.complexity} ({complexityInfo.level})
          </Badge>
        </div>
      </Card.Header>
      
      <Card.Body>
        <div className="mb-4">
          <h6>Function Code:</h6>
          <pre className="p-2 bg-light border rounded">
            <code>{selectedFunction.code || 'Code not available'}</code>
          </pre>
        </div>
        
        <div>
          <h6>Refactoring Suggestion:</h6>
          <div className="p-3 border rounded bg-light">
            {suggestion}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RefactoringSuggestions;