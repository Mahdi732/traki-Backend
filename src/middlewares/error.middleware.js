class ErrorMiddleware {
  handler(err, req, res, next) {
    const status = err.status || 400;
    const message = err.message || 'Something went wrong';
    if (process.env.NODE_ENV !== 'production') {
      return res.status(status).json({ message, stack: err.stack });
    }
    return res.status(status).json({ message });
  }
}

export default new ErrorMiddleware().handler;