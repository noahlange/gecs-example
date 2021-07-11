import type { Context, QueryType } from 'gecs';
import type { ContextType } from '../../../circles';

import { Circle, Movement } from '../components';

let $: { entities: QueryType<[typeof Circle, typeof Movement]> };

export function MovementSystem(ctx: Context<ContextType>, delta: number) {
  $ ??= { entities: ctx.$.components(Circle, Movement) };
  const state = ctx.game.circle.state;

  for (const entity of $.entities) {
    const { circle, movement } = entity.$;

    let { x: cx, y: cy } = circle.position;
    let { x: ax, y: ay } = movement.acceleration;

    cx = cx + movement.velocity.x * ax * delta * state.speed;
    cy = cy + movement.velocity.y * ay * delta * state.speed;

    ax = Math.max(1, ax > 1 ? ax - delta * state.speed : ax);
    ay = Math.max(1, ay > 1 ? ay - delta * state.speed : ay);

    cy = cy + circle.radius < 0 ? state.height + circle.radius : cy;
    cy = cy - circle.radius > state.height ? -circle.radius : cy;

    cx = cx - circle.radius > state.width ? 0 : cx;
    cx = circle.position.x + circle.radius < 0 ? state.width : cx;

    movement.acceleration = { x: ax, y: ay };
    circle.position = { x: cx, y: cy };
  }
}
