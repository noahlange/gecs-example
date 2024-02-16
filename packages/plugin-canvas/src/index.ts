import { Canvas } from './plugin';

declare global {
  namespace $ {
    export interface Plugins {
      [Canvas.type]: Canvas;
    }
  }
}

export * from './components';
export * from './utils';

export default Canvas;
