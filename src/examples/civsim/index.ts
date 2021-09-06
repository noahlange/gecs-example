import { Context } from 'gecs';
import { StatsPlugin, TickerPlugin } from '../../plugins';

export interface ContextType {
  stats: StatsPlugin;
  ticker: TickerPlugin;
}

const example = new (Context.with(StatsPlugin, TickerPlugin))();

example.start().then(() => {
  example.game.ticker.tick();
});
