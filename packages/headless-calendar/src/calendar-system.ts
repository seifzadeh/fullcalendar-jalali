import { DateMarker, arrayToUtcDate, dateToUtcArray } from './marker'

export interface CalendarSystem {
  /** Identifier used by built-in formatters when a system has one. */
  readonly name?: string
  getMarkerYear(d: DateMarker): number
  getMarkerMonth(d: DateMarker): number
  getMarkerDay(d: DateMarker): number
  getMonthLength(year: number, month: number): number
  arrayToMarker(arr: number[]): DateMarker
  markerToArray(d: DateMarker): number[]
}

export interface CalendarSystemConstructor {
  new (): CalendarSystem
}

const calendarSystemClassMap: Record<string, CalendarSystemConstructor> = {}

export function registerCalendarSystem(name: string, theClass: CalendarSystemConstructor): void {
  const existingClass = calendarSystemClassMap[name]

  if (existingClass && existingClass !== theClass) {
    throw new Error(`Calendar system already registered: ${name}`)
  }

  calendarSystemClassMap[name] = theClass
}

export function createCalendarSystem(name: string): CalendarSystem {
  const CalendarSystemClass = calendarSystemClassMap[name]

  if (!CalendarSystemClass) {
    throw new Error(`Unknown calendar system: ${name}`)
  }

  return new CalendarSystemClass()
}

class GregorianCalendarSystem implements CalendarSystem {
  readonly name = 'gregory'
  getMarkerYear(d: DateMarker) {
    return d.getUTCFullYear()
  }

  getMarkerMonth(d: DateMarker) {
    return d.getUTCMonth()
  }

  getMarkerDay(d: DateMarker) {
    return d.getUTCDate()
  }

  getMonthLength(year: number, month: number) {
    return arrayToUtcDate([year, month + 1, 0]).getUTCDate()
  }

  arrayToMarker(arr) {
    return arrayToUtcDate(arr)
  }

  markerToArray(marker) {
    return dateToUtcArray(marker)
  }
}

registerCalendarSystem('gregory', GregorianCalendarSystem)
