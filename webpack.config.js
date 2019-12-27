const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const tailwindcss = require('tailwindcss');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        },
    },
    module: {
        rules: [
            {
                // Apply rule for .js
                test: /\.js$/,
                exclude: /(node_modules)/,// Set loaders to transform files.
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                // Apply rule for .css files
                test: /\.css$/,// Set loaders to transform files.
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    /* 'vue-style-loader', */
                    { loader: "css-loader", },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                tailwindcss('./tailwind.config.js'),
                                require('autoprefixer'),
                            ],
                        },
                    }
                ]
            },
            {
                // Apply rule for images
                test: /\.(png|jpe?g|gif|svg)$/,// Set loaders to transform files.
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'images'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "dist.bundle.css"
        })

    ]
};