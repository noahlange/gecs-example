import Stats from 'stats.js';
import { round } from '../utils';

const stats = new Stats();
document.body.appendChild(stats.dom);

const averages: number[] = [];
const ticks = 100;
let time = 0;
let ms: number[] = [];

export const StatsStart = () => {
  time = performance.now();
  stats.begin();
};

export const StatsEnd = () => {
  ms.push(performance.now() - time);

  // every 100 ticks, print the average tick duration
  if (!(ms.length % ticks)) {
    const val = round(ms.reduce((a, b) => a + b, 0) / ticks);
    averages.push(val);
    console.log(val);
    ms = [];

    // every 1000 ticks, print the average tick duration since the beginning
    if (!(averages.length % 10)) {
      console.log(
        'rolling average',
        round(averages.reduce((a, b) => a + b, 0) / averages.length)
      );
    }
  }

  stats.end();
};
