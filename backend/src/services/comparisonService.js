/**
 * Service for comparing multiple code analysis results
 */
class ComparisonService {
    /**
     * Compare analysis results from multiple code files
     * @param {Array} analysisResults - Array of analysis results to compare
     * @returns {Object} Comparison data
     */
    compareResults(analysisResults) {
      if (!analysisResults || analysisResults.length < 2) {
        throw new Error('At least 2 analysis results are required for comparison');
      }
      
      // Extract file names for labels
      const labels = analysisResults.map(result => result.filename || 'Unnamed');
      
      // Aggregate complexity metrics
      const complexityData = {
        labels,
        datasets: [
          {
            label: 'Average Cyclomatic Complexity',
            data: analysisResults.map(result => this.calculateAvgComplexity(result)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          },
          {
            label: 'Total Functions',
            data: analysisResults.map(result => result.functions?.length || 0),
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
          },
          {
            label: 'Total LOC',
            data: analysisResults.map(result => result.totalLOC || 0),
            backgroundColor: 'rgba(75, 192, 192, 0.5)'
          }
        ]
      };
      
      // Find most complex functions across all files
      const allFunctions = analysisResults.flatMap(result => 
        (result.functions || []).map(func => ({
          ...func,
          file: result.filename || 'Unnamed'
        }))
      );
      
      const mostComplexFunctions = allFunctions
        .sort((a, b) => b.complexity - a.complexity)
        .slice(0, 5);
      
      return {
        complexityData,
        mostComplexFunctions,
        totalFilesCompared: analysisResults.length
      };
    }
    
    /**
     * Calculate average complexity for all functions in a result
     */
    calculateAvgComplexity(result) {
      const functions = result.functions || [];
      if (functions.length === 0) return 0;
      
      const totalComplexity = functions.reduce((sum, func) => sum + func.complexity, 0);
      return totalComplexity / functions.length;
    }
  }
  
  module.exports = new ComparisonService();