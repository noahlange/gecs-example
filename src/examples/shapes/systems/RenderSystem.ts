import type { Context } from 'gecs';
import { SHAPE_HALF_SIZE, SHAPE_SIZE } from '../utils';
import { PluginType } from '..';

export function RenderSystem(ctx: Context<PluginType>) {
  const { ctx: draw, canvas, ...state } = ctx.$.shapes.state;
  // resize canvas if the window size's changed
  if (state.width !== canvas.width || state.height !== canvas.height) {
    canvas.width = state.width;
    canvas.height = state.height;
  }

  draw.fillStyle = '#d4d4d4';
  draw.fillRect(0, 0, canvas.width, canvas.height);

  for (const { $ } of ctx.$.shapes.queries.renderables) {
    if ($.shape.primitive === 'box') {
      draw.beginPath();
      draw.rect(
        $.position.x - SHAPE_HALF_SIZE,
        $.position.y - SHAPE_HALF_SIZE,
        SHAPE_SIZE,
        SHAPE_SIZE
      );
      draw.fillStyle = '#e2736e';
      draw.fill();
      draw.lineWidth = 2;
      draw.strokeStyle = '#b74843';
      draw.stroke();
    } else {
      draw.beginPath();
      draw.arc(
        $.position.x,
        $.position.y,
        SHAPE_HALF_SIZE,
        0,
        2 * Math.PI,
        false
      );
      draw.fillStyle = '#39c495';
      draw.fill();
      draw.lineWidth = 2;
      draw.strokeStyle = '#0b845b';
      draw.stroke();
    }
  }
}
