# 04. Дизайн-направление и шрифты

> Объединение из исходного SPEC.md: §6 Дизайн-философия Dark Neon Tech, §7 Шрифты.
> **Тяжёлый файл (~250 строк)** — читать только при дизайн-работе.

---

## Дизайн-философия — Dark Neon Tech

### Направление
Тёмный технологичный интерфейс с неоновыми акцентами.
Референс: xeniabaranova.ru — тёмный фон, свечение, энергия.
Ощущение: умный инструмент, которому доверяют.
Не: корпоративный сайт, журнальная вёрстка, светлый минимализм.

### Палитра
```
  --bg:           #080C16   основной фон
  --bg-card:      #0D1220   карточки
  --bg-card-hover:#101828   карточки при hover
  --ink:          #F0EDE6   основной текст
  --ink-muted:    rgba(240,237,230,0.45)   приглушённый текст
  --ink-faint:    rgba(240,237,230,0.2)    очень тихий текст
  --neon:         #00C8FF   главный акцент
  --neon-dim:     rgba(0,200,255,0.15)
  --neon-glow:    rgba(0,200,255,0.25)
  --violet:       #7C3AED   вторичный акцент
  --violet-dim:   rgba(124,58,237,0.15)
  --mark:         #F6E057   жёлтый highlight
  --mark-ink:     #080C16   текст на жёлтом
  --rule:         rgba(0,200,255,0.1)     неоновые границы
  --rule-solid:   rgba(240,237,230,0.08)  тихие разделители
```

### Шрифты (ЛОКАЛЬНЫЕ — не менять, не заменять CDN)
```
  --font-display: 'Geologica'   заголовки, вес 700–900
  --font-body:    'Onest'       основной текст, вес 400–500
  --font-mono:    'PT Mono'     нумерация, теги, цифры, коды
```

### Принципы оформления

**КАРТОЧКИ — основной строительный блок:**
```
  bg var(--bg-card), border 1px solid var(--rule),
  border-radius 8px, padding 24px
  hover: translateY(-3px), border-color rgba(0,200,255,.4),
         box-shadow 0 8px 32px rgba(0,200,255,.1)
```

**НУМЕРАЦИЯ СЕКЦИЙ (eyebrow):**
```
  PT Mono, 11px, color rgba(0,200,255,.5),
  letter-spacing .15em, uppercase
  перед текстом — линия 32px rgba(0,200,255,.3)
```

**ЦИТАТЫ И ВЫДЕЛЕННЫЕ БЛОКИ:**
```
  border-left 2px solid rgba(0,200,255,.25),
  padding 12px 16px, bg rgba(240,237,230,.03),
  border-radius 0 6px 6px 0, font-style italic
```

**ИКОНКИ:**
```
  контейнер 40×40px, border-radius 8px,
  bg rgba(0,200,255,.08), border rgba(0,200,255,.15)
  SVG: stroke var(--neon), fill none, stroke-width 1.5
```

**ЦИФРЫ И СТАТЫ:**
```
  PT Mono, 24–32px, color var(--neon),
  text-shadow 0 0 16px rgba(0,200,255,.35)
```

**КНОПКА ОСНОВНАЯ (btn-primary):**
```
  gradient 135deg #0080FF → #00C8FF,
  color #080C16, font-weight 700,
  box-shadow 0 0 18px rgba(0,200,255,.28)
  hover: translateY(-2px), усиленное свечение
```

**КНОПКА GHOST (btn-ghost):**
```
  transparent, border rgba(240,237,230,.15)
  hover: border-color var(--neon), color var(--neon)
```

**ЖЁЛТЫЙ HIGHLIGHT:**
```
  bg var(--mark), color var(--mark-ink),
  padding 1px 10px, border-radius 2px
```

**БЕЙДЖИ С ПРЕДУПРЕЖДЕНИЕМ (152-ФЗ, дата):**
```
  bg rgba(246,224,87,.07),
  border 1px solid rgba(246,224,87,.2),
  color #F6E057, border-radius 100px,
  PT Mono, 11px
```

