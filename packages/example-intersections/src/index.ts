import { Context } from 'gecs';

import Stats from '@gex/plugin-stats';
import Physics from '@gex/plugin-physics';
import Ticker from '@gex/plugin-ticker';
import Canvas from '@gex/plugin-canvas';

import { Intersections } from './plugin';

/**
 * Using TypeScript's interface merging, we can import plugins and have
 * their properties implicitly added to our plugin type.
 */
declare global {
  namespace $ {
    interface Plugins {
      [Intersections.type]: Intersections;
    }
  }
}

(async () => {
  const Game = Context.with(Canvas, Stats, Physics, Ticker, Intersections);
  const game = new Game();
  await game.start();
})();
