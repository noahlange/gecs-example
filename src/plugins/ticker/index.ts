import { Plugin } from 'gecs';

export class TickerPlugin extends Plugin {
  public static readonly type = 'ticker';

  public ts: number = 0;

  public tick = async () => {
    const time = performance.now();
    await this.ctx.tick(time - this.ts, time);
    this.ts = time;
    requestAnimationFrame(this.tick);
  };
}
