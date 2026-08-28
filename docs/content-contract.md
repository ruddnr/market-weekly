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
게재 수치 표기(2026-08-28 개정): 수치 바로 뒤에 `\*` 표시를 붙이고, 글 맨 끝에 구분선(---) 다음
각주 한 줄 — 예) `\* 본문의 시세와 주간 등락률은 KRX 종가 기준이며, 기준일은 2026-08-21입니다.`
기준일이 다른 수치는 해당 위치에서 괄호로 날짜 표기 — 예) `1,500,000원(8월 19일)`.
(구 형식인 문단 내 괄호 각주 `(KRX, YYYY-MM-DD 종가 기준)`도 verify 게이트는 허용)

## charts.json (ChartSpec: src/lib/chart-spec.ts)
`{ "<chartId>": { type: "line"|"bar", title, unit?, source, labels: [...],
   series: [{ name, values: [숫자|null,...] }] } }`
- source는 반드시 "출처, 기준일" 형식. 더미·비공개 소스 금지
- MDX에서 `import charts from './charts.json'` 후 `<Chart spec={charts.<chartId>} />`로 렌더링한다.
  frontmatter를 닫는 `---` 직후에 아래 두 줄을 이 순서로 배치해야 렌더링된다(샘플 `src/content/posts/2026-08-26-sample/index.mdx` 참고):
  ```
  import charts from './charts.json';
  import Chart from '../../../components/Chart.astro';
  ```

## 금지 사항 (스펙 §4 소재 규칙)
사내 데이터 원문·수치, 사내 바스켓 명칭·구성·레벨, 텔레그램 원문 인용,
매수·매도 의견, 출처 없는 수치.
