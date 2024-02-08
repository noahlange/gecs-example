import Stats from 'stats.js';
import { Plugin } from 'gecs';
import { logger, statsJs } from './systems';
import { PluginData } from 'gecs';

interface PerformanceState {
  ts: number;
  averages: number[];
  ticks: number[];
}

export class Performance extends Plugin<$.Plugins> {
  public static readonly type = 'performance';

  public $: PluginData<$.Plugins> = { systems: [...logger, ...statsJs] };
  public state: PerformanceState = { ts: 0, averages: [], ticks: [] };
  public stats: Stats = new Stats();

  public start() {
    document.body.appendChild(this.stats.dom);
  }
}
