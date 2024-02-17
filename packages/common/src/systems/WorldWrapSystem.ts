import { Shape, ShapeType } from '@gex/plugin-canvas';
import type { Context } from 'gecs';

export function WorldWrapSystem(ctx: Context<$.Plugins>) {
  for (const entity of ctx.$.physics.query.movers) {
    if (!entity.has(Shape)) continue;

    let { x, y } = entity.$.position;

    const r = (() => {
      const shape = entity.$.shape.data;
      switch (shape.type) {
        case ShapeType.CIRCLE: {
          return shape.radius;
        }
        case ShapeType.RECT: {
          return Math.ceil(Math.max(shape.height, shape.width) / 2);
        }
      }
    })();

    // exit top
    y = y + r < 0 ? ctx.$.canvas.height + r : y;
    // exit bottom
    y = y - r > ctx.$.canvas.height ? -r : y;

    // exit left
    x = x + r < 0 ? ctx.$.canvas.width + r : x;
    // exit right
    x = x - r > ctx.$.canvas.width ? -r : x;

    // finally, update position
    entity.$.position.x = x;
    entity.$.position.y = y;
  }
}
