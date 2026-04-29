# Design: Секции #cta-final (11) и #footer (12)

**Дата:** 2026-04-29  
**Проект:** Personal-brand-152-fz  
**Статус:** Утверждён

---

## Контекст

Лендинг личного бренда Марины Кириной. Два финальных элемента страницы — закрывающий CTA и футер — существуют в `index.html` как заглушки. Реализация ведётся в рамках Task 7 (Батч Д).

Куки-баннер, упомянутый в том же Task 7, **откладывается на отдельную задачу**.

---

## Секция 11 — #cta-final

### Тексты (дословно из SPEC.md §5)

- **Eyebrow:** «11 / ФИНАЛЬНЫЙ ШАГ»
- **Заголовок:** «Если дочитали — значит узнали себя.»
- **Подзаголовок:** «Пока вы решаете, в каком из соседних мест уже сидит ваш следующий клиент. Посчитайте, во сколько это обходится за месяц.»
- **Кнопка:** «Посчитать за 2 минуты» → `href="#quiz"`

### Дизайн

- `<section id="cta-final" class="reveal">` — анимация появления
- Фон: `var(--bg)` (основной тёмный)
- **Eyebrow:** PT Mono, 11px, `rgba(0,200,255,.5)`, letter-spacing `.15em`, uppercase; декоративная линия 32px слева `rgba(0,200,255,.3)`
- **h2:** `font-family: var(--font-display)`, крупный (clamp ~40–60px), `color: var(--ink)`
- **Подзаголовок:** `color: var(--ink-muted)`, `max-width: 52ch`, `line-height: 1.65`
- **Кнопка:** `background: var(--mark); color: var(--mark-ink); font-weight: 700` — жёлтая, **без градиента**
- **Орб-glow:** `position: absolute` позади кнопки, `radial-gradient` в `var(--neon)`, `filter: blur(80px)`, `opacity: .15`, pointer-events none
- Контент центрирован, `text-align: center`, `max-width: 640px; margin: 0 auto`

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
<a href="https://t.me/marinakirina111" aria-label="Telegram"><!-- SVG иконка Telegram --></a>
<a href="mailto:m_kirina@mail.ru">m_kirina@mail.ru</a>
```
Telegram — иконка SVG (встроенная, без внешних запросов), клик по иконке открывает ссылку. Email — текст.

**Нижняя строка (full-width):**
- `border-top: 1px solid var(--rule-solid)`
- «ИНН: 583680314756» — `color: var(--ink-faint)`, `font-family: var(--font-mono)`, 12px

### CSS footer

- `background: var(--bg-card)`
- `border-top: 1px solid var(--rule-solid)`
- `padding: 48px 0 32px`
- Ссылки: `color: var(--ink-muted)`, `hover: color: var(--neon)`, transition `.2s`
- Mobile breakpoint `≤768px`: колонки → `flex-direction: column`, gap 32px

---

## Запреты (из CLAUDE.md)

- Никаких слов: Instagram, Meta, вайбкодинг, дёшево, блокировка
- Никаких переменных: `var(--accent)`, `var(--paper)`, `var(--inverted)`
- Пути к ресурсам: `./assets/...`
- `id="manage-consent"` обязателен в футере
- Все href юр-документов точные: `./consent.html`, `./privacy-policy.html`, `./cookie-policy.html`

---

## Что НЕ затрагивается

`quiz.html`, `quiz-*.js`, `quiz.css`, `consent.html`, `privacy-policy.html`, `cookie-policy.html`, `photo.png`, `assets/fonts/`
