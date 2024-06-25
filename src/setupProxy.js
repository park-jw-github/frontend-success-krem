// 프록시 설정

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    const BASE_URL = process.env.REACT_APP_API_URL;

    app.use(
        '/api',
        createProxyMiddleware({
            target: BASE_URL,
            changeOrigin: true,
        })
    );
};