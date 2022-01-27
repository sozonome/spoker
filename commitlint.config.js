/** @type {import('@commitlint/types').UserConfig} */

const CommitLintConfiguration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "hall",
        "room",
        "auth",
        "layout",
        "ui",
        "pages",
        "services",
        "storybook",
        "functions",
        "types",
      ],
    ],
    "scope-case": [2, "always", "kebab-case"],
  },
};

module.exports = CommitLintConfiguration;
