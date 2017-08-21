const webpack = require("webpack");

module.exports = {
    entry: "./src/c3d.js",
    output: {
        path: __dirname + "/dist",
        filename: "c3d.min.js",
        library: "c3d",
        libraryTarget: "umd"
    },
    plugins: [new webpack.optimize.UglifyJsPlugin()],
    module: {
        rules: [{
            test: /.\js/,
            loader: "eslint-loader",
            include: __dirname + "src"
        }, {
            test: /.\js/,
            loader: "babel-loader",
            options: {
                presets: ["es2015"]
            }
        }]
    }
}