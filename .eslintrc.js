module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb','prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: "babel-eslint",
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
    'prettier/prettier': ['error'],
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    "react/no-multi-comp": ["error", { "ignoreStateless": true }]
  },
};
