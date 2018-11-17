var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src/');
var DIST_DIR = path.join(__dirname, '/client/dist/');


module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options:{
         presets:['@babel/react','@babel/preset-env']
       }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css']
  },
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true
  }
};



// var path = require('path');
// var SRC_DIR = path.join(__dirname, '/react-client/src');
// var DIST_DIR = path.join(__dirname, '/react-client/dist');

// module.exports = {
//   entry: `${SRC_DIR}/index.jsx`,
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR
//   },
//   module : {
//     loaders : [
//       {
//         test : /\.jsx?/,
//         include : SRC_DIR,
//         loader : 'babel-loader',
//         query: {
//           presets: ['react', 'es2015']
//        }
//       }
//     ]
//   }
// };

