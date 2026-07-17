/// <reference types="vitest/globals" />

import { DateEnv } from '../src/env'
import { NativeDateFormatter } from '../src/formatting-native'
import type { Locale } from '../src/locale'

const locale: Locale = {
  codeArg: 'en-US',
  codes: ['en-US'],
  week: { dow: 6, doy: 1 },
  simpleNumberFormat: new Intl.NumberFormat('en-US'),
  options: {},
}

function buildJalaliEnv(): DateEnv {
  return new DateEnv({
    timeZone: 'UTC',
    calendarSystem: 'jalali',
    locale,
    weekTextLong: 'Week',
    weekTextShort: 'W',
  })
}

describe('Jalali calendar system', () => {
  it('converts Gregorian markers to Jalali date parts', () => {
    const env = buildJalaliEnv()
    const marker = new Date('2026-07-17T12:34:56.789Z')

    expect(env.getYear(marker)).toBe(1405)
    expect(env.getMonth(marker)).toBe(3)
    expect(env.getDay(marker)).toBe(26)
  })

  it('converts Jalali date parts to the matching Gregorian marker', () => {
    const env = buildJalaliEnv()
    const marker = env.calendarSystem.arrayToMarker([1405, 3, 26])

    expect(marker.toISOString()).toBe('2026-07-17T00:00:00.000Z')
  })

  it('adds calendar months without Gregorian-month drift', () => {
    const env = buildJalaliEnv()
    const endOfShahrivar = env.calendarSystem.arrayToMarker([1402, 5, 31])
    const nextMonth = env.addMonths(endOfShahrivar, 1)

    expect(env.calendarSystem.markerToArray(nextMonth).slice(0, 3)).toEqual([1402, 6, 30])
  })

  it('crosses from Esfand into Farvardin when adding a day', () => {
    const env = buildJalaliEnv()
    const endOfYear = env.calendarSystem.arrayToMarker([1404, 11, 29])
    const nextDay = env.add(endOfYear, { years: 0, months: 0, days: 1, milliseconds: 0 })

    expect(env.calendarSystem.markerToArray(nextDay).slice(0, 3)).toEqual([1405, 0, 1])
  })

  it('formats Jalali dates even with an English locale', () => {
    const env = buildJalaliEnv()
    const formatter = new NativeDateFormatter({ year: 'numeric', month: 'long', day: 'numeric' })
    const text = env.formatToParts(new Date('2026-07-17T00:00:00Z'), formatter)
      .map((part) => part.value)
      .join('')

    expect(text).toContain('1405')
  })
})
