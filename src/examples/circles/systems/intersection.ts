import type { QueryType, Context } from 'gecs';
import type { ContextType } from '../../circles';

import { intersection } from '../utils';

export function IntersectionSystem(ctx: Context<ContextType>) {
  let index = 1;
  const entities = Array.from(ctx.$.circle.query.circles);
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
