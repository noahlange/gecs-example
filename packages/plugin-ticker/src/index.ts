import { Ticker } from './plugin';

declare global {
  namespace $ {
    export interface Plugins {
      [Ticker.type]: Ticker;
    }
  }
}

export default Ticker;
