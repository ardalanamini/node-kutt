#!/usr/bin/env sh

cat >cjs/package.json <<!EOF
{
  "type": "commonjs"
}
!EOF

cat >es/package.json <<!EOF
{
  "type": "module"
}
!EOF
