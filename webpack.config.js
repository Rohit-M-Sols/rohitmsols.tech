const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            scriptLoading: "defer",
            favicon: "./src/Images/rms_favicon32x32.png"
        }),

        new MiniCssExtractPlugin(),

        new CssMinimizerPlugin(),

        new SitemapWebpackPlugin({base: 'http://rohitmsols.com', paths: ['/'], options: {skipgzip: true}}),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.html$/i,
                use: "html-loader",
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|webp)$/,
                type: "asset/resource",
                generator: {
                    filename: "Images/[name]-[hash][ext]",
                },
            },
        ],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
};