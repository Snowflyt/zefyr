import { describe, expect, it } from 'vitest';

import '../../src/patches/Number/toFormattedString';

describe('Number#toFormattedString', () => {
  it('should return the formatted string as a currency', () => {
    expect((1234567890.5).toFormattedString('currency', { locale: 'en-US' })).toBe(
      '$1,234,567,890.50',
    );
    expect((-1234567890.5).toFormattedString('currency', { locale: 'en-US' })).toBe(
      '-$1,234,567,890.50',
    );
    expect((1234567890.506).toFormattedString('currency', { locale: 'en-US' })).toBe(
      '$1,234,567,890.51',
    );
    expect(
      (1234567890.506).toFormattedString('currency', {
        precision: 3,
        locale: 'en-US',
      }),
    ).toBe('$1,234,567,890.506');
  });

  it('should return the formatted string as a delimited number', () => {
    expect((12345678).toFormattedString('delimited')).toBe('12,345,678');
    expect(Number('123456789012345678').toFormattedString('delimited')).toBe(
      '123,456,789,012,345,680',
    );
    expect((0.000000000000000000012345).toFormattedString('delimited')).toBe(
      '0.000000000000000000012345',
    );
    expect((12345678.05).toFormattedString('delimited')).toBe('12,345,678.05');
    expect((12345678).toFormattedString('delimited', { delimiter: '.' })).toBe('12.345.678');
    expect((12345678).toFormattedString('delimited', { delimiter: ',' })).toBe('12,345,678');
    expect((12345678.05).toFormattedString('delimited', { separator: ' ' })).toBe('12,345,678 05');
  });

  it('should return the formatted string as a human-readable number of bytes', () => {
    expect((123).toFormattedString('human-size', { locale: 'en-US' })).toBe('123 Bytes');
    expect((1234).toFormattedString('human-size', { locale: 'en-US' })).toBe('1.21 KB');
    expect((12345).toFormattedString('human-size', { locale: 'en-US' })).toBe('12.1 KB');
    expect((1234567).toFormattedString('human-size', { locale: 'en-US' })).toBe('1.18 MB');
    expect((1234567890).toFormattedString('human-size', { locale: 'en-US' })).toBe('1.15 GB');
    expect((1234567890123).toFormattedString('human-size', { locale: 'en-US' })).toBe('1.12 TB');
    expect((1234567890123456).toFormattedString('human-size', { locale: 'en-US' })).toBe('1.1 PB');
    expect(
      Number('1234567890123456789012').toFormattedString('human-size', {
        locale: 'en-US',
      }),
    ).toBe('1071 EB');
  });

  it('should return the formatted string as a percentage', () => {
    expect((100).toFormattedString('percentage')).toBe('100.000%');
    expect((100).toFormattedString('percentage', { precision: 0 })).toBe('100%');
    expect(
      (1000).toFormattedString('percentage', {
        delimiter: '.',
        separator: ',',
      }),
    ).toBe('1.000,000%');
    expect((302.24398923423).toFormattedString('percentage', { precision: 5 })).toBe('302.24399%');
  });

  it('should return the formatted string as a telephone number', () => {
    expect((5551234).toFormattedString('phone', { locale: 'en-US' })).toBe('555-1234');
    expect((1235551234).toFormattedString('phone', { locale: 'en-US' })).toBe('123-555-1234');
    expect(
      (1235551234).toFormattedString('phone', {
        areaCode: true,
        locale: 'en-US',
      }),
    ).toBe('(123) 555-1234');
    expect(
      (1235551234).toFormattedString('phone', {
        delimiter: ' ',
        locale: 'en-US',
      }),
    ).toBe('123 555 1234');
    expect(
      (1235551234).toFormattedString('phone', {
        areaCode: true,
        extension: 555,
        locale: 'en-US',
      }),
    ).toBe('(123) 555-1234 x 555');
    expect(
      (1235551234).toFormattedString('phone', {
        countryCode: 1,
        locale: 'en-US',
      }),
    ).toBe('+1-123-555-1234');
  });

  it('should return the formatted string as a rounded number', () => {
    expect((111.2345).toFormattedString('rounded')).toBe('111.235');
    expect((111.2345).toFormattedString('rounded', { precision: 2 })).toBe('111.23');
    expect(
      (111.2345).toFormattedString('rounded', {
        precision: 2,
        significant: true,
      }),
    ).toBe('111');
    expect((13).toFormattedString('rounded', { precision: 5 })).toBe('13.00000');
    expect((389.32314).toFormattedString('rounded', { precision: 0 })).toBe('389');
    expect((111.2345).toFormattedString('rounded', { significant: true })).toBe('111');
    expect(NaN.toFormattedString('rounded')).toBe('NaN');
    expect(Infinity.toFormattedString('rounded')).toBe('Infinity');
  });

  it('should fallback to `Number#toString` if the format is not supported', () => {
    expect((1234567890).toFormattedString('unknown')).toBe('1234567890');
  });
});
