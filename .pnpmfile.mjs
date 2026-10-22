// @ts-check

export const hooks = {
  /**
   * Pins TypeDoc's compiler dependency to the TypeScript 6 API it requires.
   *
   * @param {import("@pnpm/types").BaseManifest} pkg - Package manifest being read by pnpm.
   * @returns {import("@pnpm/types").BaseManifest} The manifest with any TypeDoc dependency override applied.
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
