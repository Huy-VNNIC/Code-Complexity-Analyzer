// Halstead complexity metrics calculator

/**
 * Calculates Halstead complexity metrics for code
 * @param {Object} tokens - Lexical tokens from the code
 * @returns {Object} Halstead metrics
 */
function calculateHalstead(tokens) {
    // Count operators and operands
    const operators = new Set();
    const operands = new Set();
    let totalOperators = 0;
    let totalOperands = 0;
    
    // In a real implementation, this would parse the tokens properly
    // This is a simplified version
    tokens.forEach(token => {
      if (isOperator(token)) {
        operators.add(token.value);
        totalOperators++;
      } else if (isOperand(token)) {
        operands.add(token.value);
        totalOperands++;
      }
    });
    
    const n1 = operators.size;  // Number of distinct operators
    const n2 = operands.size;   // Number of distinct operands
    const N1 = totalOperators;  // Total operators
    const N2 = totalOperands;   // Total operands
    
    // Calculate Halstead metrics
    const vocabulary = n1 + n2;
    const length = N1 + N2;
    const calculatedLength = n1 * Math.log2(n1) + n2 * Math.log2(n2);
    const volume = length * Math.log2(vocabulary);
    const difficulty = (n1 / 2) * (N2 / n2);
    const effort = difficulty * volume;
    const timeRequired = effort / 18;
    const bugsDelivered = volume / 3000;
    
    return {
      vocabulary,
      length,
      calculatedLength,
      volume,
      difficulty,
      effort,
      timeRequired,
      bugsDelivered,
      n1,
      n2,
      N1,
      N2
    };
  }
  
  function isOperator(token) {
    // Simplified operator check - in real implementation this would be more comprehensive
    const operators = ['+', '-', '*', '/', '=', '==', '!=', '>', '<', '>=', '<=', '&&', '||', '!'];
    return operators.includes(token.value);
  }
  
  function isOperand(token) {
    // Simplified operand check
    return token.type === 'Identifier' || token.type === 'Literal';
  }
  
  module.exports = {
    calculateHalstead
  };