# Quickstart — Marketing-OS Social

利用者向けの最短手順です。評価・診断のみ — 自動投稿・スケジュール投稿は行いません。

## CLI（npm）

```bash
# 投稿評価（Gemini キーが必要）
export GEMINI_API_KEY="AIza..."
npx @start-x-work/mos-social post evaluate "Marketing-OS で意思決定を構造化する" \
  --platform x --format json

# カレンダー診断（API キー不要）
npx @start-x-work/mos-social calendar analyze \
  '[{"date":"2026-06-01","platform":"x","text":"Tips","type":"value"}]' \
  --format json

# アカウント診断（読み取り専用・manual）
npx @start-x-work/mos-social account audit example --format json
```

統合 CLI 経由:

```bash
npx @start-x-work/marketing-os social post evaluate "Hello" --platform x --quiet
```

## Web UI

**URL:** https://marketing-os-social.pages.dev

### AI 機能（BYOK）

1. フッターの **「AI API キー（BYOK）」** を開く
2. Gemini キーを入力して **保存**
3. **投稿評価** で AI 評価を利用

カレンダー診断・アカウント診断は AI キーなしでも利用できます。

## OSS と商用の境界

| OSS（本リポ） | 商用 [Marketing-OS](https://marketing-os.jp) |
|---|---|
| 投稿評価・カレンダー診断 | コミュニティ運用の伴走 |
| アカウント診断（manual） | 組織横断の意思決定 OS |
| BYOK | SLA 付きサポート |

詳細: [manifesto — SNS 編](https://github.com/start-x-work/manifesto/blob/main/social/README.md)
