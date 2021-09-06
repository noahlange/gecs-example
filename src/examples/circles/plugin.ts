import { Phase, phase, Plugin, PluginData } from 'gecs';

import { IntersectionSystem } from './systems/intersection';
import { MovementSystem } from './systems/movement';
import { RenderSystem } from './systems/render';

import { Circle, Intersecting, Movement } from './components';
import { CircleEntity } from './entities';
import type { ContextType } from '../circles';
import { random } from '../../utils';

export interface ContextState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  speed: number;
}

export class CirclePlugin extends Plugin<ContextType> {
  public static readonly type = 'circle';
  public static readonly canvas = document.querySelector('canvas')!;

  public state: ContextState = {
    canvas: CirclePlugin.canvas,
    ctx: CirclePlugin.canvas.getContext('2d')!,
    width: window.innerWidth,
    height: window.innerHeight,
    speed: 0.0025
  };

  public query = {
    circles: this.ctx.query.components(Circle, Intersecting),
    movers: this.ctx.query.components(Circle, Movement)
  };

  public $: PluginData<ContextType> = {
    components: [Circle, Intersecting, Movement],
    entities: [CircleEntity],
    systems: [
      phase(Phase.ON_UPDATE, MovementSystem),
      phase(Phase.ON_RENDER, RenderSystem),
      phase(Phase.POST_RENDER, IntersectionSystem)
    ]
  };

  public start() {
    for (let i = 0; i < 30; i++) {
      this.ctx.create(CircleEntity, {
        circle: {
          position: [random(0, this.state.width), random(0, this.state.height)],
          radius: random(20, 100)
        },
        movement: {
          velocity: [random(-20, 20), random(-20, 20)]
        }
      });
    }

    window.addEventListener('resize', () => {
      this.state.width = window.innerWidth;
      this.state.height = window.innerHeight;
    });
  }
}
