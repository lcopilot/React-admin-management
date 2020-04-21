const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/apiUrl', {
        target: "http://localhost:5000", // 代理的地址
        secure: false,  //是否验证SSL证书
        changeOrigin: true,  //是否 将主机头的源更改为目标URL  默认值：false
        pathRewrite: {    //重写目标的url路径
          "^/apiUrl": "/"
        },
      })
  );
};