**АВАТАРЫ ПЕРСОНАЖЕЙ:**
```
  44×44px, border-radius 50%
  Елена: bg rgba(0,200,255,.1), border rgba(0,200,255,.25), color #00C8FF
  Анна:  bg rgba(124,58,237,.1), border rgba(124,58,237,.3), color #A78BFA
```

**ФОН СЕТКИ (grid overlay на body::before):**
```
  linear-gradient rgba(0,200,255,.035) 1px,
  background-size 60px 60px
```

**СВЕЧЕНИЕ ОРБ (декоративные пятна света):**
```
  position absolute, border-radius 50%,
  filter blur(80–90px), opacity .12–.18,
  pointer-events none — добавлять в секции
  где нужна глубина (hero, cta-final)
```

**АНИМАЦИЯ ПОЯВЛЕНИЯ:**
```
  class="reveal" — opacity 0 → 1,
  translateY 24px → 0, transition .6s ease
  через IntersectionObserver (уже в index.html)
```

**РАЗДЕЛИТЕЛИ:**
```
  height 1px,
  linear-gradient(90deg, transparent,
  rgba(0,200,255,.15), transparent)
```

### Чего избегать
- Белые и светлые фоны (var(--paper) — удалена)
- Тени вместо свечения (box-shadow с rgba(0,0,0) → rgba(0,200,255))
- System-ui, Inter, Arial — только локальные шрифты
- Скруглённые углы >12px (исключение: аватары и badge 100px)
- Сплошные цветные фоны на секциях — только var(--bg) или var(--bg-card)
- Запрещённые слова из CLAUDE.md

### Что делает дизайн незабываемым
Неоновое слово в каждом заголовке секции.
Карточки «оживают» при наведении — translateY + свечение.
Цифры-статы светятся как будто с экрана.
PT Mono везде где нумерация, теги, технические детали.
Тонкая сетка на фоне создаёт глубину.

---

## Шрифты — фиксация и инструкция подключения

### Тройка шрифтов (display + body + mono)

| Роль | Шрифт | Лицензия | Зачем именно он |
|------|-------|----------|------------------|
| Display (H1, H2, hero-цитаты, оффер) | **Geologica** (variable) | SIL OFL 1.1 | Variable, контрастный, с характерным «редакторским» голосом — выдерживает крупные кегли в Hero и не «уютит» как PT Serif. Один файл покрывает веса 100–900 + axis CRSV/SHRP/slnt. |
| Body, UI, формы, кнопки | **Onest** (variable) | SIL OFL 1.1 | Современный grotesque с открытыми формами; читабелен в 17–19px, не путается с Inter (закрытые формы — другой ритм). Variable, один файл на все веса. |
| Mono (нумерация секций, цены, плейсхолдеры, мета) | **PT Mono** | SIL OFL 1.1 | Monospaced с лёгким humanist-характером — для редакторских меток `01 / Hero`, цен «от 120 000 ₽», `[ИНН_ЗАПОЛНИТЬ]`. Один регулярный начертание. |

Кириллица + латиница в полном составе, бесплатное коммерческое использование под SIL OFL 1.1.

**Почему именно эти, а не PT Serif + Golos Text (как было раньше):**
- PT Serif — классический, но «спокойный»; в кегле 56–72px Hero-заголовок «Лучшее, что вы сделаете для бизнеса…» теряется и звучит как обычный книжный заголовок. Geologica на той же высоте даёт акцентированный, контрастный голос — нужный для парадокса.
- Golos Text хороший body, но против Onest проигрывает в современности; рядом с Geologica Display получается «классика + классика» — слишком тихо. Onest даёт нужный регистр-контраст.
- PT Mono добавляет третий голос для микро-типографики — нумерация секций и цены становятся узнаваемой деталью, а не служебной строкой.

### Файлы уже в репозитории

