# Personal-brand-152-fz Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Реализовать одностраничный лендинг Марины Кириной (12 секций, Slow Editorial Print) поверх существующего репозитория Personal-brand-152-fz, не трогая готовый квиз, юр-документы и шрифты.

**Architecture:** Pure HTML/CSS/Vanilla JS, без фреймворков. Сабагенты пишут в `index.html` (одна страница, наполняем секции по очереди) и `assets/css/main.css` (CSS-переменные + базовая типографика + блочные стили). Cookie-banner — отдельный JS-файл `assets/js/cookie-consent.js`. Готовый квиз монтируется через `<div id="quiz-root"></div>` без правок исходных файлов.

**Tech Stack:**
- HTML5 + CSS3 + Vanilla ES6 (никаких React/Vue/фреймворков)
- Шрифты: Geologica + Onest + PT Mono (variable-TTF, локально в `/assets/fonts/`)
- Палитра: `#F4EFE6` бумага, `#111111` чернила, `#1A2B6B` ультрамарин, `#F6E057` highlight
- Дизайн-направление: Slow Editorial Print (асимметричная сетка, нумерация секций mono-шрифтом, тонкие линии вместо теней)
- 152-ФЗ: локальные шрифты, динамическая Метрика после согласия, cookie-banner с равными кнопками
- Хостинг: Timeweb (РФ)

---

## File Structure

| Файл | Создаёт / Меняет | Ответственность |
|------|------------------|-----------------|
| `index.html` | Создаётся в Task 0, наполняется в Tasks 1–7 | Одна страница, 12 секций (`#hero` … `#footer`), `<head>` с CSP, подключение `main.css`, `quiz.css`, `quiz-embed.js`, `cookie-consent.js` |
| `assets/css/main.css` | Создаётся в Task 0, расширяется в Tasks 1–7, 9 | CSS-переменные палитры, `@font-face` (3 блока), типографика, editorial-grid, нумерация секций, SVG-noise overlay, блоки стилей под каждую секцию |
| `assets/js/cookie-consent.js` | Создаётся в Task 7 | Vanilla JS cookie-banner с равными кнопками, localStorage-ключ `pdp_cookie_consent`, динамическая инжекция Метрики |
| `index.html` `<head>` Метрика | Меняется в Task 7 | Добавляется `window.METRIKA_ID = null;` (заменить на число вручную перед запуском) |
| `assets/fonts/` | НЕ ТРОГАТЬ | Уже содержит Geologica-Variable.ttf, Onest-Variable.ttf, PTMono-Regular.ttf + 3 OFL.txt |
| `quiz.html`, `assets/css/quiz.css`, `assets/js/quiz-*.js` | НЕ ТРОГАТЬ | Источник истины — `sverhnovaya/`. Только встраиваем точку монтирования и подключаем |
| `consent.html`, `privacy-policy.html`, `cookie-policy.html` | НЕ ТРОГАТЬ | Уже существуют в корне, ссылаемся из лендинга |
| `photo.png` | НЕ ТРОГАТЬ | Реальное фото Марины, используется в Story и About |

**Source-of-truth для копирайта:** SPEC.md разделы §0, §3, §4, §5 (включая «Уточнения по секциям»). Все запреты по словам — CLAUDE.md.

---

## How to dispatch subagents

Каждая задача снабжена секцией **"Subagent prompt"** — это полный текст, который ты копируешь в `Agent` tool вызов.

Минимальный pattern для всех задач:

```
Agent({
  description: "Task N: <краткое название>",
  subagent_type: "general-purpose",
  prompt: <текст из секции Subagent prompt этой задачи>
})
```

Сабагент должен видеть весь репозиторий: SPEC.md, CLAUDE.md, docs/quiz-spec.md, существующие index.html / main.css (если уже созданы предыдущими задачами).

Между задачами рекомендуется делать review через `superpowers:requesting-code-review` или просто читать diff.

---

## Task 0: Каркас и дизайн-система

**Files:**
- Create: `index.html`
- Create: `assets/css/main.css`

**Context for subagent:**
- SPEC.md §1 (Резюме), §5 (12 секций), §6 (Slow Editorial Print, палитра, принципы), §7 (Geologica + Onest + PT Mono, `@font-face`), §8 (152-ФЗ чеклист), §10 (`#quiz` точка монтирования)
- CLAUDE.md (ограничения языка)
- Шрифты уже в `/assets/fonts/` — `Geologica-Variable.ttf`, `Onest-Variable.ttf`, `PTMono-Regular.ttf`

**Steps:**

- [ ] **Step 1: Read SPEC.md sections 1, 5, 6, 7, 8, 10**

- [ ] **Step 2: Create `index.html` with this exact content:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Марина Кирина — сайт + Telegram-бот + автоматизация на n8n</title>
  <meta name="description" content="Лендинг фрилансера для практиков-одиночек и владельцев студий: связка «сайт + Telegram-бот + автоматизация на n8n» за 2–3 недели, по фиксированной цене, с обязательством по 152-ФЗ.">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https://mc.yandex.ru https://t.me">
  <link rel="stylesheet" href="/assets/css/main.css">
  <style>
    html { scroll-behavior: smooth; }
    @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  </style>
</head>
<body>
  <section id="hero" data-section="01" data-title="Hero">
    <h2>Секция 1 — Hero (наполнение в Task 1)</h2>
  </section>
  <section id="pain" data-section="02" data-title="Узнаёте?">
    <h2>Секция 2 — Боль (наполнение в Task 2)</h2>
  </section>
  <section id="story" data-section="03" data-title="Где теряются деньги">
    <h2>Секция 3 — Story (наполнение в Task 3)</h2>
  </section>
  <section id="case" data-section="04" data-title="Кейс">
    <h2>Секция 4 — Кейс (наполнение в Task 4)</h2>
  </section>
  <section id="quiz" data-section="05" data-title="Квиз">
    <h2>Секция 5 — Квиз (наполнение в Task 4)</h2>
  </section>
  <section id="packages" data-section="06" data-title="Пакеты">
    <h2>Секция 6 — Пакеты (наполнение в Task 5)</h2>
  </section>
  <section id="trust-152fz" data-section="07" data-title="152-ФЗ">
    <h2>Секция 7 — 152-ФЗ (наполнение в Task 5)</h2>
  </section>
  <section id="future-pacing" data-section="08" data-title="Через 3 недели">
    <h2>Секция 8 — Future Pacing (наполнение в Task 6)</h2>
  </section>
  <section id="faq" data-section="09" data-title="FAQ">
    <h2>Секция 9 — FAQ (наполнение в Task 6)</h2>
  </section>
  <section id="about" data-section="10" data-title="Кто я">
    <h2>Секция 10 — Кто я (наполнение в Task 6)</h2>
  </section>
  <section id="cta-final" data-section="11" data-title="Финальный CTA">
    <h2>Секция 11 — Финальный CTA (наполнение в Task 7)</h2>
  </section>
  <footer id="footer" data-section="12" data-title="Footer">
    <h2>Секция 12 — Footer (наполнение в Task 7)</h2>
  </footer>
  <!-- cookie-banner будет добавлен в Task 7 -->
</body>
</html>
```

- [ ] **Step 3: Create `assets/css/main.css` with this exact content:**

```css
/* === Variables (Slow Editorial Print, SPEC §6) === */
:root {
  --paper: #F4EFE6;
  --ink: #111111;
  --ink-muted: #4A4A48;
  --accent: #1A2B6B;
  --mark: #F6E057;
  --rule: #D9D2C2;
  --inverted: #0E0E0F;
  --font-display: 'Geologica', Georgia, 'Times New Roman', serif;
  --font-body: 'Onest', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'PT Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --section-gap: 128px;
  --section-gap-mobile: 80px;
  --content-max: 65ch;
}

