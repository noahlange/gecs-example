import { Phase, Plugin, phase, throttle } from 'gecs';
import { Position } from '@gex/plugin-physics';

import { Shape } from './components';
import { RenderSystem, ResizeSystem } from './systems';

export class Canvas extends Plugin<$.Plugins> {
  public static readonly type = 'canvas';
  public readonly dom = document.querySelector('canvas')!;

  public readonly state = {
    canvas: this.dom,
    ctx: this.dom.getContext('2d')!,
    width: window.innerWidth,
    height: window.innerHeight
  };

  public get width() {
    return this.state.width;
  }

  public get height() {
    return this.state.height;
  }

  public $ = {
    components: [Shape],
    systems: [
      throttle(30 / 1000, ResizeSystem),
      phase(Phase.ON_RENDER, RenderSystem)
    ]
  };

  public queries = {
    shapes: this.ctx.query.components(Shape, Position)
  };
}
