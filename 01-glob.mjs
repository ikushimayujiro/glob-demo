// glob: ディスクを実際に歩いてファイルを探す
import { glob } from 'glob'

const cwd = new URL('./fixture/', import.meta.url).pathname
const show = async (pattern, opts = {}) => {
  const files = (await glob(pattern, { cwd, posix: true, ...opts })).sort()
  console.log(`${pattern} ${JSON.stringify(opts)}\n  ->`, files)
}

await show('src/*.js')
await show('src/**/*.js')
await show('src/**/*.js', { dot: true })
await show('src/**/*.{js,ts}')
await show('src/**/*.js', { ignore: ['**/*.test.js', 'src/__tests__/**'] })
