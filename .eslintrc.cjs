module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: { browser: true, es6: true, node: false },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    /** handled by typescript */
    'no-unused-vars': [0],
    '@typescript-eslint/no-unused-vars': [1],
    '@typescript-eslint/no-implicit-any': [0],
    /** personal preferences */
    '@typescript-eslint/prefer-optional-chain': [2],
    '@typescript-eslint/member-delimiter-style': [2],
    '@typescript-eslint/no-empty-interface': [1],
    '@typescript-eslint/array-type': [1, { default: 'array' }],
    /** where possible, require explicit types. */
    '@typescript-eslint/no-inferrable-types': [0],
    '@typescript-eslint/prefer-enum-initializers': [2],
    '@typescript-eslint/explicit-member-accessibility': [2],
    '@typescript-eslint/explicit-function-return-type': [0],
    // consistency...
    '@typescript-eslint/consistent-type-definitions': [2, 'interface'],
    '@typescript-eslint/consistent-type-imports': [1],
    '@typescript-eslint/consistent-type-assertions': [
      2,
      { assertionStyle: 'as' }
    ]
  },
  ignorePatterns: ['*.js']
};
