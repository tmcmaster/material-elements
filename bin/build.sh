#!/bin/bash

npm install
polymer build
rsync -a --exclude polymer --exclude mode_modules build/default/node_modules/@material/ src/
rm -rf src/*/node_modules

for i in `grep -rl '\.\./tslib/' src`; do perl -spi -e 's/(\.\.\/)+tslib/tslib/g' "$i"; done
for i in `grep -rl '\.\./blocking-elements/' src`; do perl -spi -e 's/(\.\.\/)+blocking-elements/blocking-elements/g' "$i"; done
for i in `grep -rl '\.\./wicg-inert/' src`; do perl -spi -e 's/(\.\.\/)+wicg-inert/wicg-inert/g' "$i"; done

for i in `grep -rl '\./node_modules/' src`; do perl -spi -e 's/\.\/node_modules\///g' "$i"; done

pika build;
