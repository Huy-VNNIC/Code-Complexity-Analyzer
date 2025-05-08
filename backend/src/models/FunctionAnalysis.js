// Model for function analysis results
class FunctionAnalysis {
    constructor(name, code, complexity, loc, position) {
      this.name = name;
      this.code = code;
      this.complexity = complexity;
      this.loc = loc;
      this.position = position;
      this.aiSuggestion = null;
      this.halsteadMetrics = null;
      this.maintainabilityIndex = null;
    }
  
    calculateMaintainabilityIndex() {
      // Maintainability Index = 171 - 5.2 * ln(Halstead Volume) - 0.23 * (Cyclomatic Complexity) - 16.2 * ln(LOC)
      if (!this.halsteadMetrics) return null;
      
      const halsteadVolume = this.halsteadMetrics.volume;
      const mi = 171 - 5.2 * Math.log(halsteadVolume) - 0.23 * this.complexity - 16.2 * Math.log(this.loc);
      this.maintainabilityIndex = Math.max(0, Math.min(100, mi));
      return this.maintainabilityIndex;
    }
  }
  
  module.exports = FunctionAnalysis;