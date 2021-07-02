/**
 * Code derived from ECSY's intersecting circles demo, released under the terms of the MIT license.
 * https://github.com/ecsyjs/ecsy/blob/master/site/examples/canvas/index.html
 */

import { MyContext } from './context';

const context = new MyContext();

let prev = performance.now();

const update = async () => {
  const time = performance.now();
  await context.tick(time - prev, time);
  prev = time;
  requestAnimationFrame(update);
};

context
  .start()
  .then(update)
  .catch((e) => console.error(e));
