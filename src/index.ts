import { Context } from 'gecs';

import { Ticker, Performance } from './plugins';
import { IntersectionsExample } from './examples/intersections';

(async () => {
  const Example = Context.with(Performance, Ticker, IntersectionsExample);
  const context = new Example();
  await context.start();
})();
