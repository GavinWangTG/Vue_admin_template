const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    // 基本路径
    baseUrl: debug ? '/' : '/',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: config => {
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置
        }
        Object.assign(config, { // 开发生产共同配置
            resolve: {
                extensions: ['.js', '.json', '.vue'],
                alias: {
                    '@': resolve('src'),
                    'vue$': 'vue/dist/vue.esm.js',
                    'cube-ui': 'cube-ui/lib',
                }
            }
        })
        plugins: [

        ]
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            css: {
                sass: {
                    loader: 'sass-loader',
                },
                stylus: {
                    loader: 'stylus-loader'
                },
                styl: {
                    loader: 'stylus-loader'
                }
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8089,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {

    }
}