/* === Fonts (SPEC §7) === */
@font-face {
  font-family: 'Geologica';
  src: url('/assets/fonts/Geologica-Variable.ttf') format('truetype-variations'),
       url('/assets/fonts/Geologica-Variable.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Onest';
  src: url('/assets/fonts/Onest-Variable.ttf') format('truetype-variations'),
       url('/assets/fonts/Onest-Variable.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'PT Mono';
  src: url('/assets/fonts/PTMono-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* === Reset & base === */
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font: 400 18px/1.65 var(--font-body);
  position: relative;
}
h1, h2, h3, blockquote { font-family: var(--font-display); font-weight: 700; line-height: 1.2; margin: 0; }
p { margin: 0; }
a { color: var(--accent); text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

/* === Editorial grid === */
.container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
section, footer[data-section] {
  padding-top: var(--section-gap);
  padding-bottom: var(--section-gap);
  position: relative;
}
@media (max-width: 768px) {
  section, footer[data-section] {
    padding-top: var(--section-gap-mobile);
    padding-bottom: var(--section-gap-mobile);
  }
}

/* === Section markers (mono-маркер «01 / Hero» в углу) === */
section[data-section]::before,
footer[data-section]::before {
  content: attr(data-section) " / " attr(data-title);
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-muted);
  position: absolute;
  top: 32px;
  left: 24px;
  letter-spacing: 0.04em;
  z-index: 2;
}
@media (max-width: 768px) {
  section[data-section]::before,
  footer[data-section]::before {
    top: 24px;
    right: 16px;
    left: auto;
    font-size: 12px;
  }
}

/* === Paper noise overlay (бумажная атмосфера) === */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.03;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
section, footer[data-section] { z-index: 2; }
```

- [ ] **Step 4: Verify visually**

Run: `start "" "c:/Users/user/Documents/GitHub/Personal-brand-152-fz/index.html"` (Windows) or open the file in browser.

Expected:
- Тёплый кремовый фон `#F4EFE6`.
- Заголовки секций «Секция N — …» серифом Geologica (или Georgia если шрифт не загрузился).
- В верхнем-левом углу каждой секции — мелкий mono-маркер вроде `01 / Hero`.
- Лёгкая «бумажная зернистость» (на самом пределе видимости).

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat(landing): scaffold (12 sections, fonts, editorial grid)"
```

### Subagent prompt for Task 0

```
Read SPEC.md (sections §1, §5, §6, §7, §8, §10), CLAUDE.md, and the plan at docs/superpowers/plans/2026-04-28-landing-implementation.md (Task 0).

Implement Task 0 exactly as specified:
1. Create index.html with the exact content from Step 2 — 12 placeholder sections with data-section/data-title attributes, CSP meta, viewport, Russian description, link to /assets/css/main.css.
2. Create assets/css/main.css with the exact content from Step 3 — CSS variables, three @font-face blocks for variable TTFs, base typography, editorial grid container, section markers via ::before, SVG-noise overlay.
3. Verify the result by opening index.html in browser. Confirm: warm paper background, serif headings, mono section markers in top-left corner of each section.
4. Commit with message: "feat(landing): scaffold (12 sections, fonts, editorial grid)"

Do not modify quiz.html, quiz-related files in /assets/js/ or /assets/css/quiz.css, OFL.txt files, or any of three legal HTML documents in root. Do not download any external resources — fonts are already in /assets/fonts/.

Report back: list of files created, output of git commit, any visual issues you noticed.
```

---

## Task 1: Hero (секция 1)

**Files:**
- Modify: `index.html` (replace placeholder content of `#hero`)
- Modify: `assets/css/main.css` (append `/* === Hero === */` block)

**Context for subagent:**
- SPEC.md §4 «Hook» (заголовок, подзаголовок, CTA, микрофутер, редакторская подпись — дословно)
- SPEC.md §0 «Размещение фото» (правило: фото в Hero не размещается)
- CLAUDE.md (запрещённые упоминания)

**Steps:**

- [ ] **Step 1: Read SPEC.md §4 «Hook» fully and CLAUDE.md «Ограничения языка»**

- [ ] **Step 2: Replace `<section id="hero">` content in index.html with:**

```html
<section id="hero" data-section="01" data-title="Hero" class="hero">
  <div class="container hero__inner">
    <h1 class="hero__title">Лучшее, что вы сделаете для бизнеса — перестанете быть в нём незаменимым.</h1>
    <p class="hero__subtitle">Когда каждое сообщение, каждая запись и каждый возврат проходят через вас — бизнес упирается в ваше время. Посчитайте, во что это обходится — в рублях по вашим ценам.</p>
    <a class="hero__cta" href="#quiz">Посчитать за 2 минуты</a>
    <p class="hero__microfooter">5 вопросов. Без регистрации. Контакт оставляете только если сами захотите в финале.</p>
    <p class="hero__editor-credit">Для практиков-одиночек и владельцев студий · Марина Кирина</p>
  </div>
</section>
```

- [ ] **Step 3: Append to `assets/css/main.css`:**

```css
/* === Hero === */
.hero { min-height: 92vh; display: flex; flex-direction: column; justify-content: center; padding-top: 120px; padding-bottom: 80px; }
@media (max-width: 768px) { .hero { min-height: 100vh; } }
.hero__inner { max-width: 1080px; }
.hero__title {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(48px, 6.5vw, 84px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  max-width: 18ch;
  margin: 0 0 32px;
  color: var(--ink);
}
@media (min-width: 1200px) { .hero__title { margin-left: -2ch; } }
.hero__subtitle {
  font-size: clamp(19px, 2vw, 22px);
  line-height: 1.55;
  max-width: 56ch;
  margin: 0 0 48px;
  color: var(--ink);
  opacity: 0.85;
}
.hero__cta {
  display: inline-block;
  padding: 20px 40px;
  min-height: 56px;
  background: var(--accent);
  color: var(--paper);
  border: none;
  border-radius: 0;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.01em;
  transition: background 240ms ease-out;
}
.hero__cta:hover, .hero__cta:focus-visible { background: var(--ink); color: var(--paper); }
.hero__microfooter {
  font-size: 14px;
  color: var(--ink-muted);
  margin: 16px 0 0;
  max-width: 50ch;
}
.hero__editor-credit {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-muted);
  opacity: 0.6;
  position: absolute;
  bottom: 32px;
  right: 24px;
  letter-spacing: 0.02em;
  text-align: right;
}
@media (max-width: 768px) {
  .hero__editor-credit {
    position: static;
    margin-top: 32px;
    text-align: left;
    opacity: 0.55;
  }
}

/* Hero load animation */
.hero__title, .hero__subtitle, .hero__cta, .hero__microfooter, .hero__editor-credit {
  opacity: 0;
  transform: translateY(8px);
  animation: hero-reveal 480ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.hero__title { animation-delay: 80ms; }
.hero__subtitle { animation-delay: 320ms; }
.hero__cta { animation-delay: 480ms; }
.hero__microfooter { animation-delay: 600ms; }
.hero__editor-credit { animation-delay: 720ms; }
@keyframes hero-reveal { to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .hero__title, .hero__subtitle, .hero__cta, .hero__microfooter, .hero__editor-credit {
    opacity: 1; transform: none; animation: none;
  }
}
```

- [ ] **Step 4: Verify**

Open index.html in browser. Expected:
- Полноэкранный Hero с парадокс-хедлайном до 18 строки.
- CTA — синяя прямоугольная кнопка без скруглений.
- В правом нижнем углу — мелкая mono-подпись «Для практиков-одиночек и владельцев студий · Марина Кирина».
- Никакого фото, аватара, иконок мессенджеров.
- Click по CTA — плавный скролл к секции `#quiz` (даже если она ещё пустая).

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat(landing): Hero with paradox headline + editor credit"
```

### Subagent prompt for Task 1

```
Read SPEC.md §4 «Hook» and §0 «Размещение фото», CLAUDE.md «Ограничения языка», and the plan at docs/superpowers/plans/2026-04-28-landing-implementation.md (Task 1).

Implement Task 1: replace the placeholder content of <section id="hero"> in index.html with the exact HTML from Step 2 of the plan, then append the /* === Hero === */ CSS block from Step 3 to assets/css/main.css.

Constraints:
- Do not change anything outside #hero in index.html.
- Do not modify CSS variables or @font-face blocks in main.css.
- The Hero must NOT contain photo, avatar, name, status, city, social icons. Only the headline, subtitle, CTA, microfooter, and editor credit in the corner.
- All text must be exactly as in the plan — do not rephrase.

Verify visually that the headline displays in Geologica 900 weight, CTA scrolls smoothly to #quiz anchor, editor credit appears in PT Mono in the bottom-right corner. Commit with: "feat(landing): Hero with paradox headline + editor credit".

Report back: confirmation that the section was replaced and CSS appended, list of any text deviations from the spec (there should be none).
```

---

## Task 2: Pain (секция 2)

**Files:**
- Modify: `index.html` (replace `#pain`)
- Modify: `assets/css/main.css` (append `/* === Pain === */`)

**Context for subagent:**
- SPEC.md §5 «Уточнения по секциям → Секция 2 (Pain)» (заголовок и лид дословно)
- SPEC.md §3 «Портрет Dream Customer» (Елена + Анна)
- SPEC.md §3 «Внутренний диалог в 23:47» (6 фраз — сырьё для цитат)
- SPEC.md §3 «Топ-3 боли»
- CLAUDE.md (никаких Instagram/Meta/блокировки/вайбкодинга)

**Steps:**

- [ ] **Step 1: Read SPEC.md §3 (full) and §5 «Уточнения → Секция 2»**

- [ ] **Step 2: Replace `<section id="pain">` with:**

```html
<section id="pain" data-section="02" data-title="Узнаёте?" class="pain">
  <div class="container">
    <h2 class="pain__title">Незаменимость в полевых условиях выглядит так</h2>
    <p class="pain__lead">Психолог-практик в Москве и владелица студии в Марьиной Роще — два разных бизнеса, одна и та же ночь.</p>
    <div class="pain__columns">
      <article class="pain__voice">
        <h3 class="pain__voice-name">Елена, психолог-практик</h3>
        <p class="pain__voice-meta">Москва · 6 лет в практике · 25–30 сессий/мес</p>
        <ul class="pain__voice-quotes">
          <li>«Сайт у меня есть. Подруга-дизайнер делала на Tilda. Заявок ноль, а стыдно сказать почему.»</li>
          <li>«Опять не ответила вечером. Сколько ушло — страшно считать.»</li>
          <li>«Помощник — это +30 тысяч в месяц и обучать. И всё равно ночью никого нет.»</li>
        </ul>
      </article>
      <article class="pain__voice">
        <h3 class="pain__voice-name">Анна, владелица студии маникюра</h3>
        <p class="pain__voice-meta">Марьина Роща · 3 мастера · YCLIENTS подключён</p>
        <ul class="pain__voice-quotes">
          <li>«Записи теряются после 20:00. Клиенты пишут, когда некому ответить, и уходят в соседнее место.»</li>
          <li>«Каждое типовое сообщение — вручную. До ночи в мессенджерах.»</li>
          <li>«Я мастер. А полдня — секретарь. Когда я успеваю быть собой?»</li>
        </ul>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Append to main.css:**

```css
/* === Pain === */
.pain__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(32px, 4vw, 52px);
  max-width: 22ch;
  margin: 0 0 12px;
  line-height: 1.1;
}
.pain__lead {
  font-size: clamp(19px, 2vw, 22px);
  max-width: 60ch;
  margin: 0 0 72px;
  color: var(--ink-muted);
  line-height: 1.55;
}
.pain__columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  max-width: 980px;
}
@media (max-width: 768px) {
  .pain__columns { grid-template-columns: 1fr; gap: 40px; }
}
.pain__voice { border-top: 1px solid var(--rule); padding-top: 32px; }
.pain__voice-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 22px;
  margin: 0 0 4px;
}
.pain__voice-meta {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-muted);
  margin: 0 0 32px;
  letter-spacing: 0.02em;
}
.pain__voice-quotes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.pain__voice-quotes li {
  padding-left: 20px;
  border-left: 2px solid var(--accent);
  font-size: 17px;
  line-height: 1.6;
}
```

- [ ] **Step 4: Verify**

- На desktop — две колонки голосов, Елена слева, Анна справа.
- На mobile — складывается в одну колонку (Елена сверху, Анна снизу).
- Цитаты с тонкой синей вертикальной линией слева.
- В цитатах нет слов «Instagram», «Meta», «блокировка», «вайбкодинг», «дёшево».
- Нет CTA-кнопок внутри секции.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat(landing): Pain — two parallel voices (Elena + Anna)"
```

### Subagent prompt for Task 2

```
Read SPEC.md §3 «Портрет Dream Customer» (full subsections), §5 «Уточнения по секциям → Секция 2 (Pain)», CLAUDE.md, and Task 2 in docs/superpowers/plans/2026-04-28-landing-implementation.md.

Replace the placeholder content of <section id="pain"> in index.html with the exact HTML from Step 2. Append /* === Pain === */ CSS block from Step 3 to assets/css/main.css.

Constraints:
- Heading "Незаменимость в полевых условиях выглядит так" — must be exact (it links to Hero headline).
- Lead "Психолог-практик в Москве и владелица студии в Марьиной Роще — два разных бизнеса, одна и та же ночь." — must be exact.
- Quotes for both voices — exactly as in Step 2 HTML. Do not paraphrase. Do not add emojis.
- Forbidden words (CLAUDE.md): Instagram, Meta, "блокировка", "вайбкодинг", "дёшево", "100 клиентов за 30 дней". Verify none appear.
- No CTA buttons inside the section. The goal is recognition, not action.

Verify visually that on desktop the two voices appear side-by-side with editorial column dividers and on mobile they stack. Commit: "feat(landing): Pain — two parallel voices (Elena + Anna)".
```

