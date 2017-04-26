const path = require('path');
const webpack = require('webpack');
const isProduction = (process.env.NODE_ENV === 'production' || process.argv.includes('-p'));

module.exports = {
    entry: {
        'app': './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: isProduction ?  'bundle.min.js' :  'bundle.js'
    },
    module: {
        rules: [
        {
            enforce: "pre",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
            options: {
                fix: true
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: [
                'es2015'
                ],
                plugins: []
            },
            include: [
            path.resolve(__dirname, 'src')
            ]
        }, {
            test: /\.json$/,
            loader: "json-loader"
        }]
    },
    plugins: isProduction ? [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ] : [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        })
    ],
    resolve: {
        modules: [
            path.join(process.cwd(), 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.json']
    },
    devtool: false
};