const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    //proxy: `${process.env.VUE_APP_CLOAK_URL}`,
  }
})
