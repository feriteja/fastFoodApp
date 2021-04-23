module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@screens': './src/screens',
          '@assets': './src/assets/',
          '@router': './src/config/router',
          '@components': './src/components',
          '@constants': './src/constants',
          '@firebaseFunc': './src/utils/functions/firebase.ts',
          '@redux': './src/config/redux',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
