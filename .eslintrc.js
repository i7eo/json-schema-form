module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    '@typescript-eslint/no-use-before-define': 'off', // 不允许函数声明提升
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // 不允许写any
    // // enable additional rules
    // "indent": ["error", 4],
    // "linebreak-style": ["error", "unix"],
    // "quotes": ["error", "double"],
    // "semi": ["error", "always"],

    // // override configuration set by extending "eslint:recommended"
    // "no-empty": "warn",
    // "no-cond-assign": ["error", "always"],

    // // disable rules from base configurations
    //  "for-direction": "off",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
