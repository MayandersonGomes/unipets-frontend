module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ts',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@images': './src/assets/images',
          '@validations': './src/validations',
          '@services': './src/services',
          '@pages': './src/pages',
          '@interfaces': './src/types/interfaces',
        },
      },
    ],
  ],
};
