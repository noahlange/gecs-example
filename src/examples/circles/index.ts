/**
 * Code derived from ECSY's intersecting circles demo, released under the terms of the MIT license.
 * https://github.com/ecsyjs/ecsy/blob/master/site/examples/canvas/index.html
 */
import { Context } from 'gecs';
import { StatsPlugin, TickerPlugin } from '../../plugins';
import { CirclePlugin } from './plugin';

export interface ContextType {
  circle: CirclePlugin;
  stats: StatsPlugin;
}

const Example = Context.with(StatsPlugin, CirclePlugin, TickerPlugin);

const context = new Example();

context.start().then(() => {
  context.$.ticker.tick();
});
