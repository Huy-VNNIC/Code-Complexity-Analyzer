const { calculateLOC } = require('../metrics/loc');

// Note: For a production application, you'd want to use a proper Java parser
// This is a simplified implementation
function analyze(code) {
  try {
    // Simple implementation - in a real app, use a proper Java parser
    const totalLOC = calculateLOC(code);
    
    // Find functions (methods) through regex
    const methodRegex = /(?:public|private|protected|static|\s) +[\w<>\[\]]+\s+(\w+) *\([^)]*\) *\{?/g;
    let match;
    const functions = [];
    
    while ((match = methodRegex.exec(code)) !== null) {
      const name = match[1];
      const startIndex = match.index;
      
      // Find the method body (simple approach, not handling nested braces correctly)
      let openBraces = 0;
      let endIndex = startIndex;
      
      for (let i = startIndex; i < code.length; i++) {
        if (code[i] === '{') openBraces++;
        else if (code[i] === '}') openBraces--;
        
        if (openBraces === 0 && code[i] === '}') {
          endIndex = i + 1;
          break;
        }
      }
      
      const methodCode = code.substring(startIndex, endIndex);
      
      // Simple complexity calculation (very basic)
      let complexity = 1;
      
      // Count if, for, while, switch statements
      complexity += (methodCode.match(/\bif\s*\(/g) || []).length;
      complexity += (methodCode.match(/\bfor\s*\(/g) || []).length;
      complexity += (methodCode.match(/\bwhile\s*\(/g) || []).length;
      complexity += (methodCode.match(/\bswitch\s*\(/g) || []).length;
      complexity += (methodCode.match(/\bcatch\s*\(/g) || []).length;
      
      // Count boolean operators (simplified)
      complexity += (methodCode.match(/\&\&/g) || []).length;
      complexity += (methodCode.match(/\|\|/g) || []).length;
      
      functions.push({
        name,
        complexity,
        loc: calculateLOC(methodCode),
        code: methodCode
      });
    }
    
    // Calculate the total complexity as sum of all functions
    const totalComplexity = functions.reduce((sum, func) => sum + func.complexity, 0);
    
    return {
      totalComplexity,
      totalLOC,
      functions,
      language: 'java'
    };
  } catch (error) {
    throw new Error(`Java parsing error: ${error.message}`);
  }
}

function generateCFG(code, functionName) {
  // Simplified CFG generation for Java
  return {
    nodes: [
      { id: 0, label: `Function: ${functionName}`, type: 'MethodDeclaration' }
    ],
    edges: []
  };
}

module.exports = {
  analyze,
  generateCFG
};