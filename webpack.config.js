var path = require('path');
module.exports = {
    mode: 'production',
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    entry: './src/Ratings.ts',
    output: {
        path: path.resolve('lib'),
        filename: 'Ratings.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: 'ts-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: [/(node_modules)/, path.resolve('src/App.js'), path.resolve('src/index.js'), path.resolve('src/serviceWorker.js')],
                use: 'babel-loader'
            },
            { 
                test: /\.css$/,
                exclude: [path.resolve('src/App.css'), path.resolve('src/index.css')],
                loader: "style-loader!css-loader" 
            },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: '/fonts',
                      publicPath: '../fonts'
                    }
                  }
                ]
              }
        ],
    }
}