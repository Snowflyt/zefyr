import words from '../../global/words';
import { patch } from '../../internal/utils/patch';

import type { Words } from '../../global/words';

declare global {
  /**
   * Split a string separated by spaces into an array of words.
   * @param str The string to split.
   *
   * @example
   * ```typescript
   * words(' foo bar  baz '); // => ['foo', 'bar', 'baz']
   * ```
   *
   * @example
   * ```typescript
   * const colors = words('red green blue'); // colors :: ['red', 'green', 'blue']
   * const redAndBlue = colors.without('green'); // redAndBlue :: ['red', 'blue']
   *
   * const trafficLights: string = 'red yellow green';
   * const trafficLightsState = words(trafficLights); // trafficLightsState :: string[]
   * ```
   */
  function words<S extends string>(str: S): Words<S>;
}

patch(globalThis).withStatic({ words });
