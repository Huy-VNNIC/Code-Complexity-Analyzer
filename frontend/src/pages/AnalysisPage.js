import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CodeInput from '../components/CodeInput';
import ComplexityMetrics from '../components/ComplexityMetrics';
import ComplexityChart from '../components/ComplexityChart';
import CFGVisualization from '../components/CFGVisualization';
import RefactoringSuggestions from '../components/RefactoringSuggestions';
import FunctionsList from '../components/FunctionsList';
import LoadingSpinner from '../components/LoadingSpinner';
// Import but comment out unused functions to avoid warnings
// import { analyzeCode, generateCFG } from '../services/api';

const AnalysisPage = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [cfgData, setCfgData] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [activeTab, setActiveTab] = useState('complexity');
  
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };
  
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCfgData(null);
    setSelectedFunction(null);
    
    try {
      // For now, simulate API call with mock data
      // In real implementation: const result = await analyzeCode(code, language);
      setTimeout(() => {
        const mockResults = {
          totalComplexity: 15,
          totalLOC: 120,
          functions: [
            { 
              name: "calculateTotal", 
              complexity: 3, 
              loc: 20, 
              code: "function calculateTotal(items) {\n  let total = 0;\n  for (const item of items) {\n    total += item.price;\n  }\n  return total;\n}"
            },
            { 
              name: "processOrders", 
              complexity: 12, 
              loc: 60, 
              code: "function processOrders(orders) {\n  // Complex function with high cyclomatic complexity\n  let results = [];\n  for (const order of orders) {\n    if (order.status === 'pending') {\n      if (order.total > 1000) {\n        results.push(processHighValueOrder(order));\n      } else {\n        results.push(processRegularOrder(order));\n      }\n    } else if (order.status === 'shipped') {\n      // More complex logic...\n    }\n  }\n  return results;\n}"
            },
            { 
              name: "validateInput", 
              complexity: 7, 
              loc: 40, 
              code: "function validateInput(data) {\n  if (!data) return false;\n  if (typeof data !== 'object') return false;\n  \n  // More validation checks...\n  return true;\n}"
            }
          ],
          language: language
        };
        setResults(mockResults);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the code');
      setLoading(false);
    }
  };
  
  const handleFunctionSelect = async (func) => {
    setSelectedFunction(func);
    
    try {
      // For now, simulate CFG generation with mock data
      // In real implementation: const cfg = await generateCFG(code, language, func.name);
      setTimeout(() => {
        setCfgData({
          nodes: [
            { id: "1", label: `Function: ${func.name}` },
            { id: "2", label: "Entry Point" },
            { id: "3", label: "Exit Point" }
          ],
          edges: [
            { from: "1", to: "2" },
            { from: "2", to: "3" }
          ]
        });
      }, 500);
    } catch (err) {
      setCfgData({ error: 'Failed to generate CFG visualization' });
    }
  };
  
  if (loading) {
    return <LoadingSpinner message="Analyzing code..." />;
  }
  
  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Code Complexity Analysis</h1>
      
      <CodeInput 
        code={code} 
        onChange={handleCodeChange} 
        language={language}
        onLanguageChange={handleLanguageChange}
        onSubmit={handleSubmit}
      />
      
      {error && (
        <div className="alert alert-danger mt-4">{error}</div>
      )}
      
      {results && (
        <div className="results-section">
          <ComplexityMetrics 
            totalComplexity={results.totalComplexity} 
            totalLOC={results.totalLOC}
            functionCount={results.functions?.length || 0}
          />
          
          <div className="d-flex mt-4">
            <div className="function-sidebar">
              <FunctionsList 
                functions={results.functions} 
                onSelect={handleFunctionSelect} 
                selectedFunction={selectedFunction}
              />
            </div>
            
            <div className="analysis-content">
              <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'complexity' ? 'active' : ''}`}
                    onClick={() => setActiveTab('complexity')}
                  >
                    Complexity Chart
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'cfg' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cfg')}
                    disabled={!selectedFunction}
                  >
                    Control Flow Graph
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'suggestions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('suggestions')}
                    disabled={!selectedFunction}
                  >
                    Refactoring Advice
                  </button>
                </li>
              </ul>
              
              <div className="tab-content">
                {activeTab === 'complexity' && (
                  <ComplexityChart functions={results.functions} />
                )}
                
                {activeTab === 'cfg' && (
                  <CFGVisualization 
                    cfgData={cfgData} 
                    selectedFunction={selectedFunction} 
                  />
                )}
                
                {activeTab === 'suggestions' && (
                  <RefactoringSuggestions 
                    selectedFunction={selectedFunction}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AnalysisPage;