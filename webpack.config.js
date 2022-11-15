const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const autoprefixer = require('autoprefixer')

const mode = process.env.NODE_ENV || 'development';

console.log( mode );

module.exports = {
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    entry: [ '@babel/polyfill', path.resolve( __dirname, 'src', 'index.js' ) ],
    output: {
        path: path.resolve( __dirname, 'dist' ),
        clean: true,
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]',
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: path.resolve( __dirname, 'src', 'index.html' ),
        } ),
        new MiniCssExtractPlugin( {
            filename: '[name].[contenthash].css',
        } ),
        autoprefixer
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    (mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [ require( 'autoprefixer' ) ],
                            },
                        },
                    },
                    'group-css-media-queries-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ],
                    },
                },
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                loader: ' file-loader',
                options: {
                    outputPath: 'fonts '
                },
            }
        ],
    },
};
