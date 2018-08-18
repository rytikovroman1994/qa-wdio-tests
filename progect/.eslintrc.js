module.exports = {
  root: true,
  extends: 'eslint-config-airbnb-base',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  env: {
    browser: true,
		node: true,
		es6: true,
    mocha: true,
		'webdriverio/wdio': true,
  },
  globals: {
    // chai
    expect: true,
    AssertionError: true,
    Assertion: true,
  },
  rules: {
		'max-len': ['error', {
			code: 120,
			comments: 180,
			"ignoreComments": true,
			"ignoreTrailingComments": true,
			"ignoreUrls": true,
			"ignoreStrings": true,
			"ignoreTemplateLiterals": true,
			"ignoreRegExpLiterals": true
    }],
    'func-names': 'off', // выключаем для того, что бы удобно использовать context в mocha
    'no-unused-expressions': 'off',
    'no-empty': 'off',
    'strict': 'error',
    'no-restricted-syntax': 'off',
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-tag-names': 'warn',
    'jsdoc/check-types': 'warn',
    'jsdoc/newline-after-description': 'warn',
    'jsdoc/require-description-complete-sentence': 'warn',
    'jsdoc/require-example': 'warn',
    'jsdoc/require-hyphen-before-param-description': 'warn',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-param-description': 'warn',
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-returns-description': 'warn',
    'jsdoc/require-returns-type': 'warn',
  },
  plugins: [
    'json',
		'jsdoc',
		'webdriverio'
  ],
};
