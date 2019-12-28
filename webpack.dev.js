const path = require('path');
const glob = require('glob');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
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
                use: [
                    'vue-loader',
                    /*  'vue-style-loader' */

                ]
                /*  loader: 'vue-loader' */
            },
            {
                // Apply rule for .css files
                test: /\.css$/,// Set loaders to transform files.
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('tailwindcss')('./tailwind.config.js'),
                                require('autoprefixer'),
                            ],
                        },
                    },

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
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        /* new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css'
        }), */
        /*  new ExtractTextPlugin('[name].css?[hash]'),
         new PurgecssPlugin({
             paths: glob.sync(`${PATHS.src}/*`)
         }) */

    ]
};