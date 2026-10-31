# glob-demo

Zenn の記事「globの仕組みを手で確かめる:node-glob・minimatch・brace-expansionの役割とツールごとの違い」のサンプルコードです。

<!-- TODO: 記事URL -->

## 必要なもの

- Node.js `^20.19.0` / `^22.13.0` / `>=24`(Vite 8・ESLint 10 の `engines` による。確認は v20.19.2)
- npm
- git(`05-tools.sh` で `.gitignore` の挙動を確かめるのに使います)
- bash

## 動かし方

```sh
npm install
npm run setup      # fixture/ にデモ用のファイル構成を作る
npm run glob       # 01: glob でファイルを探す
npm run minimatch  # 02: minimatch で1つのパスを判定する
npm run makere     # 03: minimatch v10 の makeRe で正規表現を見る(v11 では削除)
npm run brace      # 04: brace-expansion の展開と、展開数の増え方
npm run tools      # 05: git / TypeScript / ESLint / Jest / Vite で結果を比べる
```

`npm run tools` は `tools/` に作業用ディレクトリを作り、その中で `git init` を実行します。`tools/` と `fixture/` は `.gitignore` で除外しています。

実行結果の例は `expected/` に置いています。

## ファイル

| ファイル | 内容 |
|---|---|
| `00-setup.sh` | ドットファイル・ドットディレクトリを含むデモ用ファイル構成を `fixture/` に作る |
| `01-glob.mjs` | `glob` で `*` / `**` / `dot` / ブレース / `ignore` を試す |
| `02-minimatch.mjs` | `minimatch` でパスごとの判定と `braceExpand` を見る |
| `03-makere.cjs` | `minimatch@10` の `makeRe()` の出力と、`minimatch@11` に `makeRe` が無いことを確認 |
| `04-brace.mjs` | `brace-expansion` の展開例、`{a,b}` を連結したときの件数・文字数の増え方、`max` / `maxLength` |
| `05-tools.sh` | 同じファイル構成に対する .gitignore / tsconfig `include` / ESLint `files` / Jest `testMatch` / Vite `import.meta.glob` の結果 |
| `expected/` | 上記の実行結果 |
| `versions.txt` | 確認した環境と `npm ls brace-expansion` の出力 |

## 注意

`04-brace.mjs` は、展開数が増える様子を `n = 16`(入力80文字、65,536件)までの小さい規模でだけ示しています。大きな値を試すとメモリを大量に使い、プロセスが落ちることがあるので、値を大きくしないでください。

## 確認したバージョン(2026-10-31)

| パッケージ / ツール | バージョン |
|---|---|
| Node.js | v20.19.2 |
| npm | 11.21.1 |
| git | 2.47.3 |
| glob | 14.0.3 |
| minimatch | 11.0.3 |
| minimatch(`minimatch10` の別名で導入) | 10.2.6 |
| brace-expansion | 5.0.12 |
| eslint | 10.14.0 |
| typescript | 7.0.2 |
| vite | 8.3.5 |
| jest | 30.5.2 |

バージョンが変わると結果が変わることがあります。特に minimatch は v11 で照合の仕組みが変わり、`makeRe()` が削除されています。
