// @ts-check

export const hooks = {
  /**
   * @param {import("@pnpm/types").BaseManifest} pkg
   */
  readPackage(pkg) {
    if (pkg.name === "typedoc" && pkg.version === "0.28.20") {
      // TypeDoc needs the TypeScript 6 compiler API, independently of the project compiler.
      delete pkg.peerDependencies?.typescript;
      (pkg.dependencies ??= {}).typescript = "6.0.3";
    }

    return pkg;
  },
};
