// minimatch: 「1つのパスがパターンに合うか」を判定する(ディスクは見ない)
import { minimatch } from 'minimatch'

const cases = [
  ['src/a.js', 'src/*.js'],
  ['src/deep/nested/d.js', 'src/*.js'],
  ['src/deep/nested/d.js', 'src/**/*.js'],
  ['src/.hidden.js', 'src/*.js'],
  ['src/.hidden.js', 'src/*.js', { dot: true }],
  ['src/.config/c.js', 'src/**/*.js'],
  ['src/b.ts', 'src/*.{js,ts}'],
  ['src/b.ts', 'src/*.{js,ts}', { nobrace: true }],
  ['src/a.js', '!src/*.ts'],
  ['src/a.js', 'src/?.js'],
  ['src/a.js', 'src/[ab].js'],
]
for (const [path, pattern, opts] of cases) {
  console.log(String(minimatch(path, pattern, opts)).padEnd(5), path.padEnd(22), pattern, opts ? JSON.stringify(opts) : '')
}

// ブレース展開はマッチング前に行われる
console.log('\nbraceExpand("src/*.{js,ts}") ->', minimatch.braceExpand('src/*.{js,ts}'))
