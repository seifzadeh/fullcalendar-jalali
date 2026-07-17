import { isValidJalaaliDate, jalaaliMonthLength, toGregorian, toJalaali } from 'jalaali-js'
import { CalendarSystem, registerCalendarSystem } from './calendar-system'
import { DateMarker, arrayToUtcDate, dateToUtcArray } from './marker'

const MONTHS_PER_YEAR = 12

/**
 * Bridges FullCalendar's Gregorian date markers to the Persian (Jalali)
 * calendar. Public event inputs remain Gregorian ISO strings; this system only
 * changes calendar arithmetic and display date parts.
 */
export class JalaliCalendarSystem implements CalendarSystem {
  readonly name = 'jalali'

  getMarkerYear(marker: DateMarker): number {
    return toJalaali(marker.getUTCFullYear(), marker.getUTCMonth() + 1, marker.getUTCDate()).jy
  }

  getMarkerMonth(marker: DateMarker): number {
    return toJalaali(marker.getUTCFullYear(), marker.getUTCMonth() + 1, marker.getUTCDate()).jm - 1
  }

  getMarkerDay(marker: DateMarker): number {
    return toJalaali(marker.getUTCFullYear(), marker.getUTCMonth() + 1, marker.getUTCDate()).jd
  }

  getMonthLength(year: number, month: number): number {
    const normalized = normalizeMonth(year, month)
    return jalaaliMonthLength(normalized.year, normalized.month + 1)
  }

  arrayToMarker(parts: number[]): DateMarker {
    const normalized = normalizeMonth(parts[0] ?? 0, parts[1] ?? 0)
    const day = parts[2] ?? 1
    const gregorian = toGregorian(normalized.year, normalized.month + 1, 1)

    // Date.UTC deliberately normalizes an out-of-range Jalali day. This makes
    // DateEnv additions cross Jalali month/year boundaries without local-time
    // or DST effects.
    return arrayToUtcDate([
      gregorian.gy,
      gregorian.gm - 1,
      gregorian.gd + day - 1,
      parts[3] ?? 0,
      parts[4] ?? 0,
      parts[5] ?? 0,
      parts[6] ?? 0,
    ])
  }

  markerToArray(marker: DateMarker): number[] {
    const gregorian = dateToUtcArray(marker)
    const jalali = toJalaali(gregorian[0], gregorian[1] + 1, gregorian[2])

    return [
      jalali.jy,
      jalali.jm - 1,
      jalali.jd,
      gregorian[3],
      gregorian[4],
      gregorian[5],
      gregorian[6],
    ]
  }
}

function normalizeMonth(year: number, month: number): { year: number, month: number } {
  const yearOffset = Math.floor(month / MONTHS_PER_YEAR)
  const normalizedMonth = ((month % MONTHS_PER_YEAR) + MONTHS_PER_YEAR) % MONTHS_PER_YEAR

  return { year: year + yearOffset, month: normalizedMonth }
}

export function isValidJalaliDate(year: number, month: number, day: number): boolean {
  return isValidJalaaliDate(year, month, day)
}

registerCalendarSystem('jalali', JalaliCalendarSystem)
registerCalendarSystem('persian', JalaliCalendarSystem)
