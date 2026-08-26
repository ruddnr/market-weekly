# 시장주보 콘텐츠 계약 v1 (2026-08-26)

파이프라인이 생성하는 초안과 사이트가 렌더링하는 글의 형식 계약. 변경 시 이 문서를 먼저 갱신한다.

## 포스트 폴더
`src/content/posts/YYYY-MM-DD-issue-NNN/` (날짜 = 발행일, NNN = 호수 3자리)
- `index.mdx` — 본문
- `charts.json` — 차트 데이터 (없으면 생략 가능)

## frontmatter (zod 스키마: src/content.config.ts)
title(문자열) · issue(0 이상 정수) · date(YYYY-MM-DD) · dataAsOf(YYYY-MM-DD 문자열)
· summary(300자 이하) · tags(문자열 배열) · draft(불리언, 초안은 true)

주의: `dataAsOf`는 반드시 따옴표로 감싼다 (`dataAsOf: "2026-08-30"`).
따옴표가 없으면 YAML이 날짜(Date)로 자동 변환해 문자열 스키마와 충돌, 빌드가 깨진다.

## 본문 구조
`## Ⅰ. <코너명>` / `## Ⅱ. <코너명>` / `## Ⅲ. <코너명>` H2 3개.
게재 수치에는 본문 내 괄호 각주로 출처·기준일 표기: 예) `(KRX, 2026-08-28 종가 기준)`

## charts.json (ChartSpec: src/lib/chart-spec.ts)
`{ "<chartId>": { type: "line"|"bar", title, unit?, source, labels: [...],
   series: [{ name, values: [숫자|null,...] }] } }`
- source는 반드시 "출처, 기준일" 형식. 더미·비공개 소스 금지
- MDX에서 `import charts from './charts.json'` 후 `<Chart spec={charts.<chartId>} />`

## 금지 사항 (스펙 §4 소재 규칙)
사내 데이터 원문·수치, 사내 바스켓 명칭·구성·레벨, 텔레그램 원문 인용,
매수·매도 의견, 출처 없는 수치.
