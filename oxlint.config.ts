import { defineConfig } from "oxlint";
import { config } from "oxlint-config-noir";

export default defineConfig({
  extends: [config.recommended],
  rules  : {
    "@stylistic/no-extra-parens"         : "off",
    "@stylistic/lines-around-comment"    : "off",
    "import/exports-last"                : "off",
    "eslint/no-use-before-define"        : "off",
    "eslint/no-duplicate-imports"        : "off",
    "unicorn/no-immediate-mutation"      : "off",
    "js-plugin-unicorn/name-replacements": "off",
  },
});
