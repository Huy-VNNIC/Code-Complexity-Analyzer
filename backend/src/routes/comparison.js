const express = require('express');
const router = express.Router();
const comparisonService = require('../services/comparisonService');

// POST endpoint to compare multiple analysis results
router.post('/', async (req, res, next) => {
  try {
    const { analysisResults } = req.body;
    
    if (!analysisResults || !Array.isArray(analysisResults) || analysisResults.length < 2) {
      return res.status(400).json({ 
        error: 'Please provide at least two analysis results for comparison' 
      });
    }
    
    const comparisonData = comparisonService.compareResults(analysisResults);
    res.json(comparisonData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;