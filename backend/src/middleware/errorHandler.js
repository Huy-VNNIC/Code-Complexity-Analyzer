/**
 * Global error handler middleware
 */
function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    
    // Default error status and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    
    // Special handling for validation errors
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = err.message;
    }
    
    // API error response
    res.status(statusCode).json({
      error: true,
      message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
  
  module.exports = errorHandler;