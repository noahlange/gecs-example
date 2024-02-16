import { Component } from 'gecs';
import type { Vector2 } from '@gex/utils';

export class Intersect extends Component {
  public static readonly type = 'intersect';
  public points: [Vector2, Vector2][] = [];
}