---

## Task 3: Story / Эпифания + Решение (секция 3)

**Files:**
- Modify: `index.html` (replace `#story`)
- Modify: `assets/css/main.css` (append `/* === Story === */`)

**Context for subagent:**
- SPEC.md §4 «Story (Epiphany Bridge)» (две сцены дословно)
- SPEC.md §4 «Offer одним предложением»
- SPEC.md §4 «Value Stack» (только слои 1–4, остальное в Task 5)
- SPEC.md §0 «Размещение фото» (Story — основное место для photo.png, max-width 400px, без скруглений, grayscale 0.15)
- CLAUDE.md

**Steps:**

- [ ] **Step 1: Read SPEC.md §4 (Story, Offer, Value Stack) and §0 (фото)**

- [ ] **Step 2: Replace `<section id="story">` with:**

```html
<section id="story" data-section="03" data-title="Где теряются деньги" class="story">
  <div class="container">
    <div class="story__layout">
      <div class="story__text">
        <h2 class="story__title">Где на самом деле теряются деньги</h2>
        <blockquote class="story__scene">
          <p><strong>23:47.</strong> В чат прилетает: «есть свободные слоты на завтра?»</p>
          <p>Вы открываете телефон в 8:30. К этому моменту человек уже записался в соседнее место.</p>
        </blockquote>
        <blockquote class="story__scene">
          <p><strong>Или так. Понедельник, 19:30.</strong> Вы только что закончили сессию, телефон молчал три часа.</p>
          <p>На агрегаторе за это время человек выбрал между вами и тремя коллегами — записался к той, кто ответила первой. Не к лучшей, к доступной.</p>
        </blockquote>
        <p class="story__para">Вот в этой щели — между сообщением и ответом — теряются деньги. И таких щелей за день десятки: между визитом и попыткой вернуть, между «оставил заявку» и «оплатил», между «забыл» и «напомнили».</p>
        <p class="story__para">Эту щель нельзя закрыть, наняв ещё одного человека — у него тоже будет ночь и выходные.</p>
        <p class="story__para">Её закрывает только машина, которая работает за вас. Сайт приводит. Бот принимает 24/7. Автоматизация помнит и возвращает. <mark class="story__mark">Это не три отдельных покупки — это одна штука.</mark></p>
        <blockquote class="story__epiphany">
          Моя проблема не в том, что у меня плохой сайт. Моя проблема в том, что у моего бизнеса нет памяти и рук, кроме моих.
        </blockquote>
      </div>
      <figure class="story__photo">
        <img src="/photo.png" alt="Марина Кирина — фрилансер, автоматизация на n8n" width="400" loading="lazy">
        <figcaption class="story__photo-caption">Марина Кирина · 10 лет в работе с практиками</figcaption>
      </figure>
    </div>

    <hr class="story__divider">
    <p class="story__offer">Соберу вам связку «сайт + Telegram-бот + автоматизация» под вашу нишу — за 2–3 недели, по фиксированной цене, с понятной отчётностью каждую неделю и обязательством по 152-ФЗ.</p>
    <hr class="story__divider">

    <ol class="value-stack">
      <li class="value-stack__item">
        <span class="value-stack__num">01</span>
        <div>
          <h3 class="value-stack__what">Лендинг под нишу — не шаблон</h3>
          <p class="value-stack__why">Стыдно дать рекламу на нынешний сайт — больше не стыдно.</p>
        </div>
      </li>
      <li class="value-stack__item">
        <span class="value-stack__num">02</span>
        <div>
          <h3 class="value-stack__what">Telegram-бот 24/7</h3>
          <p class="value-stack__why">Перестаёте быть ночным секретарём.</p>
        </div>
      </li>
      <li class="value-stack__item">
        <span class="value-stack__num">03</span>
        <div>
          <h3 class="value-stack__what">Автоматизация на n8n</h3>
          <p class="value-stack__why">Бизнес помнит за вас.</p>
        </div>
      </li>
      <li class="value-stack__item">
        <span class="value-stack__num">04</span>
        <div>
          <h3 class="value-stack__what">Интеграция с тем, что есть</h3>
          <p class="value-stack__why">YCLIENTS, DIKIDI, IDENT, Renovatio, Google Calendar — ничего не ломаем.</p>
        </div>
      </li>
    </ol>
    <p class="value-stack__note">Слои страховки сделки (152-ФЗ из коробки, фикс-цена + договор + 30/40/30, 30 дней техподдержки, передача кода в GitHub) — в секции «Пакеты» ниже.</p>
  </div>
</section>
```

- [ ] **Step 3: Append to main.css:**

```css
/* === Story === */
.story__layout {
  display: grid;
  grid-template-columns: minmax(0, 65ch) 400px;
  gap: 64px;
  align-items: start;
  max-width: 1100px;
}
@media (max-width: 900px) {
  .story__layout { grid-template-columns: 1fr; }
}
.story__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(32px, 4vw, 52px);
  margin: 0 0 40px;
  line-height: 1.1;
}
.story__text p, .story__text blockquote p {
  font-size: 19px;
  line-height: 1.7;
  margin: 0 0 28px;
}
.story__scene {
  margin: 0 0 28px;
  padding: 24px 28px;
  border-left: 3px solid var(--accent);
  background: rgba(255, 255, 255, 0.4);
}
.story__scene p:last-child { margin-bottom: 0; }
.story__scene strong { font-family: var(--font-mono); letter-spacing: 0.02em; }
.story__mark {
  background: var(--mark);
  padding: 0 4px;
  font-family: var(--font-display);
  font-weight: 600;
}
.story__epiphany {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.4;
  margin: 40px 0 0;
  padding: 0 0 0 32px;
  border: none;
  max-width: 30ch;
  color: var(--ink);
  position: relative;
}
.story__epiphany::before {
  content: '«';
  position: absolute;
  left: -8px;
  top: -16px;
  font-size: 64px;
  color: var(--accent);
  line-height: 1;
}
.story__photo img {
  width: 100%;
  max-width: 400px;
  border-radius: 0;
  filter: grayscale(0.15);
}
.story__photo-caption {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-muted);
  margin: 12px 0 0;
}
.story__divider {
  border: none;
  height: 1px;
  background: var(--rule);
  margin: 80px auto;
  max-width: 120px;
}
.story__offer {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(24px, 2.8vw, 32px);
  text-align: center;
  max-width: 32ch;
  margin: 0 auto;
  line-height: 1.3;
}
.value-stack {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 780px;
}
.value-stack__item {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 24px;
  padding: 28px 0;
  border-bottom: 1px solid var(--rule);
}
.value-stack__item:last-child { border-bottom: none; }
.value-stack__num {
  font-family: var(--font-mono);
  font-size: 28px;
  color: var(--accent);
  line-height: 1;
}
.value-stack__what {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 22px;
  margin: 0 0 6px;
}
.value-stack__why {
  font-size: 17px;
  color: var(--ink-muted);
  margin: 0;
  line-height: 1.5;
}
.value-stack__note {
  font-size: 14px;
  color: var(--ink-muted);
  margin: 32px auto 0;
  max-width: 60ch;
  text-align: center;
  font-style: italic;
}
```

- [ ] **Step 4: Verify**

- На desktop — текст-колонка слева, фото 400px справа.
- На mobile — фото переезжает вниз, текст-колонка сверху.
- Две сцены с тонкой синей левой рамкой (23:47 — салон, 19:30 — эксперт).
- Эпифания — italic Geologica с большой кавычкой `«`.
- 4 пункта Value Stack с mono-нумерацией.
- Под последним пунктом — italic-сноска про слои 5–8 в Пакетах.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat(landing): Story — dual scenes + offer + value stack 1-4"
```

### Subagent prompt for Task 3

```
Read SPEC.md §4 «Story (Epiphany Bridge)», §4 «Offer», §4 «Value Stack» (only layers 1-4 are used here), §0 «Размещение фото», CLAUDE.md, and Task 3 in docs/superpowers/plans/2026-04-28-landing-implementation.md.

Replace #story content in index.html with the HTML from Step 2 verbatim. Append /* === Story === */ CSS to assets/css/main.css.

Constraints:
- Both scene blockquotes (23:47 salon + 19:30 expert) must be present and exact.
- Photo /photo.png with max-width 400px, border-radius 0, grayscale(0.15) filter.
- Value Stack here = only layers 1-4 (product). Layers 5-8 (sale insurance) belong to Task 5.
- Forbidden words: "вайбкодинг", "Instagram", "Meta", "блокировка", "заменим администратора", "дёшево".

Verify the layout: text column left, photo right on desktop; stacked on mobile (<900px). Mark "Это не три отдельных покупки — это одна штука." should appear with yellow highlight (var(--mark)). Commit: "feat(landing): Story — dual scenes + offer + value stack 1-4".
```

---

## Task 4: Кейс (4) + Квиз (5)

**Files:**
- Modify: `index.html` (replace `#case`, replace `#quiz`, add quiz CSS/JS includes before `</body>`)
- Modify: `assets/css/main.css` (append `/* === Case === */` and `/* === Quiz section === */`)
- DO NOT modify: `quiz.html`, `assets/css/quiz.css`, `assets/js/quiz*.js`

**Context for subagent:**
- SPEC.md §5 «Уточнения по секциям → Секция 4» (текст полу-кейса дословно)
- SPEC.md §10 «Встройка quiz.html» (6 пунктов + блок «Чего не делать»)
- SPEC.md §0 (плейсхолдеры WEBHOOK_URL, METRIKA_ID, TG_BOT_USERNAME)
- docs/quiz-spec.md §6 (структура финального экрана — для самопроверки)

**Steps:**

- [ ] **Step 1: Read SPEC.md §5 «Уточнения → Секция 4», §10, and docs/quiz-spec.md §6**

- [ ] **Step 2: Replace `<section id="case">` with:**

```html
<section id="case" data-section="04" data-title="Кейс" class="case">
  <div class="container">
    <p class="case__eyebrow">Кейс</p>
    <h2 class="case__title">Психолог-практик на Profi.ru</h2>
    <p class="case__client-line">Полное имя и точные цифры — после согласия клиента на публикацию (152-ФЗ ст. 9).</p>
    <div class="case__grid">
      <article class="case__step">
        <p class="case__step-num">01</p>
        <h3 class="case__step-title">Проблема</h3>
        <p>При потоке откликов конверсия отклика в платную сессию была около 8%. Большая часть лидов уходила к коллегам, кто отвечал быстрее.</p>
      </article>
      <article class="case__step">
        <p class="case__step-num">02</p>
        <h3 class="case__step-title">Действие</h3>
        <p>Внедрили Skill в Claude для персонализированных откликов: ответ адаптируется под конкретный запрос клиента, отправляется за 2–3 минуты вне зависимости от того, у телефона ли практик.</p>
      </article>
      <article class="case__step">
        <p class="case__step-num">03</p>
        <h3 class="case__step-title">Результат</h3>
        <p>Конверсия выросла в 2 раза за 6 недель. Стабильно держится, не зависит от вечерних/утренних окон.</p>
      </article>
    </div>
    <p class="case__bridge">Точная цифра для вашего бизнеса — за 2 минуты в квизе ниже.</p>
  </div>
</section>
```

