import { locale as environmentLocale } from '../.internal/utils/locale';

type Locale =
  | 'en-US'
  | 'en-GB'
  | 'en-CA'
  | 'en-AU'
  | 'ja-JP'
  | 'ko-KR'
  | 'de-DE'
  | 'fr-FR'
  | 'es-ES'
  | 'it-IT'
  | 'pt-PT'
  | 'pt-BR'
  | 'nl-NL'
  | 'pl-PL'
  | 'ru-RU'
  | 'tr-TR'
  | 'ar-SA'
  | 'cs-CZ'
  | 'da-DK'
  | 'fi-FI'
  | 'el-GR'
  | 'he-IL'
  | 'hu-HU'
  | 'id-ID'
  | 'ms-MY'
  | 'no-NO'
  | 'ro-RO'
  | 'sk-SK'
  | 'sv-SE'
  | 'th-TH'
  | 'vi-VN'
  | 'uk-UA'
  | 'hi-IN'
  | 'bn-IN'
  | 'pa-IN'
  | 'ta-IN'
  | 'te-IN'
  | 'ml-IN'
  | 'mr-IN'
  | 'ur-IN'
  | 'or-IN'
  | 'gu-IN'
  | 'kn-IN'
  | 'as-IN'
  | 'ne-NP'
  | 'si-LK'
  | 'lo-LA'
  | 'my-MM'
  | 'km-KH'
  | 'ko-KP'
  | 'zh-CN'
  | 'zh-TW'
  | 'zh-HK'
  | 'zh-MO'
  | 'zh-SG'
  | (string & NonNullable<unknown>);

export interface FormatCurrencyOptions extends FormatRoundedOptions {
  /**
   * @default ','
   */
  delimiter?: string;
  /**
   * @default '%u%n'
   */
  format?: string;
  /**
   * @default '-%u%n'
   */
  negativeFormat?: string;
  /**
   * Unit of the currency, depending on the locale by default.
   * @example '$'
   */
  unit?: string;
  /**
   * @default 2
   */
  precision?: number;
  locale?: Locale;
}

export const formatCurrency = (
  n: number,
  options?: FormatCurrencyOptions,
): string => {
  const defaultUnit = (locale: Locale) => {
    switch (locale) {
      case 'zh-CN':
        return '￥';
      default:
        return '$';
    }
  };

  const { locale = environmentLocale } = options ?? {};
  const { format: positiveFormat = '%u%n', unit = defaultUnit(locale) } =
    options ?? {};
  const negativeFormat = options?.negativeFormat ?? `-${positiveFormat}`;
  const format = n < 0 ? negativeFormat : positiveFormat;

  const formattedNumber = formatRounded(Math.abs(n), {
    delimiter: ',',
    precision: 2,
    ...options,
  });
  return format.replace('%n', formattedNumber).replace('%u', unit);
};

export interface FormatDelimitedOptions {
  /**
   * @default '.'
   */
  separator?: string;
  /**
   * @default ','
   */
  delimiter?: string;
  /**
   * @default 3
   */
  groupSize?: number;
  /**
   * Pattern used to match the number.
   * If provided, `groupSize` will be ignored.
   * @default /(\d)(?=(\d{<groupSize>})+(?!\d))/g
   */
  pattern?: RegExp;
}

export const formatDelimited = (
  n: number | string,
  options?: FormatDelimitedOptions,
): string => {
  const { groupSize = 3 } = options ?? {};
  const {
    delimiter = ',',
    pattern = new RegExp(String.raw`(\d)(?=(\d{${groupSize}})+(?!\d))`, 'g'),
    separator = '.',
  } = options ?? {};

  const numberString = String(n);
  if (!numberString.includes('e')) {
    const parts = numberString.split('.', 2);
    return (
      parts[0]!.replace(pattern, `$1${delimiter}`) +
      (parts[1] ? separator + parts[1] : '')
    );
  }

  const num = Number(n);
  const left = BigInt(Math.floor(num)).toString();
  let result = left.replace(pattern, `$1${delimiter}`);
  const frac = num % 1;
  if (frac !== 0) {
    const fracString = String(frac);
    if (fracString.includes('e-')) {
      const [a, b] = fracString.split('e-', 2);
      result += separator + '0'.repeat(Number(b) - 1) + a!.replace('.', '');
    } else result += separator + fracString.split('.')[1]!;
  }
  return result;
};

export interface FormatHumanSizeOptions extends FormatRoundedOptions {
  /**
   * @default ''
   */
  delimiter?: string;
  /**
   * @default '%n %u'
   */
  format?: string;
  units?: {
    /**
     * Representation of the unit depending on the locale.
     * @example 'Bytes'
     */
    byte: string;
    /**
     * Representation of the unit depending on the locale.
     * @example 'KB'
     */
    kb: string;
    /**
     * Representation of the unit depending on the locale.
     * @example 'MB'
     */
    mb: string;
    /**
     * Representation of the unit depending on the locale.
     * @example 'GB'
     */
    gb: string;
    /**
     * Representation of the unit depending on the locale.
     * @example 'TB'
     */
    tb: string;
    /**
     * Representation of the unit depending on the locale.
     * @example 'PB'
     */
    pb: string;
    /**
     * Representation of the unit depending on the locale.
     * @example 'EB'
     */
    eb: string;
  };
  /**
   * @default true
   */
  significant?: boolean;
  /**
   * @default true
   */
  stripInsignificantZeros?: boolean;
  locale?: Locale;
}

