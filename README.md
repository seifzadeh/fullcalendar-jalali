# FullCalendar

Full-sized drag & drop calendar in JavaScript

- [Project Website](https://fullcalendar.io/)
- [Documentation](https://fullcalendar.io/docs)
- [Changelog](CHANGELOG.md)
- [Support](https://fullcalendar.io/support)
- [License](LICENSE.md)
- [Roadmap](https://fullcalendar.io/roadmap)

Connectors:

- [React](https://github.com/fullcalendar/fullcalendar-react)
- [Angular](https://github.com/fullcalendar/fullcalendar-angular)
- [Vue 3](https://github.com/fullcalendar/fullcalendar-vue) |
  [2](https://github.com/fullcalendar/fullcalendar-vue2)

## Bundle

The [FullCalendar Standard Bundle](bundle) is easier to install than individual plugins, though filesize will be larger. It works well with a CDN.

## Installation

Install the FullCalendar vanilla-JS package:

```sh
npm install fullcalendar
```

## Usage

Instantiate a Calendar with plugins and options:

```js
import { Calendar } from 'fullcalendar'
import classicThemePlugin from 'fullcalendar/themes/classic'
import dayGridPlugin from 'fullcalendar/daygrid'
import interactionPlugin from 'fullcalendar/interaction'

import 'fullcalendar/skeleton.css'
import 'fullcalendar/themes/classic/theme.css'
import 'fullcalendar/themes/classic/palette.css'

const calendarEl = document.getElementById('calendar')
const calendar = new Calendar(calendarEl, {
  plugins: [
    classicThemePlugin,
    dayGridPlugin,
    interactionPlugin
  ],
  initialView: 'timeGridWeek',
  editable: true,
  events: [
    { title: 'Meeting', start: new Date() }
  ]
})

calendar.render()
```

## Persian (Jalali) calendar

This fork adds a built-in Jalali calendar system. Set `calendarSystem` to
`'jalali'` (or the `'persian'` alias) to use Jalali date arithmetic, month
boundaries, navigation, and date formatting. Event inputs and callbacks retain
the standard Gregorian/ISO FullCalendar date contract.

```js
const calendar = new Calendar(calendarEl, {
  calendarSystem: 'jalali',
  locale: 'fa',
  direction: 'rtl',
  firstDay: 6,
  initialView: 'dayGridMonth',
  events: [
    { title: 'جلسه', start: '2026-07-20T10:00:00+03:30' },
  ],
})
```

The implementation is powered by `jalaali-js` and handles Jalali leap years
and month-length clamping when moving between months or years.

Try the [interactive Jalali calendar demo](https://seifzadeh.github.io/fullcalendar-jalali/). The demo includes:

- month, week, day, and list views in an RTL Persian layout;
- Jalali navigation and Persian date formatting;
- adding, moving, and removing events;
- date and event callbacks with their Gregorian/ISO values shown;
- responsive layout for desktop and mobile screens.

To run the demo locally after building the vanilla package:

```sh
pnpm demo:prepare
cd demo
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser.

### GitHub Pages

The repository includes [`.github/workflows/deploy-demo.yml`](.github/workflows/deploy-demo.yml).
On every push to `main`, GitHub builds the vanilla bundle, copies it into `demo/`,
and publishes that directory with GitHub Pages. In the repository settings, set
**Pages → Build and deployment → Source** to **GitHub Actions**. You can also run
the workflow manually from the **Actions** tab.

## Development

You must install this repo with [PNPM](https://pnpm.io/):

```
pnpm install
```

Available scripts (via `pnpm run <script>`):

- `build` - build production-ready dist files
- `dev` - build & watch development dist files
- `test` - test headlessly
- `test:dev` - test interactively
- `lint`
- `clean`

[Info about contributing code &raquo;](CONTRIBUTING.md)
