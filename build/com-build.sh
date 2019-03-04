#!/bin/bash

if [ $? = 0 ]; then
  # purge release
  rm -fr release

   #babel transform lib es5
   babel src --out-dir release/lib --copy-files

   export BABEL_ENV=production
   babel src --out-dir release/es --copy-files

   cp package.json release/package.json
   cp README.md release/README.md
else
  echo 'Code cant be verify, plz check ~'
fi
