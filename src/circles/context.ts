import { Context } from 'gecs';
import { CircleEntity } from './ecs';
import { random } from './utils';

import {
  Circle,
  Intersecting,
  Movement,
  IntersectionSystem,
  MovementSystem,
  RenderSystem,
  StatsStart,
  StatsEnd
} from './ecs';

export interface ContextState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  speed: number;
}

export class MyContext extends Context.with<ContextState>(
  StatsStart,
  MovementSystem,
  RenderSystem,
  IntersectionSystem,
  StatsEnd
) {
  public static canvas = document.querySelector('canvas')!;

  public state: ContextState = {
    canvas: MyContext.canvas,
    ctx: MyContext.canvas.getContext('2d')!,
    width: window.innerWidth,
    height: window.innerHeight,
    speed: 0.001
  };

  public start(): Promise<void> {
    this.register({ Circle, Intersecting, Movement });

    for (let i = 0; i < 30; i++) {
      this.create(CircleEntity, {
        circle: {
          position: {
            x: random(0, this.state.width),
            y: random(0, this.state.height)
          },
          radius: random(20, 100)
        },
        movement: {
          velocity: {
            x: random(-20, 20),
            y: random(-20, 20)
          }
        }
      });
    }

    window.addEventListener('resize', () => {
      this.state.width = window.innerWidth;
      this.state.height = window.innerHeight;
    });
    return super.start();
  }
}
