import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";

export default [
  // ⛔ Must be separate for ignores to work in flat config
  {
    ignores: ["**/*.js"],
  },

  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    perfectionist.configs["recommended-alphabetical"],
    eslintConfigPrettier,
    {
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
      },
    },
  ),
];
