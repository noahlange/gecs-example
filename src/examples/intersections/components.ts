import { Component } from 'gecs';
import type { Vector2 } from '../../utils';

export class Intersecting extends Component {
  public static readonly type = 'intersect';
  public points: [Vector2, Vector2][] = [];
}

export * from '../../components';
