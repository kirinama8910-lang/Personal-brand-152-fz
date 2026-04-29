# Design: Секции #cta-final (11), #footer (12) и Cookie-banner

**Дата:** 2026-04-29  
**Проект:** Personal-brand-152-fz  
**Статус:** Утверждён

---

## Контекст

Лендинг личного бренда Марины Кириной. Три финальных элемента страницы — закрывающий CTA, футер и куки-баннер — существуют в `index.html` как заглушки или комментарии. Реализуются в рамках Task 7 (Батч Д).

---

## Секция 11 — #cta-final

### Тексты (дословно из SPEC.md §5)

- **Eyebrow:** «11 / ФИНАЛЬНЫЙ ШАГ»
- **Заголовок:** «Если дочитали — значит узнали себя.»
- **Подзаголовок:** «Пока вы решаете, в каком из соседних мест уже сидит ваш следующий клиент. Посчитайте, во сколько это обходится за месяц.»
- **Кнопка:** «Посчитать за 2 минуты» → `href="#quiz"`

### Дизайн

- `<section id="cta-final" class="reveal">` — анимация появления через IntersectionObserver (reveal.js)
- Фон: `var(--bg)` (основной тёмный)
- **Eyebrow:** PT Mono, 11px, `rgba(0,200,255,.5)`, letter-spacing `.15em`, uppercase; декоративная линия 32px слева `rgba(0,200,255,.3)`
- **h2:** `font-family: var(--font-display)`, крупный (`clamp(36px, 6vw, 60px)`), `color: var(--ink)`
- **Подзаголовок:** `color: var(--ink-muted)`, `max-width: 52ch`, `line-height: 1.65`
- **Кнопка:** `background: var(--mark); color: var(--mark-ink); font-weight: 700` — жёлтая, **без градиента**
- **Орб-glow:** `position: absolute` позади кнопки, `radial-gradient` в `var(--neon)`, `filter: blur(80px)`, `opacity: .15`, `pointer-events: none`
- Контент центрирован: `text-align: center`, `max-width: 640px; margin: 0 auto`

---

## Секция 12 — #footer

### Структура: три колонки desktop → стек mobile (≤768px)

**Колонка 1 — Бренд:**
- «Марина Кирина» — `font-family: var(--font-mono)`, `color: var(--neon)`
- «Самозанятая · Пенза» — `color: var(--ink-muted)`, 13px
- «© 2025 Марина Кирина» — `color: var(--ink-muted)`, 12px

**Колонка 2 — Документы:**
```html
<a href="./privacy-policy.html">Политика конфиденциальности</a>
<a href="./cookie-policy.html">Политика cookie</a>
<a href="./consent.html">Согласие на обработку ПД</a>
<a id="manage-consent" href="./consent.html">Управление согласиями</a>
```

**Колонка 3 — Контакты:**
```html
<a href="https://t.me/marinakirina111" aria-label="Telegram">
  <!-- встроенный SVG иконки Telegram -->
</a>
<a href="mailto:m_kirina@mail.ru">m_kirina@mail.ru</a>
```
Telegram — SVG-иконка встроена inline (без внешних запросов). Email — текст со ссылкой.

**Нижняя строка (full-width):**
- `border-top: 1px solid var(--rule-solid)`
- «ИНН: 583680314756» — `color: var(--ink-faint)`, `font-family: var(--font-mono)`, 12px

### CSS footer

- `background: var(--bg-card)`
- `border-top: 1px solid var(--rule-solid)`
- `padding: 48px 0 32px`
- Ссылки: `color: var(--ink-muted)`, hover `color: var(--neon)`, `transition: color .2s`
- Mobile `≤768px`: колонки → `flex-direction: column`, gap 32px

---

## Cookie-banner

### Источник: скилл `cookie-banner-part-1.md` (Vanilla JS)

### Поведение

