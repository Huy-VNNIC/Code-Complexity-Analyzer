// Calculate Lines of Code (LOC) for a given code snippet
function calculateLOC(code) {
    if (!code) return 0;
    
    // Split by newlines and filter out empty lines
    const lines = code.split('\n').filter(line => line.trim().length > 0);
    
    return lines.length;
  }
  
  module.exports = {
    calculateLOC
  };