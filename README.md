# 시장주보(市場週報)

주간 투자 인사이트를 다루는 공개 블로그입니다. https://market-weekly.pages.dev

이 블로그의 모든 글은 개인 의견이며 투자 권유가 아닙니다.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :----------------- | :------------------------------------------- |
| `npm install`      | Installs dependencies                        |
| `npm run dev`      | Starts local dev server at `localhost:4321`  |
| `npm run build`    | Build your production site to `./dist/`      |
| `npm run preview`  | Preview your build locally, before deploying |
| `npm test`         | Run the vitest suite                         |

## 로컬 빌드 (Windows / Node 버전 주의)

이 환경에서는 Node 24.x로 `npm run build`를 돌리면 Astro의 클라이언트 스크립트 번들링 단계에서 네이티브 크래시(0xC0000409, STATUS_STACK_BUFFER_OVERRUN)가 발생한다 — Vite 8/rolldown, Vite 6/rollup 양쪽에서 동일 재현됨. Node 20 LTS(`.nvmrc` 참고, 20.20.2로 검증됨)에서는 정상 빌드된다.

- **로컬(Windows) 빌드:** 전역 Node 버전은 그대로 두고 `build-local.cmd`를 사용한다 (`%LOCALAPPDATA%\nvm\v20.20.2\node.exe`로 astro build + pagefind를 직접 호출).
- **CI / Cloudflare Pages:** `package.json`의 `engines.node`(`20.x`)와 `.nvmrc`(`20.20.2`)에 맞춰 `NODE_VERSION=20`으로 빌드하므로 별도 조치 불필요.
