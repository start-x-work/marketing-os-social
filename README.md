# Marketing-OS Social

AI-native social media toolkit for post evaluation, content calendar diagnosis, and account audits.

v0.1 CLI focuses on **decision support only** — no auto posting, scheduling, or publishing.

思想・境界線: **[manifesto / SNS 編](https://github.com/start-x-work/manifesto/blob/main/social/README.md)**  
共通基盤: **[@start-x-work/mos-kit](https://github.com/start-x-work/mos-kit)**

## Install

```bash
npx @start-x-work/mos-social post evaluate "Your post text" --platform x --format json
```

## v0.1 CLI Features

- Post evaluation: `mos-social post evaluate "<text>" [--platform x|threads|instagram]`
- Calendar diagnosis: `mos-social calendar analyze '<json array>'`
- Account audit: `mos-social account audit <handle> [--platform manual]`

All commands support `--format json|table|markdown`, `--model gemini|openai|anthropic`, and `--quiet`.

**Quickstart:** [docs/QUICKSTART.md](./docs/QUICKSTART.md)

## Web UI (N8)

https://marketing-os-social.pages.dev — post evaluation, calendar diagnosis, account audit. AI keys are BYOK.

## OSS vs Commercial

| OSS (this repo) | Commercial [Marketing-OS](https://marketing-os.jp) |
|---|---|
| Post eval, calendar/account diagnosis | Community ops, team decision OS |
| CLI / Web (Apache-2.0) | SLA-backed support |

Boundary: [manifesto / Social](https://github.com/start-x-work/manifesto/blob/main/social/README.md)

## Content OS knowledge encoded

- **1/10 rule** — promotional posts should stay at or below 10% of the calendar
- **URL placement** — direct LP URLs in post body may reduce reach on X/Threads/Instagram

## Development

```bash
pnpm install --frozen-lockfile
pnpm lint && pnpm build && pnpm test && pnpm typecheck
```

Requires `@start-x-work/mos-kit` (local path: `../mos-kit` until npm publish).

## License

Apache-2.0

---

🔗 marketing-os.jp / https://marketing-os.jp
