const path = require('path');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

module.exports = {
    "entry": {
        "main": [
            "./src/main.ts"
        ],
        "polyfills": [
            "./src/polyfills.ts"
        ],
        "styles": [
            "./src/styles.css"
        ],
        "webworker": [
            "./src/workerLoader.ts"
        ]
    },
    "output": {
        "path": path.join(__dirname, 'dist', 'browser'),
        "filename": "[name].bundle.js",
        "chunkFilename": "[id].chunk.js"
    },
    "plugins": [
        new HtmlWebpackPlugin({
            "template": "./src/index.html",
            "filename": "./index.html",
            "excludeChunks": [
                "webworker"
            ],
            "chunksSortMode": function sort(left, right) {
                let leftIndex = entryPoints.indexOf(left.names[0]);
                let rightIndex = entryPoints.indexOf(right.names[0]);
                if (leftIndex > rightIndex) {
                    return 1;
                }
                else if (leftIndex < rightIndex) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        }),
        new AotPlugin({
            "mainPath": path.join(__dirname, "src/main.ts"),
            "entryModule": path.join(__dirname, 'src/app/app.module#AppModule'),
            "exclude": [],
            "tsConfigPath": path.join(__dirname, "src/tsconfig.app.json"),
            "skipCodeGeneration": true
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /\/node_modules\//,
                    chunks: 'all',
                    priority: 0,
                    enforce: true,
                },
            },
        },
    },
};