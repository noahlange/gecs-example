import { Ticker } from './plugins/ticker';
import { Performance } from './plugins/performance';

declare global {
  namespace $ {
    interface Plugins {
      [Ticker.type]: Ticker;
      [Performance.type]: Performance;
    }
  }
}

export { Ticker, Performance };
