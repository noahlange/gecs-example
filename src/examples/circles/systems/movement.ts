import type { Context } from 'gecs';
import type { ContextType } from '../../circles';

export function MovementSystem(ctx: Context<ContextType>, delta: number) {
  const state = ctx.$.circle.state;

  for (const entity of ctx.$.circle.query.movers) {
    const { circle, movement } = entity.$;

    let [cx, cy] = circle.position;
    let [ax, ay] = movement.acceleration;
    let [dx, dy] = movement.velocity;

    cx = cx + dx * ax * delta * state.speed;
    cy = cy + dy * ay * delta * state.speed;

    ax = Math.max(1, ax > 1 ? ax - delta * state.speed : ax);
    ay = Math.max(1, ay > 1 ? ay - delta * state.speed : ay);

    cy = cy + circle.radius < 0 ? state.height + circle.radius : cy;
    cy = cy - circle.radius > state.height ? -circle.radius : cy;

    cx = cx - circle.radius > state.width ? 0 : cx;
    cx = circle.position[0] + circle.radius < 0 ? state.width : cx;

    movement.acceleration = [ax, ay];
    circle.position = [cx, cy];
  }
}