- [ ] **Step 3: Replace `<section id="quiz">` with:**

```html
<section id="quiz" data-section="05" data-title="Квиз" class="quiz-section">
  <div class="container">
    <h2 class="quiz-section__title">Посчитайте свои потери</h2>
    <p class="quiz-section__lead">5 вопросов, 2 минуты. На выходе — диапазон потерь в рублях и план возврата в Telegram. Без регистрации. Контакт оставляете только если сами захотите в финале.</p>
    <div id="quiz-root"></div>
    <noscript>
      <p class="quiz-section__noscript">Для квиза нужен JavaScript. Или напишите напрямую: <a href="https://t.me/KirinaAI_bot">@KirinaAI_bot</a></p>
    </noscript>
  </div>
</section>
```

- [ ] **Step 4: Add quiz includes before `</body>` (after the `<!-- cookie-banner... -->` comment):**

```html
<link rel="stylesheet" href="/assets/css/quiz.css">
<script type="module" src="/assets/js/quiz-embed.js"></script>
```

- [ ] **Step 5: Append to main.css:**

```css
/* === Case === */
.case__eyebrow {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 12px;
}
.case__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(30px, 3.6vw, 44px);
  max-width: 24ch;
  margin: 0 0 8px;
}
.case__client-line {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-muted);
  margin: 0 0 56px;
}
.case__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
@media (max-width: 768px) {
  .case__grid { grid-template-columns: 1fr; gap: 24px; }
}
.case__step {
  border-top: 1px solid var(--rule);
  padding-top: 24px;
}
.case__step-num {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--accent);
  margin: 0 0 8px;
}
.case__step-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 20px;
  margin: 0 0 12px;
}
.case__step p {
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  color: var(--ink);
}
.case__bridge {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 19px;
  margin: 56px auto 0;
  max-width: 50ch;
  text-align: center;
  color: var(--ink);
}

/* === Quiz section === */
.quiz-section {
  background: var(--paper);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.quiz-section__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(30px, 3.6vw, 44px);
  text-align: center;
  margin: 0 0 12px;
}
.quiz-section__lead {
  text-align: center;
  max-width: 56ch;
  margin: 0 auto 48px;
  font-size: 18px;
  color: var(--ink-muted);
  line-height: 1.55;
}
.quiz-section__noscript {
  text-align: center;
  padding: 24px;
  border: 1px dashed var(--rule);
}
#quiz-root { min-height: 400px; }
```

- [ ] **Step 6: Verify**

- Кейс — три карточки на desktop, одна на mobile, с mono-нумерацией.
- Под кейсом — italic-фраза-перекидка к квизу.
- Секция #quiz содержит точку монтирования `#quiz-root` и `<noscript>` с прямой ссылкой на бота.
- Click по CTA в Hero и кейсе → плавный скролл к #quiz.
- Если открыть `quiz.html` отдельно (sandalone) — он работает; в #quiz-root на index.html — пока пусто, потому что quiz-embed.js монтируется в Lovable/Claude Code преглядывалке без бэкенда, но включения CSS/JS в `<body>` корректны.

- [ ] **Step 7: 152-FZ self-check (НЕ ПРАВЬ файлы квиза)**

Open `quiz.html` in browser and verify the final-screen fallback form has:
- Чекбокс согласия не предустановлен (нет атрибута `checked`).
- Кнопка submit `disabled` пока чекбокс не отмечен.
- Рядом с чекбоксом — ссылки на `/consent.html` и `/privacy-policy.html`.

Если что-то не так — НЕ ПРАВЬ. Это backlog в `sverhnovaya/`. Зафиксируй issue.

- [ ] **Step 8: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat(landing): Case (anonymized x2 figure) + Quiz mount point"
```

### Subagent prompt for Task 4

```
Read SPEC.md §5 «Уточнения → Секция 4», SPEC.md §10 «Встройка quiz.html» (all 6 points and "Чего не делать"), and Task 4 in docs/superpowers/plans/2026-04-28-landing-implementation.md.

Implement Task 4:
1. Replace #case content with HTML from Step 2 (anonymized semi-case "Психолог-практик на Profi.ru: x2 за 6 недель", no PORTFOLIO_PLACEHOLDER on main slot).
2. Replace #quiz content with HTML from Step 3 (mount point #quiz-root + noscript fallback).
3. Add the two quiz includes before </body>: <link rel="stylesheet" href="/assets/css/quiz.css"> and <script type="module" src="/assets/js/quiz-embed.js">. Place them after the <!-- cookie-banner... --> comment.
4. Append /* === Case === */ and /* === Quiz section === */ CSS blocks from Step 5 to main.css.

Strict no-touch list: quiz.html, assets/css/quiz.css, assets/js/quiz.js, assets/js/quiz-embed.js, assets/js/calculator.js, assets/js/scoring.js, assets/js/webhook.js, assets/js/analytics.js, assets/js/constants.js. The plan's Step 7 asks you to verify the quiz fallback form complies with 152-FZ visually only — do NOT modify quiz files even if you find issues.

Commit: "feat(landing): Case (anonymized x2 figure) + Quiz mount point".

Report back: confirm 152-FZ self-check status (pass / found issues that should be filed in sverhnovaya/).
```

---

## Task 5: Пакеты (6) + 152-ФЗ блок (7)

**Files:**
- Modify: `index.html` (replace `#packages`, replace `#trust-152fz`)
- Modify: `assets/css/main.css` (append `/* === Packages === */` and `/* === Trust 152-FZ === */`)

**Context for subagent:**
- SPEC.md §5 «Уточнения → Секция 6» (Эксперт / Студия / Поток — фиксированные названия)
- SPEC.md §5 «Уточнения → Секция 7» (тайна клиента — первым пунктом)
- SPEC.md §4 Value Stack слои 5–8 (для пакетов)
- SPEC.md §4 Value Stack слой 5 — обновлённая формулировка про штраф «до 6 млн ₽»
- SPEC.md §8 (152-ФЗ чеклист), §9 (пути к юр-документам)

**Steps:**

- [ ] **Step 1: Read SPEC.md §5 «Уточнения → Секции 6 и 7», §4 Value Stack, §8, §9**

- [ ] **Step 2: Replace `<section id="packages">` with:**

```html
<section id="packages" data-section="06" data-title="Пакеты" class="packages">
  <div class="container">
    <h2 class="packages__title">Понятная цена и понятный объём</h2>
    <p class="packages__lead">Три пакета с фиксированной стоимостью. Объём оговорён в договоре, оплата в три этапа — без скрытых часов.</p>
    <div class="packages__grid">

      <article class="package">
        <h3 class="package__name">Эксперт</h3>
        <p class="package__for">Для практика-одиночки: психолог, коуч, нутрициолог, репетитор</p>
        <p class="package__price">от 120 000 ₽</p>
        <p class="package__duration">2 недели</p>
        <ul class="package__features">
          <li>Лендинг под нишу</li>
          <li>Telegram-бот 24/7</li>
          <li>Базовая автоматизация на n8n</li>
          <li>Интеграция с Google Calendar</li>
          <li>152-ФЗ из коробки</li>
          <li>30 дней техподдержки</li>
        </ul>
        <a class="package__cta" href="#quiz">Посчитать за 2 минуты</a>
      </article>

      <article class="package package--standard">
        <h3 class="package__name">Студия</h3>
        <p class="package__for">Для салона/студии 2–5 мастеров</p>
        <p class="package__price">от 220 000 ₽</p>
        <p class="package__duration">2–3 недели</p>
        <ul class="package__features">
          <li>Всё из «Эксперт»</li>
          <li>Интеграция с YCLIENTS / DIKIDI</li>
          <li>Расширенная автоматизация записей и подтверждений</li>
          <li>Сценарии возврата спящих клиентов</li>
        </ul>
        <a class="package__cta" href="#quiz">Посчитать за 2 минуты</a>
      </article>

      <article class="package">
        <h3 class="package__name">Поток</h3>
        <p class="package__for">Для школы/практики &gt;5 человек или нескольких каналов лидов</p>
        <p class="package__price">от 350 000 ₽</p>
        <p class="package__duration">3 недели</p>
        <ul class="package__features">
          <li>Всё из «Студии»</li>
          <li>Расширенная аналитика по источникам лидов</li>
          <li>Многоканальная воронка возврата</li>
          <li>Передача кода в ваш GitHub + видеоинструкция</li>
        </ul>
        <a class="package__cta" href="#quiz">Посчитать за 2 минуты</a>
      </article>

    </div>

    <div class="packages__terms">
      <h3 class="packages__terms-title">Как платим</h3>
      <ol class="packages__terms-list">
        <li><strong>30%</strong> — старт работ, фиксируем ТЗ договором самозанятости.</li>
        <li><strong>40%</strong> — после демо рабочего прототипа.</li>
        <li><strong>30%</strong> — после приёмки и передачи кода в GitHub + 5-минутной видеоинструкции.</li>
      </ol>
      <p class="packages__terms-note">Договор — самозанятая, чек в «Мой налог». 30 дней техподдержки включено в каждый пакет.</p>
    </div>

    <p class="packages__consent">Клик по кнопке ведёт к квизу. Связь после прохождения — только если оставите контакт. Подробнее в <a href="/privacy-policy.html" target="_blank" rel="noopener">Политике конфиденциальности</a>.</p>
  </div>
</section>
```

- [ ] **Step 3: Replace `<section id="trust-152fz">` with:**

