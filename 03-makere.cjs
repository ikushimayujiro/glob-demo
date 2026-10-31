// makeRe は minimatch v10 系まで。v11 で削除された(changelog参照)
const mm10 = require('minimatch10')     // = minimatch@10.2.6(ESLint 10.14.0 が使う系列)
const mm11 = require('minimatch')       // = minimatch@11.0.3
for (const p of ['*.js', 'src/**/*.js', '*.{js,ts}']) {
  console.log(p.padEnd(14), '->', mm10.makeRe(p))
}
console.log('\nminimatch@11 に makeRe はある? ->', typeof mm11.makeRe, '/', typeof mm11.minimatch.makeRe)
