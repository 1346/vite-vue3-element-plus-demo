import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  // 别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // 全局css
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/mixin.scss";`
      }
    }
  },
  // 代理服务
  server: {
    // port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api/system': {  // 匹配到啥来进行反向代理
        target: 'https://test.hsx.htxq.net', // 代理的目标
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace('^/api/system', '/api/system')   // 如果不需要api 直接把路径上的api替换成空
      },

      // 第二个代理
      // '/api/md': {
      //   target: 'https://editor.csdn.net', //代理网址
      //   changeOrigin: true,   // 支持跨域
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  }
})
