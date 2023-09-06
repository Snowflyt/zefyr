import toFormattedString from '../../Number/toFormattedString';
import { patch } from '../../utils/patch';

import type {
  FormatCurrencyOptions,
  FormatDelimitedOptions,
  FormatHumanSizeOptions,
  FormatPercentageOptions,
  FormatPhoneOptions,
  FormatRoundedOptions,
} from '../../Number/toFormattedString';

declare global {
  interface Number {
    /**
     * Returns a string representation of the number by `format`.
     * If `format` is not available, it will fallback to `String#toString`.
     *
     * **Note:** This method returns the locale specific string representation of the number.
     * If you want to get the string representation of the number in a specific locale,
     * pass the `locale` option to the `options` parameter, e.g. `(123).toFormattedString('currency', { locale: 'zh-CN' })`.
     * @param format - The format of the string representation.
     * @param options - The options for formatting the string representation.
     *
     * @example
     * ```typescript
     * // Returns a string representation of the number as a currency
     * 1234567890.50.toFormattedString('currency'); // => '$1,234,567,890.50'
     * 1234567890.506.toFormattedString('currency'); // => '$1,234,567,890.51'
     * 1234567890.506.toFormattedString('currency', { precision: 3 }); // => '$1,234,567,890.506'
     * ```
     *
     * @example
     * ```typescript
     * // Returns a string representation of a number in delimited form
     * (12345678).toFormattedString('delimited'); // => '12,345,678'
     * 12345678.05.toFormattedString('delimited'); // => '12,345,678.05'
     * (12345678).toFormattedString('delimited', { delimiter: '.' }); // => '12.345.678'
     * (12345678).toFormattedString('delimited', { delimiter: ',' }); // => '12,345,678'
     * 12345678.05.toFormattedString('delimited', { separator: ' ' }); // => '12,345,678 05'
     * ```
     *
     * @example
     * ```typescript
     * // Returns a string representation of a number as a human-readable number of bytes
     * (123).toFormattedString('human-size'); // => 123 Bytes
     * (1234).toFormattedString('human-size'); // => 1.21 KB
     * (12345).toFormattedString('human-size'); // => 12.1 KB
     * (1234567).toFormattedString('human-size'); // => 1.18 MB
     * (1234567890).toFormattedString('human-size'); // => 1.15 GB
     * (1234567890123).toFormattedString('human-size'); // => 1.12 TB
     * (1234567890123456).toFormattedString('human-size'); // => 1.1 PB
     * ```
     *
     * @example
     * ```typescript
     * // Returns a string representation of a number as a percentage
     * (100).toFormattedString('percentage'); // => '100.000%'
     * (100).toFormattedString('percentage', { precision: 0 }); // => '100%'
     * (1000).toFormattedString('percentage', { delimiter: '.', separator: ',' }); // => '1.000,000%'
     * 302.24398923423.toFormattedString('percentage', { precision: 5 }); // => '302.24399%'
     *```
     *
     * @example
     * ```typescript
     * // Returns a string representation of the number as a telephone number
     * (5551234).toFormattedString('phone'); // => '555-1234'
     * (1235551234).toFormattedString('phone'); // => '123-555-1234'
     * (1235551234).toFormattedString('phone', { areaCode: true }); // => '(123) 555-1234'
     * (1235551234).toFormattedString('phone', { delimiter: ' ' }); // => '123 555 1234'
     * (1235551234).toFormattedString('phone', { areaCode: true, extension: 555 }); // => '(123) 555-1234 x 555'
     * (1235551234).toFormattedString('phone', { countryCode: 1 }); // => '+1-123-555-1234'
     * ```
     *
     * @example
     * ```typescript
     * // Returns a string representation of a number rounded to a precision
     * 111.2345.toFormattedString('rounded'); // => '111.235'
     * 111.2345.toFormattedString('rounded', { precision: 2 }); // => '111.23'
     * (13).toFormattedString('rounded', { precision: 5 }); // => '13.00000'
     * 389.32314.toFormattedString('rounded', { precision: 0 }); // => '389'
     * 111.2345.toFormattedString('rounded', { significant: true }); // => '111'
     * ```
     */
    toFormattedString(
      format: 'currency',
      options?: FormatCurrencyOptions,
    ): string;
    toFormattedString(
      format: 'delimited',
      options?: FormatDelimitedOptions,
    ): string;
    toFormattedString(
      format: 'human-size',
      options?: FormatHumanSizeOptions,
    ): string;
    toFormattedString(
      format: 'percentage',
      options?: FormatPercentageOptions,
    ): string;
    toFormattedString(format: 'phone', options?: FormatPhoneOptions): string;
    toFormattedString(
      format: 'rounded',
      options?: FormatRoundedOptions,
    ): string;
    toFormattedString(format: string, options?: object): string;
  }
}

patch(Number).with({ toFormattedString });
