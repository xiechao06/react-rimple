#!/bin/bash

for type in cjs es6 browser browser-min
do
  node_modules/rollup/bin/rollup -c rollup.config.${type}.js
done
