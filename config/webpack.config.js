/**
 * Created by brsmith on 7/3/17.
 */
const path = require('path')
const webpack =  require('webpack')
var WebpackStrip = require('webpack-strip')
const WebpackAssetsManifest = require('webpack-assets-manifest')

let __dirname = '../../../..'

module.exports = {
    context: __dirname + '/src',

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new WebpackAssetsManifest({
            output: __dirname + '/public/asset-manifest.json',
            merge: true
          })
    ],

    entry: {
        javascript: './index.js'
       // html: '../public/index.html'
    },

    output: {
        filename: 'app.js',
        path: __dirname + '/public/js'
    },

    devServer: {
        contentBase: 'public'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            path.join(__dirname, "/src/"),
            "node_modules"
        ]
        /*alias: {
            //Narrator1: path.resolve('./src/story/narrator1.js'),
            Story1: path.resolve('./src/story/story1.js')
        }*/
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: [{
              loader: 'babel-loader',
                options: {
                    presets: ["es2015", "react", "stage-2"]
                },
            }],
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            use: ['react-hot-loader/webpack'],
            include: path.resolve(__dirname, './src/')
      },
      {
        test: require.resolve('latest-createjs'),
        loader: 'imports-loader?this=>window!exports-loader?window.createjs'
      }
    ],

    }
}
