import type { EntityType } from 'gecs';
import type { Position } from '@gex/plugin-physics';
import { ShapeType, type Shape } from '@gex/plugin-canvas';
import type { Vector2 } from '@gex/utils';

type CircleEntity = EntityType<[typeof Position, typeof Shape]>;

export function intersection(
  { $: a }: CircleEntity,
  { $: b }: CircleEntity
): null | [Vector2, Vector2] {
  if (
    a.shape.data.type !== ShapeType.CIRCLE ||
    b.shape.data.type !== ShapeType.CIRCLE
  ) {
    return null;
  }

  const [ar, br] = [a.shape.data.radius, b.shape.data.radius];

  // dx and dy are the vertical and horizontal distances between the circle centers.
  const dx = b.position.x - a.position.x;
  const dy = b.position.y - a.position.y;

  // Distance between the centers
  const d = Math.sqrt(dy ** 2 + dx ** 2);

  // Check for solvability
  if (
    d > ar + br || // no intersection
    d < Math.abs(ar - br) // one contained within the other
  ) {
    return null;
  }

  /* 'point 2' is the point where the line through the circle
   * intersection points crosses the line between the circle
   * centers.
   */

  /* Determine the distance from point 0 to point 2. */
  const d2 = (ar ** 2 - br ** 2 + d ** 2) / (2.0 * d);

  /* Determine the coordinates of point 2. */
  const x2 = a.position.x + (dx * d2) / d;
  const y2 = a.position.y + (dy * d2) / d;

  /* Determine the distance from point 2 to either of the
   * intersection points.
   */
  const h = Math.sqrt(ar ** 2 - d2 ** 2);

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