```html
<section id="trust-152fz" data-section="07" data-title="152-ФЗ" class="trust">
  <div class="container">
    <p class="trust__eyebrow">152-ФЗ — встроенное условие, не отдельная услуга</p>
    <h2 class="trust__title">Сайт, за который не приходит штраф до 6 млн ₽</h2>
    <p class="trust__lead">С 1 сентября 2025 нарушения 152-ФЗ караются по новой шкале. Делаю так, чтобы это вас не касалось.</p>
    <ul class="trust__list">
      <li>
        <h3>Данные клиентов не утекают</h3>
        <p>Бот никогда не отправляет содержание заявки, только неперсональное подтверждение времени. Серверы — Timeweb (РФ), доступ только у вас. Это для практиков, у кого этический кодекс жёстче закона — психологов, коучей, медицинских специалистов.</p>
      </li>
      <li>
        <h3>Серверы и шрифты — в России</h3>
        <p>Хостинг на Timeweb, шрифты Geologica и Onest — локально. Один зарубежный шрифт на сайте — штраф до 6 млн ₽. Здесь не будет ни одного запроса к Google, Meta, Cloudflare с ваших страниц.</p>
      </li>
      <li>
        <h3>Согласия по закону, а не для галочки</h3>
        <p>Чекбоксы пустые по умолчанию. Раздельные согласия на обработку и на маркетинг (требование с 01.09.2025). Кнопка отправки заблокирована, пока согласие не дано. Подробности — в <a href="/consent.html" target="_blank" rel="noopener">тексте согласия</a>.</p>
      </li>
      <li>
        <h3>Cookie-баннер с равными кнопками</h3>
        <p>«Принять все» и «Только необходимые» — одинаковые по визуальному весу. Аналитика и маркетинг — выключены до явного «да». Управление согласием доступно из футера в любой момент. Условия — в <a href="/cookie-policy.html" target="_blank" rel="noopener">Политике cookie</a>.</p>
      </li>
      <li>
        <h3>Документы — отдельные, актуальные, доступные</h3>
        <p>Политика конфиденциальности, Согласие на обработку и Политика cookie — три отдельных документа без регистрации, на любой странице сайта. Открыть: <a href="/privacy-policy.html" target="_blank" rel="noopener">Политика</a> · <a href="/consent.html" target="_blank" rel="noopener">Согласие</a> · <a href="/cookie-policy.html" target="_blank" rel="noopener">Cookie</a>.</p>
      </li>
      <li>
        <h3>Никаких запрещённых сервисов</h3>
        <p>Google Analytics, Google Fonts, reCAPTCHA, Meta Pixel, Hotjar, Intercom — не подключаю. Только Яндекс.Метрика и SmartCaptcha, и только после явного согласия посетителя.</p>
      </li>
    </ul>
  </div>
</section>
```

- [ ] **Step 4: Append to main.css:**

```css
/* === Packages === */
.packages__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(30px, 3.6vw, 44px);
  text-align: center;
  margin: 0 0 12px;
}
.packages__lead {
  text-align: center;
  max-width: 60ch;
  margin: 0 auto 64px;
  font-size: 18px;
  color: var(--ink-muted);
  line-height: 1.55;
}
.packages__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1080px;
  margin: 0 auto;
}
@media (max-width: 900px) {
  .packages__grid { grid-template-columns: 1fr; gap: 20px; }
}
.package {
  border: 1px solid var(--rule);
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  background: var(--paper);
}
.package--standard {
  border-color: var(--accent);
  position: relative;
}
.package--standard::before {
  content: 'Чаще выбирают';
  font-family: var(--font-mono);
  position: absolute;
  top: -10px;
  left: 24px;
  background: var(--paper);
  color: var(--accent);
  font-size: 12px;
  padding: 0 8px;
  letter-spacing: 0.04em;
}
.package__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 28px;
  margin: 0 0 8px;
}
.package__for {
  font-size: 14px;
  color: var(--ink-muted);
  margin: 0 0 24px;
  line-height: 1.5;
}
.package__price {
  font-family: var(--font-mono);
  font-size: 24px;
  color: var(--accent);
  margin: 0 0 4px;
  letter-spacing: -0.01em;
}
.package__duration {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-muted);
  margin: 0 0 28px;
}
.package__features {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  flex: 1;
}
.package__features li {
  padding: 12px 0 12px 24px;
  border-bottom: 1px solid var(--rule);
  font-size: 15px;
  line-height: 1.5;
  position: relative;
}
.package__features li::before {
  content: '—';
  position: absolute;
  left: 0;
  top: 12px;
  color: var(--accent);
  font-weight: 600;
}
.package__features li:last-child { border-bottom: none; }
.package__cta {
  display: block;
  padding: 16px 24px;
  min-height: 52px;
  background: var(--accent);
  color: var(--paper);
  border-radius: 0;
  text-align: center;
  text-decoration: none;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  transition: background 240ms ease-out;
}
.package__cta:hover, .package__cta:focus-visible { background: var(--ink); color: var(--paper); }
.packages__terms {
  max-width: 720px;
  margin: 80px auto 0;
  text-align: center;
}
.packages__terms-list {
  list-style: none;
  padding: 0;
  margin: 24px auto;
  max-width: 540px;
  text-align: left;
}
.packages__terms-list li {
  padding: 14px 20px;
  border: 1px solid var(--rule);
  margin-bottom: 10px;
  font-size: 16px;
}
.packages__terms-note {
  font-size: 14px;
  color: var(--ink-muted);
  margin-top: 16px;
}
.packages__consent {
  font-size: 13px;
  color: var(--ink-muted);
  margin: 48px auto 0;
  max-width: 60ch;
  text-align: center;
  line-height: 1.6;
}
.packages__consent a { color: var(--accent); text-decoration: underline; }

/* === Trust 152-FZ === */
.trust__eyebrow {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 12px;
}
.trust__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(30px, 3.6vw, 46px);
  text-align: center;
  max-width: 24ch;
  margin: 0 auto 16px;
  line-height: 1.1;
}
.trust__lead {
  text-align: center;
  max-width: 56ch;
  margin: 0 auto 56px;
  font-size: 18px;
  color: var(--ink-muted);
  line-height: 1.55;
}
.trust__list {
  list-style: none;
  padding: 0;
  max-width: 920px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--rule);
}
@media (max-width: 768px) {
  .trust__list { grid-template-columns: 1fr; }
}
.trust__list li { background: var(--paper); padding: 28px; }
.trust__list h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  margin: 0 0 12px;
  color: var(--ink);
}
.trust__list p {
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  color: var(--ink-muted);
}
.trust__list a { color: var(--accent); text-decoration: underline; }
```

- [ ] **Step 5: Verify**

- Три пакета на desktop в ряд, на mobile — стопкой.
- Средний пакет «Студия» с синей рамкой и микро-меткой «Чаще выбирают» в верхнем углу.
- Цены в PT Mono.
- 152-ФЗ блок: 6 пунктов, **первый** — «Данные клиентов не утекают». Заголовок секции содержит «штраф до 6 млн ₽» (НЕ 300–700 тыс.).

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat(landing): Packages (Эксперт/Студия/Поток) + 152-FZ trust block"
```

### Subagent prompt for Task 5

```
Read SPEC.md §5 «Уточнения → Секции 6 и 7», §4 Value Stack (especially layer 5 with the new "до 6 млн ₽" wording), §8 (152-FZ checklist), §9 (legal docs paths), and Task 5 in docs/superpowers/plans/2026-04-28-landing-implementation.md.

Implement Task 5: replace #packages and #trust-152fz with HTML from Steps 2-3, append CSS from Step 4.

Strict requirements:
- Package names: exactly "Эксперт", "Студия", "Поток" (NOT "Базовый/Стандартный/Расширенный").
- The middle package (Студия) gets class .package--standard with the "Чаще выбирают" badge.
- Trust block: first item must be "Данные клиентов не утекают" (this is the client confidentiality trigger for the psychologist persona).
- Trust title must reference "до 6 млн ₽" (upper bracket of fine for foreign services), not the lower 300-700 тыс.
- All three legal doc links use exact paths: /privacy-policy.html, /consent.html, /cookie-policy.html with target="_blank" rel="noopener".

Commit: "feat(landing): Packages (Эксперт/Студия/Поток) + 152-FZ trust block".
```

---

## Task 6: Future Pacing (8) + FAQ (9) + Кто я (10)

**Files:**
- Modify: `index.html` (replace `#future-pacing`, `#faq`, `#about`)
- Modify: `assets/css/main.css` (append `/* === Future Pacing === */`, `/* === FAQ === */`, `/* === About === */`)

**Context for subagent:**
- SPEC.md §4 «Future Pacing» (две колонки — Елена + Анна, дословно)
- SPEC.md §3 «Главные возражения и страхи» (6 пунктов — основа FAQ)
- SPEC.md §5 «Уточнения → Секция 9» (FAQ ответ на «работали ли с моей нишей» — без PORTFOLIO_PLACEHOLDER)
- SPEC.md §0 «Позиционирование» + «Подтверждённые результаты»

**Steps:**

- [ ] **Step 1: Read SPEC.md §3, §4 «Future Pacing», §5 «Уточнения → Секция 9», §0**

- [ ] **Step 2: Replace `<section id="future-pacing">` with:**

