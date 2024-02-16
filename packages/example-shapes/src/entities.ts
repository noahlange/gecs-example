import { Shape, ShapeType } from '@gex/plugin-canvas';
import { Position, Velocity } from '@gex/plugin-physics';
import { random } from '@gex/utils';
import type { Context } from 'gecs';
import { Entity } from 'gecs';
import { SHAPE_SIZE, SPEED_MULTIPLIER } from './utils';

export class MovableShape extends Entity.with(Position, Velocity, Shape) {
  public static create(ctx: Context<$.Plugins>) {
    return ctx.create(this, {
      position: {
        x: random(0, ctx.$.canvas.width),
        y: random(0, ctx.$.canvas.height)
      },
      velocity: {
        x: SPEED_MULTIPLIER * random(-20, 20),
        y: SPEED_MULTIPLIER * random(-20, 20)
      },
      shape:
        Math.random() > 0.5
          ? {
              fillColor: '#39c495',
              strokeColor: '#0b845b',
              strokeWidth: 2,
              data: {
                type: ShapeType.CIRCLE,
                radius: SHAPE_SIZE
              }
            }
          : {
              strokeColor: '#b74843',
              fillColor: '#e2736e',
              strokeWidth: 2,
              data: {
                type: ShapeType.RECT,
                width: SHAPE_SIZE,
                height: SHAPE_SIZE
              }
            }
    });
  }
}
