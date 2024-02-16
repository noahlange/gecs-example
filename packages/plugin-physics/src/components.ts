import { Component } from 'gecs';
import type { Vector2 } from '@gex/utils';

export class Position extends Component implements Vector2 {
  public static readonly type = 'position';
  public x: number = 0;
  public y: number = 0;
}

export class Velocity extends Component implements Vector2 {
  public static readonly type = 'velocity';
  public x: number = 0;
  public y: number = 0;
}

export class Acceleration extends Component implements Vector2 {
  public static readonly type = 'acceleration';
  public x: number = 0;
  public y: number = 0;
}

export class Collider extends Component {
  public static readonly type = 'collider';
}
