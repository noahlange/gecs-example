import { Stats } from './plugin';

declare global {
  namespace $ {
    export interface Plugins {
      [Stats.type]: Stats;
    }
  }
}

export default Stats;
