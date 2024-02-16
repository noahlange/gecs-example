import type { Vector2 } from '@gex/utils';

export function fillCircle(
  ctx: CanvasRenderingContext2D,
  center: Vector2,
  radius: number
) {
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, false);
  ctx.fill();
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  a: Vector2,
  b: Vector2
) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

export enum Colors {
  WHITE = '#ffffffff',
  BLACK = '#000000ff',
  YELLOW = '#ffff99ff',
  WHITE_TRANS = '#ffffff33'
}
