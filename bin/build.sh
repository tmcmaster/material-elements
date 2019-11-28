#!/bin/bash

npm install
polymer build
rsync -a --exclude polymer build/default/node_modules/@material/ src/

for i in `grep -rl '\.\./tslib/' src`; do perl -spi -e 's/(\.\.\/)+tslib/tslib/g' "$i"; done
for i in `grep -rl '\.\./blocking-elements/' src`; do perl -spi -e 's/(\.\.\/)+blocking-elements/blocking-elements/g' "$i"; done
for i in `grep -rl '\.\./wicg-inert/' src`; do perl -spi -e 's/(\.\.\/)+wicg-inert/wicg-inert/g' "$i"; done

pika build;
