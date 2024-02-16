import type { Context } from 'gecs';
import { Position } from '@gex/plugin-physics';
import { Colors, Shape, drawLine, fillCircle } from '@gex/plugin-canvas';
import { Intersect } from '../components';

export function DrawIntersectSystem(ctx: Context<$.Plugins>) {
  const { ctx: draw } = ctx.$.canvas.state;

  const intersections = Array.from(
    ctx.query.components(Position, Shape, Intersect),
    entity => entity.$.intersect.points
  ).flat(1);

  for (const [start, end] of intersections) {
    draw.lineWidth = 2;
    draw.strokeStyle = Colors.YELLOW;
    draw.fillStyle = Colors.WHITE_TRANS;
    fillCircle(draw, start, 6);
    fillCircle(draw, end, 6);

    draw.fillStyle = Colors.WHITE;
    fillCircle(draw, start, 3);
    fillCircle(draw, end, 3);

    drawLine(draw, start, end);
  }
}
