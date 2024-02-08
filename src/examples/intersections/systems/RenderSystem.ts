import type { Context } from 'gecs';
import { drawLine, fillCircle } from '../utils';
import { PluginType } from '..';

enum Colors {
  WHITE = '#ffffff',
  BLACK = '#000000',
  YELLOW = '#ffff99',
  WHITE_TRANS = '#ffffff33'
}

export function RenderSystem(ctx: Context<PluginType>) {
  const { ctx: draw, ...state } = ctx.$.circle.state;
  // resize canvas if the window size's changed
  if (
    state.width !== state.canvas.width ||
    state.height !== state.canvas.height
  ) {
    state.canvas.width = state.width;
    state.canvas.height = state.height;
  }

  draw.fillStyle = Colors.BLACK;
  draw.fillRect(0, 0, state.width, state.height);

  for (const entity of ctx.$.circle.query.circles) {
    const { position, shape, intersect } = entity.$;

    draw.beginPath();
    draw.arc(position.x, position.y, shape.radius, 0, 2 * Math.PI, false);

    draw.lineWidth = 1;
    draw.strokeStyle = Colors.WHITE;
    draw.stroke();

    for (const [a, b] of intersect.points) {
      draw.lineWidth = 2;
      draw.strokeStyle = Colors.YELLOW;
      draw.fillStyle = Colors.WHITE_TRANS;
      fillCircle(draw, a, 8);
      fillCircle(draw, b, 8);

      draw.fillStyle = Colors.WHITE;
      fillCircle(draw, a, 3);
      fillCircle(draw, b, 3);

      drawLine(draw, a, b);
    }
  }
}
