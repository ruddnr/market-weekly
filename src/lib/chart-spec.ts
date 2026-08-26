export type ChartSpec = {
  type: 'line' | 'bar';
  title: string;
  unit?: string;
  source: string; // 출처·기준일 (스펙 §4: 게재 수치는 출처·기준일 각주 필수)
  labels: string[];
  series: { name: string; values: (number | null)[] }[];
};

const PALETTE = ['#8b1e2d', '#1a2e4a', '#b98a2f', '#5a7a63', '#8a7f6f'];
const FONT = { family: "'Noto Sans KR', sans-serif", size: 12 };

export function toChartJsConfig(spec: ChartSpec) {
  return {
    type: spec.type,
    data: {
      labels: spec.labels,
      datasets: spec.series.map((s, i) => ({
        label: s.name,
        data: s.values,
        borderColor: PALETTE[i % PALETTE.length],
        backgroundColor: spec.type === 'bar' ? PALETTE[i % PALETTE.length] : 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
        spanGaps: true,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index' as const, intersect: false },
      plugins: {
        legend: { display: spec.series.length > 1, labels: { font: FONT, color: '#4d463c', boxWidth: 12 } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: FONT, color: '#8a7f6f' } },
        y: {
          grid: { color: '#e7dfd2' },
          ticks: {
            font: FONT, color: '#8a7f6f',
            callback: spec.unit ? (v: unknown) => `${v}${spec.unit}` : undefined,
          },
        },
      },
    },
  };
}
