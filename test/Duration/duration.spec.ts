import {
  addDays,
  addHours,
  addMinutes,
  addYears,
  subDays,
  subHours,
  subMinutes,
  subYears,
} from 'date-fns';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import '../../src/patches/Duration';

const date = new Date(2023, 8, 1);

describe('Duration', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(date);
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  it('should be able to create a duration', () => {
    const duration = (3).years;
    expect(duration.before(date)).toStrictEqual(subYears(date, 3));
    expect(duration.ago()).toStrictEqual(subYears(date, 3));
    expect(duration.after(date)).toStrictEqual(addYears(date, 3));
    expect(duration.fromNow()).toStrictEqual(addYears(date, 3));
  });

  it('should be able to add durations', () => {
    const duration = (3).days + (2).hours + (15).minutes;
    expect(duration.before(date)).toStrictEqual(subMinutes(subHours(subDays(date, 3), 2), 15));
    expect(duration.ago()).toStrictEqual(subMinutes(subHours(subDays(date, 3), 2), 15));
    expect(duration.after(date)).toStrictEqual(addMinutes(addHours(addDays(date, 3), 2), 15));
    expect(duration.fromNow()).toStrictEqual(addMinutes(addHours(addDays(date, 3), 2), 15));
  });
});
