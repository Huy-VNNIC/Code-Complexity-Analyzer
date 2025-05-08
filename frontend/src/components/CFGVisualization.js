import React from 'react';
import { Alert } from 'react-bootstrap';

const CFGVisualization = ({ cfgData, selectedFunction }) => {
  if (!selectedFunction) {
    return (
      <div className="text-center p-4">
        <p>Select a function to view its Control Flow Graph</p>
      </div>
    );
  }

  if (!cfgData || cfgData.error) {
    return (
      <Alert variant="warning">
        {cfgData?.error || "Control Flow Graph visualization is not available for this function."}
      </Alert>
    );
  }

  // Simple placeholder visualization
  return (
    <div className="cfg-container p-3 border rounded">
      <h5 className="mb-3">Control Flow Graph for {selectedFunction.name}</h5>
      <p>Function complexity: {selectedFunction.complexity}</p>
      <p>Lines of code: {selectedFunction.loc}</p>
    </div>
  );
};

export default CFGVisualization;