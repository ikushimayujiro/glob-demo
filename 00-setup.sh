#!/usr/bin/env bash
# デモ用のファイル構成を作る
set -eu
cd "$(dirname "$0")"
rm -rf fixture && mkdir -p fixture/src/{deep/nested,.config,__tests__}
for f in src/a.js src/b.ts src/.hidden.js src/.config/c.js src/deep/nested/d.js \
         src/app.test.js src/__tests__/e.js src/.config/f.test.js; do
  echo "export const x = 1;" > "fixture/$f"
done
find fixture -type f | sort
