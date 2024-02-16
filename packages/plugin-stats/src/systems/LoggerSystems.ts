import { round } from '@gex/utils';
import type { Context } from 'gecs';
import { Phase, phase, throttle } from 'gecs';

export default [
  // tick start
  phase(Phase.PRE_LOAD, ({ $ }: Context<$.Plugins>) => {
    $.stats.state.ts = performance.now();
  }),
  // tick end
  phase(Phase.POST_RENDER, ({ $ }: Context<$.Plugins>) => {
    $.stats.state.ticks.push(performance.now() - $.stats.state.ts);
  }),
  // every second, log the average tick duration for the last second
  throttle(1000, ({ $ }: Context<$.Plugins>) => {
    const ticks = $.stats.state.ticks;
    const avg = round(ticks.reduce((a, b) => a + b, 0) / ticks.length);
    $.stats.state.averages.push(avg);
    $.stats.state.ticks = [];
  }),
  // every ten seconds, print the average tick duration over the last ten seconds
  throttle(10000, ({ $ }: Context<$.Plugins>) => {
    const avgs = $.stats.state.averages;
    const ms = round(avgs.reduce((a, b) => a + b, 0) / avgs.length);
    $.stats.state.averages = [];
    console.log('Average tick duration (ms)', ms);
  })
];
