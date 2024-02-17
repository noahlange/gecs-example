import { Context } from 'gecs';

import Canvas from '@gex/plugin-canvas';
import Stats from '@gex/plugin-stats';
import Physics from '@gex/plugin-physics';
import Ticker from '@gex/plugin-ticker';

import { Shapes } from './plugin';

declare global {
  namespace $ {
    interface Plugins {
      [Shapes.type]: Shapes;
    }
  }
}

(async () => {
  const Game = Context.with(Canvas, Stats, Physics, Ticker, Shapes);
  const game = new Game();
  await game.start();
})();
