module.exports = {
  env: {
    browser: false, // Set to true if you have client-side JS that's not part of your EJS templates directly
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // You can add custom rules here, for example:
    // 'no-console': 'warn', // Warn about console.log statements
    // 'indent': ['error', 2], // Enforce 2-space indentation
    // 'quotes': ['error', 'single'], // Enforce single quotes
    // 'semi': ['error', 'always'], // Require semicolons
  },
  ignorePatterns: ["public/data/**"], // Ignoring the quiz data files in public/data
  overrides: [
    {
      files: ["public/**/*.js"], // Target all JS files in the public directory
      env: {
        browser: true, // Enable browser globals for these files
        node: false, // Disable Node.js globals if they are not needed
        commonjs: false, // Disable CommonJS if not used in client-side scripts
      },
      globals: {
        // Define globals that are specific to certain files if needed
        // For quizRenderer.js, quizData and questions are expected to be global
        // We can make this more specific if bingo.js doesn't use them.
      },
    },
    {
      files: ["public/quizRenderer.js"],
      globals: {
        quizData: "readonly",
        questions: "readonly",
      },
    },
    {
      files: ["public/bingo.js"],
      // Add specific globals for bingo.js if any, e.g., if it uses jQuery `$`
      globals: {
        // Example: '$': 'readonly'
      },
    },
  ],
};
