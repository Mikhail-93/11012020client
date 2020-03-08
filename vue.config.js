// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
const webpack = require('webpack')

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"'
                }
            })
        ]
    },
    "transpileDependencies": [
        "vuetify"
    ],

    "lintOnSave": false,

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'ru',
            localeDir: 'locales',
            enableInSFC: true
        },
    },
    devServer: {
        disableHostCheck: true
    },
    chainWebpack: config => config.optimization.minimize(false)
}
