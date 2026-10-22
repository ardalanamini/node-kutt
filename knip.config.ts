import type { KnipConfig } from "knip";

export default {
  entry  : ["src/index.ts!"],
  project: [
    "src/**/*.ts!",
    "*.ts",
  ],
} satisfies KnipConfig;
