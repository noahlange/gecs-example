/**
 * Code derived from ECSY's circles/boxes demo, released under the terms of the MIT license.
 * https://github.com/ecsyjs/ecsy/blob/master/site/examples/circles-boxes/index.html
 */

import { Phase, phase, Plugin } from 'gecs';

import { Movement, Position, Shape } from '../../components';
import { MovableShape } from '../../entities';
import { MovementSystem, RenderSystem } from './systems';
import { NUM_ELEMENTS, SPEED_MULTIPLIER, random } from './utils';

export interface PluginType extends $.Plugins {
  [ShapesExample.type]: ShapesExample;
}

interface ShapesExampleState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  speed: number;
}

export class ShapesExample extends Plugin<PluginType> {
  public static readonly type = 'shapes';
  public static readonly canvas = document.querySelector('canvas')!;

  public state: ShapesExampleState = {
    canvas: ShapesExample.canvas,
    ctx: ShapesExample.canvas.getContext('2d')!,
    width: window.innerWidth,
    height: window.innerHeight,
    speed: 0.0025
  };

  public readonly queries = {
    moveables: this.ctx.query.components(Movement, Position),
    renderables: this.ctx.query.components(Shape, Position)
  };

  public $ = {
    components: [Position, Movement, Shape],
    entities: [MovableShape],
    systems: [
      phase(Phase.ON_UPDATE, MovementSystem),
      phase(Phase.ON_RENDER, RenderSystem)
    ]
  };

  public start() {
    for (let i = 0; i < NUM_ELEMENTS; i++) {
      this.ctx.create(MovableShape, {
        shape: {
          primitive: Math.random() >= 0.5 ? 'circle' : 'box'
        },
        position: {
          x: random(0, this.state.canvas.width),
          y: random(0, this.state.canvas.height)
        },
        movement: {
          velocity: {
            x: SPEED_MULTIPLIER * (Math.random() * 2 - 1),
            y: SPEED_MULTIPLIER * (Math.random() * 2 - 1)
          }
        }
      });
    }

    window.addEventListener('resize', () => {
      this.state.width = window.innerWidth;
      this.state.height = window.innerHeight;
    });
  }
}
