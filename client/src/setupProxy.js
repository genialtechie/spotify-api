const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/.netlify/functions/app',
    proxy({
      target: 'http://localhost:9000/',
      changeOrigin: true,
    })
  );
};