```html
<section id="future-pacing" data-section="08" data-title="Через 3 недели" class="future">
  <div class="container">
    <p class="future__eyebrow">Через 3 недели</p>
    <h2 class="future__title">Так выглядит обычное утро после запуска</h2>
    <div class="future__grid">
      <article class="future__column">
        <h3 class="future__column-title">Утро Елены — психолог</h3>
        <ul class="future__scenes">
          <li>В боте 3 запроса на сессию. Он сам предложил три ближайших окна и собрал предоплату через ссылку.</li>
          <li>В календаре — две подтверждённые сессии и автонапоминание клиенту, которое ушло в 8:00.</li>
        </ul>
      </article>
      <article class="future__column">
        <h3 class="future__column-title">Утро Анны — студия</h3>
        <ul class="future__scenes">
          <li>Спящий клиент за 60 дней получил предложение вернуться — записался на маникюр без вашего участия.</li>
          <li>Вы открыли мессенджер один раз — для пары личных вопросов от тех, кому хочется ответить лично.</li>
        </ul>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Replace `<section id="faq">` with (8 details items):**

```html
<section id="faq" data-section="09" data-title="FAQ" class="faq">
  <div class="container">
    <h2 class="faq__title">Что обычно спрашивают</h2>
    <div class="faq__list">
      <details class="faq__item">
        <summary>А вы не пропадёте с предоплатой?</summary>
        <div class="faq__answer">
          <p>Договор по самозанятости, чек в «Мой налог». Оплата 30/40/30: на старте, после демо, после приёмки. Код передаю в ваш GitHub-репозиторий — даже если со мной что-то случится, проект остаётся у вас вместе с 5-минутной видеоинструкцией.</p>
        </div>
      </details>
      <details class="faq__item">
        <summary>Я уже пробовал(а) бота — конструктор, ничего не работало. Почему теперь будет?</summary>
        <div class="faq__answer">
          <p>Конструкторы дают «бот, который отвечает». Я делаю связку «бот + автоматизация на n8n + интеграция с тем, чем вы уже пользуетесь». Это другой класс решения: бот не просто отвечает, он связывает заявку, календарь, оплату и напоминание в один поток.</p>
        </div>
      </details>
      <details class="faq__item">
        <summary>Я не айтишник — справлюсь?</summary>
        <div class="faq__answer">
          <p>Ваша работа — рассказать, как устроены ваши заявки и записи. Моя — собрать механику и отдать вам с понятной видеоинструкцией. После запуска вам нужно знать только две кнопки: «посмотреть статистику» и «выгрузить контакты».</p>
        </div>
      </details>
      <details class="faq__item">
        <summary>AI напишет код криво и потом всё поломается. Это не так?</summary>
        <div class="faq__answer">
          <p>Использую современные AI-инструменты разработки, но финальный код прохожу руками: проверяю на тестовых данных, тестирую сценарии в боте, документирую структуру в README репозитория. То, что вы получаете, — рабочий код, не «черновик от нейросети».</p>
        </div>
      </details>
      <details class="faq__item">
        <summary>Вы работали именно с моей нишей?</summary>
        <div class="faq__answer">
          <p>С психологами — на платформе Profi.ru, кейс — в секции «Кейс» выше. Со студиями маникюра — через интеграцию с YCLIENTS, кейсы в работе. Если ниша другая — напишите в Telegram, обсудим за 15 минут, подходим ли мы друг другу.</p>
        </div>
      </details>
      <details class="faq__item">
        <summary>152-ФЗ — я слышал(а) про штрафы 300–700 тыс. Кто за это отвечает?</summary>
        <div class="faq__answer">
          <p>За компетентность кода отвечаю я: серверы РФ, шрифты локально, согласия по закону, никаких запрещённых сервисов. За оператора ПДн (ваше юрлицо или статус самозанятого) отвечаете вы — но я даю готовый чеклист, что подать в РКН и как.</p>
        </div>
      </details>
      <details class="faq__item">
        <summary>Сколько займёт по времени?</summary>
        <div class="faq__answer">
          <p>Эксперт — 2 недели. Студия — 2–3 недели. Поток — 3 недели. Это с учётом ваших правок на этапе демо. Срок зафиксирован в договоре. Если задержка по моей вине — компенсация в виде дополнительного месяца техподдержки.</p>
        </div>
      </details>
      <details class="faq__item">
        <summary>Что если YCLIENTS / DIKIDI / IDENT / Renovatio не дают API?</summary>
        <div class="faq__answer">
          <p>YCLIENTS и DIKIDI отдают данные, работаю напрямую. IDENT и Renovatio — через промежуточные интеграции, делаю обходные пути, чтобы данные синхронизировались автоматически. Если ваш сервис не из этого списка — на демо проверим, что есть, и придумаем, как связать.</p>
        </div>
      </details>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Replace `<section id="about">` with:**

```html
<section id="about" data-section="10" data-title="Кто я" class="about">
  <div class="container about__inner">
    <figure class="about__photo">
      <img src="/photo.png" alt="Марина Кирина" width="280" loading="lazy">
    </figure>
    <div class="about__text">
      <p class="about__eyebrow">Кто я</p>
      <h2 class="about__name">Марина Кирина</h2>
      <p class="about__line">Самозанятая · Пенза · работаю удалённо по всей России</p>
      <p class="about__bio">5 лет руководила отделом из 20 человек на платформе Profi.ru. Последние 5 лет — независимый практик: через мою практику прошло более 100 специалистов разных ниш — психологи, мастера красоты, репетиторы, мастера по ремонту. Я сама прошла путь от ручного ведения клиентов в чатах до автоматизации на n8n. 10 лет внутри и рядом с платформой — видела изнутри, где специалисты теряют деньги. Не из-за плохой работы, а из-за того, что бизнес держится только на их присутствии в телефоне.</p>
      <h3 class="about__results-title">Подтверждённые результаты</h3>
      <ul class="about__results">
        <li>Skill в Claude для персонализированных откликов — конверсия выросла в 2 раза у психологов на Profi.ru</li>
        <li>CRM на n8n + Google Sheets для мастеров по ремонту — перестали терять клиентов при большом потоке лидов</li>
        <li>Полный цикл коммуникации: AI-ответы, запись, подтверждения — специалист получает заполненное расписание</li>
      </ul>
      <p class="about__note">Подробные кейсы — после получения письменного согласия клиентов на публикацию.</p>
      <p class="about__contact">Связаться лично: <a href="https://t.me/marinakirina111" target="_blank" rel="noopener">@marinakirina111</a></p>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Append to main.css:**

```css
/* === Future Pacing === */
.future__eyebrow {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 12px;
}
.future__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(32px, 4vw, 48px);
  text-align: center;
  max-width: 22ch;
  margin: 0 auto 56px;
  line-height: 1.1;
}
.future__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  max-width: 980px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .future__grid { grid-template-columns: 1fr; gap: 40px; }
}
.future__column { border-top: 1px solid var(--rule); padding-top: 24px; }
.future__column-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 22px;
  margin: 0 0 24px;
}
.future__scenes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.future__scenes li {
  padding-left: 24px;
  position: relative;
  font-size: 17px;
  line-height: 1.6;
}
.future__scenes li::before {
  content: '—';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent);
  font-weight: 700;
}

/* === FAQ === */
.faq__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(30px, 3.6vw, 44px);
  text-align: center;
  margin: 0 0 56px;
}
.faq__list { max-width: 780px; margin: 0 auto; }
.faq__item { border-bottom: 1px solid var(--rule); }
.faq__item:first-child { border-top: 1px solid var(--rule); }
.faq__item summary {
  cursor: pointer;
  padding: 24px 40px 24px 0;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 18px;
  list-style: none;
  position: relative;
}
.faq__item summary::-webkit-details-marker { display: none; }
.faq__item summary::after {
  content: '+';
  font-family: var(--font-mono);
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: var(--accent);
}
.faq__item[open] summary::after { content: '−'; }
.faq__answer {
  padding: 0 40px 24px 0;
  font-size: 16px;
  line-height: 1.65;
  color: var(--ink-muted);
}

/* === About === */
.about__inner {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 56px;
  align-items: start;
  max-width: 980px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .about__inner { grid-template-columns: 1fr; gap: 32px; }
}
.about__photo img {
  width: 100%;
  max-width: 280px;
  border-radius: 0;
  filter: grayscale(0.15);
}
@media (max-width: 768px) {
  .about__photo { max-width: 200px; }
}
.about__eyebrow {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 8px;
}
.about__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(36px, 4.5vw, 56px);
  margin: 0 0 8px;
  line-height: 1.05;
}
.about__line {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink-muted);
  margin: 0 0 32px;
}
.about__bio { font-size: 17px; line-height: 1.7; margin: 0 0 40px; }
.about__results-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 16px;
}
.about__results {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}
.about__results li {
  padding: 12px 0 12px 24px;
  position: relative;
  font-size: 15px;
  line-height: 1.55;
  border-bottom: 1px solid var(--rule);
}
.about__results li::before {
  content: '—';
  position: absolute;
  left: 0;
  top: 12px;
  color: var(--accent);
  font-weight: 700;
}
.about__results li:last-child { border-bottom: none; }
.about__note {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-muted);
  margin: 16px 0;
  line-height: 1.5;
}
.about__contact { font-size: 16px; margin: 0; }
```

- [ ] **Step 6: Verify**

- Future Pacing — две колонки на desktop, одна на mobile.
- FAQ — 8 пунктов, кликабельные `<details>` с плюсиком/минусиком в углу.
- About — фото слева на desktop (280px), текст справа; на mobile фото уменьшается до 200px и переезжает наверх.
- В About нет «вайбкодинга», нет «AI Product Manager». Profi.ru — как платформа клиентов.

- [ ] **Step 7: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat(landing): Future Pacing + FAQ + About"
```

### Subagent prompt for Task 6

```
Read SPEC.md §3, §4 «Future Pacing», §5 «Уточнения → Секция 9», §0 «Позиционирование»+«Подтверждённые результаты», CLAUDE.md, and Task 6 in docs/superpowers/plans/2026-04-28-landing-implementation.md.

Implement Task 6: replace #future-pacing, #faq, #about with HTML from Steps 2-4. Append CSS from Step 5.

Strict:
- Future Pacing — TWO columns: "Утро Елены — психолог" and "Утро Анны — студия", 2 scenes each. Not 4 universal scenes.
- FAQ — exactly 8 items via <details>/<summary>, no JS. Question 5 ("Вы работали именно с моей нишей?") must NOT contain PORTFOLIO_PLACEHOLDER — use the full answer from Step 3.
- About — photo from /photo.png with grayscale(0.15), bio without "AI Product Manager"/"вайбкодинг"/"заменим администратора". Profi.ru only as a platform for clients, not employer.

Commit: "feat(landing): Future Pacing + FAQ + About".
```

---

## Task 7: Финальный CTA (11) + Footer (12) + Cookie-banner

**Files:**
- Modify: `index.html` (replace `#cta-final`, replace `<footer id="footer">`, add cookie-banner HTML and head includes)
- Modify: `assets/css/main.css` (append `/* === Final CTA === */`, `/* === Footer === */`, `/* === Cookie banner === */`)
- Create: `assets/js/cookie-consent.js`

**Context for subagent:**
- SPEC.md §5 «Уточнения → Секция 11» (текст финального CTA дословно)
- SPEC.md §0 «Данные оператора»
- SPEC.md §8 (152-ФЗ требования к cookie-banner)
- SPEC.md §9 (пути к юр-документам)

**Steps:**

- [ ] **Step 1: Read SPEC.md §0, §5 «Уточнения → Секция 11», §8, §9**

- [ ] **Step 2: Replace `<section id="cta-final">`:**

```html
<section id="cta-final" data-section="11" data-title="Финальный CTA" class="cta-final">
  <div class="container cta-final__inner">
    <h2 class="cta-final__title">Если дочитали — значит узнали себя.</h2>
    <p class="cta-final__lead">Пока вы решаете, в каком из соседних мест уже сидит ваш следующий клиент. Посчитайте, во сколько это обходится за месяц.</p>
    <a class="cta-final__btn" href="#quiz">Посчитать за 2 минуты</a>
  </div>
</section>
```

- [ ] **Step 3: Replace `<footer id="footer">`:**

