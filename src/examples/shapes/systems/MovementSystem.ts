import { Context } from 'gecs';
import { PluginType } from '..';
import { SHAPE_HALF_SIZE } from '../utils';

export function MovementSystem(ctx: Context<PluginType>, dt: number) {
  for (const { $ } of ctx.$.shapes.queries.moveables) {
    $.position.x += $.movement.velocity.x * dt;
    $.position.y += $.movement.velocity.y * dt;

    if ($.position.x > ctx.$.shapes.state.width + SHAPE_HALF_SIZE) {
      $.position.x = -SHAPE_HALF_SIZE;
    }
    if ($.position.x < -SHAPE_HALF_SIZE) {
      $.position.x = ctx.$.shapes.state.width + SHAPE_HALF_SIZE;
    }
    if ($.position.y > ctx.$.shapes.state.height + SHAPE_HALF_SIZE) {
      $.position.y = -SHAPE_HALF_SIZE;
    }
    if ($.position.y < -SHAPE_HALF_SIZE) {
      $.position.y = ctx.$.shapes.state.height + SHAPE_HALF_SIZE;
    }
  }
}