Шрифты скачаны и закоммичены в [/assets/fonts/](assets/fonts/). **Дополнительно ничего класть руками не нужно** — всё уже есть. Источник — публичный репозиторий [google/fonts](https://github.com/google/fonts) (raw-файлы на github.com, не Google Fonts CDN; SIL OFL 1.1 разрешает редистрибуцию).

```
/assets/fonts/
├── Geologica-Variable.ttf   (~340 KB, variable: вес 100–900 + axes CRSV/SHRP/slnt)
├── Onest-Variable.ttf       (~121 KB, variable: вес 100–900)
├── PTMono-Regular.ttf       (~181 KB)
├── OFL-Geologica.txt        (текст лицензии — обязательно по SIL OFL 1.1)
├── OFL-Onest.txt
└── OFL-PTMono.txt
```

**Формат — TTF, не WOFF2.** Это сознательный компромисс: variable-шрифты в TTF дают один файл на семейство (вместо 7 статических WOFF2), и лендинг получается компактнее по числу запросов и проще по поддержке. Итоговый объём шрифтов — около 640 KB, что приемлемо для лендинга.

### Инструкция подключения (152-ФЗ-совместимая)

```css
/* Geologica — variable: один файл покрывает веса 100–900 */
@font-face {
  font-family: 'Geologica';
  src: url('/assets/fonts/Geologica-Variable.ttf') format('truetype-variations'),
       url('/assets/fonts/Geologica-Variable.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* Onest — variable: один файл покрывает веса 100–900 */
@font-face {
  font-family: 'Onest';
  src: url('/assets/fonts/Onest-Variable.ttf') format('truetype-variations'),
       url('/assets/fonts/Onest-Variable.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* PT Mono — статический Regular */
@font-face {
  font-family: 'PT Mono';
  src: url('/assets/fonts/PTMono-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### Применение через CSS-переменные

```css
:root {
  --font-display: 'Geologica', Georgia, 'Times New Roman', serif;
  --font-body: 'Onest', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'PT Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}
body, button, input, label, p, li { font-family: var(--font-body); }
h1, h2, h3, .display, blockquote { font-family: var(--font-display); }
.section-marker, .price, .placeholder, .meta-mono { font-family: var(--font-mono); }
```

**Иерархия кеглей (опорные значения):**

| Уровень | Кегль desktop | Кегль mobile | Семейство / вес |
|---------|---------------|--------------|-----------------|
| H1 (Hero) | clamp(48px, 6.5vw, 84px) | 36–44px | Geologica 900 |
| H1 (другие секции) | clamp(36px, 4.5vw, 56px) | 28–32px | Geologica 700 |
| H2 | clamp(26px, 2.8vw, 36px) | 22–24px | Geologica 600 |
| H3 | 20–22px | 18px | Geologica 500 |
| Body | 18px | 17px | Onest 400 (line-height 1.65) |
| Lead / подзаголовок | 20–22px | 18–19px | Onest 400 (line-height 1.55) |
| UI / button | 16–17px | 16px | Onest 500 |
| Section marker (`01 / Hero`) | 13px | 12px | PT Mono 400 |
| Price (пакеты) | 24px | 22px | PT Mono 400 |
| Footnote / meta | 13–14px | 13px | Onest 400, opacity 0.7 |

**Про italic.** Geologica поддерживает курсив через axis CRSV/slnt в variable-шрифте. Использования italic в проекте мало (`.story__epiphany`, `.case__bridge`) — браузер автоматически наклоняет шрифт через synthetic italic, либо подбирает вариант через variation axes. Идеально, без отдельного italic-файла — что и нужно для одностраничного лендинга.

### Запреты (152-ФЗ + project rules)

- ❌ **НИКАКИХ** ссылок на `fonts.googleapis.com` или `fonts.gstatic.com`.
- ❌ **НИКАКИХ** внешних CDN (cdnjs, jsDelivr, unpkg) для шрифтов.
- ❌ **НИКАКИХ** `@import url('https://...')` в CSS.
- ❌ **НИКАКОГО** Fontsource-импорта по сети — шрифты уже в репо локально.
- ❌ **Inter, Roboto, Arial, Helvetica, Space Grotesk, IBM Plex** — не использовать ни как основной, ни как fallback верхнего уровня. Только в системных fallback-цепочках после Geologica/Onest.
- ✅ Только локальная отдача с того же домена.

---
