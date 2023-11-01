const debug = true;
const TerserJsPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const externals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'bin/www.js'),
    output: {
        clean: false,
        path: path.resolve(__dirname, 'dist'),
        filename: 'unitedtranssexuals-webpack.bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.json']
    },
    optimization: {
        minimizer: [
            new TerserJsPlugin({
                parallel: true,
                terserOptions: {
                    warnings: false,
                    mangle: !debug,
                    keep_fnames: debug,
                    compress: {
                        unused: !debug
                    },
                },
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                }
            },
        ]
    },
    plugins: [
        new ESLintPlugin({
            cache: true
        })
    ],
    mode: debug ? 'development' : 'production',
    performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    },
    externals: [externals()],
    externalsPresets: { node: true },
    devtool: 'source-map',
    target: 'node'
};
