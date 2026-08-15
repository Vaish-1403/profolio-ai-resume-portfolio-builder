/**
 * Global Error Handling Middleware for Express API
 */
export function errorHandler(err, req, res, next) {
  console.error('❌ Express API Error Handler:', err.stack || err.message || err);

  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    code: err.code || 'SERVER_ERROR',
    timestamp: new Date().toISOString(),
  });
}
