import type { Context } from 'gecs';

import { intersection } from '../utils';

export function CalcIntersectSystem(ctx: Context<$.Plugins>) {
  let index = 1;
  const entities = Array.from(ctx.$.intersections.query.circles);
  for (const entity of entities) {
    entity.$.intersect.points = [];
    for (let i = index; i < entities.length; i++) {
      const intersect = intersection(entity, entities[i]);
      if (intersect) {
        entity.$.intersect.points.push(intersect);
      }
    }
    index++;
  }
}
