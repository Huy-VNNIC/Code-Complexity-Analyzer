const esprima = require('esprima');
const { parse: parsePython } = require('python-parser');

/**
 * Tokenize code based on language
 * @param {string} code - Code to tokenize
 * @param {string} language - Programming language
 * @returns {Array} Array of tokens
 */
function tokenizeCode(code, language) {
  try {
    switch (language.toLowerCase()) {
      case 'javascript':
        return esprima.tokenize(code, { loc: true });
      
      case 'python':
        // Using python-parser for Python code tokenization
        return parsePython(code).tokens;
      
      case 'java':
        // For Java, we'd typically use a Java parser library
        // This is a placeholder for demonstration
        console.warn('Java tokenization is not fully implemented');
        return [];
      
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  } catch (error) {
    console.error(`Error tokenizing ${language} code:`, error);
    return [];
  }
}

module.exports = {
  tokenizeCode
};