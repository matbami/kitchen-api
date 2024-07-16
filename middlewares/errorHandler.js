export const errorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  res.status(status).json({
    status,
    message: error.message,
  });
};
