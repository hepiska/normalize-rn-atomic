module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@src': './src',
          '@modules': './src/modules',
          '@pages': './src/pages',
        },
      },
    ],
    'jest-hoist',
  ],
};
