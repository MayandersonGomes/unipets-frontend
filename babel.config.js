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
          '@components': './src/components',
          '@global': './src/global',
          '@pages': './src/pages',
          '@routes': './src/routes',
          '@services': './src/services',
          '@interfaces': './src/types/interfaces',
          '@validations': './src/validations',
        },
      },
    ],
  ],
};
