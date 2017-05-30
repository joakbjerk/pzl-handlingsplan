module.exports = {
    entry: [
        "./node_modules/es6-promise/dist/es6-promise.auto.min",
        "./node_modules/whatwg-fetch/fetch",
        "./src/ts/utvikling"],
    output: {
        filename: "utvikling.js",
        path: __dirname + "/dist/js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [

            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "moment-with-locales": "moment"
    },
};