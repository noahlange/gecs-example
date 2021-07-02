import type { Context, QueryType } from 'gecs';
import type { ContextState } from '../context';

import { Circle, Intersecting } from '../ecs';
import { intersection } from '../utils';

let $: { entities: QueryType<[typeof Circle, typeof Intersecting]> };

export function IntersectionSystem(ctx: Context<ContextState>) {
  $ ??= { entities: ctx.$.components(Circle, Intersecting) };

  let index = 0;
  const entities = Array.from($.entities);
  for (const entity of entities) {
    entity.$.intersect.points = [];
    for (let i = index; i < entities.length; i++) {
      const intersect = intersection(entity.$.circle, entities[i].$.circle);
      if (intersect) {
        entity.$.intersect.points.push(intersect);
      }
    }
  }
}
