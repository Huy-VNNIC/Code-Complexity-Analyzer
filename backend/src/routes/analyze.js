const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const javascriptAnalyzer = require('../analyzers/javascript');
const pythonAnalyzer = require('../analyzers/python');
const javaAnalyzer = require('../analyzers/java');
const openaiService = require('../services/openai');

// POST endpoint to analyze code
router.post('/', upload.single('file'), async (req, res) => {
  try {
    // Get code either from file upload or direct input
    let code = req.body.code;
    let language = req.body.language || 'javascript';
    
    if (req.file) {
      code = req.file.buffer.toString('utf8');
      
      // Try to infer language from file extension if not specified
      if (!language && req.file.originalname) {
        const ext = req.file.originalname.split('.').pop().toLowerCase();
        if (ext === 'js') language = 'javascript';
        else if (ext === 'py') language = 'python';
        else if (ext === 'java') language = 'java';
      }
    }

    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    // Analyze the code based on language
    let results;
    switch (language.toLowerCase()) {
      case 'javascript':
        results = javascriptAnalyzer.analyze(code);
        break;
      case 'python':
        results = await pythonAnalyzer.analyze(code);
        break;
      case 'java':
        results = javaAnalyzer.analyze(code);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported language' });
    }

    // Get suggestions from OpenAI
    if (results && results.functions) {
      for (const func of results.functions) {
        const suggestion = await openaiService.getRefactoringAdvice(
          func.name,
          func.code,
          func.complexity,
          language
        );
        func.aiSuggestion = suggestion;
      }
    }

    res.json(results);
  } catch (error) {
    console.error('Error analyzing code:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate CFG visualization data
router.post('/cfg', async (req, res) => {
  try {
    const { code, language, functionName } = req.body;
    
    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    let cfgData;
    switch (language.toLowerCase()) {
      case 'javascript':
        cfgData = javascriptAnalyzer.generateCFG(code, functionName);
        break;
      case 'python':
        cfgData = await pythonAnalyzer.generateCFG(code, functionName);
        break;
      case 'java':
        cfgData = javaAnalyzer.generateCFG(code, functionName);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported language for CFG' });
    }

    res.json(cfgData);
  } catch (error) {
    console.error('Error generating CFG:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;