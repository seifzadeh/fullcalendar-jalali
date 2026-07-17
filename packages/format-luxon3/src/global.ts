import plugin from './index'

declare global {
  let FullCalendar: any
}

FullCalendar.globalPlugins.push(plugin)
