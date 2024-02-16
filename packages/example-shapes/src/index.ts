import { Context } from 'gecs';
import { ShapesExample } from './plugin';
import Canvas from '@gex/plugin-canvas';
import Stats from '@gex/plugin-stats';
import Physics from '@gex/plugin-physics';
import Ticker from '@gex/plugin-ticker';

declare global {
  namespace $ {
    interface Plugins {
      [ShapesExample.type]: ShapesExample;
    }
  }
}

(async () => {
  const Game = Context.with(Canvas, Stats, Physics, Ticker, ShapesExample);
  const game = new Game();
  await game.start();
})();
