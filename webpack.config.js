module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'build/bundle.js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    devServer: {
        disableHostCheck: true
    }
}