```html
<footer id="footer" data-section="12" data-title="Footer" class="footer">
  <div class="container footer__grid">
    <div class="footer__col">
      <h3 class="footer__col-title">Правовые документы</h3>
      <ul>
        <li><a href="/privacy-policy.html">Политика конфиденциальности</a></li>
        <li><a href="/consent.html">Согласие на обработку персональных данных</a></li>
        <li><a href="/cookie-policy.html">Политика использования cookie</a></li>
        <li><button type="button" id="manage-consent" class="footer__manage">Управление согласиями</button></li>
      </ul>
    </div>
    <div class="footer__col">
      <h3 class="footer__col-title">Связь</h3>
      <ul>
        <li><a href="https://t.me/marinakirina111" target="_blank" rel="noopener">@marinakirina111 в Telegram</a></li>
        <li><a href="mailto:kirinama8910@gmail.com">kirinama8910@gmail.com</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h3 class="footer__col-title">Оператор персональных данных</h3>
      <p>Кирина Марина Александровна<br>Самозанятая · Пенза<br>ИНН: [ИНН_ЗАПОЛНИТЬ]</p>
      <p class="footer__operator-note">Данные хранятся на серверах в РФ (Timeweb).</p>
    </div>
  </div>
  <div class="container footer__bottom">
    <small>© 2026 Кирина Марина Александровна. Все права защищены.</small>
  </div>
</footer>
```

- [ ] **Step 4: Replace `<!-- cookie-banner будет добавлен... -->` comment with cookie-banner HTML:**

```html
<div id="cookie-banner" class="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cb-title" hidden>
  <div class="cookie-banner__inner">
    <p id="cb-title" class="cookie-banner__text">
      Используем cookie для аналитики. Аналитические cookie — только с вашего согласия.
      <a href="/cookie-policy.html" target="_blank" rel="noopener">Подробнее</a>
    </p>
    <div class="cookie-banner__actions">
      <button type="button" id="cb-accept-all" class="cb-btn">Принять все</button>
      <button type="button" id="cb-reject" class="cb-btn">Только необходимые</button>
      <button type="button" id="cb-settings-open" class="cb-btn cb-btn--link">Настроить</button>
    </div>
  </div>
</div>

<div id="cookie-settings" class="cookie-settings" role="dialog" aria-modal="true" aria-labelledby="cs-title" hidden>
  <div class="cookie-settings__inner">
    <h3 id="cs-title">Настройки cookie</h3>
    <label class="cookie-settings__row">
      <input type="checkbox" checked disabled>
      <span><strong>Необходимые</strong> — для работы сайта (всегда активны)</span>
    </label>
    <label class="cookie-settings__row">
      <input type="checkbox" id="cs-analytics">
      <span><strong>Аналитические</strong> — Яндекс.Метрика (анонимная статистика)</span>
    </label>
    <label class="cookie-settings__row">
      <input type="checkbox" id="cs-marketing">
      <span><strong>Маркетинговые</strong> — на этом сайте не используются, переключатель для прозрачности</span>
    </label>
    <div class="cookie-settings__actions">
      <button type="button" id="cs-save" class="cb-btn">Сохранить выбор</button>
      <button type="button" id="cs-cancel" class="cb-btn cb-btn--link">Отмена</button>
    </div>
  </div>
</div>
```

- [ ] **Step 5: Add to `<head>` of index.html, after the CSP meta:**

```html
<script>window.METRIKA_ID = null;</script>
<script src="/assets/js/cookie-consent.js" defer></script>
```

- [ ] **Step 6: Create `assets/js/cookie-consent.js`:**

```javascript
(function () {
  const KEY = 'pdp_cookie_consent';

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
  }
  function saveConsent(c) {
    localStorage.setItem(KEY, JSON.stringify({ ...c, ts: Date.now() }));
  }
  function loadYandexMetrika(id) {
    if (!id || window.__ymLoaded) return;
    window.__ymLoaded = true;
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t);a=e.getElementsByTagName(t)[0];
    k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,'script',
    'https://mc.yandex.ru/metrika/tag.js','ym');
    window.ym(id, 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true });
  }
  function applyConsent(c) {
    if (c && c.analytics) loadYandexMetrika(window.METRIKA_ID);
  }
  function showBanner() { document.getElementById('cookie-banner').removeAttribute('hidden'); }
  function hideBanner() { document.getElementById('cookie-banner').setAttribute('hidden', ''); }
  function openSettings() {
    const saved = getConsent();
    document.getElementById('cs-analytics').checked = !!(saved && saved.analytics);
    document.getElementById('cs-marketing').checked = !!(saved && saved.marketing);
    document.getElementById('cookie-settings').removeAttribute('hidden');
  }
  function closeSettings() { document.getElementById('cookie-settings').setAttribute('hidden', ''); }

  document.addEventListener('DOMContentLoaded', function () {
    const consent = getConsent();
    if (consent) applyConsent(consent); else showBanner();

    document.getElementById('cb-accept-all').addEventListener('click', function () {
      const c = { necessary: true, analytics: true, marketing: true };
      saveConsent(c); applyConsent(c); hideBanner();
    });
    document.getElementById('cb-reject').addEventListener('click', function () {
      saveConsent({ necessary: true, analytics: false, marketing: false });
      hideBanner();
    });
    document.getElementById('cb-settings-open').addEventListener('click', function () {
      hideBanner(); openSettings();
    });
    document.getElementById('cs-save').addEventListener('click', function () {
      const c = {
        necessary: true,
        analytics: document.getElementById('cs-analytics').checked,
        marketing: document.getElementById('cs-marketing').checked,
      };
      const prev = getConsent();
      saveConsent(c); applyConsent(c); closeSettings();
      if (prev && prev.analytics && !c.analytics) location.reload();
    });
    document.getElementById('cs-cancel').addEventListener('click', closeSettings);

    const manage = document.getElementById('manage-consent');
    if (manage) manage.addEventListener('click', openSettings);
  });
})();
```

- [ ] **Step 7: Append to main.css:**

```css
/* === Final CTA === */
.cta-final { background: var(--inverted); color: var(--paper); text-align: center; }
.cta-final__inner { padding-top: 96px; padding-bottom: 96px; max-width: 720px; }
.cta-final__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(32px, 4.2vw, 52px);
  color: var(--paper);
  margin: 0 0 24px;
  line-height: 1.1;
}
.cta-final__lead {
  font-size: 19px;
  color: var(--paper);
  opacity: 0.85;
  margin: 0 auto 40px;
  line-height: 1.55;
  max-width: 50ch;
}
.cta-final__btn {
  display: inline-block;
  padding: 20px 44px;
  min-height: 56px;
  background: var(--mark);
  color: var(--ink);
  border-radius: 0;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  transition: transform 240ms ease-out, background 240ms ease-out;
}
.cta-final__btn:hover, .cta-final__btn:focus-visible {
  transform: translateY(-2px);
  background: var(--paper);
  color: var(--ink);
}

/* === Footer === */
.footer { background: var(--inverted); color: var(--paper); padding: 80px 0 32px; }
.footer__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 56px;
}
@media (max-width: 768px) {
  .footer__grid { grid-template-columns: 1fr; gap: 40px; }
}
.footer__col-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 20px;
  color: var(--paper);
}
.footer__col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.footer__col a, .footer__manage {
  color: var(--paper);
  opacity: 0.8;
  text-decoration: underline;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-align: left;
}
.footer__col a:hover, .footer__manage:hover { opacity: 1; }
.footer__col p { margin: 0 0 8px; font-size: 15px; line-height: 1.6; opacity: 0.85; }
.footer__operator-note { font-family: var(--font-mono); font-size: 13px; opacity: 0.6; }
.footer__bottom {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid rgba(244, 239, 230, 0.1);
  font-family: var(--font-mono);
  font-size: 13px;
  opacity: 0.6;
}

/* === Cookie banner === */
.cookie-banner {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--inverted);
  color: var(--paper);
  z-index: 9999;
  padding: 24px 16px;
  border-top: 1px solid rgba(244, 239, 230, 0.1);
}
.cookie-banner__inner {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: center;
}
@media (max-width: 768px) {
  .cookie-banner__inner { grid-template-columns: 1fr; }
}
.cookie-banner__text { font-size: 14px; line-height: 1.55; margin: 0; }
.cookie-banner__text a { color: var(--paper); text-decoration: underline; }
.cookie-banner__actions { display: flex; gap: 12px; flex-wrap: wrap; }
.cb-btn {
  min-height: 44px;
  padding: 12px 20px;
  border-radius: 0;
  border: 1px solid rgba(244, 239, 230, 0.3);
  background: transparent;
  color: var(--paper);
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: background 200ms;
}
.cb-btn:hover, .cb-btn:focus-visible { background: rgba(244, 239, 230, 0.1); }
.cb-btn--link { text-decoration: underline; border-color: transparent; padding: 12px 8px; }

.cookie-settings {
  position: fixed;
  inset: 0;
  background: rgba(14, 14, 15, 0.6);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.cookie-settings__inner {
  background: var(--paper);
  color: var(--ink);
  padding: 36px;
  max-width: 520px;
  width: 100%;
}
.cookie-settings__row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 0;
  font-size: 15px;
  line-height: 1.55;
}
.cookie-settings__row input { margin-top: 4px; width: 18px; height: 18px; }
.cookie-settings__actions { display: flex; gap: 12px; margin-top: 28px; }
.cookie-settings__actions .cb-btn { color: var(--ink); border-color: var(--rule); }
```

- [ ] **Step 8: Verify**

- Финальный CTA: тёмный фон, заголовок «Если дочитали — значит узнали себя», жёлтая кнопка-mark.
- Footer: три колонки на desktop, одна на mobile, ИНН-плейсхолдер виден.
- Первый визит: cookie-banner всплывает снизу с тремя кнопками одинакового стиля.
- Click «Принять все» → банер скрывается, в localStorage появляется `pdp_cookie_consent`.
- Click «Управление согласиями» в footer → открывается модал, чекбоксы analytics/marketing — без `checked`.

- [ ] **Step 9: Commit**

```bash
git add index.html assets/css/main.css assets/js/cookie-consent.js
git commit -m "feat(landing): Final CTA + Footer + Cookie-banner (152-FZ)"
```

### Subagent prompt for Task 7

```
Read SPEC.md §5 «Уточнения → Секция 11», §0, §8, §9, and Task 7 in docs/superpowers/plans/2026-04-28-landing-implementation.md.

Implement Task 7:
1. Replace #cta-final HTML (Step 2) — closing argument with loss-aversion text, NOT a Hero repeat.
2. Replace #footer HTML (Step 3) — three columns: legal links + Manage Consent button, contacts, operator details with [ИНН_ЗАПОЛНИТЬ] placeholder.
3. Replace the <!-- cookie-banner... --> comment with banner+settings HTML (Step 4).
4. Add to <head>: window.METRIKA_ID = null; and <script src="/assets/js/cookie-consent.js" defer></script> (Step 5).
5. Create /assets/js/cookie-consent.js with the exact JavaScript from Step 6.
6. Append CSS from Step 7.

152-FZ critical:
- "Принять все" and "Только необходимые" must use the same .cb-btn class with identical styling. No primary/secondary distinction.
- Settings modal checkboxes for analytics/marketing must NOT have `checked` attribute.
- Yandex.Metrika is NOT loaded statically — only via loadYandexMetrika() after consent.
- localStorage key must be 'pdp_cookie_consent'.

Verify: visit page, banner appears; click "Принять все" → banner hides, localStorage has the entry; click "Управление согласиями" in footer → modal reopens with last choice.

Commit: "feat(landing): Final CTA + Footer + Cookie-banner (152-FZ)".
```

