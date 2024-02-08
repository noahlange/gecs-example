import { Plugin } from 'gecs';

export class Ticker extends Plugin<$.Plugins> {
  public static readonly type = 'ticker';
  public ts: number = 0;

  private tick = () => {
    const time = performance.now();
    this.ctx.tick(time - this.ts, time);
    this.ts = time;
    requestAnimationFrame(this.tick);
  };

  public start() {
    this.tick();
  }
}
