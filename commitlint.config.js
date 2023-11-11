/** @type {import('@commitlint/types').UserConfig} */

const CommitLintConfiguration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "analytics",
        "auth",
        "hall",
        "layout",
        "pages",
        "room",
        "seo",
        "sentry",
        "services",
        "theme",
        "types",
        "ui",
        "utils",
      ],
    ],
    "scope-case": [2, "always", "kebab-case"],
  },
};

module.exports = CommitLintConfiguration;
