module.exports = {
    entry: "./src/main.jsx",
    output: {
        path: __dirname,
        filename: 'main.js',
        libraryTarget: "commonjs2"
    },
    devtool: "none", // prevent webpack from using eval() on my module
    externals: {
        application: 'application',
        commands: 'commands',
        clipboard: 'clipboard',
        assets: 'assets',
        uxp: 'uxp',
        scenegraph: 'scenegraph',
        viewport: 'viewport',
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    plugins: [
                        "transform-class-properties",
                        "transform-react-jsx",
                        "transform-object-rest-spread",
                    ]
                }
            },
            {
                test: /\.png$|\.gif$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            },
        ]
    }
};