const { PythonShell } = require('python-shell');
const { calculateLOC } = require('../metrics/loc');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const { v4: uuidv4 } = require('uuid');

// Python script for analysis
const PYTHON_ANALYZER_SCRIPT = `
import ast
import json
import sys

class ComplexityVisitor(ast.NodeVisitor):
    def __init__(self):
        self.complexity = 1  # Start from 1 (base complexity)
        self.functions = []
        self.current_function = None

    def visit_FunctionDef(self, node):
        # Save the current function name
        prev_function = self.current_function
        self.current_function = {
            "name": node.name,
            "complexity": 1,  # Base complexity
            "line_start": node.lineno,
            "line_end": self._get_end_line(node),
            "code": self._get_node_source(node)
        }
        
        # Visit all children (will update complexity)
        self.generic_visit(node)
        
        # Add function to collection
        self.functions.append(self.current_function)
        
        # Restore previous function context
        self.current_function = prev_function
    
    def visit_If(self, node):
        self._add_complexity()
        self.generic_visit(node)
    
    def visit_IfExp(self, node):
        self._add_complexity()
        self.generic_visit(node)
    
    def visit_For(self, node):
        self._add_complexity()
        self.generic_visit(node)
    
    def visit_While(self, node):
        self._add_complexity()
        self.generic_visit(node)
    
    def visit_BoolOp(self, node):
        # Add complexity for each boolean operator (and/or)
        self._add_complexity(len(node.values) - 1)
        self.generic_visit(node)
    
    def _add_complexity(self, amount=1):
        # Add to current function if inside one, otherwise to global
        if self.current_function:
            self.current_function["complexity"] += amount
        else:
            self.complexity += amount
    
    def _get_end_line(self, node):
        # Get the last line number of a node
        return max(getattr(node, 'lineno', 0), 
                  max([self._get_end_line(child) for child in ast.iter_child_nodes(node)] or [0]))

    def _get_node_source(self, node):
        # This is simplified - in a real implementation, you'd extract the source code
        # from the file using line numbers
        return f"def {node.name}(...): ..."

def analyze_code(code):
    try:
        tree = ast.parse(code)
        visitor = ComplexityVisitor()
        visitor.visit(tree)
        
        loc = len(code.splitlines())
        
        return {
            "success": True,
            "totalComplexity": visitor.complexity,
            "totalLOC": loc,
            "functions": visitor.functions,
            "language": "python"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    code = sys.stdin.read()
    result = analyze_code(code)
    print(json.dumps(result))
`;

// Create a temporary Python script file
async function createTempPythonScript() {
  const tempDir = os.tmpdir();
  const fileName = `python_analyzer_${uuidv4()}.py`;
  const filePath = path.join(tempDir, fileName);
  
  await fs.writeFile(filePath, PYTHON_ANALYZER_SCRIPT);
  return filePath;
}

async function analyze(code) {
  try {
    // Create temporary Python script
    const scriptPath = await createTempPythonScript();
    
    // Run Python analysis
    const options = {
      mode: 'text',
      pythonOptions: ['-u'], // Unbuffered output
      stdin: true // Enable stdin for input
    };
    
    return new Promise((resolve, reject) => {
      const pyshell = new PythonShell(scriptPath, options);
      let output = '';
      
      pyshell.stdin.write(code);
      pyshell.stdin.end();
      
      pyshell.on('message', (message) => {
        output += message;
      });
      
      pyshell.end((err) => {
        // Clean up the temporary file
        fs.unlink(scriptPath).catch(console.error);
        
        if (err) {
          reject(new Error(`Python analysis error: ${err.message}`));
        } else {
          try {
            const result = JSON.parse(output);
            if (!result.success) {
              reject(new Error(`Python analysis failed: ${result.error}`));
            } else {
              // Calculate LOC for each function more accurately in JS
              if (result.functions) {
                for (const func of result.functions) {
                  func.loc = func.code ? calculateLOC(func.code) : 0;
                }
              }
              resolve(result);
            }
          } catch (parseErr) {
            reject(new Error(`Error parsing Python output: ${parseErr.message}`));
          }
        }
      });
    });
  } catch (error) {
    throw new Error(`Python analysis error: ${error.message}`);
  }
}

async function generateCFG(code, functionName) {
  // This would use a Python library like networkx to generate the CFG
  // For now, we'll return a simplified mock CFG
  const nodes = [
    { id: 0, label: `Function: ${functionName}`, type: 'FunctionDef' }
  ];
  
  const edges = [];
  
  // In a real implementation, we would parse the AST and build a proper CFG
  
  return { nodes, edges };
}

module.exports = {
  analyze,
  generateCFG
};