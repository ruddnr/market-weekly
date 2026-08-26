import Chart from 'chart.js/auto';
import { toChartJsConfig, type ChartSpec } from './chart-spec';

const mounted = new WeakSet<HTMLCanvasElement>();

export function mountCharts() {
  document.querySelectorAll<HTMLCanvasElement>('canvas[data-chart-spec]').forEach(el => {
    if (mounted.has(el)) return;
    mounted.add(el);
    const spec = JSON.parse(el.dataset.chartSpec!) as ChartSpec;
    new Chart(el, toChartJsConfig(spec) as never);
  });
}
