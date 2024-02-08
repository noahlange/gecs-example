/**
 * Code derived from ECSY's intersecting circles demo, released under the terms of the MIT license.
 * https://github.com/ecsyjs/ecsy/blob/master/site/examples/canvas/index.html
 */

import { Phase, phase, Plugin } from 'gecs';

import { IntersectionSystem, MovementSystem, RenderSystem } from './systems';

import { random } from '../../utils';
import { MovableShape } from '../../entities';
import { Movement, Position, Shape, Intersecting } from './components';

export interface PluginType extends $.Plugins {
  [IntersectionsExample.type]: IntersectionsExample;
}

export interface ContextState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  speed: number;
}

const CircleEntity = MovableShape.with(Intersecting);

export class IntersectionsExample extends Plugin<PluginType> {
  public static readonly type = 'circle';
  public static readonly canvas = document.querySelector('canvas')!;

  public state: ContextState = {
    canvas: IntersectionsExample.canvas,
    ctx: IntersectionsExample.canvas.getContext('2d')!,
    width: window.innerWidth,
    height: window.innerHeight,
    speed: 0.0025
  };

  public query = {
    circles: this.ctx.query.components(Shape, Position, Intersecting),
    movers: this.ctx.query.components(Shape, Position, Movement)
  };

  public $ = {
    components: [Shape, Intersecting, Position, Movement],
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
        position: {
          x: random(0, this.state.width),
          y: random(0, this.state.height)
        },
        shape: { radius: random(20, 100) },
        movement: { velocity: { x: random(-20, 20), y: random(-20, 20) } }
      });
    }

    window.addEventListener('resize', () => {
      this.state.width = window.innerWidth;
      this.state.height = window.innerHeight;
    });
  }
}
