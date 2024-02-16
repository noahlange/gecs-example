import { Component } from 'gecs';
import { Colors } from './utils';

export enum ShapeType {
  CIRCLE = 'CIRCLE',
  RECT = 'RECT'
}

type ShapeData =
  | { type: ShapeType.CIRCLE; radius: number }
  | { type: ShapeType.RECT; width: number; height: number };

export class Shape extends Component {
  public static readonly type = 'shape';
  public data: ShapeData = { type: ShapeType.CIRCLE, radius: 1 };
  public strokeColor: string | null = Colors.WHITE;
  public fillColor: string | null = null;
  public strokeWidth: number = 1;
}
