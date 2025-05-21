// const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const AutoImport = require('unplugin-auto-import/webpack').default

module.exports = {
  // transpileDependencies: true
  outputDir: 'dist',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          VUE_APP_VERSION: JSON.stringify(process.env.VUE_APP_VERSION),
        },
        '__VUE_OPTIONS_API__': JSON.stringify(true),
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
      }),

      new webpack.BannerPlugin({
        banner: `
          // @version ${process.env.VUE_APP_VERSION}
          // @author ${process.env.VUE_APP_AUTHOR}
          // @date ${new Date().toLocaleString()}
          bannnnnner
        `,
      }),

      AutoImport({
        imports: [
          'vue',              // 自动引入 ref, reactive, computed 等 Vue API
          'vue-router',       // 自动引入 useRoute, useRouter
          'vuex',             // 自动引入 useStore
          {
            '@/network/RequestConfig.js': [ // 自动引入你自己写的工具函数
              'req',
            ]
          },{
            '@/util/DefaultImports.js': [ 
              'showAlert','router'
            ]
          }
        ],
        // dts: './auto-imports.d.ts', // 生成 TS 类型声明（可选）
        eslintrc: { enabled: true } // 让 ESLint 不报 undefined 错（如果你开了 lint）
      }),
    ],
  },
}
