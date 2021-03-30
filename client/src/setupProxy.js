const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/code',
    createProxyMiddleware({
      target: `http://api:9000`,
      changeOrigin: true,
    })
  );
};