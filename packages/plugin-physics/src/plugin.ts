import { Plugin } from 'gecs';
import { Acceleration, Collider, Position, Velocity } from './components';
import { MovementSystem } from './systems/MovementSystem';

export class Physics extends Plugin<$.Plugins> {
  public static readonly type = 'physics';
  public $ = {
    components: [Acceleration, Position, Velocity, Collider],
    systems: [MovementSystem]
  };

  public query = {
    movers: this.ctx.query.all
      .components(Position, Velocity)
      .some.components(Acceleration, Collider)
  };
}
