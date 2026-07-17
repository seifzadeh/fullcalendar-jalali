# FullCalendar Jalali

FullCalendar Jalali is a Persian (Jalali/Shamsi) calendar fork of FullCalendar.
It renders Jalali month boundaries, navigation, leap years, and Persian date
formatting while retaining the usual Gregorian/ISO contract for event data and
callbacks.

- [Live interactive demo](https://seifzadeh.github.io/fullcalendar-jalali/)
- [Latest release](https://github.com/seifzadeh/fullcalendar-jalali/releases/latest)
- [Report an issue](https://github.com/seifzadeh/fullcalendar-jalali/issues)
- [MIT License](LICENSE.md)

> This repository is distributed from GitHub source. It is not currently
> published as a separate npm package, so clone and build it before using its
> browser bundle.

## English guide

### What this fork adds

- `calendarSystem: 'jalali'` for Jalali date arithmetic and month navigation.
- `calendarSystem: 'persian'` as an alias for `jalali`.
- Persian/RTL configuration using `locale: 'fa'`, `direction: 'rtl'`, and
  `firstDay: 6`.
- Correct Jalali month lengths and leap-year handling through `jalaali-js`.
- Month, week, day, and list views, including drag-and-drop events.

Calendar display uses Jalali dates. Event `start`, `end`, `dateClick`,
`eventClick`, and other callback values remain normal Gregorian/ISO values.
For example, an event date such as `2026-07-20T10:00:00+03:30` is displayed in
the matching Jalali day, but is still submitted and received as ISO time.

### 1. Get the project from GitHub

Install [Node.js](https://nodejs.org/) 22 or newer and
[pnpm](https://pnpm.io/installation) 10.15 or newer, then run:

```sh
git clone https://github.com/seifzadeh/fullcalendar-jalali.git
cd fullcalendar-jalali
pnpm install
pnpm build
```

The build creates the browser bundle and all required CSS/theme files.

### 2. Run the included demo locally

```sh
pnpm demo:prepare
cd demo
python3 -m http.server 8080
```

Open `http://localhost:8080`. Do not open `index.html` directly with
`file://`; use a local web server so browser module and asset loading works
consistently.

### 3. Add the calendar to a plain HTML project

After running `pnpm demo:prepare`, copy these files from `demo/` into your
application's public/static directory:

```text
fullcalendar.js
fullcalendar-classic-theme.js
fullcalendar.css
fullcalendar-classic-theme.css
fullcalendar-classic-palette.css
```

Add the assets and a calendar element to your page. The classic theme script
must be loaded after `fullcalendar.js`.

```html
<link rel="stylesheet" href="/vendor/fullcalendar/fullcalendar.css" />
<link rel="stylesheet" href="/vendor/fullcalendar/fullcalendar-classic-theme.css" />
<link rel="stylesheet" href="/vendor/fullcalendar/fullcalendar-classic-palette.css" />

<div id="calendar"></div>

<script src="/vendor/fullcalendar/fullcalendar.js"></script>
<script src="/vendor/fullcalendar/fullcalendar-classic-theme.js"></script>
```

Then create the calendar:

```html
<script>
  const calendar = new FullCalendar.Calendar(document.querySelector('#calendar'), {
    calendarSystem: 'jalali',
    locale: 'fa',
    direction: 'rtl',
    firstDay: 6,
    themeSystem: 'classic',
    initialView: 'dayGridMonth',
    initialDate: '2026-07-20', // Gregorian / ISO input
    editable: true,
    events: [
      {
        title: 'جلسه فروش',
        start: '2026-07-20T10:00:00+03:30',
        end: '2026-07-20T11:00:00+03:30',
        color: '#1677ff',
        contrastColor: '#ffffff',
      },
      {
        title: 'تعطیلی',
        start: '2026-07-23',
        allDay: true,
        color: '#e74c3c',
        contrastColor: '#ffffff',
      },
    ],
    dateClick(info) {
      console.log(info.dateStr) // Gregorian/ISO callback value
    },
  })

  calendar.render()
</script>
```

### 4. Common options

| Option | Purpose |
| --- | --- |
| `calendarSystem: 'jalali'` | Enables Jalali calendar arithmetic and displayed dates. |
| `locale: 'fa'` | Uses Persian labels and date text. |
| `direction: 'rtl'` | Uses right-to-left layout. |
| `firstDay: 6` | Starts the week on Saturday. |
| `initialView` | Use `dayGridMonth`, `timeGridWeek`, `timeGridDay`, or `listMonth`. |
| `editable: true` | Enables event drag-and-drop and resizing where applicable. |
| `color` / `contrastColor` | Sets a clear event color and its text color. |

### 5. Navigation and API

```js
calendar.prev()                         // previous Jalali period
calendar.next()                         // next Jalali period
calendar.today()                        // jump to today
calendar.changeView('listMonth')        // switch views
calendar.addEvent({
  title: 'رویداد جدید',
  start: '2026-07-25T09:00:00+03:30',  // still Gregorian/ISO
  color: '#1677ff',
  contrastColor: '#ffffff',
})
```

### Development and deployment

```sh
pnpm lint
pnpm build
pnpm --filter @full-ui/headless-calendar test
pnpm demo:prepare
```

Pushing to `main` deploys the `demo/` directory to GitHub Pages through
[`.github/workflows/deploy-demo.yml`](.github/workflows/deploy-demo.yml).
Creating a tag matching `v*.*.*` creates a GitHub release through
[`.github/workflows/release.yml`](.github/workflows/release.yml).

---

## راهنمای فارسی

### این fork چه چیزی اضافه می‌کند؟

FullCalendar Jalali نسخه فارسی‌شده FullCalendar است که منطق تقویم جلالی/
شمسی را به آن اضافه می‌کند. با قرار دادن `calendarSystem: 'jalali'`، مرز ماه‌ها،
حرکت بین ماه و سال، سال کبیسه و نمایش تاریخ همگی جلالی می‌شوند. مقدار
`'persian'` نیز نام جایگزین `jalali` است.

برای رابط فارسی از `locale: 'fa'`، برای راست‌به‌چپ از `direction: 'rtl'` و برای
شروع هفته از شنبه از `firstDay: 6` استفاده کنید. نماهای ماه، هفته، روز و فهرست
همگی در دسترس‌اند و در صورت فعال‌کردن `editable: true` می‌توان رویدادها را با
drag & drop جابه‌جا کرد.

نکته مهم: فقط تقویم و تاریخ نمایش‌داده‌شده جلالی است. ورودی رویدادها و مقادیری
که از callbackها دریافت می‌کنید همچنان Gregorian/ISO هستند. مثلاً تاریخ
`2026-07-20T10:00:00+03:30` در تقویم در روز متناظر جلالی دیده می‌شود، اما هنگام
ارسال به API یا دریافت در `dateClick` همان مقدار ISO را دارید.

### ۱. دریافت پروژه از GitHub

این fork فعلاً به‌عنوان یک پکیج npm مستقل منتشر نشده است؛ بنابراین ابتدا سورس را
از GitHub دریافت و build کنید. به Node.js نسخه ۲۲ یا بالاتر و pnpm نسخه ۱۰٫۱۵ یا
بالاتر نیاز دارید:

```sh
git clone https://github.com/seifzadeh/fullcalendar-jalali.git
cd fullcalendar-jalali
pnpm install
pnpm build
```

فرمان build فایل JavaScript مرورگر، CSS پایه و فایل‌های theme را ایجاد می‌کند.

### ۲. اجرای دمو روی سیستم خودتان

```sh
pnpm demo:prepare
cd demo
python3 -m http.server 8080
```

سپس آدرس `http://localhost:8080` را باز کنید. فایل `index.html` را مستقیم با
`file://` باز نکنید؛ برای بارگذاری درست فایل‌ها همیشه یک web server محلی اجرا
کنید.

### ۳. استفاده در پروژه HTML یا JavaScript

بعد از اجرای `pnpm demo:prepare`، پنج فایل زیر را از پوشه `demo/` به مسیر
`public` یا `static` پروژه خود کپی کنید:

```text
fullcalendar.js
fullcalendar-classic-theme.js
fullcalendar.css
fullcalendar-classic-theme.css
fullcalendar-classic-palette.css
```

سه فایل CSS ظاهر تمام نماها، از جمله فهرست و هفته، را می‌سازند. ابتدا CSSها را
در `<head>` و سپس فایل JavaScript اصلی و فایل theme را در صفحه قرار دهید. فایل
`fullcalendar-classic-theme.js` باید حتماً بعد از `fullcalendar.js` بارگذاری شود.

کد HTML و JavaScript کامل در بخش انگلیسی بالاتر آمده است و می‌توانید آن را
بدون تغییر در پروژه خود قرار دهید. مهم‌ترین بخش تنظیمات این است:

```js
const calendar = new FullCalendar.Calendar(calendarElement, {
  calendarSystem: 'jalali',
  locale: 'fa',
  direction: 'rtl',
  firstDay: 6,
  themeSystem: 'classic',
  initialView: 'dayGridMonth',
})
```

### ۴. تنظیمات پرکاربرد

| تنظیم | کاربرد |
| --- | --- |
| `calendarSystem: 'jalali'` | فعال‌کردن محاسبات و نمایش تقویم جلالی. |
| `locale: 'fa'` | نام روزها، ماه‌ها و متن‌های فارسی. |
| `direction: 'rtl'` | چیدمان راست‌به‌چپ. |
| `firstDay: 6` | شروع هفته از شنبه. |
| `initialView` | یکی از `dayGridMonth`، `timeGridWeek`، `timeGridDay` یا `listMonth`. |
| `editable: true` | اجازه جابه‌جایی و تغییر اندازه رویدادها. |
| `color` و `contrastColor` | رنگ رویداد و رنگ متن آن؛ مثلاً جلسه آبی و تعطیلی قرمز. |

### ۵. کار با API تقویم

با `calendar.prev()` و `calendar.next()` بین بازه‌های جلالی حرکت می‌کنید و با
`calendar.today()` به امروز می‌روید. برای تغییر نما از
`calendar.changeView('listMonth')` و برای ساخت رویداد از `calendar.addEvent()`
استفاده کنید. تاریخ `start` و `end` رویداد جدید باید همچنان به‌شکل
Gregorian/ISO باشد.

```js
calendar.addEvent({
  title: 'رویداد جدید',
  start: '2026-07-25T09:00:00+03:30',
  color: '#1677ff',
  contrastColor: '#ffffff',
})
```

### توسعه، دمو و انتشار

برای بررسی پروژه از دستورهای زیر استفاده کنید:

```sh
pnpm lint
pnpm build
pnpm --filter @full-ui/headless-calendar test
pnpm demo:prepare
```

با هر push روی شاخه `main`، workflow گیت‌هاب پوشه `demo/` را build و روی GitHub
Pages منتشر می‌کند. ساختن یک tag با الگوی `v*.*.*` نیز GitHub Release ایجاد
می‌کند. دمو آنلاین پروژه در این آدرس قابل مشاهده است:

<https://seifzadeh.github.io/fullcalendar-jalali/>
