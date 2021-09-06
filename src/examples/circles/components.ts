import { Component } from 'gecs';
import type { Vector2 } from '../../utils';

export class Movement extends Component {
  public static readonly type = 'movement';
  public velocity: Vector2 = [0, 0];
  public acceleration: Vector2 = [0, 0];
}

export class Circle extends Component {
  public static readonly type = 'circle';
  public position: Vector2 = [0, 0];
  public radius: number = 0;
}

export class Intersecting extends Component {
  public static readonly type = 'intersect';
  public points: [Vector2, Vector2][] = [];
}
