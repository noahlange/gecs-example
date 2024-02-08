import { Context, Phase, phase, throttle } from 'gecs';
import { round } from '../../utils';

export const statsJs = [
  phase(Phase.PRE_LOAD, ({ $ }: Context<$.Plugins>) => {
    $.performance.state.ts = performance.now();
    $.performance.stats.begin();
  }),
  phase(Phase.POST_RENDER, ({ $ }: Context<$.Plugins>) => {
    // we're calculating our own duration because the context's tick delta won't fall below 16.6 ms (60 FPS)
    $.performance.stats.end();
    $.performance.state.ticks.push(performance.now() - $.performance.state.ts);
  })
];

export const logger = [
  // every second, print the average tick duration for the last second
  throttle(1000, ({ $ }: Context<$.Plugins>) => {
    const ticks = $.performance.state.ticks;
    const avg = round(ticks.reduce((a, b) => a + b, 0) / ticks.length);
    $.performance.state.averages.push(avg);
    $.performance.state.ticks = [];
  }),
  // every ten seconds, print the average tick duration over the last ten seconds
  throttle(10000, ({ $ }: Context<$.Plugins>) => {
    const avgs = $.performance.state.averages;
    const ms = round(avgs.reduce((a, b) => a + b, 0) / avgs.length);
    $.performance.state.averages = [];
    console.log('Average tick duration (ms)', ms);
  })
];
