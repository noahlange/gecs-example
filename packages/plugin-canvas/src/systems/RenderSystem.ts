import type { Context } from 'gecs';
import { Colors } from '../utils';
import { ShapeType } from '../components';

export function RenderSystem(ctx: Context<$.Plugins>) {
  const { ctx: draw, ...state } = ctx.$.canvas.state;

  draw.fillStyle = Colors.BLACK;
  draw.fillRect(0, 0, state.width, state.height);

  for (const entity of ctx.$.canvas.queries.shapes) {
    const { position, shape } = entity.$;

    draw.beginPath();

    draw.fillStyle = shape.fillColor ?? 'transparent';
    draw.strokeStyle = shape.strokeColor ?? 'transparent';
    draw.lineWidth = shape.strokeWidth ?? 0;

    switch (shape.data.type) {
      case ShapeType.CIRCLE: {
        draw.arc(
          position.x,
          position.y,
          shape.data.radius,
          0,
          2 * Math.PI,
          false
        );
        break;
      }
      case ShapeType.RECT: {
        draw.rect(
          position.x - shape.data.width / 2,
          position.y - shape.data.height / 2,
          shape.data.width,
          shape.data.height
        );
        break;
      }
    }

    if (shape.fillColor) draw.fill();
    if (shape.strokeColor) draw.stroke();
  }
}
