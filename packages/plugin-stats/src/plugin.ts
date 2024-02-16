import StatsJS from 'stats.js';
import { Plugin } from 'gecs';

import type { PluginData } from 'gecs';
import { stats, loggers } from './systems';

interface PerformanceState {
  ts: number;
  averages: number[];
  ticks: number[];
}

export class Stats extends Plugin<$.Plugins> {
  public static readonly type = 'stats';

  public $: PluginData<$.Plugins> = {
    systems: [...stats, ...loggers]
  };

  public readonly stats: StatsJS = new StatsJS();
  public readonly state: PerformanceState = { ts: 0, averages: [], ticks: [] };

  public start() {
    document.body.appendChild(this.stats.dom);
  }
}
