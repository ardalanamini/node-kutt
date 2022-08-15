#!/usr/bin/env sh

cat >build/cjs/package.json <<!EOF
{
  "type": "commonjs",
  "imports": {
    "#src/API": {
      "browser": {
        "types": "./api/API.browser.d.ts",
        "default": "./api/API.browser.js"
      },
      "default": {
        "types": "./api/API.node.d.ts",
        "default": "./api/API.node.js"
      }
    },
    "#src/*": {
      "types": "./*.d.ts",
      "default": "./*.js"
    }
  }
}
!EOF

cat >build/esm/package.json <<!EOF
{
  "type": "module",
  "imports": {
    "#src/API": {
      "browser": {
        "types": "./api/API.browser.d.ts",
        "default": "./api/API.browser.js"
      },
      "default": {
        "types": "./api/API.node.d.ts",
        "default": "./api/API.node.js"
      }
    },
    "#src/*": {
      "types": "./*.d.ts",
      "default": "./*.js"
    }
  }
}
!EOF
