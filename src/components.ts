import { Component } from 'gecs';
import { Vector2 } from './utils';

export class Movement extends Component {
  public static readonly type = 'movement';
  public velocity: Vector2 = { x: 0, y: 0 };
  public acceleration: Vector2 = { x: 0, y: 0 };
}

export class Position extends Component implements Vector2 {
  public static readonly type = 'position';
  public x: number = 0;
  public y: number = 0;
}

export class Shape extends Component {
  public static readonly type = 'shape';
  public primitive: 'box' | 'circle' = 'circle';
  public radius: number = 0;
}
