module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
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
