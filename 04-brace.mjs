// brace-expansion: {a,b} や {1..3} を文字列の配列に展開する
import { expand } from 'brace-expansion'

console.log(expand('file.{js,ts}'))
console.log(expand('img{1..3}.png'))
console.log(expand('{a,b}{x,y}'))
console.log(expand('src/{components,hooks}/**/*.{ts,tsx}'))

// グループを連結すると、展開数は掛け算で増える(小さい規模だけ試す)
console.log('\n展開数の増え方: "{a,b}".repeat(n)')
for (const n of [1, 2, 4, 8, 12, 16]) {
  const r = expand('{a,b}'.repeat(n))
  const totalChars = r.reduce((s, x) => s + x.length, 0)
  console.log(`n=${String(n).padStart(2)} 入力${String(n * 5).padStart(3)}文字 -> ${String(r.length).padStart(6)}件 (理論値 2^n=${2 ** n}) 合計${totalChars}文字`)
}

// 上限オプション: max(件数)と maxLength(合計文字数)
console.log('\nmax: 10 ->', expand('{1..100}', { max: 10 }).length, '件')
const capped = expand('{a,b}'.repeat(12), { maxLength: 1000 })
console.log('maxLength: 1000 ->', capped.length, '件, 合計', capped.reduce((s, x) => s + x.length, 0), '文字')
