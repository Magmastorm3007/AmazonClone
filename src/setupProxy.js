const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://atlasdb.onrender.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/payments',
    createProxyMiddleware({
      target: 'https://atlasdb.onrender.com/',
      changeOrigin: true,
    })
  );
}