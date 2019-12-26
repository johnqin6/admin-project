module.exports = {
  publicPath: '',
  devServer: {
    proxy: {
      '/api': {
        target: 'http:localhost:5000',
        changeOrigin: true,
        wx: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
