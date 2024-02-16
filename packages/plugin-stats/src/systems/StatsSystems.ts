import type { Context } from 'gecs';
import { Phase, phase } from 'gecs';

export default [
  phase(Phase.PRE_LOAD, ({ $ }: Context<$.Plugins>) => $.stats.stats.begin()),
  phase(Phase.POST_RENDER, ({ $ }: Context<$.Plugins>) => $.stats.stats.end())
];