- Показывается при первом визите (проверка `localStorage` по ключу `pdp_cookie_consent`)
- Если согласие уже есть — баннер не показывается, аналитика применяется сразу
- После выбора — сохраняется `{ necessary, analytics, marketing, ts }` в `localStorage`

### HTML-структура

```html
<!-- Добавить в конец <body>, перед закрывающим тегом -->
<div id="cookie-banner" class="cookie-banner" role="dialog" aria-modal="true" hidden>
  <p>Используем cookie для аналитики. Аналитические cookie — только с вашего согласия.
     <a href="./cookie-policy.html">Подробнее</a></p>
  <div class="cookie-banner__actions">
    <button id="cb-accept-all"    class="cb-btn cb-btn--primary">Принять все</button>
    <button id="cb-reject"        class="cb-btn cb-btn--secondary">Только необходимые</button>
    <button id="cb-settings-open" class="cb-btn cb-btn--link">Настроить</button>
  </div>
</div>

<div id="cookie-settings" class="cookie-settings" role="dialog" aria-modal="true" hidden>
  <h3>Настройки cookie</h3>
  <label><input type="checkbox" checked disabled> Необходимые (всегда активны)</label>
  <label><input type="checkbox" id="cs-analytics"> Аналитические (Яндекс.Метрика)</label>
  <label><input type="checkbox" id="cs-marketing"> Маркетинговые</label>
  <button id="cs-save" class="cb-btn cb-btn--primary">Сохранить</button>
</div>
```

### JS: `assets/js/cookie-banner.js`

- IIFE, подключается в `<head>` синхронно (`<script src="./assets/js/cookie-banner.js"></script>`)
- Яндекс.Метрика: динамическая инжекция, `YM_ID = 0` — заполнить перед запуском
- Кнопки: «Принять все» → `{ necessary:true, analytics:true, marketing:true }`, «Только необходимые» → `{ necessary:true, analytics:false, marketing:false }`, «Настроить» → открывает `#cookie-settings`

### Дизайн (Dark Neon Tech)

- **Баннер:** `position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999`
- `background: var(--bg-card)`, `border-top: 1px solid var(--rule-solid)`, `padding: 20px 24px`
- Текст: `color: var(--ink-muted)`, ссылка: `color: var(--neon)`
- **cb-btn--primary:** `background: var(--mark); color: var(--mark-ink); font-weight: 700`
- **cb-btn--secondary:** `border: 1px solid var(--rule-solid); color: var(--ink); background: transparent`
- **cb-btn--link:** `background: none; color: var(--ink-muted); text-decoration: underline`
- **#cookie-settings:** `position: fixed; bottom: 0; left: 0; right: 0; z-index: 10000`, `background: var(--bg-card)`, `border-top: 1px solid var(--rule)`, `padding: 24px`
- Mobile `≤768px`: кнопки — `flex-direction: column; width: 100%`

---

## Юридические файлы (НЕ ТРОГАТЬ)

Файлы существуют и заполнены (27–32 KB каждый):
- `./privacy-policy.html` — готов
- `./cookie-policy.html` — готов
- `./consent.html` — содержит маркеры `[ЗАПОЛНИТЬ]`, заполнить вручную перед запуском

Ссылки в футере и куки-баннере ведут на эти файлы — переходы будут рабочими.

---

## Запреты (из CLAUDE.md)

- Никаких слов: Instagram, Meta, вайбкодинг, дёшево, блокировка
- Никаких переменных: `var(--accent)`, `var(--paper)`, `var(--inverted)`
- Пути к ресурсам: `./assets/...`
- `id="manage-consent"` обязателен в футере
- Все href юр-документов точные: `./consent.html`, `./privacy-policy.html`, `./cookie-policy.html`

## Что НЕ затрагивается

`quiz.html`, `quiz-*.js`, `quiz.css`, `consent.html`, `privacy-policy.html`, `cookie-policy.html`, `photo.png`, `assets/fonts/`
