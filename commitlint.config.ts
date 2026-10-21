import type { UserConfig } from "@commitlint/types";

export default {
  extends: ["@commitlint/config-conventional"],
  rules  : {
    "signed-off-by": [2, "always", "Signed-off-by:"],
  },
} satisfies UserConfig;
