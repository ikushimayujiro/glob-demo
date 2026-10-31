#!/usr/bin/env bash
# 同じファイル構成に対して、ツールごとにglobの結果がどう違うかを確かめる
set -u
cd "$(dirname "$0")" && rm -rf tools && mkdir tools && cd tools
cp -r ../fixture/src . && ln -s ../node_modules node_modules
rel() { sed "s#$PWD/##" | sort; }

echo "=== git (.gitignore)  $(git --version)"
git init -q .
check() { printf '%s\n' "$1" > .gitignore; echo "-- .gitignore: $1"; shift
  for p in "$@"; do printf '   %-22s %s\n' "$p" "$(git check-ignore -q "$p" && echo ignored || echo not-ignored)"; done; }
check 'src/*.js'      src/a.js src/.hidden.js src/deep/nested/d.js
check 'src/**/*.js'   src/deep/nested/d.js src/.config/c.js
check 'src/*.{js,ts}' src/a.js src/b.ts
rm .gitignore

echo "=== TypeScript (tsconfig include)  $(npx tsc -v)"
ts() { echo "{\"compilerOptions\":{\"allowJs\":true,\"noEmit\":true},\"include\":$1}" > tsconfig.json
  echo "-- include: $1"; npx tsc --listFilesOnly -p . 2>&1 | grep -v node_modules | rel | sed 's/^/   /'; }
ts '["src/**/*"]'
ts '["src/**/*.{js,ts}"]'
ts '["src/.config/*"]'
rm tsconfig.json

echo "=== ESLint (flat config files)  $(npx eslint -v)"
echo "export default [{ files: ['src/**/*.{js,ts}'] }]" > eslint.config.mjs
npx eslint -f json src | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>JSON.parse(s).forEach(r=>console.log('   '+r.filePath.replace(process.cwd()+'/',''))))" | sort
rm eslint.config.mjs

echo "=== Jest (testMatch)  $(npx jest --version)"
echo '{}' > jest.config.json; echo "-- default testMatch"
npx jest --listTests -c jest.config.json | rel | sed 's/^/   /'
echo '{"testMatch":["<rootDir>/src/**/*.{js,ts}","!**/*.test.js"]}' > jest.config.json
echo '-- testMatch: ["<rootDir>/src/**/*.{js,ts}", "!**/*.test.js"]'
npx jest --listTests -c jest.config.json | rel | sed 's/^/   /'
rm jest.config.json

echo "=== Vite (import.meta.glob)  $(npx vite -v | head -1)"
cat > main.js <<'E'
export const plain = Object.keys(import.meta.glob('./src/**/*.js'))
export const brace = Object.keys(import.meta.glob('./src/**/*.{js,ts}'))
export const negated = Object.keys(import.meta.glob(['./src/**/*.js', '!**/*.test.js']))
export const exhaustive = Object.keys(import.meta.glob('./src/**/*.js', { exhaustive: true }))
E
npx vite build --ssr main.js --outDir dist --logLevel silent
node --input-type=module -e "const m=await import('./dist/main.mjs');for(const k of ['plain','brace','negated','exhaustive'])console.log('   '+k.padEnd(10), m[k].sort().join(', '))"
