module.exports = {
  entry: "./src/ts/handlingsplaner.tsx",
  output: {
    filename: "handlingsplaner.js",
    path: __dirname + "/dist/js"
  },
  devtool: "source-map",

  module: {
    rules: [

      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },


      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "moment": "moment"
  },
};