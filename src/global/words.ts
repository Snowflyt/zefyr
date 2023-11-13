export type Words<S extends string> = string extends S ? string[] : _Words<S>;
type _Words<
  S extends string,
  TTemp extends string = '',
  TLastIsBlank extends boolean = false,
> = S extends `${infer THead}${infer TTail}`
  ? THead extends ' ' | '\n' | '\r' | '\t'
    ? _Words<TTail, TTemp, true>
    : TLastIsBlank extends true
    ? TTemp extends ''
      ? _Words<TTail, THead>
      : [TTemp, ..._Words<TTail, THead>]
    : _Words<TTail, `${TTemp}${THead}`>
  : [TTemp];

/**
 * Split a string separated by spaces into an array of words.
 * @param str The string to split.
 *
 * @example
 * ```typescript
 * words('foo bar  baz'); // => ['foo', 'bar', '', 'baz']
 * ```
 *
 * @example
 * ```typescript
 * const colors = words('red green blue'); // colors :: ['red', 'green', 'blue']
 *
 * const trafficLights: string = 'red yellow green';
 * const trafficLightsState = words(trafficLights); // trafficLightsState :: string[]
 * ```
 */
const words = <S extends string>(str: S): Words<S> => str.trim().split(/\s+/) as Words<S>;

export default words;
