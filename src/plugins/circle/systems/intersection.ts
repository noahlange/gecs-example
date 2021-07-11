import type { QueryType, Context } from 'gecs';
import type { ContextType } from '../../../circles';

import { Circle, Intersecting } from '../components';

import { intersection } from '../utils';

let $: { entities: QueryType<[typeof Circle, typeof Intersecting]> };

export function IntersectionSystem(ctx: Context<ContextType>) {
  $ ??= { entities: ctx.$.components(Circle, Intersecting) };

  let index = 1;
  const entities = Array.from($.entities);
  for (const entity of entities) {
    entity.$.intersect.points = [];
    for (let i = index; i < entities.length; i++) {
      const intersect = intersection(entity.$.circle, entities[i].$.circle);
      if (intersect) {
        entity.$.intersect.points.push(intersect);
      }
    }
    index++;
  }
}
