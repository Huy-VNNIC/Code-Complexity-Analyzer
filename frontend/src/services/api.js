import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Analyze code
export const analyzeCode = async (code, language) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze`, {
      code,
      language
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      'Error analyzing code. Please check your input and try again.'
    );
  }
};

// Generate CFG for a specific function
export const generateCFG = async (code, language, functionName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze/cfg`, {
      code,
      language,
      functionName
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
      'Error generating Control Flow Graph'
    );
  }
};

// Upload a file for analysis
export const analyzeFile = async (file, language) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);
    
    const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      'Error analyzing file. Please check your input and try again.'
    );
  }
};

// Compare multiple analysis results
export const compareAnalysisResults = async (analysisResults) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/compare`, {
      analysisResults
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      'Error comparing analysis results.'
    );
  }
};