import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  perfectionist.configs["recommended-natural"],
);
