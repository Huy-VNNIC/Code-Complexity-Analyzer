/**
 * Calculate the maintainability index of code
 * 
 * Formula: MI = 171 - 5.2 * ln(HV) - 0.23 * CC - 16.2 * ln(LOC)
 * 
 * Where:
 * HV = Halstead Volume
 * CC = Cyclomatic Complexity
 * LOC = Lines of Code
 */
function calculateMaintainabilityIndex(halsteadVolume, cyclomaticComplexity, loc) {
    if (!halsteadVolume || !cyclomaticComplexity || !loc) {
      return null;
    }
    
    let mi = 171 - 5.2 * Math.log(halsteadVolume) - 0.23 * cyclomaticComplexity - 16.2 * Math.log(loc);
    
    // Normalize to 0-100 range
    mi = Math.max(0, Math.min(100, mi));
    
    return mi;
  }
  
  /**
   * Get maintainability rating based on index value
   */
  function getMaintainabilityRating(mi) {
    if (mi >= 85) return 'Highly Maintainable';
    if (mi >= 65) return 'Moderately Maintainable';
    if (mi >= 50) return 'Slightly Difficult to Maintain';
    return 'Difficult to Maintain';
  }
  
  module.exports = {
    calculateMaintainabilityIndex,
    getMaintainabilityRating
  };