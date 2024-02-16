import { Shape, ShapeType } from '@gex/plugin-canvas';
import type { Context } from 'gecs';

export function WorldWrapSystem(ctx: Context<$.Plugins>) {
  for (const { $ } of ctx.$.physics.query.movers.all.components(Shape)) {
    let { x, y } = $.position;

    const r = (() => {
      switch ($.shape.data.type) {
        case ShapeType.CIRCLE: {
          return $.shape.data.radius;
        }
        case ShapeType.RECT: {
          return Math.ceil(
            Math.max($.shape.data.height, $.shape.data.width) / 2
          );
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
    $.position.x = x;
    $.position.y = y;
  }
}
