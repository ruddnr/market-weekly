import { describe, it, expect } from 'vitest';
import { toChartJsConfig, type ChartSpec } from './chart-spec';

const base: ChartSpec = {
  type: 'line', title: '더미', source: '더미 출처, 2026-08-26',
  labels: ['월', '화'], series: [{ name: 'A', values: [1, null] }],
};

describe('toChartJsConfig', () => {
  it('타입과 데이터를 그대로 매핑한다', () => {
    const cfg = toChartJsConfig(base);
    expect(cfg.type).toBe('line');
    expect(cfg.data.labels).toEqual(['월', '화']);
    expect(cfg.data.datasets[0].data).toEqual([1, null]);
  });
  it('결측(null)은 선을 잇는다 (spanGaps)', () => {
    expect(toChartJsConfig(base).data.datasets[0].spanGaps).toBe(true);
  });
  it('시리즈가 하나면 범례를 숨긴다', () => {
    expect(toChartJsConfig(base).options.plugins.legend.display).toBe(false);
    const two = { ...base, series: [...base.series, { name: 'B', values: [2, 3] }] };
    expect(toChartJsConfig(two).options.plugins.legend.display).toBe(true);
  });
  it('팔레트는 버건디부터 순환한다', () => {
    const cfg = toChartJsConfig(base);
    expect(cfg.data.datasets[0].borderColor).toBe('#8b1e2d');
  });
  it('6번째 시리즈는 팔레트 첫 색으로 순환(wrap-around)한다', () => {
    const sixSeries: ChartSpec = {
      ...base,
      series: ['A', 'B', 'C', 'D', 'E', 'F'].map((name) => ({ name, values: [1, 2] })),
    };
    const cfg = toChartJsConfig(sixSeries);
    expect(cfg.data.datasets[5].borderColor).toBe(cfg.data.datasets[0].borderColor);
    expect(cfg.data.datasets[5].borderColor).toBe('#8b1e2d');
  });
  it('bar 타입이면 backgroundColor가 팔레트 색이다 (투명 아님)', () => {
    const bar: ChartSpec = { ...base, type: 'bar' };
    const cfg = toChartJsConfig(bar);
    expect(cfg.data.datasets[0].backgroundColor).toBe('#8b1e2d');
    expect(cfg.data.datasets[0].backgroundColor).not.toBe('transparent');
  });
  it('unit이 있으면 y틱 callback이 함수이고, 없으면 undefined다', () => {
    const withUnit: ChartSpec = { ...base, unit: '%' };
    expect(typeof toChartJsConfig(withUnit).options.scales.y.ticks.callback).toBe('function');
    expect(toChartJsConfig(base).options.scales.y.ticks.callback).toBeUndefined();
  });
});
