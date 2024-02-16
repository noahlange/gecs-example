import type { Context } from 'gecs';
import { Colors, Shape, ShapeType } from '@gex/plugin-canvas';
import { Position, Velocity } from '@gex/plugin-physics';
import { Entity } from 'gecs';
import { Intersect } from './components';
import { random } from '@gex/utils';

export class CircleEntity extends Entity.with(
  Position,
  Velocity,
  Shape,
  Intersect
) {
  /**
   * I'm not convinced that static factory methods are the way to go, but
   * they're used in the Becsy example, so all hail peer pressure.
   */
  public static create(ctx: Context<$.Plugins>) {
    return ctx.create(this, {
      position: {
        x: random(0, ctx.$.canvas.width),
        y: random(0, ctx.$.canvas.height)
      },
      velocity: {
        x: random(-20, 20),
        y: random(-20, 20)
      },
      shape: {
        data: {
          type: ShapeType.CIRCLE,
          radius: random(20, 100)
        },
        fillColor: null,
        strokeColor: Colors.WHITE,
        strokeWidth: 1
      },
      intersect: { points: [] }
    });
  }
}
