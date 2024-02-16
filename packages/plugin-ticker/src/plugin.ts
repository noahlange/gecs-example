import { Plugin } from 'gecs';

export class Ticker extends Plugin<$.Plugins> {
  public static readonly type = 'ticker';
  public scale: number = 1.0;
  private ts: number = 0;

  private tick = () => {
    const time = performance.now();
    const delta = time - this.ts;
    this.ctx.tick(delta * this.scale, time);
    this.ts = time;
    requestAnimationFrame(this.tick);
  };

  public start() {
    this.tick();
  }
}
