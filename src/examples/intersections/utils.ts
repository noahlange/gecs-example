import { EntityType } from 'gecs';
import type { Vector2 } from '../../utils';
import { Position, Shape } from '../../components';

type CircleEntity = EntityType<[typeof Position, typeof Shape]>;

export function intersection(
  { $: a }: CircleEntity,
  { $: b }: CircleEntity
): null | [Vector2, Vector2] {
  // dx and dy are the vertical and horizontal distances between the circle centers.

  const dx = b.position.x - a.position.x;
  const dy = b.position.y - a.position.y;

  // Distance between the centers
  const d = Math.sqrt(dy * dy + dx * dx);

  // Check for solvability
  if (
    d > a.shape.radius + b.shape.radius || // no intersection
    d < Math.abs(a.shape.radius - b.shape.radius) // one contained within the other
  ) {
    return null;
  }

  /* 'point 2' is the point where the line through the circle
   * intersection points crosses the line between the circle
   * centers.
   */

  /* Determine the distance from point 0 to point 2. */
  const idk =
    (a.shape.radius * a.shape.radius -
      b.shape.radius * b.shape.radius +
      d * d) /
    (2.0 * d);

  /* Determine the coordinates of point 2. */
  const x2 = a.position.x + (dx * idk) / d;
  const y2 = a.position.y + (dy * idk) / d;

  /* Determine the distance from point 2 to either of the
   * intersection points.
   */
  const h = Math.sqrt(a.shape.radius * a.shape.radius - idk * idk);

  /* Now determine the offsets of the intersection points from
   * point 2.
   */
  const rx = -dy * (h / d);
  const ry = dx * (h / d);

  /* Determine the absolute intersection points. */
  return [
    { x: x2 + rx, y: y2 + ry },
    { x: x2 - rx, y: y2 - ry }
  ];
}

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
