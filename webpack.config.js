const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: [
      'react-hot-loader/patch',
      './src/index.js'
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              'css-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          exclude: /node_modules/,
          loader: 'file-loader'
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
          use: 'url-loader',
        }
        //
        // {
        //   test: /\.s?css$/,
        //   use: [
        //     'style-loader',
        //     'css-loader',
        //     'sass-loader'
        //   ]
        // }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      CSSExtract
    ],
    devServer: {
      contentBase: './dist',
      hot: true
    }
  };
}
