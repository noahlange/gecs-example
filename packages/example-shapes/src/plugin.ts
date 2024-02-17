/**
 * Code derived from ECSY's circles/boxes demo, released under the terms of the MIT license.
 * https://github.com/ecsyjs/ecsy/blob/master/site/examples/circles-boxes/index.html
 */

import type { PluginData } from 'gecs';
import { Phase, phase, Plugin } from 'gecs';
import { WorldWrapSystem } from '@gex/common';

import { MovableShape } from './entities';
import { NUM_ELEMENTS } from './utils';

export class Shapes extends Plugin<$.Plugins> {
  public static readonly type = 'shapes';

  public $: PluginData<$.Plugins> = {
    entities: [MovableShape],
    systems: [phase(Phase.POST_UPDATE, WorldWrapSystem)]
  };

  public start(): void {
    for (let i = 0; i < NUM_ELEMENTS; i++) {
      MovableShape.create(this.ctx);
    }
  }
}
