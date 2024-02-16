import { Physics } from './plugin';

declare global {
  namespace $ {
    export interface Plugins {
      [Physics.type]: Physics;
    }
  }
}

export * from './components';

export default Physics;
