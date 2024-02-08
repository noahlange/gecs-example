import type { Context } from 'gecs';
import { PluginType } from '..';

export function MovementSystem(ctx: Context<PluginType>, delta: number) {
  const state = ctx.$.circle.state;

  for (const { $ } of ctx.$.circle.query.movers) {
    let { x: ax, y: ay } = $.movement.acceleration;
    let { x, y } = $.position;

    ax = Math.max(1, ax > 1 ? ax - delta * state.speed : ax);
    ay = Math.max(1, ay > 1 ? ay - delta * state.speed : ay);

    $.movement.acceleration.x = ax;
    $.movement.acceleration.y = ay;

    x = x + $.movement.velocity.x * ax * delta * state.speed;
    y = y + $.movement.velocity.y * ay * delta * state.speed;

    y = y + $.shape.radius < 0 ? state.height + $.shape.radius : y;
    y = y - $.shape.radius > state.height ? -$.shape.radius : y;

    x = x - $.shape.radius > state.width ? 0 : x;
    x = x + $.shape.radius < 0 ? state.width : x;

    $.position.x = x;
    $.position.y = y;
  }
}
