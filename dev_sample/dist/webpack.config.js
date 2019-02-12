const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    devtool: "source-map",
    devServer: {
        //host: 'localhost',
        //inline: true,
        //hot:true,
        port: 1103,
        contentBase: path.resolve(__dirname, '../')
    },
    entry : {
        'src/js/vendor' : ['babel-polyfill','jquery'],
        'src/js/main' : ['./js/app','./scss/app.scss']
    },
    output : {
        path: path.resolve(__dirname, '../'),
        filename:'[name].js',
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use : {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory:true
                    }
                }
            }
            ,{
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2
                        },
                    },{
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true
                        },
                    },{
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: "src/css/main.css",
            chunkFilename: "src/css/main_id.css"
        })
    ]
};

module.exports = config;