import { SPEED_MULTIPLIER } from '@gex/utils';
import type { Context } from 'gecs';

export function MovementSystem(ctx: Context<$.Plugins>, delta: number) {
  const d = delta * SPEED_MULTIPLIER;

  for (const { $ } of ctx.$.physics.query.movers) {
    let { x: ax, y: ay } = $.acceleration ?? { x: 0, y: 0 };

    ax = Math.max(1, ax > 1 ? ax - d : ax);
    ay = Math.max(1, ay > 1 ? ay - d : ay);

    if ($.acceleration) {
      $.acceleration.x = ax;
      $.acceleration.y = ay;
    }

    $.position.x += $.velocity.x * ax * d;
    $.position.y += $.velocity.y * ay * d;
  }
}