---

## Task 8: 152-ФЗ аудит

**Files:**
- No file changes; produces a report in chat.

**Context for subagent:**
- SPEC.md §8 (152-ФЗ чеклист — 12 строк), §9 (статус документов)
- .claude/skills/152-fz/audit.md (grep-команда)
- .claude/skills/152-fz/checklists-and-fines.md (полные чеклисты + таблица штрафов)

**Steps:**

- [ ] **Step 1: Read all three files above**

- [ ] **Step 2: Run grep audit (Bash):**

```bash
grep -rEn "google-analytics|googletagmanager|fonts\.googleapis|recaptcha\.google|connect\.facebook\.net|static\.hotjar|cdn\.mxpnl|cdn\.segment|cloudflareinsights|js\.hs-scripts|widget\.intercom\.io|script\.hotjar" \
  c:/Users/user/Documents/GitHub/Personal-brand-152-fz \
  --include="*.html" --include="*.js" --include="*.css" \
  --exclude-dir=node_modules --exclude-dir=.git
```

Expected output: empty (or only false positives like CSP-headers that mention `mc.yandex.ru`).

- [ ] **Step 3: Fill the "Все типы проектов" checklist (15 items)** — for each item respond Y / N / NA + 1-line justification. List in chat.

- [ ] **Step 4: Fill the "Сайты с cookie" checklist (5 items)** — same format.

- [ ] **Step 5: Self-check cookie-banner code in `assets/js/cookie-consent.js`:**
- Yandex.Metrika injected dynamically via `loadYandexMetrika()`, not static `<script>` — Y/N
- "Принять все" and "Только необходимые" use the same `.cb-btn` class — Y/N
- Settings modal: `analytics` and `marketing` checkboxes have no `checked` attribute — Y/N
- localStorage key is `pdp_cookie_consent` with `{necessary, analytics, marketing, ts}` — Y/N

- [ ] **Step 6: Self-check quiz fallback form (read `quiz.html` final-screen section):**
- Consent checkbox NOT preset — Y/N
- Submit button `disabled` until checkbox ticked — Y/N
- Links to `/consent.html` and `/privacy-policy.html` next to checkbox — Y/N
- Marketing consent — separate checkbox (or absent, which is also valid) — Y/N
- If any item fails: file as backlog issue in `sverhnovaya/` — DO NOT modify quiz files in this repo.

- [ ] **Step 7: Output the fines table:**

| Нарушение | Штраф первичный | Мой статус |
|-----------|-----------------|------------|
| Неуведомление РКН | 100–300 тыс. | вручную перед запуском |
| Обработка ПДн без согласия | 300–700 тыс. | (фактический статус из проверки) |
| Запрещённые зарубежные сервисы | 1–6 млн | (статус из grep) |
| Отсутствие cookie-баннера | 150–300 тыс. | (статус из проверки) |
| Утечка ПДн | 3–15 млн | хостинг РФ, шифрование Timeweb |
| Утечка биометрии | 15–20 млн | биометрия не собирается |

- [ ] **Step 8: If any violations found — list each with file, line, and fix plan. Otherwise output "Нарушений не найдено".**

- [ ] **Step 9: No commit (audit is read-only)**

### Subagent prompt for Task 8

```
Read SPEC.md §8, SPEC.md §9, .claude/skills/152-fz/audit.md, .claude/skills/152-fz/checklists-and-fines.md, and Task 8 in docs/superpowers/plans/2026-04-28-landing-implementation.md.

Run the audit:
1. Execute the grep command from Step 2 (search for forbidden third-party services in HTML/JS/CSS files).
2. Fill both checklists ("Все типы проектов" 15 items + "Сайты с cookie" 5 items) with Y/N/NA and one-line justification.
3. Self-check assets/js/cookie-consent.js for the four 152-FZ requirements in Step 5.
4. Self-check quiz.html fallback form for the four requirements in Step 6 — DO NOT modify quiz.html.
5. Produce the fines table from Step 7 with actual status for each row.
6. Either list all violations with fix plans, or state "Нарушений не найдено".

This task is read-only — no file modifications, no commit.

Report back: the full audit output.
```

---

## Task 9: Мобильная адаптация и финальная полировка

**Files:**
- Modify: `assets/css/main.css` (append `/* === Mobile polish === */`)
- Possibly modify: `index.html` (only if accessibility issues found)

**Context for subagent:**
- SPEC.md §6 (mobile-first, 320–768px)
- docs/quiz-spec.md §11 (touch-target ≥ 52px, safe-area, контраст ≥ 4.5:1, focus-outline)
- mobile-specifics.md из 152-ФЗ — НЕ ПРИМЕНЯТЬ (про нативные приложения)

**Steps:**

- [ ] **Step 1: Read SPEC.md §6, docs/quiz-spec.md §11**

- [ ] **Step 2: Append to main.css:**

```css
/* === Mobile polish === */
@supports (padding: env(safe-area-inset-bottom)) {
  .cookie-banner { padding-bottom: max(24px, env(safe-area-inset-bottom)); }
  .cta-final { padding-bottom: max(96px, calc(72px + env(safe-area-inset-bottom))); }
  .footer { padding-bottom: max(32px, env(safe-area-inset-bottom)); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Touch targets ≥ 44/56 на мобайле */
@media (max-width: 768px) {
  .footer__col a, .footer__manage { padding: 8px 0; }
  .faq__item summary { padding-top: 20px; padding-bottom: 20px; }
  .package__cta, .hero__cta, .cta-final__btn { min-height: 56px; }
}
```

- [ ] **Step 3: Verify in browser DevTools at widths 320, 375, 414, 768, 1024, 1440:**
  - Hero: title не обрезается, editor-credit не наезжает на CTA на 320px.
  - Pain: две колонки в одну на 768px и ниже.
  - Story: фото снизу на ≤900px, текст 17–19px.
  - Case: одна колонка на 768px.
  - Quiz: #quiz-root corretto на всех ширинах.
  - Packages: одна колонка на 900px, badge «Чаще выбирают» не наезжает.
  - Trust: одна колонка на 768px.
  - Future Pacing: одна колонка на 768px.
  - FAQ: summary тапается без промаха.
  - About: фото сверху, текст снизу на 768px.
  - Final CTA: кнопка достаточно большая.
  - Footer: одна колонка на 768px.
  - Cookie banner: на 320px кнопки в столбец.

- [ ] **Step 4: Contrast check (manual or via DevTools):**
  - `--ink #111111` on `--paper #F4EFE6` — должно быть ≥ 16:1 (WCAG AAA).
  - `--paper` on `--accent #1A2B6B` — проверить.
  - `--accent` on `--paper` — проверить.
  - `--ink-muted #4A4A48` on `--paper` — проверить (на грани AA для small text).
  - `--paper` on `--inverted #0E0E0F` — должно быть ≥ 16:1.

- [ ] **Step 5: ARIA / keyboard:**
  - Tab по странице: hero CTA → packages CTA × 3 → quiz root → faq summary × 8 → about contact → final CTA → footer links → manage-consent.
  - Все интерактивные достижимы. focus-outline видим.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat(landing): mobile polish (touch targets, safe-area, motion)"
```

### Subagent prompt for Task 9

```
Read SPEC.md §6, docs/quiz-spec.md §11, and Task 9 in docs/superpowers/plans/2026-04-28-landing-implementation.md.

Append the /* === Mobile polish === */ block from Step 2 to assets/css/main.css.

Then verify in DevTools at 320/375/768/1024:
- Touch-targets ≥ 56px on CTAs.
- safe-area-inset-bottom applied to cookie-banner, cta-final, footer.
- No layout breakage at 320px (cookie banner buttons should stack).
- prefers-reduced-motion disables Hero load animation.
- :focus-visible outline visible on all interactive elements.
- Tab order is logical.

Compute contrast ratios for the five color pairs in Step 4 — if any pair is below 4.5:1, propose a fix (do not silently apply).

Note explicitly: mobile-specifics.md from 152-FZ skills is NOT applied here — it's about native mobile apps (React Native), we have a web landing.

Commit: "feat(landing): mobile polish (touch targets, safe-area, motion)".

Report back: contrast ratio table, list of any layout issues found.
```

---

## After all tasks: final integration check

- [ ] **Open `index.html` in a browser, scroll through all 12 sections.** Verify the full reading experience.

- [ ] **Mobile viewport check** at 375px: smooth scroll on all CTA clicks, FAQ accordion works, cookie banner appears on first visit (clear localStorage to test).

- [ ] **Lighthouse audit (optional):** run in DevTools, expect Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95.

- [ ] **Final commit and push:**

```bash
git push origin main
```

- [ ] **Manual pre-launch checklist** (NOT for subagents — for the project owner):
  - [ ] `[ИНН_ЗАПОЛНИТЬ]` in `consent.html`, `privacy-policy.html`, `cookie-policy.html`.
  - [ ] `WEBHOOK_URL` and `METRIKA_ID` in `assets/js/constants.js`.
  - [ ] `window.METRIKA_ID = N` in `<head>` (same number).
  - [ ] Bot `@KirinaAI_bot` created via `@BotFather`.
  - [ ] Notice filed at `pd.rkn.gov.ru`.
  - [ ] Hosting on Timeweb with HTTPS redirect (nginx config).

---

## Skill mapping (152-FZ)

| Task | Skills applied |
|------|----------------|
| 0. Каркас | core-init, technical-requirements, hosting-rkn |
| 1. Hero | core-init |
| 2. Боль | — |
| 3. Эпифания + Решение | — |
| 4. Кейс + Квиз | consent-forms-part-1, consent-forms-part-2 (Vanilla JS principles) |
| 5. Пакеты + 152-ФЗ блок | legal-docs, consent-forms-part-1 |
| 6. Future Pacing + FAQ + About | — |
| 7. CTA + Footer + Cookie-banner | cookie-banner-part-1, cookie-banner-part-2 (Vanilla JS), legal-docs, consent-forms-part-1 |
| 8. 152-FZ аудит | audit, checklists-and-fines |
| 9. Mobile polish | — *(SPEC §6 + docs/quiz-spec.md §11; mobile-specifics.md NOT applied)* |

**Skills not applied:** mobile-specifics (native apps), saas-specifics (no user accounts), ecommerce-specifics (no payments).

---

*End of plan.*
