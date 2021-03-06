const path = require("path");
const webpack = require("webpack");

module.exports = (env, { mode = "development" }) => {
    const isDevelopment = mode === "development";
    const config = {
        mode,
        entry: ["@babel/polyfill", "./src/index.js"],
        output: {
            path: path.resolve(__dirname, "public", "build"),
            filename: "bundle.js",
            publicPath: "/build/"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName:
                                        "[path][name]__[local]--[hash:base64:5]"
                                }
                            }
                        },
                        "postcss-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                    use: [{ loader: "file-loader" }]
                },
                {
                    test: /\.worker\.js$/,
                    use: { loader: 'worker-loader' }
                }
            ],
        },
        node: {
            fs: 'empty',
        },
        optimization: {
            mangleWasmImports: true,
            mergeDuplicateChunks: true,
            minimize: !isDevelopment,
            nodeEnv: mode
        }
    };

    if (isDevelopment) {
        config.devServer = {
            contentBase: path.resolve(__dirname, "public"),
            compress: false,
            port: 9000,
            historyApiFallback: true
        };
    }

    return config;
};
