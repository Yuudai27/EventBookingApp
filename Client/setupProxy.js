const { createProxyMiddleware } = require('http-proxy-middleware');
/**
The setupProxy component defines the our node server for the react application.
**/
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};
