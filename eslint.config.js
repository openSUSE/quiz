const globals = require("globals");

module.exports = [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/*.yaml",
      "**/*.yml",
      "**/*.toml",
      "**/*.md",
      ".prettierrc.json",
      "netlify.toml",
      ".pre-commit-config.yaml",
      ".devcontainer/devcontainer.json",
      ".github/**",
      "Dockerfile",
      "Dockerfile-Production",
      "LICENSE",
      "bun.lock",
      "*.lock",
      "data/**",
      "public/stats.json",
      "public/stats.json.sample",
      "public/img/**",
      "public/less/**",
      "public/css/**",
      "views/**",
      "netlify/functions/tmp/stats.json",
      "po/**",
      "*.sh",
      ".gitkeep",
      ".gitignore",
      ".prettierignore",
      "package.json",
      "package-lock.json",
      ".env",
      ".env.example",
    ],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.commonjs,
        ...globals.es2021,
        ...globals.node,
      },
    },
    rules: {
      // You can add custom rules here, for example:
      // 'no-console': 'warn', // Warn about console.log statements
      // 'indent': ['error', 2], // Enforce 2-space indentation
      // 'quotes': ['error', 'single'], // Enforce single quotes
      // 'semi': ['error', 'always'], // Require semicolons
    },
  },
  {
    files: ["public/**/*.js"], // Target all JS files in the public directory
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["public/quizRenderer.js"],
    languageOptions: {
      globals: {
        quizData: "readonly",
        questions: "readonly",
      },
    },
  },
  {
    files: ["public/bingo.js"],
    languageOptions: {
      globals: {
        // Example: '$': 'readonly'
      },
    },
  },
];
