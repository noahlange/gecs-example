import type { Vector2 } from './utils';

import { Component, Entity } from 'gecs';

export class Movement extends Component {
  public static readonly type = 'movement';
  public velocity: Vector2 = { x: 0, y: 0 };
  public acceleration: Vector2 = { x: 0, y: 0 };
}

export class Circle extends Component {
  public static readonly type = 'circle';
  public position: Vector2 = { x: 0, y: 0 };
  public radius: number = 0;
}

export class Intersecting extends Component {
  public static readonly type = 'intersect';
  public points: [Vector2, Vector2][] = [];
}

export const CircleEntity = Entity.with(Circle, Movement, Intersecting);

export { IntersectionSystem } from './systems/intersection';
export { MovementSystem } from './systems/movement';
export { RenderSystem } from './systems/render';
export { StatsStart, StatsEnd } from './systems/stats';
