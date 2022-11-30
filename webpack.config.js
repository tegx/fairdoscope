const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_moudles/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(ttf|woff2)$/,
                use: 'url-loader'
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        hot: true,
        port: 3000
    }
};
