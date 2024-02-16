export function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function random(a: number, b: number): number {
  return Math.random() * (b - a) + a;
}

export interface Vector2 {
  x: number;
  y: number;
}

export const SPEED_MULTIPLIER = 0.00125;
