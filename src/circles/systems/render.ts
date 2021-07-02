import type { Context, QueryType } from 'gecs';
import type { ContextState } from '../context';

import { drawLine, fillCircle } from '../utils';
import { Circle, Intersecting } from '../ecs';

let $: { circles: QueryType<[typeof Circle, typeof Intersecting]> };

export function RenderSystem(ctx: Context<ContextState>) {
  $ ??= { circles: ctx.$.components(Circle, Intersecting) };

  const { ctx: draw, ...state } = ctx.state;

  if (
    state.width !== state.canvas.width ||
    state.height !== state.canvas.height
  ) {
    state.canvas.width = state.width;
    state.canvas.height = state.height;
  }

  draw.fillStyle = 'black';
  draw.fillRect(0, 0, state.width, state.height);

  for (const entity of $.circles) {
    const { circle, intersect } = entity.$;

    draw.beginPath();
    draw.arc(
      circle.position.x,
      circle.position.y,
      circle.radius,
      0,
      2 * Math.PI,
      false
    );

    draw.lineWidth = 1;
    draw.strokeStyle = '#fff';
    draw.stroke();

    for (const [a, b] of intersect.points) {
      draw.lineWidth = 2;
      draw.strokeStyle = '#ff9';
      draw.fillStyle = 'rgba(255, 255,255, 0.2)';
      fillCircle(draw, a, 8);
      fillCircle(draw, b, 8);

      draw.fillStyle = '#fff';
      fillCircle(draw, a, 3);
      fillCircle(draw, b, 3);

      drawLine(draw, a, b);
    }
  }
}
