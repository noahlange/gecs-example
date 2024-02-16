import { System } from 'gecs';

export class ResizeSystem extends System<$.Plugins> {
  private get width() {
    return this.ctx.$.canvas.state.width;
  }

  private get height() {
    return this.ctx.$.canvas.state.height;
  }

  private onResize = () => {
    const state = this.ctx.$.canvas.state;
    state.width = window.innerWidth;
    state.height = window.innerHeight;
  };

  public start() {
    window.addEventListener('resize', this.onResize);
  }

  public stop() {
    window.removeEventListener('resize', this.onResize);
  }

  public tick() {
    const canvas = this.ctx.$.canvas.state.canvas;
    if (canvas.width !== this.width) canvas.width = this.width;
    if (canvas.height !== this.height) canvas.height = this.height;
  }
}
