module.exports = {
  env:{
    production: {
      plugins: ["transform-remove-console"]
    }
  },
  presets: ['module:metro-react-native-babel-preset',"@babel/preset-typescript"],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js', '.svg'],
        alias: {
          '@src': './src',
          '@modules': './src/modules',
          '@hocs': './src/hocs',
          '@pages': './src/pages',
          '@utils': './src/utils',
          '@components': './src/components',
          '@assets': './src/assets',
        },
      },
    ],
    'jest-hoist',
  ],
};
