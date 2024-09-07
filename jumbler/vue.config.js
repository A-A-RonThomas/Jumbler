const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Jumbler/'  // Replace 'your-repository-name' with your actual GitHub repository name
    : '/'
})