const SIZE_UNITS = ['byte', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb'] as const;

export const formatHumanSize = (
  n: number,
  options?: FormatHumanSizeOptions,
): string => {
  const defaultByteUnit = (locale: Locale) => {
    switch (locale) {
      case 'zh-CN':
        return '字节';
      default:
        return 'Bytes';
    }
  };

  const { locale = environmentLocale } = options ?? {};
  const {
    format = '%n %u',
    units = {
      byte: defaultByteUnit(locale),
      kb: 'KB',
      mb: 'MB',
      gb: 'GB',
      tb: 'TB',
      pb: 'PB',
      eb: 'EB',
    },
  } = options ?? {};

  if (n < 1024)
    return format
      .replace('%n', n.toString())
      .replace('%u', units[SIZE_UNITS[0]]);

  const max = SIZE_UNITS.length - 1;
  let exp = Math.trunc(Math.log(n) / Math.log(1024));
  if (exp > max) exp = max;
  const humanSize = n / 1024 ** exp;
  const numberToFormat = formatRounded(humanSize, {
    delimiter: '',
    significant: true,
    stripInsignificantZeros: true,
    ...options,
  });

  return format
    .replace('%n', numberToFormat)
    .replace('%u', units[SIZE_UNITS[exp]!]);
};

export interface FormatPercentageOptions extends FormatRoundedOptions {
  /**
   * @default '%n%'
   */
  format?: string;
  /**
   * @default ''
   */
  delimiter?: string;
}

export const formatPercentage = (
  n: number,
  options?: FormatPercentageOptions,
): string => {
  const { format = '%n%' } = options ?? {};
  return format.replace('%n', formatRounded(n, { delimiter: '', ...options }));
};

export interface FormatPhoneOptions {
  areaCode?: boolean;
  countryCode?: string | number;
  delimiter?: string;
  extension?: string | number;
  pattern?: RegExp;
  locale?: Locale;
}

const formatPhone = (n: number, options?: FormatPhoneOptions): string => {
  const defaultPattern = (areaCode: boolean, locale: Locale) => {
    switch (locale) {
      case 'zh-CN':
        return /(\d{3})(\d{4})(\d{4})/g;
      default:
        return areaCode
          ? /(\d{1,3})(\d{3})(\d{4})/g
          : /(\d{0,3})(\d{3})(\d{4})/g;
    }
  };

  const {
    areaCode = false,
    countryCode = '',
    delimiter = '-',
    extension = '',
    locale = environmentLocale,
    pattern = defaultPattern(areaCode, locale),
  } = options ?? {};

  let result = '';

  if (
    typeof countryCode === 'number' ||
    (typeof countryCode === 'string' && !/^\s*$/.test(countryCode))
  )
    result += `+${countryCode}${delimiter}`;

  if (areaCode)
    result += n.toString().replace(pattern, `($1) $2${delimiter}$3`);
  else
    result += n.toString().replace(pattern, `$1${delimiter}$2${delimiter}$3`);

  if (
    typeof extension === 'number' ||
    (typeof extension === 'string' && !/^\s*$/.test(extension))
  )
    result += ` x ${extension}`;

  return result.trim().replace(new RegExp(`^${delimiter}`), '');
};

export interface FormatRoundedOptions extends FormatDelimitedOptions {
  /**
   * @default ''
   */
  delimiter?: string;
  /**
   * @default 3
   */
  precision?: number;
  /**
   * @default false
   */
  significant?: boolean;
  /**
   * @default false
   */
  stripInsignificantZeros?: boolean;
  /**
   * @default 'half_up'
   */
  roundMode?:
    | 'up'
    | 'down'
    | 'half_up'
    | 'half_down'
    | 'half_even'
    | 'ceil'
    | 'floor';
}

const convertToDecimal = (n: number) => {
  let str = n.toString();
  let decimalPlace = 0;
  if (str.includes('.')) {
    decimalPlace = str.length - str.indexOf('.') - 1;
    str = str.replace('.', '');
  }
  const bigIntNumber = Number.isFinite(Number(str)) ? BigInt(str) : 0n;

  return {
    n: bigIntNumber,
    decimalPlace: decimalPlace,
    round: (
      precision: number,
      mode: FormatRoundedOptions['roundMode'] = 'half_up',
    ): number => {
      if (!Number.isFinite(n)) return n;
      const scalingFactor = BigInt(10 ** precision);
      let roundedNumber: bigint;

      switch (mode) {
        case 'ceil': // Round towards +Infinity
          roundedNumber =
            (bigIntNumber * scalingFactor + BigInt(10 ** decimalPlace) - 1n) /
            BigInt(10 ** decimalPlace);
          break;
        case 'floor': // Round towards -Infinity
          roundedNumber =
            (bigIntNumber * scalingFactor) / BigInt(10 ** decimalPlace);
          break;
        case 'up': // Round away from 0
          roundedNumber =
            bigIntNumber >= 0n
              ? (bigIntNumber * scalingFactor +
                  BigInt(10 ** decimalPlace) -
                  1n) /
                BigInt(10 ** decimalPlace)
              : (bigIntNumber * scalingFactor) / BigInt(10 ** decimalPlace);
          break;
        case 'down': // Round towards 0 (truncate)
          roundedNumber =
            (bigIntNumber * scalingFactor) / BigInt(10 ** decimalPlace);
          break;
        case 'half_up': // Round towards nearest neighbor. If equidistant, round away from 0
          roundedNumber =
            (bigIntNumber * scalingFactor * 2n + BigInt(10 ** decimalPlace)) /
            (BigInt(10 ** decimalPlace) * 2n);
          break;
        case 'half_down': // Round towards nearest neighbor. If equidistant, round towards 0
          roundedNumber =
            (bigIntNumber * scalingFactor * 2n - 1n) /
            (BigInt(10 ** decimalPlace) * 2n);
          break;
        case 'half_even': // Round towards nearest neighbor. If equidistant, round towards the even neighbor
          // eslint-disable-next-line no-case-declarations
          const tentativeRounded =
            (bigIntNumber * scalingFactor * 2n + BigInt(10 ** decimalPlace)) /
            (BigInt(10 ** decimalPlace) * 2n);
          roundedNumber =
            tentativeRounded % 2n === 0n
              ? tentativeRounded
              : tentativeRounded - 1n;
          break;
      }

      const result = Number(roundedNumber) / 10 ** precision;
      return result;
    },
  };
};

const absolutePrecision = (
  n: number,
  { precision, significant }: { significant: boolean; precision: number },
): number => {
  if (significant && precision > 0) return precision - digitCount(n);
  return precision;
};

const round = (
  n: number,
  {
    precision,
    roundMode,
    significant,
  }: {
    significant: boolean;
    precision: number;
    roundMode: FormatRoundedOptions['roundMode'];
  },
): number => {
  const p = absolutePrecision(n, { precision, significant });
  if (p === 0) return n;
  return convertToDecimal(n).round(p < 0 ? 0 : p, roundMode);
};

const digitCount = (n: number) => {
  const decimalNumber = convertToDecimal(n);
  return decimalNumber.n.toString().length - decimalNumber.decimalPlace;
};

export const formatRounded = (
  n: number,
  options?: FormatRoundedOptions,
): string => {
  let { precision = 3 } = options ?? {};
  const {
    roundMode = 'half_up',
    separator = '.',
    significant = false,
    stripInsignificantZeros = false,
  } = options ?? {};

  const formatNumber = (n: string) => {
    if (stripInsignificantZeros) {
      const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return n
        .replace(
          new RegExp(String.raw`(${escapedSeparator})(\d*[1-9])?0+$`),
          '$1$2',
        )
        .replace(new RegExp(String.raw`${escapedSeparator}$`), '');
    }
    return n;
  };

  const roundedNumber = round(n, { precision, roundMode, significant });

  let formattedString: string;
  if (significant && precision > 0) {
    const digits = digitCount(roundedNumber);
    precision -= digits;
    precision = precision < 0 ? 0 : precision;
  }
  if (Number.isFinite(roundedNumber)) {
    let [a, b = ''] = roundedNumber.toString().split('.', 2);
    if (precision !== 0) {
      b += '0'.repeat(precision);
      a += '.';
      a += b.slice(0, precision);
    }
    formattedString = a!;
  } else {
    formattedString = roundedNumber.toString();
  }

  return formatNumber(
    formatDelimited(formattedString, { delimiter: '', ...options }),
  );
};

const toFormattedString: {
  (n: number, format: 'currency', options?: FormatCurrencyOptions): string;
  (n: number, format: 'delimited', options?: FormatDelimitedOptions): string;
  (n: number, format: 'human-size', options?: FormatHumanSizeOptions): string;
  (n: number, format: 'percentage', options?: FormatPercentageOptions): string;
  (n: number, format: 'phone', options?: FormatPhoneOptions): string;
  (n: number, format: 'rounded', options?: FormatRoundedOptions): string;
  (n: number, format: string, options?: object): string;
} = (n, format, options): string => {
  if (format === 'currency') return formatCurrency(n, options);
  if (format === 'delimited') return formatDelimited(n, options);
  if (format === 'human-size') return formatHumanSize(n, options);
  if (format === 'percentage') return formatPercentage(n, options);
  if (format === 'phone') return formatPhone(n, options);
  if (format === 'rounded') return formatRounded(n, options);
  return n.toString();
};

export default toFormattedString;
