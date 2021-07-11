import Stats from 'stats.js';
import { Phase, phase, Plugin } from 'gecs';
import { round } from '../../utils';

const TICKS = 100;

interface Durations {
  averages: number[];
  ticks: number[];
}

export class StatsPlugin extends Plugin {
  public static readonly type = 'stats';

  public $ = {
    systems: [
      phase(Phase.PRE_LOAD, () => {
        this.ts = performance.now();
        this.stats.begin();
      }),
      phase(Phase.POST_RENDER, () => {
        // and we're done working, just wrap things up
        this.stats.end();

        // we're calculating our own dt because the context's is capped at 60 FPS
        this.ms.ticks.push(performance.now() - this.ts);

        if (!(this.ms.ticks.length % TICKS)) {
          const val = round(this.ms.ticks.reduce((a, b) => a + b, 0) / TICKS);
          this.ms.averages.push(val);
          this.ms.ticks = [];
          // every 100 ticks, print the average tick duration
          console.log(val);

          // but every 1000 ticks, also print the average tick duration since the beginning
          const avgs = this.ms.averages;
          if (!(avgs.length % 10)) {
            console.log(
              'rolling average',
              round(avgs.reduce((a, b) => a + b, 0) / avgs.length)
            );
          }
        }
      })
    ]
  };

  public stats: Stats = new Stats();
  public ts: number = 0;
  public ms: Durations = { averages: [], ticks: [] };

  public start() {
    document.body.appendChild(this.stats.dom);
  }
}
