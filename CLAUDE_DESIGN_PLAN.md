# План реализации лендинга — 10 промптов для Claude Design

**Проект:** Personal-brand-152-fz (лендинг Марины Кириной)
**Дата:** 2026-04-28
**Статус:** готов к исполнению

---

## Как пользоваться этим планом

1. Открой [Claude.ai](https://claude.ai/) → создай новый **Project** с названием «Лендинг Марины Кириной».
2. В Project Knowledge загрузи **SPEC.md** один раз. Дополнительно полезно положить туда `CLAUDE.md` и `docs/quiz-spec.md`.
3. Открой внутри Project новый чат с моделью Claude (Sonnet 4.x или Opus).
4. Копируй промпты по одному, **строго по порядку 1 → 10**, в один и тот же чат. Не открывай новый чат на каждый промпт — модель потеряет контекст предыдущих секций.
5. После каждого промпта читай результат, при необходимости проси доработать «в этом же чате», и только потом переходи к следующему промпту.
6. После Промпта 10 скачай финальный `index.html` и `assets/` целиком.

**Привязка скиллов 152-ФЗ к промптам — внизу плана, в отдельной таблице.**

---

## Промпт 1 — Каркас и дизайн-система

**Что получаем на выходе:**

- `index.html` — скелет страницы с 12 пустыми семантическими секциями (id от `hero` до `footer`), мета-тегами, CSP-заголовком, базовым `<head>`.
- `assets/css/main.css` — CSS-переменные палитры, `@font-face` для PT Serif + Golos Text, editorial-сетка, базовая типографика.
- `assets/fonts/` — папка-плейсхолдер под WOFF2-файлы (с README-маркером, что положить вручную).

**Опора на SPEC.md:** §1 (Резюме), §5 (12 секций), §6 (палитра, принципы), §7 (шрифты — полные `@font-face` блоки), §8 (152-ФЗ чеклист), §10 (точка монтирования квиза `#quiz`).

**Скиллы 152-ФЗ:**
- `core-init.md` — никаких трекеров и аналитики в каркасе; вся структура под тип проекта `landing`.
- `technical-requirements.md` — HTTPS-готовность, локальные шрифты через `@font-face`, динамическая инжекция Метрики (в каркасе её НЕТ — добавим в Промпте 8).
- `hosting-rkn.md` — структура путей `/assets/css/`, `/assets/js/`, `/assets/fonts/`, `/assets/img/` под российский хостинг (Timeweb), все ресурсы относительные.

**Текст промпта (копировать целиком):**

```
Сгенерируй каркас лендинга личного бренда Марины Кириной — два файла: index.html и assets/css/main.css.

Контекст: SPEC.md загружен в этот Project. Опирайся на разделы §1, §5, §6, §7, §8, §10. Не пересказывай SPEC — используй его как источник истины.

ФАЙЛ 1 — index.html

Требования:
1. <!DOCTYPE html>, <html lang="ru">.
2. В <head>:
   — <meta charset="utf-8">
   — <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
   — <title>Марина Кирина — сайт + Telegram-бот + автоматизация на n8n</title>
   — <meta name="description"> на основе SPEC §1 (одно предложение, до 160 символов)
   — <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https://mc.yandex.ru https://t.me">
   — <link rel="stylesheet" href="/assets/css/main.css">
3. В <body> создай 12 семантических секций строго в порядке SPEC §5:
   <section id="hero">           <!-- 1. Hero -->
   <section id="pain">            <!-- 2. Боль -->
   <section id="story">           <!-- 3. Эпифания + Решение -->
   <section id="case">             <!-- 4. Кейс -->
   <section id="quiz">             <!-- 5. Квиз — ОБЯЗАТЕЛЬНО id="quiz" -->
   <section id="packages">         <!-- 6. Пакеты -->
   <section id="trust-152fz">      <!-- 7. 152-ФЗ блок -->
   <section id="future-pacing">    <!-- 8. Future Pacing -->
   <section id="faq">              <!-- 9. FAQ -->
   <section id="about">            <!-- 10. Кто я -->
   <section id="cta-final">        <!-- 11. Финальный CTA -->
   <footer id="footer">             <!-- 12. Footer -->
   Каждая секция содержит только заглушку <h2>Секция N — название</h2> — наполнение придёт следующими промптами.
4. После </footer>, перед </body> — пустой комментарий <!-- cookie-banner будет добавлен в Промпте 8 -->.
5. НЕ подключай никакие внешние скрипты. Никаких <script src="https://...">. Никаких CDN.

ФАЙЛ 2 — assets/css/main.css

Требования:
1. :root с переменными:
   --bg:#FAF7F2;
   --text:#1F1B16;
   --accent:#C8553D;
   --accent-2:#A0412E;
   --border:#E8E1D6;
   --font-display:'PT Serif', Georgia, 'Times New Roman', serif;
   --font-body:'Golos Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
   --section-gap:96px;
   --section-gap-mobile:64px;
   --content-max:70ch;
2. Шесть @font-face блоков (полностью, как в SPEC §7 пункт 3):
   PT Serif: regular 400, bold 700, italic 400 — все из /assets/fonts/pt-serif-*.woff2
   Golos Text: regular 400, medium 500, bold 700 — все из /assets/fonts/golos-text-*.woff2
   Каждый — с font-display: swap; format('woff2').
3. * { box-sizing: border-box; }, body { margin:0; background:var(--bg); color:var(--text); font:400 18px/1.6 var(--font-body); }
4. h1,h2,h3 { font-family:var(--font-display); font-weight:700; line-height:1.2; }
5. a { color:var(--accent); } a:hover { color:var(--accent-2); }
6. section { padding: var(--section-gap) 24px; }
   @media (max-width: 768px) { section { padding: var(--section-gap-mobile) 16px; } }
7. .container { max-width: 1120px; margin: 0 auto; }
8. .story-content { max-width: var(--content-max); margin: 0 auto; }  /* для лонгрид-секций */
9. img { max-width: 100%; height: auto; display: block; }
10. :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

ЗАПРЕТЫ (152-ФЗ — критично):
— НИКАКИХ ссылок на fonts.googleapis.com, fonts.gstatic.com.
— НИКАКИХ внешних CDN (cdnjs, jsDelivr, unpkg, Fontsource через сеть).
— НИКАКИХ @import url('https://...').
— НИКАКОГО Google Tag Manager, Google Analytics, Facebook Pixel, reCAPTCHA, Hotjar, Intercom, Cloudflare Insights.
— Метрики Яндекса в каркасе НЕТ — будет инжектиться динамически в Промпте 8.
— Все пути — относительные, с того же домена.

ВАЖНО ПРО ШРИФТЫ:
WOFF2-файлы на этапе генерации каркаса физически НЕ нужны — пользователь положит их вручную. Просто создай корректные @font-face-блоки с правильными путями.

На выходе дай мне:
1. Полный код index.html в одном блоке.
2. Полный код assets/css/main.css в одном блоке.
3. Краткое README для папки /assets/fonts/ (4–5 строк) — какие файлы куда положить.
```

---

## Промпт 2 — Hero (секция 1)

**Что получаем на выходе:** наполненная секция `#hero` — главный заголовок, подзаголовок, CTA-кнопка, микрофутер под кнопкой, маленький круглый аватар 48px рядом с подписью «Марина Кирина · самозанятая · Пенза». Декоративная фоновая арка-намёк (мягкая, тонкая) — упоминается в SPEC §6.

**Опора на SPEC.md:** §0 (имя, статус, фото `/photo.png`, размер аватара 40–48px), §4 «Hook» (заголовок, подзаголовок, CTA, микрофутер дословно), §5 секция 1, §6 (палитра, принципы), CLAUDE.md (запрещённые упоминания).

**Скиллы 152-ФЗ:**
- `core-init.md` — никаких трекеров до согласия; CTA — обычная якорная ссылка `<a href="#quiz">`, без onclick-аналитики, без `<a target="_blank" rel="noopener">` для внутренних ссылок.

**Текст промпта (копировать целиком):**

```
Заполни секцию #hero (секция 1 из SPEC §5). Не трогай остальные 11 секций — только #hero.

Опирайся на:
— SPEC §4 «Hook» — главный заголовок, подзаголовок, CTA-надпись, микрофутер под кнопкой даны дословно. Не перефразируй.
— SPEC §0 «Личные данные для секции Кто я» — имя, статус, город, путь к фото /photo.png.
— CLAUDE.md «Ограничения языка» — слова Instagram, Meta, «блокировка соцсети», «вайбкодинг», «дёшево», «100 клиентов за 30 дней» использовать НЕЛЬЗЯ нигде, в том числе в alt-атрибутах. Центральная боль — зависимость бизнеса от присутствия владельца, а не внешний триггер.

Структура HTML внутри #hero:

<section id="hero" class="hero">
  <div class="container hero__inner">
    <h1 class="hero__title">[ГЛАВНЫЙ ЗАГОЛОВОК ИЗ SPEC §4]</h1>
    <p class="hero__subtitle">[ПОДЗАГОЛОВОК ИЗ SPEC §4]</p>
    <a class="hero__cta" href="#quiz">Посчитать потери</a>
    <p class="hero__microfooter">[МИКРОФУТЕР ИЗ SPEC §4]</p>
    <div class="hero__author">
      <img class="hero__avatar" src="/photo.png" alt="Марина Кирина" width="48" height="48" loading="eager">
      <span class="hero__author-line">Марина Кирина · самозанятая · Пенза</span>
    </div>
  </div>
</section>

CSS-требования (добавь в assets/css/main.css в новую секцию /* === Hero === */):

— .hero — min-height: 88vh на десктопе, 100vh на mobile. flex column, justify-content: center.
— .hero__title — font-family: var(--font-display); font-size: clamp(36px, 5.5vw, 64px); max-width: 18ch; margin-bottom: 24px.
— .hero__subtitle — font-size: clamp(18px, 2vw, 22px); max-width: 56ch; color: var(--text); opacity: 0.85; margin-bottom: 40px.
— .hero__cta — display: inline-block; padding: 18px 36px; min-height: 52px; background: var(--accent); color: #fff; text-decoration: none; border-radius: 999px; font-weight: 600; font-size: 18px; transition: background 200ms.
   :hover/:focus-visible { background: var(--accent-2); }.
— .hero__microfooter — font-size: 14px; color: var(--text); opacity: 0.6; margin-top: 16px; max-width: 48ch.
— .hero__author — display: flex; align-items: center; gap: 12px; margin-top: 32px.
— .hero__avatar — width: 48px; height: 48px; border-radius: 50%; object-fit: cover.
— .hero__author-line — font-size: 14px; color: var(--text); opacity: 0.75.

ДЕКОРАТИВНЫЙ ФОН (опционально, только если получится тонко):
Большое фото в Hero НЕ размещай (SPEC §0 явно запрещает — уводит фокус с боли читателя на автора).
Допускается тонкая декоративная арка как фон через ::before на .hero — pure-CSS-овал из var(--border) с opacity 0.4, расположенный за заголовком. Если сомневаешься в исполнении — лучше пропусти, чистый воздух важнее.

ЗАПРЕТЫ (152-ФЗ + project rules):
— НИКАКОЙ аналитики на клик CTA (никаких ym(), никаких dataLayer.push). CTA — голая <a href="#quiz">. Аналитика подключается только в Промпте 8 после согласия.
— НИКАКИХ внешних шрифтов или иконок (никаких <link>, никаких SVG-импортов с CDN).
— НИКАКОГО target="_blank" — это якорь на ту же страницу.

Покажи итог двумя блоками:
1. Финальный <section id="hero">…</section> для index.html.
2. Дополнение к assets/css/main.css — только новые правила в блоке /* === Hero === */.
```

---

## Промпт 3 — Боль (секция 2)

**Что получаем на выходе:** секция `#pain` с двумя колонками — голос Елены (психолог) и голос Анны (владелица студии маникюра). Над колонками — общий заголовок секции и короткий лид. Адаптация: на mobile колонки складываются в одну.

**Опора на SPEC.md:** §3 (портрет архетипа, лицо 1 — Елена, лицо 2 — Анна), §3 «Внутренний диалог в 23:47», §3 «Топ-3 боли» (формулировки дословно), §5 секция 2, CLAUDE.md (центральная боль — зависимость от присутствия владельца, не внешний триггер).

**Скиллы 152-ФЗ:** не применяются — чистый копирайтинг и вёрстка.

**Текст промпта (копировать целиком):**

```
Заполни секцию #pain (секция 2 из SPEC §5). Не трогай остальные секции.

Опирайся на:
— SPEC §3 «Портрет Dream Customer» — лицо 1 (Елена, психолог) и лицо 2 (Анна, студия маникюра).
— SPEC §3 «Внутренний диалог в 23:47» — 6 фраз внутреннего диалога. Используй как сырьё для цитат.
— SPEC §3 «Топ-3 боли» — три формулировки дословно (записи теряются после 20:00; рутина съедает день; клиент не возвращается).
— CLAUDE.md — центральная боль это зависимость от присутствия владельца. Никаких упоминаний Instagram/Meta/блокировки. Если нужно про каналы — нейтрально: «когда привычные каналы изменились».

Принцип секции:

Заголовок секции — про узнавание себя, не про проблему вообще. Один лид, потом две колонки. Колонки — это два «голоса» одного архетипа. Не два разных бизнеса, а одна и та же боль, рассказанная разными людьми. Читатель должен в одной из колонок узнать себя за 5 секунд.

Структура HTML:

<section id="pain" class="pain">
  <div class="container">
    <h2 class="pain__title">Узнаёте?</h2>
    <p class="pain__lead">[ЛИД 1–2 ПРЕДЛОЖЕНИЯ — про то, что бизнес стоит, когда владелец не у телефона. Не про блокировку платформ. Про вечную боль архетипа.]</p>
    <div class="pain__columns">
      <article class="pain__voice">
        <h3 class="pain__voice-name">Елена, психолог-практик</h3>
        <p class="pain__voice-meta">Москва · 6 лет в практике · 25–30 сессий/мес</p>
        <ul class="pain__voice-quotes">
          <li>«[Цитата 1 — из внутреннего диалога 23:47, переписанная под голос Елены]»</li>
          <li>«[Цитата 2 — про то, что сайт есть, но не работает]»</li>
          <li>«[Цитата 3 — про страх найма помощника]»</li>
        </ul>
      </article>
      <article class="pain__voice">
        <h3 class="pain__voice-name">Анна, студия маникюра на 3 мастера</h3>
        <p class="pain__voice-meta">Марьина Роща · 8 лет ремесла · YCLIENTS подключён</p>
        <ul class="pain__voice-quotes">
          <li>«[Цитата 1 — записи теряются после 20:00]»</li>
          <li>«[Цитата 2 — рутина в мессенджерах до ночи]»</li>
          <li>«[Цитата 3 — про администратора и нехватку рук]»</li>
        </ul>
      </article>
    </div>
  </div>
</section>

Цитаты пиши от первого лица, разговорным языком, с многоточиями и обрывами — это внутренний голос в 23:47, не маркетинговый текст. Каждая колонка — 3 цитаты по 1–2 предложения.

Под цитатами одной колонки — никаких CTA, никаких кнопок. Цель секции — узнавание, не действие.

CSS (добавь блок /* === Pain === */ в main.css):

— .pain__title — text-align:center; font-size:clamp(28px,3.5vw,44px); margin-bottom:12px.
— .pain__lead — text-align:center; max-width:60ch; margin:0 auto 56px; opacity:0.8; font-size:clamp(18px,2vw,22px).
— .pain__columns — display:grid; grid-template-columns:1fr 1fr; gap:48px; max-width:980px; margin:0 auto.
   @media (max-width:768px) { grid-template-columns:1fr; gap:32px; }
— .pain__voice — background:#fff; border:1px solid var(--border); border-radius:12px; padding:32px 28px.
   На mobile padding:24px 20px.
— .pain__voice-name — font-family:var(--font-display); font-size:22px; margin:0 0 4px.
— .pain__voice-meta — font-size:14px; color:var(--text); opacity:0.6; margin:0 0 24px.
— .pain__voice-quotes — list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:18px.
— .pain__voice-quotes li — padding-left:16px; border-left:2px solid var(--accent); font-size:17px; line-height:1.5.

ЗАПРЕТЫ:
— Слов «Instagram», «Meta», «блокировка», «вайбкодинг», «дёшево» — нет нигде.
— Никаких иконок-фоток-стоков.
— Никакого «100% результат за 30 дней» и подобных обещаний.

Покажи итог двумя блоками: HTML секции и дополнение к main.css.
```

---

## Промпт 4 — Эпифания + Решение (секция 3)

**Что получаем на выходе:** секция `#story` — лонгрид-блок с editorial-вёрсткой. Сцена «23:47» → метафора «щели между сообщением и ответом» → переход к офферу как единой связке (сайт + бот + n8n). Справа от текста (на десктопе) — фото Марины 400px, между абзацами — на mobile.

**Опора на SPEC.md:** §0 (фото `/photo.png` в секции 3, размещение editorial-стиль, max-width 400px, border-radius 8px), §4 «Story (Epiphany Bridge)» (вся структура и текст), §4 «Offer (одним предложением)», §4 «Value Stack» (8 слоёв таблицей), §5 секция 3, §6 (editorial-сетка, max-width 70ch).

**Скиллы 152-ФЗ:** не применяются — копирайтинг + вёрстка.

**Текст промпта (копировать целиком):**

```
Заполни секцию #story (секция 3 из SPEC §5) — это самая длинная и самая важная секция лендинга. Не трогай остальные секции.

Опирайся на:
— SPEC §4 «Story (Epiphany Bridge)» — текст сцены 23:47, метафора щелей, эпифания читателя. Используй текст из SPEC дословно (это уже отредактированная копия), допустимо разбивать на абзацы и добавлять подзаголовки между блоками.
— SPEC §4 «Offer (одним предложением)» — оффер дословно.
— SPEC §4 «Value Stack» — 8 слоёв ценности, таблица. Превратить в визуальный список (см. ниже).
— SPEC §0 — фото /photo.png размещается ИМЕННО в этой секции, max-width 400px, border-radius 8px, editorial-расположение справа от текста.
— SPEC §6 — editorial-сетка, max-width 70ch для текстовой колонки.
— CLAUDE.md — никакого «вайбкодинга», никакого «заменим вашего администратора». Правильно: «современные AI-инструменты разработки», «администратор освободится от рутины».

Структура секции — три части подряд:

ЧАСТЬ A — СЦЕНА И ЭПИФАНИЯ (Story):
Заголовок (что-то вроде «Где на самом деле теряются деньги»).
Лонгрид-абзацы из SPEC §4 «Story» — сцена 23:47, метафора щелей, переход к «эту щель закрывает только машина, которая работает за вас».
Завершается явной формулировкой эпифании из SPEC §4 — выделить курсивом или цитатным блоком.
Справа от текста (desktop) или между абзацами (mobile) — фото Марины (/photo.png).

ЧАСТЬ B — ОФФЕР ОДНИМ ПРЕДЛОЖЕНИЕМ:
Большое предложение, центрировано, через горизонтальную тонкую линию-разделитель сверху и снизу.
Текст — из SPEC §4 «Offer».

ЧАСТЬ C — VALUE STACK (8 СЛОЁВ):
Список из 8 пунктов из таблицы SPEC §4 «Value Stack». Формат каждого пункта:
[Номер слоя] [Что входит] — [почему ценно для клиента].
Не таблица. Список с крупной нумерацией и тонким разделителем между пунктами. Editorial-стиль.

HTML-структура:

<section id="story" class="story">
  <div class="container">
    <div class="story__layout">
      <div class="story__text">
        <h2 class="story__title">[Заголовок секции]</h2>
        <p>[Сцена 23:47 — первый абзац из SPEC §4 Story]</p>
        <p>[Метафора щелей — второй абзац]</p>
        <p>[Переход к решению — третий абзац]</p>
        <blockquote class="story__epiphany">
          [Эпифания дословно из SPEC §4]
        </blockquote>
      </div>
      <figure class="story__photo">
        <img src="/photo.png" alt="Марина Кирина — фрилансер, автоматизация на n8n" width="400" loading="lazy">
      </figure>
    </div>

    <hr class="story__divider">
    <p class="story__offer">[Оффер одним предложением из SPEC §4]</p>
    <hr class="story__divider">

    <ol class="value-stack">
      <li class="value-stack__item">
        <span class="value-stack__num">01</span>
        <div>
          <h3 class="value-stack__what">[Что входит — слой 1]</h3>
          <p class="value-stack__why">[Почему ценно — слой 1]</p>
        </div>
      </li>
      <!-- … повторить для всех 8 слоёв … -->
    </ol>
  </div>
</section>

CSS (новый блок /* === Story === */):

— .story__layout — display:grid; grid-template-columns: minmax(0, 70ch) 400px; gap:48px; align-items:start; max-width:1100px; margin:0 auto.
   @media (max-width:900px) { grid-template-columns:1fr; }
— .story__text p — font-size:19px; line-height:1.7; margin:0 0 24px.
— .story__title — font-size:clamp(30px,3.8vw,46px); margin:0 0 32px.
— .story__photo img — width:100%; max-width:400px; border-radius:8px; object-fit:cover.
   @media (max-width:900px) { .story__photo { margin:24px auto; } }
— .story__epiphany — font-family:var(--font-display); font-style:italic; font-size:22px; line-height:1.5; border-left:3px solid var(--accent); padding:8px 0 8px 24px; margin:32px 0 0; color:var(--text).
— .story__divider — border:none; height:1px; background:var(--border); margin:64px auto; max-width:120px.
— .story__offer — font-family:var(--font-display); font-size:clamp(22px,2.6vw,30px); text-align:center; max-width:30ch; margin:0 auto; line-height:1.4.
— .value-stack — list-style:none; counter-reset:none; padding:0; margin:0; max-width:780px; margin-left:auto; margin-right:auto.
— .value-stack__item — display:grid; grid-template-columns:64px 1fr; gap:24px; padding:24px 0; border-bottom:1px solid var(--border).
   .value-stack__item:last-child { border-bottom:none; }
— .value-stack__num — font-family:var(--font-display); font-size:32px; color:var(--accent); line-height:1.
— .value-stack__what — font-family:var(--font-display); font-size:20px; margin:0 0 4px.
— .value-stack__why — font-size:16px; color:var(--text); opacity:0.75; margin:0; line-height:1.5.

ЗАПРЕТЫ:
— Слов «вайбкодинг», «заменим администратора», «дёшево», «Instagram», «Meta», «блокировка» — нет.
— Никаких CTA внутри секции — только повествование. CTA на квиз идёт в секции 5 и 11.
— Фото Марины — только реальное /photo.png. Никаких стоков.

Покажи итог двумя блоками: HTML секции и дополнение к main.css.
```

---

## Промпт 5 — Кейс (секция 4) + Квиз (секция 5)

**Что получаем на выходе:**
- Секция `#case` — кейс по структуре «Проблема → Действие → Результат», с маркером `PORTFOLIO_PLACEHOLDER` в местах, где должны быть реальные цифры/имена клиентов.
- Секция `#quiz` — заголовок секции, лид «5 вопросов, 2 минуты», точка монтирования `<div id="quiz-root"></div>`, подключение `assets/js/quiz-embed.js` через `<script type="module">`, smooth scroll к `#quiz`, проверка `<noscript>`-блока.
- Чёткая инструкция «не править файлы внутри `assets/js/` и `assets/css/quiz.css`».

**Опора на SPEC.md:** §0 (плейсхолдеры квиза в `assets/js/constants.js`), §3 (топ-3 боли, кейс должен закрывать одну из них), §4 «Hook» (CTA-надпись и микрофутер), §5 секция 4 и секция 5, §10 (встройка квиза — все пункты дословно), `docs/quiz-spec.md` §6 (структура финального экрана с согласием).

**Скиллы 152-ФЗ:**
- `consent-forms-part-1.md` (Vanilla JS, ст. 9 ч. 1 152-ФЗ — чекбокс не предустановлен; ст. 5 ч. 5 — минимизация полей; разделение чекбоксов согласия на ОПД и маркетинга).
- `consent-forms-part-2.md` (только Vanilla JS-принципы, без React/Vue/Next кода) — серверная валидация согласия на стороне webhook.
- **Важно:** файлы квиза (`quiz.html`, `assets/js/*`, `assets/css/quiz.css`) уже разработаны в проекте `sverhnovaya/` и НЕ правятся в лендинге (SPEC §10 «Чего не делать»). В Промпте 5 мы только встраиваем точку монтирования и делаем смоук-проверку, что внутри встроенной формы чекбоксы не предустановлены и кнопка disabled до согласия — если что-то не так, фиксируется как backlog-задача в `sverhnovaya/`, а не правится в лендинге.

**Текст промпта (копировать целиком):**

```
Заполни две секции подряд: #case (секция 4) и #quiz (секция 5). Не трогай остальные секции.

Опирайся на:
— SPEC §5 секции 4 и 5.
— SPEC §10 «Встройка quiz.html» — все 6 пунктов и блок «Чего не делать».
— SPEC §0 — Подтверждённые результаты (3 пункта). Это сырьё для кейса. Маркер PORTFOLIO_PLACEHOLDER ставится там, где требуется конкретное имя клиента, период, цифра.
— docs/quiz-spec.md §6 — структура финального экрана и fallback-формы (для самопроверки в конце промпта).
— CLAUDE.md — никакого «вайбкодинга», никаких громких обещаний без оговорок.

ЧАСТЬ 1 — СЕКЦИЯ #case

Структура «Проблема → Действие → Результат». Один кейс, не три.

<section id="case" class="case">
  <div class="container case__inner">
    <p class="case__eyebrow">Кейс</p>
    <h2 class="case__title">[Краткий заголовок-обещание из реального результата клиента]</h2>
    <div class="case__client">
      <p class="case__client-line">[Ниша · город · масштаб] — PORTFOLIO_PLACEHOLDER до согласия клиента</p>
    </div>
    <div class="case__grid">
      <article class="case__step">
        <h3 class="case__step-title">Проблема</h3>
        <p>[2–4 предложения. Опирайся на топ-3 боли SPEC §3. Используй конкретные числа: «теряли по N заявок в неделю». Числа — PORTFOLIO_PLACEHOLDER.]</p>
      </article>
      <article class="case__step">
        <h3 class="case__step-title">Действие</h3>
        <p>[2–4 предложения. Опиши, что собрали: сайт + Telegram-бот + связка на n8n. Без жаргона: не «вебхук», а «бот связан с календарём». Без слова «вайбкодинг» — заменяй на «современные AI-инструменты разработки».]</p>
      </article>
      <article class="case__step">
        <h3 class="case__step-title">Результат</h3>
        <p>[2–4 предложения. Цифры — PORTFOLIO_PLACEHOLDER. Указать срок: «через 3 недели». Не обещать «100 клиентов за 30 дней» — только реалистичные диапазоны с условиями.]</p>
      </article>
    </div>
    <p class="case__note">PORTFOLIO_PLACEHOLDER — конкретные имена и цифры подставляются после получения письменного согласия клиента на публикацию (152-ФЗ ст. 9).</p>
  </div>
</section>

CSS (блок /* === Case === */):

— .case__eyebrow — font-size:14px; letter-spacing:0.08em; text-transform:uppercase; color:var(--accent); margin:0 0 8px.
— .case__title — font-size:clamp(28px,3.6vw,42px); max-width:24ch; margin:0 0 12px.
— .case__client-line — font-size:15px; color:var(--text); opacity:0.6; margin:0 0 40px.
— .case__grid — display:grid; grid-template-columns:repeat(3,1fr); gap:32px.
   @media (max-width:768px) { grid-template-columns:1fr; gap:24px; }
— .case__step — background:#fff; border:1px solid var(--border); border-radius:12px; padding:28px 24px.
— .case__step-title — font-size:18px; color:var(--accent); margin:0 0 12px.
— .case__step p — font-size:16px; line-height:1.6; margin:0.
— .case__note — font-size:13px; color:var(--text); opacity:0.55; margin-top:32px; max-width:60ch.

ЧАСТЬ 2 — СЕКЦИЯ #quiz

Это точка монтирования встроенного квиза. Файлы квиза уже существуют в /assets/css/quiz.css и /assets/js/ — их НЕ ПРАВИМ.

<section id="quiz" class="quiz-section">
  <div class="container">
    <h2 class="quiz-section__title">Посчитайте свои потери</h2>
    <p class="quiz-section__lead">5 вопросов, 2 минуты. На выходе — диапазон потерь в рублях и план возврата в Telegram. Без регистрации. Контакт оставляете только если сами захотите в финале.</p>
    <div id="quiz-root"></div>
    <noscript>
      <p class="quiz-section__noscript">Для квиза нужен JavaScript. Или напишите напрямую: <a href="https://t.me/KirinaAI_bot">@KirinaAI_bot</a></p>
    </noscript>
  </div>
</section>

В index.html, перед закрывающим </body>, добавить:
<link rel="stylesheet" href="/assets/css/quiz.css">
<script type="module" src="/assets/js/quiz-embed.js"></script>

(quiz.css подключается отдельно от main.css, чтобы изоляция стилей через префикс .quiz-* не пересекалась с лендингом.)

В <head> можно добавить мягкий smooth-scroll:
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

CSS (блок /* === Quiz section === */):

— .quiz-section { padding-top: 64px; padding-bottom: 64px; background: #fff; border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
— .quiz-section__title — font-size:clamp(28px,3.6vw,42px); text-align:center; margin:0 0 12px.
— .quiz-section__lead — text-align:center; max-width:56ch; margin:0 auto 40px; font-size:18px; opacity:0.8.
— .quiz-section__noscript — text-align:center; padding:24px; border:1px dashed var(--border); border-radius:8px.
— #quiz-root — min-height:400px; (заглушка под высоту квиза до его инициализации).

152-ФЗ САМОПРОВЕРКА (НЕ ПРАВИМ файлы квиза, только проверяем):

Внутри встроенного quiz.html на финальном экране и в fallback-форме должны соблюдаться требования из consent-forms-part-1 (152-ФЗ ст. 9 ч. 1, ст. 5 ч. 5, ст. 15):
1. Чекбокс согласия на ОПД — НЕ предустановлен (без атрибута checked).
2. Рядом с чекбоксом — ссылки на /consent.html и /privacy-policy.html (target="_blank", rel="noopener").
3. Кнопка «Отправить» disabled до момента, когда чекбокс отмечен.
4. Маркетинговое согласие — отдельным чекбоксом, не объединено с согласием на ОПД.
5. В форме собираются только @username и (опционально) флаг согласия — никаких лишних полей.

Если при визуальной проверке встроенного квиза что-то из этого не выполняется — НЕ ПРАВЬ файлы квиза. Зафиксируй это как backlog-задачу: «правка идёт в исходном проекте sverhnovaya/, потом результат копируется обратно в лендинг по SPEC §10 пункт 1».

ЗАПРЕТЫ:
— НЕ менять имена селекторов .quiz-* в стилях (изоляция).
— НЕ оборачивать квиз в iframe (SPEC §10 «Чего не делать», пункт 2).
— НЕ дублировать тексты вопросов квиза в HTML лендинга (SPEC §10).
— НЕ добавлять никакой аналитики на клик «Начать квиз» — события Метрики уже зашиты внутри quiz.js (см. quiz-spec.md §9), будут стрелять только после согласия из cookie-banner Промпта 8.

Покажи итог тремя блоками:
1. HTML двух секций (#case и #quiz) подряд.
2. Дополнение к assets/css/main.css (Case + Quiz section).
3. Точные строки, которые добавляются в <head> и перед </body> для подключения quiz.css и quiz-embed.js.
```

---

## Промпт 6 — Пакеты (секция 6) + 152-ФЗ блок доверия (секция 7)

**Что получаем на выходе:**
- Секция `#packages` — три пакета с фикс-ценой как «soft surfaces» (мягкие плашки с тонкой тенью), без скрытых часов, с указанием срока 2–3 недели и 3-этапной оплаты.
- Секция `#trust-152fz` — блок-дифференциатор: «152-ФЗ из коробки», 4–5 пунктов с явными ссылками на `/privacy-policy.html`, `/consent.html`, `/cookie-policy.html`. Указание на штрафы 300–700 тыс. ₽ как мотивационный якорь.

**Опора на SPEC.md:** §4 «Value Stack» (слои 1, 2, 3, 5, 6 — основа для пакетов и блока доверия), §5 секции 6 и 7, §6 (Notion soft surfaces), §8 (152-ФЗ чеклист), §9 (статус документов и пути к ним), §0 (никакого телефона, контакт только Telegram).

**Скиллы 152-ФЗ:**
- `legal-docs.md` — обязательная структура трёх документов (`/privacy-policy.html`, `/consent.html`, `/cookie-policy.html`); ссылки в блоке доверия и (далее в Промпте 8) в футере.
- `consent-forms-part-1.md` — короткая формулировка согласия рядом с CTA пакета: «Нажимая, вы соглашаетесь с обработкой персональных данных согласно Политике…».

**Текст промпта (копировать целиком):**

```
Заполни две секции подряд: #packages (секция 6) и #trust-152fz (секция 7). Не трогай остальные секции.

Опирайся на:
— SPEC §5 секции 6 и 7.
— SPEC §4 Value Stack — слои 1 (лендинг), 2 (бот), 3 (n8n), 4 (интеграция YCLIENTS/DIKIDI/Renovatio/Google Calendar), 5 (152-ФЗ из коробки), 6 (фикс-цена + договор + 3-этапная оплата), 7 (30 дней техподдержки), 8 (передача кода в GitHub + видеоинструкция). Это основа для содержания пакетов.
— SPEC §6 — soft surfaces из Notion (мягкие плашки с тонкой тенью).
— SPEC §8 — 152-ФЗ чеклист, что должно быть видно клиенту.
— SPEC §9 — статус документов и точные пути: /privacy-policy.html, /consent.html, /cookie-policy.html (HTML-файлы в корне, не в /docs/ и не в /legal/).
— SPEC §0 — телефон НЕ упоминать. Контакт — Telegram @marinakirina111.
— CLAUDE.md — никакого «дёшево» (только «фиксированная цена», «без скрытых часов»); никаких обещаний типа «100 клиентов за 30 дней».

ЧАСТЬ 1 — СЕКЦИЯ #packages

Три пакета (Базовый / Стандартный / Расширенный — придумай человеческие названия). Цены — диапазоны, не точные числа («от Х ₽», диапазон обсуждается на консультации). 3-этапная оплата вынесена в общий блок под пакетами.

<section id="packages" class="packages">
  <div class="container">
    <h2 class="packages__title">Понятная цена и понятный объём</h2>
    <p class="packages__lead">Три пакета с фиксированной стоимостью. Объём оговорён в договоре, оплата в три этапа — без скрытых часов.</p>
    <div class="packages__grid">
      <article class="package package--basic">
        <h3 class="package__name">[Название]</h3>
        <p class="package__price">от [сумма] ₽</p>
        <p class="package__duration">2 недели</p>
        <ul class="package__features">
          <li>[Фича 1]</li>
          <!-- 4–6 пунктов -->
        </ul>
        <a class="package__cta" href="#quiz">Посчитать потери и обсудить</a>
      </article>
      <!-- ещё 2 пакета — Стандартный (рекомендуем) и Расширенный -->
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
  </div>
</section>

Под каждым CTA пакета — короткий микрокопирайт согласия с инлайн-ссылкой:
<p class="package__consent">Нажимая, вы переходите к квизу. Связь с вами после его прохождения — только если вы оставите контакт. Подробнее в <a href="/privacy-policy.html" target="_blank" rel="noopener">Политике конфиденциальности</a>.</p>

CSS (блок /* === Packages === */):

— .packages__title — text-align:center; font-size:clamp(28px,3.6vw,42px); margin:0 0 12px.
— .packages__lead — text-align:center; max-width:60ch; margin:0 auto 56px; font-size:18px; opacity:0.8.
— .packages__grid — display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:1080px; margin:0 auto.
   @media (max-width:900px) { grid-template-columns:1fr; gap:20px; }
— .package — background:#fff; border:1px solid var(--border); border-radius:14px; padding:32px 28px; box-shadow:0 1px 3px rgba(31,27,22,0.04), 0 8px 24px rgba(31,27,22,0.04); display:flex; flex-direction:column.
— .package--standard — border-color:var(--accent); position:relative.
   .package--standard::before { content:'Чаще выбирают'; position:absolute; top:-12px; left:24px; background:var(--accent); color:#fff; font-size:12px; padding:4px 10px; border-radius:999px; }
— .package__name — font-family:var(--font-display); font-size:24px; margin:0 0 12px.
— .package__price — font-family:var(--font-display); font-size:28px; color:var(--accent); margin:0 0 4px.
— .package__duration — font-size:14px; opacity:0.6; margin:0 0 24px.
— .package__features — list-style:none; padding:0; margin:0 0 28px; flex:1.
— .package__features li — padding:10px 0 10px 28px; border-bottom:1px solid var(--border); font-size:15px; line-height:1.5; position:relative.
   .package__features li::before { content:'✓'; position:absolute; left:0; top:10px; color:var(--accent); font-weight:700; }
   .package__features li:last-child { border-bottom:none; }
— .package__cta — display:block; padding:14px 20px; min-height:52px; background:var(--accent); color:#fff; text-align:center; text-decoration:none; border-radius:999px; font-weight:600; transition:background 200ms.
   .package__cta:hover, .package__cta:focus-visible { background:var(--accent-2); color:#fff; }
— .package__consent — font-size:13px; opacity:0.65; margin:12px 0 0; line-height:1.5.
— .packages__terms — max-width:780px; margin:64px auto 0; text-align:center.
— .packages__terms-list — list-style:none; padding:0; margin:24px auto; max-width:560px; text-align:left.
— .packages__terms-list li — padding:12px 16px; background:#fff; border:1px solid var(--border); border-radius:8px; margin-bottom:8px; font-size:16px.
— .packages__terms-note — font-size:14px; opacity:0.7; margin-top:16px.

ЧАСТЬ 2 — СЕКЦИЯ #trust-152fz

Это блок-дифференциатор. 152-ФЗ — не отдельная фича, а condition of doing business в РФ. Превратить юр-требование в аргумент доверия.

<section id="trust-152fz" class="trust">
  <div class="container">
    <p class="trust__eyebrow">152-ФЗ — встроенное условие, не отдельная услуга</p>
    <h2 class="trust__title">Сайт, за который не приходит штраф 300–700 тыс. ₽</h2>
    <p class="trust__lead">С 1 сентября 2025 нарушения 152-ФЗ караются по новой шкале. Делаю так, чтобы это не вас касалось.</p>
    <ul class="trust__list">
      <li>
        <h3>Серверы и шрифты — в России</h3>
        <p>Хостинг на Timeweb, шрифты PT Serif и Golos Text — локально. Ни одного запроса к Google, Meta, Cloudflare с ваших страниц.</p>
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

CSS (блок /* === Trust 152-FZ === */):

— .trust__eyebrow — font-size:13px; letter-spacing:0.08em; text-transform:uppercase; color:var(--accent); margin:0 0 12px; text-align:center.
— .trust__title — text-align:center; font-size:clamp(28px,3.6vw,42px); max-width:24ch; margin:0 auto 12px.
— .trust__lead — text-align:center; max-width:56ch; margin:0 auto 48px; font-size:18px; opacity:0.8.
— .trust__list — list-style:none; padding:0; max-width:880px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px.
   @media (max-width:768px) { grid-template-columns:1fr; }
— .trust__list li — background:#fff; border:1px solid var(--border); border-radius:12px; padding:24px.
— .trust__list h3 — font-size:18px; margin:0 0 8px; color:var(--text).
— .trust__list p — font-size:15px; line-height:1.55; margin:0; opacity:0.85.
— .trust__list a — color:var(--accent); text-decoration:underline.

ЗАПРЕТЫ (152-ФЗ):
— Никакого Google Analytics, GTM, Meta Pixel, reCAPTCHA, Hotjar — даже как отрицания: «не используем reCAPTCHA» можно, но без линков на recaptcha.google.com.
— Все три ссылки на юр. документы — относительные на тот же домен (/privacy-policy.html и т.д.), target="_blank" + rel="noopener".
— Никакого «дёшево». Только «фиксированная цена», «без скрытых часов».
— Не упоминать Instagram, Meta, блокировку.

Покажи итог двумя блоками: HTML обеих секций и дополнение к main.css.
```

---

## Промпт 7 — Future Pacing (секция 8) + FAQ (секция 9) + Кто я (секция 10)

**Что получаем на выходе:**
- `#future-pacing` — сцены «через 3 недели» из SPEC §4, четыре маркера/абзаца, тёплая декоративная арка как фон (как Hero).
- `#faq` — 6–8 вопросов из топ-возражений, аккордеон на чистом HTML/CSS через `<details>`/`<summary>` (без JS).
- `#about` — короткая личная история Марины (опыт, путь, 3 подтверждённых результата как `PORTFOLIO_PLACEHOLDER`), второе место под `/photo.png`.

**Опора на SPEC.md:** §4 «Future Pacing» (4 сцены дословно), §3 «Главные возражения и страхи» (6 пунктов — основа FAQ), §0 (Позиционирование для секции «Кто я», личная история, подтверждённые результаты), §5 секции 8/9/10, CLAUDE.md (запреты).

**Скиллы 152-ФЗ:** не применяются — копирайтинг.

**Текст промпта (копировать целиком):**

```
Заполни три секции подряд: #future-pacing (8), #faq (9), #about (10). Остальное не трогай.

Опирайся на:
— SPEC §4 «Future Pacing» — четыре сцены через 3 недели. Текст дословно, можно оформить как маркеры или 4 коротких абзаца.
— SPEC §3 «Главные возражения и страхи» — 6 пунктов: фрилансер пропадёт; уже пробовали бот; это сложно; AI напишет криво; ниша другая; страх 152-ФЗ. Каждое возражение — один FAQ-пункт. Добавь 1–2 пункта про сроки и оплату (на основе SPEC §4 Value Stack слой 6).
— SPEC §0 «Позиционирование для секции Кто я» + «Подтверждённые результаты» — основа для секции #about. Личная история — Epiphany Bridge с лицом автора.
— SPEC §0 — фото /photo.png; в #about это ВТОРОЕ место для фото (первое — в #story).
— CLAUDE.md — никакого «вайбкодинга», никакого «заменим администратора», никаких упоминаний Instagram/Meta/блокировки.

ЧАСТЬ 1 — СЕКЦИЯ #future-pacing

<section id="future-pacing" class="future">
  <div class="container">
    <p class="future__eyebrow">Через 3 недели</p>
    <h2 class="future__title">Так выглядит обычное утро после запуска</h2>
    <ul class="future__scenes">
      <li>[Сцена 1 — утром в боте 4 заявки, на которые он сам ответил ночью]</li>
      <li>[Сцена 2 — в календаре 3 подтверждения и автонапоминания]</li>
      <li>[Сцена 3 — спящий клиент за 60 дней получил предложение и записался]</li>
      <li>[Сцена 4 — мессенджер открыли один раз, для пары личных вопросов]</li>
    </ul>
  </div>
</section>

CSS (блок /* === Future Pacing === */):

— .future — background: linear-gradient(180deg, var(--bg) 0%, #F5EFE6 100%);  /* мягкий тёплый градиент */
— .future__eyebrow — font-size:14px; letter-spacing:0.08em; text-transform:uppercase; color:var(--accent); text-align:center; margin:0 0 12px.
— .future__title — text-align:center; font-size:clamp(30px,3.8vw,46px); max-width:22ch; margin:0 auto 48px.
— .future__scenes — list-style:none; padding:0; max-width:720px; margin:0 auto; display:flex; flex-direction:column; gap:20px.
— .future__scenes li — background:#fff; border:1px solid var(--border); border-radius:12px; padding:20px 24px; font-size:18px; line-height:1.55; position:relative; padding-left:56px.
— .future__scenes li::before — content:'→'; position:absolute; left:24px; top:20px; color:var(--accent); font-size:20px; font-weight:700.

ЧАСТЬ 2 — СЕКЦИЯ #faq

Аккордеон на чистом HTML — через <details>/<summary>, без JS. 6–8 вопросов.

<section id="faq" class="faq">
  <div class="container">
    <h2 class="faq__title">Что обычно спрашивают</h2>
    <div class="faq__list">
      <details class="faq__item">
        <summary>А вы не пропадёте с предоплатой?</summary>
        <div class="faq__answer">
          <p>Договор по самозанятости, чек в «Мой налог». 30/40/30 — оплата по факту: на старте, после демо, после приёмки. Код передаю в ваш GitHub-репозиторий — даже если со мной что-то случится, проект остаётся у вас вместе с 5-минутной видеоинструкцией.</p>
        </div>
      </details>
      <!-- ... ещё 5–7 пунктов под возражения SPEC §3 ... -->
    </div>
  </div>
</section>

Список вопросов (минимум 6, можно 8):
1. А вы не пропадёте с предоплатой?
2. Я уже пробовал(а) бота — конструктор, ничего не работало. Почему теперь будет?
3. Я не айтишник — справлюсь?
4. AI напишет код криво и потом всё поломается. Это не так?
5. Вы работали с моей нишей? (использовать PORTFOLIO_PLACEHOLDER в ответе на конкретные ниши)
6. 152-ФЗ — я слышал(а) про штрафы 300–700 тыс. Кто за это отвечает?
7. Сколько займёт по времени?
8. Что если YCLIENTS / DIKIDI / IDENT / Renovatio не дают API?

Каждый ответ — 2–4 предложения. Никакого «вайбкодинга», никакого «заменим администратора». Где надо — упоминать «современные AI-инструменты разработки», «администратор освободится от рутины и будет заниматься клиентами».

CSS (блок /* === FAQ === */):

— .faq__title — text-align:center; font-size:clamp(28px,3.6vw,42px); margin:0 0 40px.
— .faq__list — max-width:780px; margin:0 auto.
— .faq__item — border-bottom:1px solid var(--border).
   .faq__item:first-child { border-top:1px solid var(--border); }
— .faq__item summary — cursor:pointer; padding:20px 32px 20px 0; font-size:18px; font-weight:600; list-style:none; position:relative.
   summary::-webkit-details-marker { display:none; }
   summary::after { content:'+'; position:absolute; right:0; top:50%; transform:translateY(-50%); font-size:24px; color:var(--accent); transition:transform 200ms; }
   .faq__item[open] summary::after { content:'−'; }
— .faq__answer — padding:0 32px 20px 0; font-size:16px; line-height:1.6; color:var(--text); opacity:0.85.

ЧАСТЬ 3 — СЕКЦИЯ #about

<section id="about" class="about">
  <div class="container about__inner">
    <figure class="about__photo">
      <img src="/photo.png" alt="Марина Кирина" width="280" loading="lazy">
    </figure>
    <div class="about__text">
      <p class="about__eyebrow">Кто я</p>
      <h2 class="about__name">Марина Кирина</h2>
      <p class="about__line">Самозанятая · Пенза · работаю удалённо по всей России</p>
      <p class="about__bio">[2–3 абзаца на основе SPEC §0 «Позиционирование» и «Личная история». 5 лет руководила отделом из 20 человек на платформе Profi.ru, последние 5 лет — независимый практик, через практику прошло более 100 специалистов. Сама прошла путь от ручного ведения клиентов до автоматизации на n8n. Profi.ru — упоминаем только как платформу клиентов, не как работодателя. Никакого «AI Product Manager». Никакого «вайбкодинга».]</p>
      <h3 class="about__results-title">Подтверждённые результаты</h3>
      <ul class="about__results">
        <li>[Skill в Claude для откликов — конверсия выросла в 2 раза у психологов на Profi.ru]</li>
        <li>[CRM на n8n + Google Sheets для мастеров по ремонту — перестали терять клиентов при большом потоке]</li>
        <li>[Полный цикл коммуникации: AI-ответы, запись, подтверждения — расписание заполняется]</li>
      </ul>
      <p class="about__note">Подробные кейсы — PORTFOLIO_PLACEHOLDER, добавляются после получения письменного согласия клиентов.</p>
      <p class="about__contact">Связаться лично: <a href="https://t.me/marinakirina111" target="_blank" rel="noopener">@marinakirina111</a></p>
    </div>
  </div>
</section>

CSS (блок /* === About === */):

— .about__inner — display:grid; grid-template-columns:280px 1fr; gap:48px; align-items:start; max-width:980px; margin:0 auto.
   @media (max-width:768px) { grid-template-columns:1fr; gap:24px; }
— .about__photo img — width:100%; max-width:280px; border-radius:8px; object-fit:cover.
   @media (max-width:768px) { .about__photo { max-width:200px; margin:0 auto; } }
— .about__eyebrow — font-size:13px; letter-spacing:0.08em; text-transform:uppercase; color:var(--accent); margin:0 0 8px.
— .about__name — font-family:var(--font-display); font-size:clamp(32px,4vw,48px); margin:0 0 8px.
— .about__line — font-size:15px; opacity:0.65; margin:0 0 24px.
— .about__bio — font-size:17px; line-height:1.7; margin:0 0 32px.
— .about__results-title — font-size:18px; margin:0 0 12px.
— .about__results — list-style:none; padding:0; margin:0 0 16px.
— .about__results li — padding:10px 0 10px 24px; position:relative; font-size:15px; line-height:1.5; border-bottom:1px solid var(--border).
   .about__results li::before { content:'•'; position:absolute; left:0; color:var(--accent); font-size:20px; line-height:1; top:8px; }
   .about__results li:last-child { border-bottom:none; }
— .about__note — font-size:13px; opacity:0.6; margin:0 0 16px.
— .about__contact — font-size:16px; margin:0.

ЗАПРЕТЫ:
— Никаких номеров телефона на лендинге. Контакт — только Telegram.
— Никакого «AI Product Manager», «вайбкодинг», «заменим администратора».
— Profi.ru — только как платформа клиентов, не как работодатель.
— Никакого Instagram/Meta/блокировки.

Покажи итог двумя блоками: HTML трёх секций подряд и дополнение к main.css.
```

---

## Промпт 8 — Финальный CTA (секция 11) + Footer (секция 12) + Cookie-banner

**Что получаем на выходе:**
- `#cta-final` — короткий повторный CTA на квиз с яркой кнопкой и микрокопирайтом «5 вопросов, 2 минуты».
- `#footer` — три блока ссылок (юр. документы, контакты, «Управление согласиями» — открывает cookie-banner повторно), реквизиты оператора (ФИО, статус, ИНН-плейсхолдер), copyright.
- Cookie-banner на чистом Vanilla JS: всплывает при первом визите, равные по весу кнопки «Принять все» / «Только необходимые», ссылка «Настроить» открывает модал с раздельными чекбоксами (необходимые — disabled checked; аналитические — OFF; маркетинговые — OFF). После согласия на аналитику — динамическая инжекция Яндекс.Метрики. Отдельная кнопка в footer «Управление согласиями» переоткрывает модал и позволяет отозвать согласие.

**Опора на SPEC.md:** §0 (данные оператора, плейсхолдер `[ИНН_ЗАПОЛНИТЬ]`, никакого телефона), §4 «Hook» (CTA-надпись, микрофутер), §5 секции 11 и 12, §8 (152-ФЗ требования к cookie-banner и футеру), §9 (точные пути к трём документам), `assets/js/constants.js` (`METRIKA_ID = null` пока, заполняется вручную).

**Скиллы 152-ФЗ:**
- `cookie-banner-part-1.md` — Vanilla JS-реализация полностью: localStorage-ключ `pdp_cookie_consent`, динамическая загрузка `mc.yandex.ru/metrika/tag.js` только при `analytics: true`, скрытие баннера после выбора, модал настроек.
- `cookie-banner-part-2.md` — только Vanilla JS-принципы: 3 кнопки (Принять / Только необходимые / Настроить), модал с переключателями, логика «не показывать повторно после сохранения».
- `legal-docs.md` — обязательная структура футера: ссылки на все три документа на каждой странице, реквизиты оператора (ФИО, ИНН), copyright с годом.
- `consent-forms-part-1.md` — короткая контактная форма в футере (опционально). Если делаем форму — все правила: чекбокс не предустановлен, кнопка disabled, отдельный чекбокс маркетинга, ссылки на Политику и Согласие. Для лендинга Марины контактная форма в footer избыточна (главный контакт — Telegram), поэтому делаем только Telegram-ссылку без формы.

**Текст промпта (копировать целиком):**

```
Заполни три блока подряд: #cta-final (11), #footer (12), и cookie-banner. Это финальный промпт по контенту лендинга.

Опирайся на:
— SPEC §0 — данные оператора (Кирина Марина Александровна, самозанятая, [ИНН_ЗАПОЛНИТЬ], kirinama8910@gmail.com, @marinakirina111, Пенза). Телефона на лендинге нет.
— SPEC §4 «Hook» — текст CTA «Посчитать потери» и микрофутер.
— SPEC §5 секции 11 и 12.
— SPEC §8 — все строки чеклиста с пометкой «реализовать».
— SPEC §9 — точные имена файлов: /privacy-policy.html, /consent.html, /cookie-policy.html.
— assets/js/constants.js — METRIKA_ID = null (заполняется вручную, в коде используем переменную).
— CLAUDE.md — никакого «вайбкодинга», Instagram, Meta, телефона.

ЧАСТЬ 1 — СЕКЦИЯ #cta-final

<section id="cta-final" class="cta-final">
  <div class="container cta-final__inner">
    <h2 class="cta-final__title">Посчитайте, прежде чем решать</h2>
    <p class="cta-final__lead">5 вопросов, 2 минуты. На выходе — диапазон потерь и план возврата в Telegram.</p>
    <a class="cta-final__btn" href="#quiz">Посчитать потери</a>
    <p class="cta-final__microfooter">Без регистрации. Контакт оставляете только если сами захотите в финале.</p>
  </div>
</section>

CSS (блок /* === Final CTA === */):

— .cta-final — background:var(--accent); color:#fff; text-align:center.
— .cta-final__inner { padding-top:80px; padding-bottom:80px; max-width:720px; }
— .cta-final__title — font-family:var(--font-display); font-size:clamp(30px,4vw,46px); color:#fff; margin:0 0 16px.
— .cta-final__lead — font-size:18px; opacity:0.9; margin:0 0 32px.
— .cta-final__btn — display:inline-block; padding:18px 40px; min-height:52px; background:#fff; color:var(--accent); border-radius:999px; font-weight:600; text-decoration:none; font-size:18px; transition:transform 200ms.
   .cta-final__btn:hover, .cta-final__btn:focus-visible { transform:translateY(-1px); background:#fff; color:var(--accent-2); }
— .cta-final__microfooter — font-size:14px; opacity:0.85; margin:16px 0 0.

ЧАСТЬ 2 — FOOTER (#footer)

<footer id="footer" class="footer">
  <div class="container footer__grid">
    <div class="footer__col footer__col--legal">
      <h3 class="footer__col-title">Правовые документы</h3>
      <ul>
        <li><a href="/privacy-policy.html">Политика конфиденциальности</a></li>
        <li><a href="/consent.html">Согласие на обработку персональных данных</a></li>
        <li><a href="/cookie-policy.html">Политика использования cookie</a></li>
        <li><button type="button" id="manage-consent" class="footer__manage">Управление согласиями</button></li>
      </ul>
    </div>
    <div class="footer__col footer__col--contact">
      <h3 class="footer__col-title">Связь</h3>
      <ul>
        <li><a href="https://t.me/marinakirina111" target="_blank" rel="noopener">@marinakirina111 в Telegram</a></li>
        <li><a href="mailto:kirinama8910@gmail.com">kirinama8910@gmail.com</a></li>
      </ul>
    </div>
    <div class="footer__col footer__col--operator">
      <h3 class="footer__col-title">Оператор персональных данных</h3>
      <p>Кирина Марина Александровна<br>Самозанятая · Пенза<br>ИНН: [ИНН_ЗАПОЛНИТЬ]</p>
      <p class="footer__operator-note">Данные хранятся на серверах в РФ (Timeweb).</p>
    </div>
  </div>
  <div class="container footer__bottom">
    <small>© 2026 Кирина Марина Александровна. Все права защищены.</small>
  </div>
</footer>

CSS (блок /* === Footer === */):

— .footer — background:#1F1B16; color:#FAF7F2; padding:64px 0 32px.
— .footer__grid — display:grid; grid-template-columns:repeat(3,1fr); gap:48px.
   @media (max-width:768px) { grid-template-columns:1fr; gap:32px; }
— .footer__col-title — font-family:var(--font-display); font-size:18px; margin:0 0 16px; color:#fff.
— .footer__col ul — list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px.
— .footer__col a, .footer__manage — color:#FAF7F2; opacity:0.85; text-decoration:underline; background:none; border:none; padding:0; font:inherit; cursor:pointer; text-align:left.
   .footer__col a:hover, .footer__manage:hover { opacity:1; color:#fff; }
   .footer__manage:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
— .footer__col p — margin:0 0 8px; font-size:15px; line-height:1.6; opacity:0.85.
— .footer__operator-note — font-size:13px; opacity:0.6.
— .footer__bottom — margin-top:48px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.1); font-size:13px; opacity:0.6.

ЧАСТЬ 3 — COOKIE-BANNER (Vanilla JS, 152-ФЗ)

ТРЕБОВАНИЯ (152-ФЗ ст. 9, ст. 18.1; чеклист SPEC §8):
1. Появляется при первом визите ДО любых не-essential скриптов.
2. Кнопки «Принять все» и «Только необходимые» равны по визуальному весу (одинаковые цвета, размер, шрифт; не одна кнопка primary, другая ghost).
3. Чекбоксы аналитических и маркетинговых cookie в модале настроек — НЕ предустановлены (без атрибута checked).
4. Согласие сохраняется в localStorage по ключу 'pdp_cookie_consent' с timestamp.
5. Динамическая инжекция Яндекс.Метрики ТОЛЬКО после согласия на аналитику (analytics: true).
6. Кнопка «Управление согласиями» в footer — переоткрывает модал, позволяет изменить выбор; на отзыв аналитики — рефреш страницы.
7. Никакой Метрики, никаких других скриптов — в <head> или <body> статически. Только динамически.

HTML (вставить непосредственно перед </body>, после </footer>):

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
      <span><strong>Аналитические</strong> — Яндекс.Метрика (анонимная статистика посещений)</span>
    </label>
    <label class="cookie-settings__row">
      <input type="checkbox" id="cs-marketing">
      <span><strong>Маркетинговые</strong> — на этом сайте не используются, но переключатель сохраним для прозрачности</span>
    </label>
    <div class="cookie-settings__actions">
      <button type="button" id="cs-save" class="cb-btn">Сохранить выбор</button>
      <button type="button" id="cs-cancel" class="cb-btn cb-btn--link">Отмена</button>
    </div>
  </div>
</div>

JS (создай отдельный файл /assets/js/cookie-consent.js, подключи в <head> синхронно: <script src="/assets/js/cookie-consent.js" defer></script>):

(function () {
  const KEY = 'pdp_cookie_consent';
  // METRIKA_ID берётся из window.METRIKA_ID, который выставляется
  // в /assets/js/constants.js. Если null — Метрика не загружается даже
  // при analytics: true (значит счётчика ещё нет).

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

  function showBanner() {
    document.getElementById('cookie-banner').removeAttribute('hidden');
  }
  function hideBanner() {
    document.getElementById('cookie-banner').setAttribute('hidden', '');
  }
  function openSettings() {
    const settings = document.getElementById('cookie-settings');
    const saved = getConsent();
    document.getElementById('cs-analytics').checked = !!(saved && saved.analytics);
    document.getElementById('cs-marketing').checked = !!(saved && saved.marketing);
    settings.removeAttribute('hidden');
  }
  function closeSettings() {
    document.getElementById('cookie-settings').setAttribute('hidden', '');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const consent = getConsent();
    if (consent) { applyConsent(consent); }
    else { showBanner(); }

    document.getElementById('cb-accept-all').addEventListener('click', function () {
      const c = { necessary:true, analytics:true, marketing:true };
      saveConsent(c); applyConsent(c); hideBanner();
    });
    document.getElementById('cb-reject').addEventListener('click', function () {
      saveConsent({ necessary:true, analytics:false, marketing:false });
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
      // Если пользователь отозвал ранее данное согласие на аналитику — рефрешим
      // страницу, чтобы остановить уже загруженный счётчик.
      if (prev && prev.analytics && !c.analytics) location.reload();
    });
    document.getElementById('cs-cancel').addEventListener('click', closeSettings);

    const manage = document.getElementById('manage-consent');
    if (manage) manage.addEventListener('click', openSettings);
  });
})();

В index.html в <head> подключи константы и cookie-consent:
<script src="/assets/js/constants.js" type="module"></script>
<script>window.METRIKA_ID = null;</script>  <!-- временная заглушка; при подключении реального счётчика — заменить на число -->
<script src="/assets/js/cookie-consent.js" defer></script>

(constants.js — это ESM-модуль квиза, его METRIKA_ID отдельно. Для cookie-consent.js используем глобальный window.METRIKA_ID — это тот же ID, который пользователь подставит вручную перед запуском.)

CSS (блок /* === Cookie banner === */):

— .cookie-banner — position:fixed; left:0; right:0; bottom:0; background:#1F1B16; color:#FAF7F2; z-index:9999; padding:20px 16px; box-shadow:0 -4px 24px rgba(0,0,0,0.2).
— .cookie-banner__inner — max-width:1080px; margin:0 auto; display:grid; grid-template-columns:1fr auto; gap:20px; align-items:center.
   @media (max-width:768px) { grid-template-columns:1fr; }
— .cookie-banner__text — font-size:14px; line-height:1.5; margin:0.
— .cookie-banner__text a — color:#FAF7F2; text-decoration:underline.
— .cookie-banner__actions — display:flex; gap:12px; flex-wrap:wrap.
— .cb-btn — min-height:44px; padding:10px 18px; border-radius:6px; border:1px solid rgba(255,255,255,0.3); background:transparent; color:#FAF7F2; font:inherit; cursor:pointer; font-size:14px; transition:background 200ms.
   .cb-btn:hover, .cb-btn:focus-visible { background:rgba(255,255,255,0.1); }
— ВАЖНО: «Принять все» и «Только необходимые» — ОДИНАКОВЫЕ по стилю (.cb-btn), без primary/secondary. Это требование 152-ФЗ.
— .cb-btn--link — text-decoration:underline; border-color:transparent; padding:10px 8px.

— .cookie-settings — position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:10000; display:flex; align-items:center; justify-content:center; padding:16px.
— .cookie-settings__inner — background:#FAF7F2; color:var(--text); border-radius:12px; padding:32px; max-width:520px; width:100%.
— .cookie-settings__row — display:flex; gap:12px; align-items:flex-start; padding:12px 0; font-size:15px; line-height:1.5.
— .cookie-settings__row input — margin-top:4px; width:18px; height:18px.
— .cookie-settings__actions — display:flex; gap:12px; margin-top:24px.
— .cookie-settings__actions .cb-btn — color:var(--text); border-color:var(--border).

ЗАПРЕТЫ (152-ФЗ):
— Никакой Метрики статически в <head>. Только через loadYandexMetrika() после согласия.
— Никаких других скриптов аналитики/трекинга — нигде.
— Кнопки баннера РАВНОЗНАЧНЫ (одинаковый класс .cb-btn). Не делать одну primary, другую ghost.
— Чекбоксы analytics/marketing в модале — БЕЗ checked.
— Никаких dark patterns: «Принять все» не больше «Только необходимые», не подсвечена цветом, не выделена.

Покажи итог:
1. HTML (#cta-final + #footer + cookie-banner + cookie-settings) одним блоком.
2. Дополнение к main.css — все три новых блока (Final CTA, Footer, Cookie banner).
3. Полный код /assets/js/cookie-consent.js.
4. Точные строки, добавляемые в <head> для METRIKA_ID и подключения cookie-consent.js.
```

---

## Промпт 9 — 152-ФЗ аудит

**Что получаем на выходе:**
- Прогон по чеклисту SPEC §8 + полному чеклисту скилла `checklists-and-fines.md` («Все типы проектов» + «Дополнительно: сайты с cookie»).
- Запуск grep-команды из `audit.md` по корню репозитория для поиска запрещённых сервисов.
- Список найденных нарушений (если есть) с конкретным указанием файла и строки + плана правки.
- Финальная таблица «штраф / нарушение / мой статус» — для мотивации проверить ещё раз.

**Опора на SPEC.md:** §8 (12 строк чеклиста), §9 (статус трёх документов и плейсхолдеры), §0 (плейсхолдеры WEBHOOK_URL, METRIKA_ID, ИНН).

**Скиллы 152-ФЗ:**
- `audit.md` — grep-команда полностью.
- `checklists-and-fines.md` — два чеклиста + таблица штрафов.
- `cookie-banner-part-1.md` — повтор для самопроверки кода cookie-banner.
- `consent-forms-part-1.md` — повтор для самопроверки форм (внутри встроенного квиза).
- `mobile-specifics.md` — НЕ применяется (это про нативные мобильные приложения, не про веб-лендинг).

**Текст промпта (копировать целиком):**

```
Проведи 152-ФЗ-аудит лендинга. Цель — найти всё, что не соответствует 152-ФЗ, ДО передачи проекта пользователю.

Опирайся на:
— SPEC §8 «152-ФЗ чеклист — где что разместить» — 12 строк таблицы.
— SPEC §9 «Статус документов» — три HTML-файла должны существовать в корне; в consent.html допустимо наличие маркера [ЗАПОЛНИТЬ] (заполняется вручную).
— SPEC §0 — плейсхолдеры WEBHOOK_URL, METRIKA_ID, [ИНН_ЗАПОЛНИТЬ] — это ОЖИДАЕМО, не нарушение.

ШАГ 1 — Чеклист «Все типы проектов» (пройди подряд, каждый пункт — Да/Нет/Не применимо):

1. [ ] HTTPS и редирект с HTTP — это уровень хостинга/nginx, на этапе HTML отметить «настраивается на Timeweb отдельно».
2. [ ] Запрещённые сервисы удалены (Google Analytics, GTM, Fonts, reCAPTCHA, Facebook Pixel, Meta Pixel, Hotjar, Intercom, Cloudflare Insights, HubSpot, Mixpanel, Segment).
3. [ ] Яндекс.Метрика — только после согласия на аналитику (динамическая инжекция через cookie-consent.js).
4. [ ] Каждая форма: чекбокс согласия (не предустановлен) — проверить в quiz.html (встроенный fallback) и нигде больше форм нет.
5. [ ] Каждая форма: ссылки на Политику и Согласие рядом с чекбоксом.
6. [ ] Кнопка submit заблокирована до согласия.
7. [ ] Маркетинговые рассылки — отдельный чекбокс (либо отсутствуют — это валидно).
8. [ ] В форме только необходимые поля (для квиза — @username + чекбокс, ничего лишнего).
9. [ ] Страница /privacy-policy.html опубликована, доступна без регистрации.
10. [ ] Страница /consent.html — отдельный документ.
11. [ ] Страница /cookie-policy.html создана.
12. [ ] Ссылки на все три документа в футере каждой страницы.
13. [ ] В Политике заявлена локализация данных в РФ.
14. [ ] Хостинг в России — Timeweb (фиксируется в Политике).
15. [ ] Уведомление подано в РКН — отметить как «вручную перед запуском, физлицо-самозанятая подаёт по ст. 22 152-ФЗ».

ШАГ 2 — Чеклист «Дополнительно: сайты с cookie»:

1. [ ] Cookie-баннер при первом визите — есть.
2. [ ] Кнопка «Только необходимые» равнозначна «Принять все» (одинаковый класс .cb-btn, одинаковый стиль).
3. [ ] Аналитические / маркетинговые cookie выключены по умолчанию (без checked).
4. [ ] Cookie-предпочтения сохраняются в localStorage по ключу 'pdp_cookie_consent'.
5. [ ] Кнопка «Управление согласиями» в footer — работает, переоткрывает модал.

ШАГ 3 — Запусти grep-аудит запрещённых сервисов:

grep -r "google-analytics\|googletagmanager\|fonts\.googleapis\|recaptcha\.google\|connect\.facebook\.net\|static\.hotjar\|cdn\.mxpnl\|cdn\.segment\|cloudflareinsights\|js\.hs-scripts\|widget\.intercom\.io\|script\.hotjar" . --include="*.html" --include="*.js" --include="*.css" -l

Ожидаемый результат: пустой вывод. Любая строка в выводе = нарушение, штраф 1–6 млн ₽. Перечисли найденное (если есть) с указанием файла и удали все вхождения.

ШАГ 4 — Самопроверка cookie-banner (повтор cookie-banner-part-1):
— Скрипт Метрики НЕ статически в <head>, только через loadYandexMetrika().
— Кнопки «Принять все» и «Только необходимые» — одинаковый класс, одинаковый стиль.
— Чекбоксы analytics/marketing в модале — без атрибута checked.
— localStorage-ключ 'pdp_cookie_consent', содержит { necessary, analytics, marketing, ts }.

ШАГ 5 — Самопроверка форм (повтор consent-forms-part-1):
— На лендинге собственных форм нет (главное действие — квиз).
— Внутри встроенного quiz.html (fallback-форма): проверить визуально, что чекбокс согласия не предустановлен и кнопка disabled до согласия. Если что-то не так — НЕ ПРАВИТЬ файлы квиза, зафиксировать backlog в sverhnovaya/.

ШАГ 6 — Финальная таблица «нарушение / штраф / статус» (на основе checklists-and-fines.md):

| Нарушение | Штраф первичный | Мой статус |
|-----------|-----------------|------------|
| Неуведомление РКН | 100 000 – 300 000 | вручную перед запуском |
| Обработка ПДн без согласия | 300 000 – 700 000 | проверено, чекбоксы есть |
| Запрещённые зарубежные сервисы | 1 000 000 – 6 000 000 | grep не нашёл |
| Отсутствие cookie-баннера | 150 000 – 300 000 | баннер есть, кнопки равны |
| Утечка ПДн | 3 000 000 – 15 000 000 | хостинг РФ, шифрование на уровне Timeweb |
| Утечка биометрии | 15 000 000 – 20 000 000 | биометрия не собирается |

ВАЖНО — что НЕ применимо к этому проекту:
— mobile-specifics.md — это про нативные мобильные приложения (React Native, AppMetrica). У нас веб-лендинг.
— saas-specifics.md — нет личного кабинета, удаления аккаунта, выгрузки данных.
— ecommerce-specifics.md — платежи на лендинге не принимаются.

На выходе дай мне:
1. Заполненный чеклист «Все типы проектов» — каждый пункт с Y/N/NA + краткое обоснование.
2. Заполненный чеклист «Дополнительно: сайты с cookie» — то же.
3. Результат grep-аудита (список файлов или «пусто»).
4. Список найденных нарушений с конкретным планом правки (файл, строка, замена) — или строка «нарушений не найдено».
5. Финальную таблицу штрафов с моим статусом.
```

---

## Промпт 10 — Мобильная адаптация и финальная полировка

**Что получаем на выходе:**
- Проход по всем секциям с медиа-запросами 320–768px.
- Touch-targets ≥ 52px (`min-height: 52px` на всех `<a class="...cta...">`, `<button>`).
- `safe-area-inset-bottom` для cookie-banner и финального CTA на iPhone с home-indicator.
- Контраст текст/фон ≥ 4.5:1 (WCAG AA) — список проверенных пар.
- `:focus-visible` outline по всем интерактивным элементам.
- Шрифты ≥ 16px (iOS не зумит инпуты).
- Мобильное меню (если нужно) или решение «one-page без меню».
- `prefers-reduced-motion` — уважение настроек ОС.

**Опора на SPEC.md:** §6 (mobile-first, основной дизайн 320–768px), `docs/quiz-spec.md` §11 (полный список требований к мобильной адаптации и доступности — touch-target ≥ 52px, контраст ≥ 4.5:1, safe-area, focus-outline, шрифты ≥ 16px на iOS).

**Скиллы 152-ФЗ:** `mobile-specifics.md` НЕ применяется (это про нативные мобильные приложения). Источники требований к веб-адаптации — `docs/quiz-spec.md` §11 и SPEC §6.

**Текст промпта (копировать целиком):**

```
Проведи финальную мобильную адаптацию и полировку лендинга. Это последний промпт по верстке.

Опирайся на:
— SPEC §6 — mobile-first, основной диапазон 320–768px (большая часть трафика — TG-чаты и Я.Карты).
— docs/quiz-spec.md §11 «Мобильная адаптация и доступность» — полный список требований.
— ЯВНО НЕ применяй: mobile-specifics.md из 152-ФЗ-скиллов — это про нативные мобильные приложения (React Native, AppMetrica), а у нас веб-лендинг. Источники требований — только SPEC §6 и docs/quiz-spec.md §11.

ШАГ 1 — TOUCH-TARGETS

Пройди по всем интерактивным элементам и убедись:
— все <a class*="cta"> и <a class*="btn">: min-height: 52px; padding достаточный, чтобы строка вертикально центрировалась.
— все <button>: min-height: 44px; (а кнопки финальной формы — 52px).
— минимальная hit-area даже для текстовых ссылок в footer на mobile: padding: 8px 0;.
— FAQ summary: padding минимум 16px по вертикали — чтобы тапаться без промаха.

Если в каком-то месте нарушено — выпиши исправления в формате «селектор + правило».

ШАГ 2 — SAFE-AREA для iPhone (notch + home-indicator)

В <head> уже есть viewport-fit=cover. Теперь добавь правила:

@supports (padding: env(safe-area-inset-bottom)) {
  .cookie-banner { padding-bottom: max(20px, env(safe-area-inset-bottom)); }
  .cta-final { padding-bottom: max(80px, calc(64px + env(safe-area-inset-bottom))); }
  .footer { padding-bottom: max(32px, env(safe-area-inset-bottom)); }
}

ШАГ 3 — КОНТРАСТ ≥ 4.5:1 (WCAG AA)

Перечисли все пары «текст / фон» в проекте и для каждой укажи коэффициент контраста. Используй фактические HEX-коды из переменных:
— var(--text) #1F1B16 на var(--bg) #FAF7F2 — должно быть ≥ 12:1 ✓
— #fff на var(--accent) #C8553D — проверить (на грани WCAG AA для small text; возможно потребуется --accent-2 для текста-на-цвете).
— var(--accent) #C8553D на var(--bg) #FAF7F2 — проверить (для ссылок и акцентов).
— #FAF7F2 на #1F1B16 (футер) — должно быть ≥ 12:1 ✓
— opacity 0.6 / 0.65 / 0.85 на текстовых вспомогательных строках — проверить эффективный контраст.

Если какая-то пара не дотягивает до 4.5:1 — предложи правку: либо темнее текст, либо темнее фон, либо переход на --accent-2 для текста на цветной кнопке.

ШАГ 4 — FOCUS-OUTLINE

Убедись, что в main.css есть глобальное правило (оно было в Промпте 1):
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

И что НИГДЕ не стоит outline: none без замены. Перечисли любые случаи, где outline: none был добавлен — и предложи замену.

ШАГ 5 — ШРИФТЫ ≥ 16px НА МОБИЛЕ

Пройди по всем .cta__microfooter, .package__consent, .footer__operator-note, .case__note, .about__note, .cookie-banner__text — где font-size меньше 14px, поднять до 14–15px (это вспомогательные тексты, можно оставить 13–14px, но <13px — нет).

Поля ввода (если есть) — 16px минимум, иначе iOS зумит при фокусе. У нас полей в лендинге нет (форма только в квизе и в cookie-banner — там чекбоксы).

ШАГ 6 — PREFERS-REDUCED-MOTION

Глобально:
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

ШАГ 7 — МЕДИА-ЗАПРОСЫ ПО ВСЕМ СЕКЦИЯМ

Проверь, что каждая секция корректно выглядит на 320, 375, 414, 768, 1024, 1440px. На 320px:
— Hero — заголовок не обрезается, аватар + подпись помещаются.
— Pain — две колонки в одну, цитаты читабельны.
— Story — фото переходит вниз, лонгрид остаётся читабельным (16–17px).
— Case — три карточки в одну.
— Quiz section — высота #quiz-root корректна, padding не сжимает контент.
— Packages — три карточки в одну, бэйдж «Чаще выбирают» не наезжает.
— Trust 152-ФЗ — две колонки в одну.
— Future Pacing — список сцен, padding-left для иконки достаточен.
— FAQ — summary раскрывается, тап не промахивается.
— About — фото сверху, текст снизу, центрирование корректное.
— Final CTA — кнопка достаточно большая, микрофутер читаемый.
— Footer — три колонки в одну, ссылки тапаются.
— Cookie banner — на 320px кнопки переносятся в столбец, текст читаемый.

Если найдёшь проблемы — выпиши конкретные правки.

ШАГ 8 — ARIA-РЕВИЗИЯ

— Все иконочные кнопки (если есть) — с aria-label.
— Cookie-banner и cookie-settings — role="dialog", aria-modal="true", aria-labelledby (это уже сделано в Промпте 8).
— FAQ — <details>/<summary> нативные, ARIA не нужна.
— Footer ссылки — текстовые, ARIA не нужна.
— Никаких <div role="button"> — везде нативные <button>/<a>.

ШАГ 9 — KEYBOARD NAVIGATION

Tab по странице: hero CTA → quiz → packages CTA → footer ссылки → manage-consent. Все интерактивные достижимы. Проверь, что Tab нигде не «выпадает» и focus visible.

На выходе дай мне:
1. Сводку: «touch-target — Y/N + список правок», «safe-area — добавлено», «контраст — таблица пар + коэффициенты + правки», «focus-outline — Y/N», «шрифты ≥ 14–16px — Y/N», «prefers-reduced-motion — добавлено», «320/375/768 — список правок».
2. Дополнение к main.css в одном блоке /* === Mobile polish === */ — все правки одним куском.
3. Финальный полный index.html (если что-то правилось в нём — все правки сразу).
```

---

## Привязка скиллов 152-ФЗ к промптам — сводная таблица

| Промпт | Применённые скиллы | Что взято |
|--------|--------------------|-----------|
| 1. Каркас | core-init, technical-requirements, hosting-rkn | Локальные шрифты `@font-face`, CSP-meta, `/assets/`-структура под РФ-хостинг, никаких CDN |
| 2. Hero | core-init | Никаких трекеров на CTA, голая `<a>` |
| 3. Боль | — | Чистый копирайт |
| 4. Эпифания + Решение | — | Чистый копирайт + editorial-вёрстка |
| 5. Кейс + Квиз | consent-forms-part-1, consent-forms-part-2 (Vanilla JS-принципы) | Самопроверка fallback-формы внутри встроенного квиза: чекбокс не предустановлен, кнопка disabled, разделение чекбоксов; файлы квиза не правятся |
| 6. Пакеты + 152-ФЗ блок | legal-docs, consent-forms-part-1 | Ссылки на /privacy-policy.html, /consent.html, /cookie-policy.html в блоке доверия и под CTA пакетов |
| 7. Future Pacing + FAQ + Кто я | — | Чистый копирайт |
| 8. CTA + Footer + Cookie-banner | cookie-banner-part-1, cookie-banner-part-2 (Vanilla JS-принципы), legal-docs, consent-forms-part-1 | Полная Vanilla JS-реализация баннера, равные кнопки, динамическая инжекция Метрики после согласия, footer с тремя ссылками + manage-consent |
| 9. 152-ФЗ аудит | audit, checklists-and-fines, cookie-banner-part-1 (повтор), consent-forms-part-1 (повтор) | grep-команда, полный чеклист, таблица штрафов |
| 10. Мобильная адаптация | — *(только SPEC §6 + docs/quiz-spec.md §11)* | mobile-specifics.md из 152-ФЗ НЕ применён (это про нативные мобильные приложения) |

**Не применены вовсе:** `mobile-specifics.md`, `saas-specifics.md`, `ecommerce-specifics.md`.

---

## Памятка перед запуском

- Загрузить `SPEC.md` в Claude Project один раз.
- Все 10 промптов — в одном чате внутри Project.
- Порядок строгий: 1 → 10. Не менять местами, не пропускать.
- После Промпта 10 — скачать `index.html` и `assets/` целиком.
- Перед публикацией — заполнить вручную:
  - `[ИНН_ЗАПОЛНИТЬ]` в `consent.html`, `privacy-policy.html`, `cookie-policy.html`.
  - `WEBHOOK_URL` и `METRIKA_ID` в `assets/js/constants.js`.
  - Положить WOFF2-файлы PT Serif и Golos Text в `/assets/fonts/`.
  - Проверить, что бот `@KirinaAI_bot` создан через `@BotFather`.
  - Подать уведомление в РКН по [pd.rkn.gov.ru](https://pd.rkn.gov.ru) до начала обработки ПДн.

---

*Конец плана.*
