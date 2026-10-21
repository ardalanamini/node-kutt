import { defineConfig } from "oxlint";
import { config } from "oxlint-config-noir";

export default defineConfig({
  extends: [config.recommended],
  rules  : {
    "js-plugin-unicorn/name-replacements": "off",
  },
});
