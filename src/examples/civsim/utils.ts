import type { SystemType } from 'gecs';

import { sequence } from 'gecs';

export function timer<T>(
  name: string,
  ...systems: SystemType<T>[]
): SystemType<T> {
  return sequence(
    () => console.time(name),
    ...systems,
    () => console.timeEnd(name)
  );
}
