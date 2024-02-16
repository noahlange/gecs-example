/**
 * Code derived from ECSY's intersecting circles demo, released under the terms of the MIT license.
 * https://github.com/ecsyjs/ecsy/blob/master/site/examples/canvas/index.html
 */

import type { PluginData } from 'gecs';
import { Phase, phase, Plugin } from 'gecs';
import { Position } from '@gex/plugin-physics';
import { Shape } from '@gex/plugin-canvas';

import * as System from './systems';
import { Intersect } from './components';
import { CircleEntity } from './entities';

export class Intersections extends Plugin<$.Plugins> {
  public static readonly type = 'intersections';
  private static readonly CIRCLE_COUNT = 125;

  public readonly $: PluginData<$.Plugins> = {
    components: [Intersect],
    entities: [CircleEntity],
    systems: [
      /**
       * The physics plugin has no concept of world or canvas boundaries, so
       * we're handling our screen-looping behavior here.
       */
      phase(Phase.POST_UPDATE, System.WorldWrap),
      phase(Phase.PRE_RENDER, System.CalcIntersect),
      phase(Phase.POST_RENDER, System.DrawIntersect)
    ]
  };

  public readonly query = {
    circles: this.ctx.query.components(Shape, Position, Intersect)
  };

  public start(): void {
    for (let i = 0; i < Intersections.CIRCLE_COUNT; i++) {
      CircleEntity.create(this.ctx);
    }
  }
}
