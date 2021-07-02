import type { Context, QueryType } from 'gecs';
import type { ContextState } from '../context';

import { Circle, Movement } from '../ecs';

let $: { entities: QueryType<[typeof Circle, typeof Movement]> };

export function MovementSystem(ctx: Context<ContextState>, delta: number) {
  $ ??= { entities: ctx.$.components(Circle, Movement) };

  for (const entity of $.entities) {
    const { circle, movement } = entity.$;

    let { x: cx, y: cy } = circle.position;
    let { x: ax, y: ay } = movement.acceleration;

    cx = cx + movement.velocity.x * ax * delta * ctx.state.speed;
    cy = cy + movement.velocity.y * ay * delta * ctx.state.speed;

    ax = Math.max(1, ax > 1 ? ax - delta * ctx.state.speed : ax);
    ay = Math.max(1, ay > 1 ? ay - delta * ctx.state.speed : ay);

    cy = cy + circle.radius < 0 ? ctx.state.height + circle.radius : cy;
    cy = cy - circle.radius > ctx.state.height ? -circle.radius : cy;

    cx = cx - circle.radius > ctx.state.width ? 0 : cx;
    cx = circle.position.x + circle.radius < 0 ? ctx.state.width : cx;

    movement.acceleration = { x: ax, y: ay };
    circle.position = { x: cx, y: cy };
  }
}
