const esprima = require('esprima');
const { calculateLOC } = require('../metrics/loc');

function analyze(code) {
  try {
    // Parse the code
    const ast = esprima.parseScript(code, { loc: true, range: true });
    
    // Extract function definitions
    const functions = [];
    const globalComplexity = { complexity: 1 }; // Base complexity
    
    // Process AST to find functions and calculate complexity
    traverseAST(ast, functions, globalComplexity);
    
    // Calculate LOC for the entire file
    const totalLOC = calculateLOC(code);
    
    return {
      totalComplexity: globalComplexity.complexity,
      totalLOC,
      functions,
      language: 'javascript'
    };
  } catch (error) {
    throw new Error(`JavaScript parsing error: ${error.message}`);
  }
}

function traverseAST(node, functions, complexity) {
  // Skip if node is null or undefined
  if (!node) return;
  
  // Check node type to calculate complexity
  switch (node.type) {
    case 'IfStatement':
    case 'ConditionalExpression':
      complexity.complexity++;
      break;
    case 'ForStatement':
    case 'ForInStatement':
    case 'ForOfStatement':
    case 'WhileStatement':
    case 'DoWhileStatement':
      complexity.complexity++;
      break;
    case 'SwitchCase':
      if (node.test !== null) { // Default case doesn't add complexity
        complexity.complexity++;
      }
      break;
    case 'LogicalExpression':
      if (node.operator === '&&' || node.operator === '||') {
        complexity.complexity++;
      }
      break;
    case 'FunctionDeclaration':
    case 'FunctionExpression':
    case 'ArrowFunctionExpression':
      const funcName = node.id ? node.id.name : 'anonymous_' + functions.length;
      
      // Extract the function code
      const functionCode = node.range 
        ? code.substring(node.range[0], node.range[1])
        : 'Function code extraction not available';
      
      // Calculate function complexity
      const functionComplexity = { complexity: 1 }; // Base complexity
      traverseAST(node.body, [], functionComplexity);
      
      // Calculate function LOC
      const functionLOC = calculateLOC(functionCode);
      
      functions.push({
        name: funcName,
        complexity: functionComplexity.complexity,
        loc: functionLOC,
        code: functionCode,
        position: node.loc
      });
      return; // Don't double-count by traversing into the function again
  }
  
  // Recursively traverse child nodes
  for (const key in node) {
    if (node.hasOwnProperty(key) && typeof node[key] === 'object') {
      traverseAST(node[key], functions, complexity);
    }
  }
}

function generateCFG(code, functionName) {
  try {
    const ast = esprima.parseScript(code, { loc: true });
    
    // Find the requested function
    let targetFunction = null;
    
    // Simple function to traverse the AST and find the target function
    function findFunction(node) {
      if (!node || typeof node !== 'object') return;
      
      if ((node.type === 'FunctionDeclaration' || 
          node.type === 'FunctionExpression') && 
          node.id && node.id.name === functionName) {
        targetFunction = node;
        return;
      }
      
      // Continue traversal
      for (const key in node) {
        if (node.hasOwnProperty(key) && typeof node[key] === 'object') {
          findFunction(node[key]);
          if (targetFunction) return; // Stop if found
        }
      }
    }
    
    findFunction(ast);
    
    if (!targetFunction) {
      return { error: `Function '${functionName}' not found` };
    }
    
    // Generate nodes and edges for the CFG
    const nodes = [];
    const edges = [];
    let nodeCounter = 0;
    
    function generateCFGForNode(node, parentId = null) {
      if (!node || typeof node !== 'object') return null;
      
      const nodeId = nodeCounter++;
      let nodeType = node.type;
      let label = nodeType;
      
      // Create a node
      switch (node.type) {
        case 'BlockStatement':
          label = 'Block';
          break;
        case 'IfStatement':
          label = 'If: ' + generateConditionText(node.test);
          break;
        case 'WhileStatement':
          label = 'While: ' + generateConditionText(node.test);
          break;
        case 'ForStatement':
          label = 'For loop';
          break;
        case 'ReturnStatement':
          label = 'Return';
          break;
        case 'ExpressionStatement':
          label = generateExpressionText(node.expression);
          break;
      }
      
      nodes.push({ id: nodeId, label, type: nodeType });
      
      // Connect to parent
      if (parentId !== null) {
        edges.push({ from: parentId, to: nodeId });
      }
      
      // Process children based on node type
      switch (node.type) {
        case 'BlockStatement':
          let lastId = nodeId;
          for (const stmt of node.body) {
            lastId = generateCFGForNode(stmt, lastId);
          }
          return lastId;
        
        case 'IfStatement':
          const consequentId = generateCFGForNode(node.consequent, nodeId);
          let alternateId = null;
          
          if (node.alternate) {
            alternateId = generateCFGForNode(node.alternate, nodeId);
          }
          
          const afterIfId = nodeCounter++;
          nodes.push({ id: afterIfId, label: 'After If', type: 'AfterIf' });
          
          if (consequentId !== null) {
            edges.push({ from: consequentId, to: afterIfId });
          }
          
          if (alternateId !== null) {
            edges.push({ from: alternateId, to: afterIfId });
          } else {
            edges.push({ from: nodeId, to: afterIfId, label: 'No else' });
          }
          
          return afterIfId;
        
        // Add other node types handling as needed
        
        default:
          return nodeId;
      }
    }
    
    // Helper to generate readable condition text
    function generateConditionText(node) {
      if (!node) return '...';
      
      if (node.type === 'BinaryExpression') {
        return `${node.left.name || '...'} ${node.operator} ${node.right.name || '...'}`;
      }
      
      return '...';
    }
    
    // Helper to generate readable expression text
    function generateExpressionText(node) {
      if (!node) return '...';
      
      if (node.type === 'CallExpression') {
        return `${node.callee.name || '...'}()`;
      } else if (node.type === 'AssignmentExpression') {
        return `${node.left.name || '...'} = ...`;
      }
      
      return '...';
    }
    
    // Generate CFG starting from the function body
    generateCFGForNode(targetFunction.body);
    
    return { nodes, edges };
  } catch (error) {
    return { error: `Error generating CFG: ${error.message}` };
  }
}

module.exports = {
  analyze,
  generateCFG
};