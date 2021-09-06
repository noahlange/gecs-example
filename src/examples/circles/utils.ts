import type { Vector2 } from '../../utils';
import type { Circle } from './components';

export function intersection(
  circleA: Circle,
  circleB: Circle
): null | [Vector2, Vector2] {
  // dx and dy are the vertical and horizontal distances between the circle centers.
  const [ax, ay] = circleA.position;
  const [bx, by] = circleB.position;
  const dx = bx - ax;
  const dy = by - ay;

  // Distance between the centers
  const d = Math.sqrt(dy * dy + dx * dx);

  // Check for solvability
  if (
    d > circleA.radius + circleB.radius || // no intersection
    d < Math.abs(circleA.radius - circleB.radius) // one contained within the other
  ) {
    return null;
  }

  /* 'point 2' is the point where the line through the circle
   * intersection points crosses the line between the circle
   * centers.
   */

  /* Determine the distance from point 0 to point 2. */
  const a =
    (circleA.radius * circleA.radius -
      circleB.radius * circleB.radius +
      d * d) /
    (2.0 * d);

  /* Determine the coordinates of point 2. */
  const x2 = ax + (dx * a) / d;
  const y2 = ay + (dy * a) / d;

  /* Determine the distance from point 2 to either of the
   * intersection points.
   */
  const h = Math.sqrt(circleA.radius * circleA.radius - a * a);

  /* Now determine the offsets of the intersection points from
   * point 2.
   */
  const rx = -dy * (h / d);
  const ry = dx * (h / d);

  /* Determine the absolute intersection points. */
  return [
    [x2 + rx, y2 + ry],
    [x2 - rx, y2 - ry]
  ];
}

export function fillCircle(
  ctx: CanvasRenderingContext2D,
  [x, y]: Vector2,
  radius: number
) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fill();
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  [ax, ay]: Vector2,
  [bx, by]: Vector2
) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.stroke();
}
