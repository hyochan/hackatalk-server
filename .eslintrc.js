module.exports = {
  extends: ["standard"],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    jest: true
  },
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  rules: {
    "no-unused-vars": 0,
    "comma-dangle": ["error", "always-multiline"],
    semi: [2, "always"],
    "arrow-parens": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "no-new-object": "error",
    "no-array-constructor": "error",
    "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "always"
    }],
  }
};
