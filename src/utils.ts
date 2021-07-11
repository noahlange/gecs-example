export interface Vector2 {
  x: number;
  y: number;
}

export function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function random(a: number, b: number): number {
  return Math.random() * (b - a) + a;
}
