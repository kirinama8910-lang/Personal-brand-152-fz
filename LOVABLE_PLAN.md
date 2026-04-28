# План реализации лендинга — 10 промптов для Lovable

**Проект:** Personal-brand-152-fz (лендинг Марины Кириной)
**Дата:** 2026-04-28
**Статус:** готов к исполнению
**Инструмент:** [Lovable](https://lovable.dev/) с GitHub-интеграцией

---

## Особенности работы в Lovable

Lovable по умолчанию генерирует **React + Vite + Tailwind** проект. Нам нужен **Vanilla HTML/CSS/JS лендинг** (так зафиксировано в SPEC.md §6 и §7) — поэтому первый промпт явно противостоит дефолту: «pure HTML/CSS/JS, no React, no Tailwind, no framework». Если Lovable начнёт сопротивляться и пытаться сгенерировать React-проект — повторяй уточнение в каждом следующем промпте: «Keep this pure HTML/CSS/JS. No React. No Tailwind.»

## Как пользоваться этим планом

1. Создай новый проект в [Lovable](https://lovable.dev/).
2. **Подключи GitHub-репозиторий** Personal-brand-152-fz через интеграцию Lovable → GitHub. Так Lovable сможет читать существующие файлы (quiz.html, /assets/, юридические документы) и не выдумывать их заново.
3. **Загрузи SPEC.md в первый чат** одним из способов: либо скопируй содержимое в первое сообщение, либо используй upload-файла, если интерфейс Lovable это поддерживает. SPEC — это источник истины, на него ссылаются все промпты.
4. Все 10 промптов отправляй **в одном диалоге**, строго по порядку 1 → 10. Не открывай новый чат на каждый промпт — Lovable теряет контекст.
5. После каждого промпта проверяй preview, при необходимости проси доработать в этом же чате («fix Hero spacing», «smaller font on mobile»), и только потом переходи к следующему.
6. После Промпта 10 — экспортируй проект через GitHub-sync или скачай ZIP.

**Привязка скиллов 152-ФЗ к промптам — внизу плана, в отдельной таблице. Раскладка применимости — после неё.**

---

## Промпт 1 — Каркас и дизайн-система

**Что получаем на выходе:**

- `index.html` — скелет страницы с 12 пустыми семантическими секциями (id от `hero` до `footer`), мета-тегами, CSP-заголовком, базовым `<head>`.
- `assets/css/main.css` — CSS-переменные палитры, `@font-face` для Geologica + Onest + PT Mono, editorial-сетка с нумерацией секций, базовая типографика.
- `assets/fonts/` — папка-плейсхолдер (WOFF2-файлы пользователь положит сам перед запуском).

**Опора на SPEC.md:** §1 (Резюме), §5 (12 секций), §6 (Slow Editorial Print, палитра, принципы), §7 (Geologica + Onest + PT Mono — полные `@font-face`), §8 (152-ФЗ чеклист), §10 (`#quiz` точка монтирования).

**Скиллы 152-ФЗ:** core-init, technical-requirements, hosting-rkn — никаких трекеров, локальные шрифты через `@font-face`, российский хостинг (Timeweb), относительные пути.

**Текст промпта (копировать целиком):**

```
Создай каркас лендинга личного бренда Марины Кириной.

ВАЖНО — ТЕХНИЧЕСКОЕ ОГРАНИЧЕНИЕ:
Это статический лендинг на pure HTML / CSS / vanilla JavaScript.
НЕ создавай React-проект. НЕ используй Tailwind, Vite, Next.js, Astro.
НЕ создавай tsx-файлы, package.json для фронта, node_modules.
Структура проекта: один index.html в корне + папка /assets/ с подпапками css, js, fonts, img.
Все CSS — через собственный файл /assets/css/main.css с CSS-переменными.
Никаких CDN, никаких внешних библиотек.

Контекст: SPEC.md загружен в этот чат. Опирайся на §1, §5, §6, §7, §8, §10.

ФАЙЛ 1 — index.html

1. <!DOCTYPE html>, <html lang="ru">.
2. В <head>:
   — <meta charset="utf-8">
   — <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
   — <title>Марина Кирина — сайт + Telegram-бот + автоматизация на n8n</title>
   — <meta name="description"> на основе SPEC §1 (одно предложение, до 160 символов)
   — <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https://mc.yandex.ru https://t.me">
   — <link rel="stylesheet" href="/assets/css/main.css">
3. В <body> — 12 семантических секций строго в порядке SPEC §5:
   <section id="hero" data-section="01" data-title="Hero">
   <section id="pain" data-section="02" data-title="Узнаёте?">
   <section id="story" data-section="03" data-title="Где теряются деньги">
   <section id="case" data-section="04" data-title="Кейс">
   <section id="quiz" data-section="05" data-title="Квиз">
   <section id="packages" data-section="06" data-title="Пакеты">
   <section id="trust-152fz" data-section="07" data-title="152-ФЗ">
   <section id="future-pacing" data-section="08" data-title="Через 3 недели">
   <section id="faq" data-section="09" data-title="FAQ">
   <section id="about" data-section="10" data-title="Кто я">
   <section id="cta-final" data-section="11" data-title="Финальный CTA">
   <footer id="footer" data-section="12" data-title="Footer">
   Каждая — заглушка с <h2>Секция N</h2>. Наполнение придёт в Промптах 2–8.
4. Перед </body>: <!-- cookie-banner будет добавлен в Промпте 8 -->

ФАЙЛ 2 — assets/css/main.css

1. :root с переменными (палитра Slow Editorial Print, SPEC §6):
   --paper:#F4EFE6;
   --ink:#111111;
   --ink-muted:#4A4A48;
   --accent:#1A2B6B;
   --mark:#F6E057;
   --rule:#D9D2C2;
   --inverted:#0E0E0F;
   --font-display:'Geologica', Georgia, serif;
   --font-body:'Onest', -apple-system, BlinkMacSystemFont, sans-serif;
   --font-mono:'PT Mono', ui-monospace, Menlo, monospace;
   --section-gap:128px;
   --section-gap-mobile:80px;
   --content-max:65ch;

2. Одиннадцать @font-face блоков (полностью, см. SPEC §7):
   Geologica: 400 / 500 / 600 / 700 / 900 / italic 400 / italic 700
   Onest: 400 / 500 / 700
   PT Mono: 400
   Все с url('/assets/fonts/...woff2') format('woff2'); font-display: swap.

3. Базовые стили:
   * { box-sizing: border-box; }
   body { margin:0; background:var(--paper); color:var(--ink); font:400 18px/1.65 var(--font-body); }
   h1,h2,h3,blockquote { font-family:var(--font-display); }
   a { color:var(--accent); text-decoration:none; }
   img { max-width:100%; height:auto; display:block; }
   :focus-visible { outline:2px solid var(--accent); outline-offset:3px; }

4. Editorial-сетка:
   .container { max-width:1120px; margin:0 auto; padding:0 24px; }
   section { padding-top:var(--section-gap); padding-bottom:var(--section-gap); position:relative; }
   @media (max-width:768px) { section { padding-top:var(--section-gap-mobile); padding-bottom:var(--section-gap-mobile); } }

5. Нумерация секций — мелкий mono-маркер в верхнем углу через ::before на каждой [data-section]:
   section[data-section]::before {
     content: attr(data-section) " / " attr(data-title);
     font-family: var(--font-mono);
     font-size: 13px;
     color: var(--ink-muted);
     position: absolute;
     top: 32px;
     left: 24px;
     letter-spacing: 0.04em;
   }
   На mobile маркер уезжает в правый верхний угол.

6. SVG-noise overlay на body (бумажная атмосфера):
   body::before {
     content:'';
     position:fixed;
     inset:0;
     pointer-events:none;
     z-index:1;
     opacity:0.03;
     background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
   }

ЗАПРЕТЫ (152-ФЗ — критично):
— НЕТ ссылок fonts.googleapis.com / fonts.gstatic.com.
— НЕТ внешних CDN (cdnjs, jsDelivr, unpkg, Fontsource по сети).
— НЕТ Google Tag Manager, Google Analytics, Facebook Pixel, reCAPTCHA, Hotjar, Intercom.
— Метрики Яндекса в каркасе НЕТ (будет в Промпте 8 — динамическая инжекция).
— НЕТ скруглений (border-radius: 0 везде кроме круглых форм — аватары, чекбоксы).
— НЕТ box-shadow.
— НЕТ Inter, Roboto, Arial, Helvetica, Space Grotesk, IBM Plex даже как fallback верхнего уровня.

ВАЖНО ПРО ШРИФТЫ:
WOFF2-файлы я положу руками. Создай корректные @font-face с правильными путями, файлы пока могут отсутствовать — это нормально.

На выходе создай: index.html и assets/css/main.css в репозитории.
В чат продублируй основные блоки кода для проверки.
```

---

## Промпт 2 — Hero (секция 1)

**Что получаем на выходе:** наполненная секция `#hero` — парадокс-хедлайн, подзаголовок, CTA-кнопка → `#quiz`, микрофутер, редакторская подпись в правом нижнем углу. Без фото, без аватара, без имени-в-Hero.

**Опора на SPEC.md:** §4 «Hook» (заголовок, подзаголовок, CTA, микрофутер, редакторская подпись — дословно), §0 (правило «фото в Hero не размещается»), CLAUDE.md (запрещённые упоминания).

**Скиллы 152-ФЗ:** core-init — никаких трекеров до согласия; CTA — голая `<a href="#quiz">`.

**Текст промпта (копировать целиком):**

```
Заполни секцию #hero. Не трогай остальные секции.

Это парадокс-хедлайн редакторского калибра. Тексты — из SPEC §4 «Hook» дословно.

HTML внутри #hero:

<section id="hero" data-section="01" data-title="Hero" class="hero">
  <div class="container hero__inner">
    <h1 class="hero__title">Лучшее, что вы сделаете для бизнеса — перестанете быть в нём незаменимым.</h1>
    <p class="hero__subtitle">Когда каждое сообщение, каждая запись и каждый возврат проходят через вас — бизнес упирается в ваше время. Посчитайте, во что это обходится — в рублях по вашим ценам.</p>
    <a class="hero__cta" href="#quiz">Посчитать за 2 минуты</a>
    <p class="hero__microfooter">5 вопросов. Без регистрации. Контакт оставляете только если сами захотите в финале.</p>
    <p class="hero__editor-credit">Для практиков-одиночек и владельцев студий · Марина Кирина</p>
  </div>
</section>

CSS (новый блок /* === Hero === */ в main.css):

— .hero — min-height: 92vh на desktop, 100vh на mobile; display: flex; flex-direction: column; justify-content: center; position: relative.
— .hero__inner — max-width: 1080px.
— .hero__title — font-family: var(--font-display); font-weight: 900; font-size: clamp(48px, 6.5vw, 84px); line-height: 1.05; letter-spacing: -0.02em; max-width: 18ch; margin: 0 0 32px; color: var(--ink).
   На desktop — через negative margin-left (-2ch) висит частично в маржине editorial-сетки. На mobile margin-left: 0.
— .hero__subtitle — font-size: clamp(19px, 2vw, 22px); line-height: 1.55; max-width: 56ch; margin: 0 0 48px; color: var(--ink); opacity: 0.85.
— .hero__cta — display: inline-block; padding: 20px 40px; min-height: 56px; background: var(--accent); color: var(--paper); border: none; border-radius: 0; font-family: var(--font-body); font-weight: 500; font-size: 18px; letter-spacing: 0.01em; transition: background 240ms ease-out.
   :hover, :focus-visible { background: var(--ink); color: var(--paper); outline: none; }
— .hero__microfooter — font-size: 14px; color: var(--ink-muted); margin: 16px 0 0; max-width: 50ch.
— .hero__editor-credit — font-family: var(--font-mono); font-size: 13px; color: var(--ink-muted); opacity: 0.6; position: absolute; bottom: 32px; right: 24px; letter-spacing: 0.02em; text-align: right.
   На mobile — статически под микрофутером, margin-top: 32px, position: static, text-align: left, opacity: 0.55.

Анимация загрузки (только для Hero, единственный staggered reveal):
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

ЗАПРЕТЫ:
— НЕТ фото, аватара, иконок мессенджеров, имени или статуса под кнопкой CTA. Редакторская подпись в углу — это credit автора эссе, не блок «о себе».
— НЕТ слов «Instagram», «Meta», «блокировка», «вайбкодинг», «дёшево», «100 клиентов за 30 дней».
— НЕТ аналитики на клик CTA (никаких ym(), никаких onclick). CTA — голая <a href="#quiz">.
— НЕТ target="_blank" — это якорь на ту же страницу.
— НЕТ скруглений у кнопки (border-radius: 0). Editorial-стиль.
```

---

## Промпт 3 — Боль (секция 2)

**Что получаем на выходе:** секция `#pain` с заголовком «Незаменимость в полевых условиях выглядит так», лидом про психолога в Москве и владелицу в Марьиной Роще, две колонки голосов — Елены и Анны.

**Опора на SPEC.md:** §5 «Уточнения копирайта по секциям → Секция 2 (Pain)» (заголовок и лид дословно), §3 «Портрет», §3 «Внутренний диалог в 23:47», §3 «Топ-3 боли», CLAUDE.md.

**Скиллы 152-ФЗ:** не применяются.

**Текст промпта (копировать целиком):**

```
Заполни секцию #pain. Не трогай остальные секции.

Тексты — из SPEC §5 «Уточнения копирайта по секциям → Секция 2» (заголовок и лид) и SPEC §3 (портреты, внутренний диалог 23:47, топ-3 боли).

ВАЖНО:
— Заголовок прямо ссылается на хедлайн Hero («незаменимость»). Не перефразировать.
— Лид сразу подсаживает обе ниши.
— Цитаты — от первого лица, разговорным языком, как ночной внутренний голос. Никаких маркетинговых формулировок.

HTML:

<section id="pain" data-section="02" data-title="Узнаёте?" class="pain">
  <div class="container">
    <h2 class="pain__title">Незаменимость в полевых условиях выглядит так</h2>
    <p class="pain__lead">Психолог-практик в Москве и владелица студии в Марьиной Роще — два разных бизнеса, одна и та же ночь.</p>
    <div class="pain__columns">
      <article class="pain__voice">
        <h3 class="pain__voice-name">Елена, психолог-практик</h3>
        <p class="pain__voice-meta">Москва · 6 лет в практике · 25–30 сессий/мес</p>
        <ul class="pain__voice-quotes">
          <li>«[Цитата 1 — про сайт «вроде есть, но заявок ноль»; SPEC §3, лицо 1]»</li>
          <li>«[Цитата 2 — про «сколько ушло — страшно считать»; внутренний диалог 23:47]»</li>
          <li>«[Цитата 3 — про страх найма и «у него тоже будет ночь»]»</li>
        </ul>
      </article>
      <article class="pain__voice">
        <h3 class="pain__voice-name">Анна, владелица студии маникюра</h3>
        <p class="pain__voice-meta">Марьина Роща · 3 мастера · YCLIENTS</p>
        <ul class="pain__voice-quotes">
          <li>«[Цитата 1 — записи теряются после 20:00, уходят в соседнее место; топ-3 боли]»</li>
          <li>«[Цитата 2 — рутина в мессенджерах до ночи; топ-3 боли]»</li>
          <li>«[Цитата 3 — «я мастер, а полдня — секретарь»; внутренний диалог]»</li>
        </ul>
      </article>
    </div>
  </div>
</section>

CSS (блок /* === Pain === */):

— .pain__title — font-family: var(--font-display); font-weight: 700; font-size: clamp(32px, 4vw, 52px); max-width: 22ch; margin: 0 0 12px; line-height: 1.1.
— .pain__lead — font-size: clamp(19px, 2vw, 22px); max-width: 60ch; margin: 0 0 72px; color: var(--ink-muted); line-height: 1.55.
— .pain__columns — display: grid; grid-template-columns: 1fr 1fr; gap: 56px; max-width: 980px.
   @media (max-width: 768px) { grid-template-columns: 1fr; gap: 40px; }
— .pain__voice — border-top: 1px solid var(--rule); padding-top: 32px.
— .pain__voice-name — font-family: var(--font-display); font-weight: 600; font-size: 22px; margin: 0 0 4px.
— .pain__voice-meta — font-family: var(--font-mono); font-size: 13px; color: var(--ink-muted); margin: 0 0 32px; letter-spacing: 0.02em.
— .pain__voice-quotes — list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 24px.
— .pain__voice-quotes li — padding-left: 20px; border-left: 2px solid var(--accent); font-size: 17px; line-height: 1.6.

ЗАПРЕТЫ:
— НЕТ слов «Instagram», «Meta», «блокировка», «вайбкодинг», «дёшево».
— НЕТ кнопок и CTA в этой секции — цель «узнавание», не «действие».
— НЕТ эмодзи в цитатах. Графические маркеры — только типографические (—, ·, №).
— НЕТ скруглений у карточек.
```

---

## Промпт 4 — Эпифания + Решение (секция 3)

**Что получаем на выходе:** секция `#story` — две сцены (салон 23:47 + эксперт 19:30 на агрегаторе), метафора щелей, эпифания, оффер одним предложением, мини-Value-Stack из 4 слоёв (продукт «одной штукой»). Фото Марины 400px справа от текста на desktop.

**Опора на SPEC.md:** §4 «Story (Epiphany Bridge)» — обе сцены дословно, §4 «Offer одним предложением», §4 Value Stack (слои 1–4 — здесь, слои 5–8 — в Промпте 6 «Пакеты»), §0 (фото в секции 3, max-width 400px, без скруглений).

**Скиллы 152-ФЗ:** не применяются.

**Текст промпта (копировать целиком):**

```
Заполни секцию #story — самую важную секцию лендинга. Не трогай остальные.

Тексты — дословно из SPEC §4 (Story, Offer, Value Stack слои 1–4).
Фото — /photo.png (уже в репозитории).

ВАЖНО:
— Две сцены подряд: салонная (23:47, «есть слоты на завтра») и экспертно-психологическая (19:30, «человек выбирал между вами и тремя коллегами на агрегаторе»). Не одна. Не «или». Подаются друг за другом, как два кадра одного эссе.
— Value Stack здесь — ТОЛЬКО слои 1–4 (продукт). Слои 5–8 (страховка) идут в секции 6 «Пакеты». Так сказано в SPEC §4.
— Фото без скруглений (border-radius: 0), filter: grayscale(0.15) для репортажного feel.

HTML:

<section id="story" data-section="03" data-title="Где теряются деньги" class="story">
  <div class="container">
    <div class="story__layout">
      <div class="story__text">
        <h2 class="story__title">Где на самом деле теряются деньги</h2>
        <blockquote class="story__scene story__scene--salon">
          <p><strong>23:47.</strong> В чат прилетает: «есть свободные слоты на завтра?»</p>
          <p>Вы открываете телефон в 8:30. К этому моменту человек уже записался в соседнее место.</p>
        </blockquote>
        <blockquote class="story__scene story__scene--expert">
          <p><strong>Или так. Понедельник, 19:30.</strong> Вы только что закончили сессию, телефон молчал три часа.</p>
          <p>На агрегаторе за это время человек выбрал между вами и тремя коллегами — записался к той, кто ответила первой. Не к лучшей, к доступной.</p>
        </blockquote>
        <p>Вот в этой щели — между сообщением и ответом — теряются деньги. И таких щелей за день десятки: между визитом и попыткой вернуть, между «оставил заявку» и «оплатил», между «забыл» и «напомнили».</p>
        <p>Эту щель нельзя закрыть, наняв ещё одного человека — у него тоже будет ночь и выходные.</p>
        <p>Её закрывает только машина, которая работает за вас. Сайт приводит. Бот принимает 24/7. Автоматизация помнит и возвращает. <mark class="story__mark">Это не три отдельных покупки — это одна штука.</mark></p>
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

CSS (блок /* === Story === */):

— .story__layout — display: grid; grid-template-columns: minmax(0, 65ch) 400px; gap: 64px; align-items: start; max-width: 1100px.
   @media (max-width: 900px) { grid-template-columns: 1fr; }
— .story__title — font-family: var(--font-display); font-weight: 700; font-size: clamp(32px, 4vw, 52px); margin: 0 0 40px; line-height: 1.1.
— .story__text p, .story__text blockquote p — font-size: 19px; line-height: 1.7; margin: 0 0 28px.
— .story__scene — margin: 0 0 28px; padding: 24px 28px; border-left: 3px solid var(--accent); background: rgba(255,255,255,0.4).
   .story__scene p:last-child { margin-bottom: 0; }
   .story__scene strong { font-family: var(--font-mono); letter-spacing: 0.02em; }
— .story__mark — background: var(--mark); padding: 0 4px; font-family: var(--font-display); font-weight: 600.
— .story__epiphany — font-family: var(--font-display); font-style: italic; font-weight: 500; font-size: 24px; line-height: 1.4; margin: 40px 0 0; padding: 0; border: none; max-width: 30ch; color: var(--ink); position: relative; padding-left: 32px.
   .story__epiphany::before { content: '«'; position: absolute; left: -8px; top: -16px; font-size: 64px; color: var(--accent); line-height: 1; }
— .story__photo img — width: 100%; max-width: 400px; border-radius: 0; filter: grayscale(0.15).
— .story__photo-caption — font-family: var(--font-mono); font-size: 13px; color: var(--ink-muted); margin: 12px 0 0; text-align: left.
— .story__divider — border: none; height: 1px; background: var(--rule); margin: 80px auto; max-width: 120px.
— .story__offer — font-family: var(--font-display); font-weight: 500; font-size: clamp(24px, 2.8vw, 32px); text-align: center; max-width: 32ch; margin: 0 auto; line-height: 1.3.
— .value-stack — list-style: none; padding: 0; margin: 0 auto; max-width: 780px.
— .value-stack__item — display: grid; grid-template-columns: 72px 1fr; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--rule).
   .value-stack__item:last-child { border-bottom: none; }
— .value-stack__num — font-family: var(--font-mono); font-size: 28px; color: var(--accent); line-height: 1.
— .value-stack__what — font-family: var(--font-display); font-weight: 600; font-size: 22px; margin: 0 0 6px.
— .value-stack__why — font-size: 17px; color: var(--ink-muted); margin: 0; line-height: 1.5.
— .value-stack__note — font-size: 14px; color: var(--ink-muted); margin: 32px auto 0; max-width: 60ch; text-align: center; font-style: italic.

ЗАПРЕТЫ:
— НЕТ слов «вайбкодинг», «заменим администратора», «дёшево», «Instagram», «Meta», «блокировка».
— НЕТ CTA внутри секции — повествование, не действие.
— НЕТ скруглений у фото и блоков.
— НЕТ box-shadow.
```

---

## Промпт 5 — Кейс (секция 4) + Квиз (секция 5)

**Что получаем на выходе:** секция `#case` с обезличенным полу-кейсом «×2 за 6 недель» (без PORTFOLIO_PLACEHOLDER на главной позиции); секция `#quiz` с точкой монтирования `<div id="quiz-root">`, подключение готового quiz.html через quiz-embed.js, fallback `<noscript>`. Файлы квиза в репозитории — НЕ ПРАВИМ.

**Опора на SPEC.md:** §5 «Уточнения по Секции 4» (точный текст полу-кейса), §10 (встройка квиза — 6 пунктов), §0 (плейсхолдеры).

**Скиллы 152-ФЗ:** consent-forms-part-1, consent-forms-part-2 (Vanilla JS-принципы) — самопроверка fallback-формы внутри quiz.html.

**Текст промпта (копировать целиком):**

```
Заполни две секции подряд: #case и #quiz.

Тексты кейса — дословно из SPEC §5 «Уточнения по секциям → Секция 4». Файлы квиза (quiz.html, /assets/css/quiz.css, /assets/js/quiz-embed.js, /assets/js/quiz.js, calculator.js, scoring.js, webhook.js, analytics.js) уже есть в репозитории. НЕ ТРОГАЙ их.

ЧАСТЬ 1 — СЕКЦИЯ #case (обезличенный полу-кейс с цифрой)

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

CSS (блок /* === Case === */):

— .case__eyebrow — font-family: var(--font-mono); font-size: 13px; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 12px.
— .case__title — font-family: var(--font-display); font-weight: 700; font-size: clamp(30px, 3.6vw, 44px); max-width: 24ch; margin: 0 0 8px.
— .case__client-line — font-family: var(--font-mono); font-size: 13px; color: var(--ink-muted); margin: 0 0 56px.
— .case__grid — display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px.
   @media (max-width: 768px) { grid-template-columns: 1fr; gap: 24px; }
— .case__step — border-top: 1px solid var(--rule); padding-top: 24px.
— .case__step-num — font-family: var(--font-mono); font-size: 18px; color: var(--accent); margin: 0 0 8px.
— .case__step-title — font-family: var(--font-display); font-weight: 600; font-size: 20px; margin: 0 0 12px.
— .case__step p — font-size: 16px; line-height: 1.6; margin: 0; color: var(--ink).
— .case__bridge — font-family: var(--font-display); font-style: italic; font-size: 19px; margin: 56px auto 0; max-width: 50ch; text-align: center; color: var(--ink).

ЧАСТЬ 2 — СЕКЦИЯ #quiz (точка монтирования)

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

В index.html, перед </body>, добавить:
<link rel="stylesheet" href="/assets/css/quiz.css">
<script type="module" src="/assets/js/quiz-embed.js"></script>

В <head> добавить smooth scroll:
<style>
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
</style>

CSS (блок /* === Quiz section === */):

— .quiz-section { padding-top: 80px; padding-bottom: 80px; background: var(--paper); border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
— .quiz-section__title — font-family: var(--font-display); font-weight: 700; font-size: clamp(30px, 3.6vw, 44px); text-align: center; margin: 0 0 12px.
— .quiz-section__lead — text-align: center; max-width: 56ch; margin: 0 auto 48px; font-size: 18px; color: var(--ink-muted); line-height: 1.55.
— .quiz-section__noscript — text-align: center; padding: 24px; border: 1px dashed var(--rule).
— #quiz-root { min-height: 400px; }

САМОПРОВЕРКА 152-ФЗ (только проверяем, файлы квиза НЕ правим):
1. Чекбокс согласия в fallback-форме quiz.html — не предустановлен.
2. Рядом с чекбоксом — ссылки на /consent.html и /privacy-policy.html (target="_blank", rel="noopener").
3. Кнопка submit disabled до отметки чекбокса.
4. Маркетинговое согласие — отдельным чекбоксом (если есть).
Если что-то не так — НЕ ПРАВЬ файлы квиза. Скажи мне, я исправлю отдельно.

ЗАПРЕТЫ:
— НЕТ изменений в quiz.html, /assets/css/quiz.css, /assets/js/*.
— НЕТ iframe для встройки квиза.
— НЕТ дублирования вопросов квиза в HTML лендинга.
— НЕТ аналитики на клик «Посчитать» — события Метрики уже встроены в quiz.js, отрабатывают только после согласия из cookie-banner Промпта 8.
```

---

## Промпт 6 — Пакеты (секция 6) + 152-ФЗ блок (секция 7)

**Что получаем на выходе:**
- Секция `#packages` — три фиксированных пакета **Эксперт / Студия / Поток**, без soft surfaces (тонкая рамка, без скруглений), 3-этапная оплата 30/40/30. Каждый пакет содержит слои 5–8 Value Stack из §4.
- Секция `#trust-152fz` — блок-дифференциатор. **Первым пунктом — «Данные клиентов не утекают» (тайна клиента, для психолога Елены)**. Далее 5 пунктов общего блока. Указание на штраф **до 6 млн ₽**.

**Опора на SPEC.md:** §5 «Уточнения → Секция 6» (Эксперт/Студия/Поток), §5 «Уточнения → Секция 7» (тайна клиента), §4 Value Stack (слои 5–8 + слой 5 с обновлённым штрафом «до 6 млн ₽»), §8, §9, §0.

**Скиллы 152-ФЗ:** legal-docs (ссылки на /privacy-policy.html, /consent.html, /cookie-policy.html), consent-forms-part-1 (формулировка под CTA пакета).

**Текст промпта (копировать целиком):**

```
Заполни две секции подряд: #packages и #trust-152fz.

Тексты — из SPEC §5 «Уточнения по секциям → Секция 6 и Секция 7» и §4 Value Stack слои 5–8.
Названия пакетов — ФИКСИРОВАННЫЕ: Эксперт / Студия / Поток. Не Базовый/Стандартный/Расширенный.

ЧАСТЬ 1 — СЕКЦИЯ #packages

<section id="packages" data-section="06" data-title="Пакеты" class="packages">
  <div class="container">
    <h2 class="packages__title">Понятная цена и понятный объём</h2>
    <p class="packages__lead">Три пакета с фиксированной стоимостью. Объём оговорён в договоре, оплата в три этапа — без скрытых часов.</p>
    <div class="packages__grid">

      <article class="package package--expert">
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

      <article class="package package--studio">
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

      <article class="package package--flow">
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

CSS (блок /* === Packages === */):

— .packages__title — font-family: var(--font-display); font-weight: 700; font-size: clamp(30px, 3.6vw, 44px); text-align: center; margin: 0 0 12px.
— .packages__lead — text-align: center; max-width: 60ch; margin: 0 auto 64px; font-size: 18px; color: var(--ink-muted); line-height: 1.55.
— .packages__grid — display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1080px; margin: 0 auto.
   @media (max-width: 900px) { grid-template-columns: 1fr; gap: 20px; }
— .package — border: 1px solid var(--rule); padding: 36px 32px; display: flex; flex-direction: column; background: var(--paper).
— .package--studio — border-color: var(--accent); position: relative.
   .package--studio::before { content: 'Чаще выбирают'; font-family: var(--font-mono); position: absolute; top: -10px; left: 24px; background: var(--paper); color: var(--accent); font-size: 12px; padding: 0 8px; letter-spacing: 0.04em; }
— .package__name — font-family: var(--font-display); font-weight: 700; font-size: 28px; margin: 0 0 8px.
— .package__for — font-size: 14px; color: var(--ink-muted); margin: 0 0 24px; line-height: 1.5.
— .package__price — font-family: var(--font-mono); font-size: 24px; color: var(--accent); margin: 0 0 4px; letter-spacing: -0.01em.
— .package__duration — font-family: var(--font-mono); font-size: 13px; color: var(--ink-muted); margin: 0 0 28px.
— .package__features — list-style: none; padding: 0; margin: 0 0 32px; flex: 1.
— .package__features li — padding: 12px 0 12px 24px; border-bottom: 1px solid var(--rule); font-size: 15px; line-height: 1.5; position: relative.
   .package__features li::before { content: '—'; position: absolute; left: 0; top: 12px; color: var(--accent); font-weight: 600; }
   .package__features li:last-child { border-bottom: none; }
— .package__cta — display: block; padding: 16px 24px; min-height: 52px; background: var(--accent); color: var(--paper); border-radius: 0; text-align: center; text-decoration: none; font-family: var(--font-body); font-weight: 500; font-size: 16px; transition: background 240ms ease-out.
   .package__cta:hover, .package__cta:focus-visible { background: var(--ink); color: var(--paper); }
— .packages__terms — max-width: 720px; margin: 80px auto 0; text-align: center.
— .packages__terms-list — list-style: none; padding: 0; margin: 24px auto; max-width: 540px; text-align: left.
— .packages__terms-list li — padding: 14px 20px; border: 1px solid var(--rule); margin-bottom: 10px; font-size: 16px.
— .packages__terms-note — font-size: 14px; color: var(--ink-muted); margin-top: 16px.
— .packages__consent — font-size: 13px; color: var(--ink-muted); margin: 48px auto 0; max-width: 60ch; text-align: center; line-height: 1.6.
— .packages__consent a — color: var(--accent); text-decoration: underline.

ЧАСТЬ 2 — СЕКЦИЯ #trust-152fz

ВАЖНО: первым пунктом в списке идёт «Данные клиентов не утекают» — это для психолога Елены, у кого этический кодекс жёстче закона. Без этого пункта блок работает только на Анну-салон.

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

CSS (блок /* === Trust 152-FZ === */):

— .trust__eyebrow — font-family: var(--font-mono); font-size: 13px; color: var(--accent); letter-spacing: 0.06em; text-transform: uppercase; text-align: center; margin: 0 0 12px.
— .trust__title — font-family: var(--font-display); font-weight: 700; font-size: clamp(30px, 3.6vw, 46px); text-align: center; max-width: 24ch; margin: 0 auto 16px; line-height: 1.1.
— .trust__lead — text-align: center; max-width: 56ch; margin: 0 auto 56px; font-size: 18px; color: var(--ink-muted); line-height: 1.55.
— .trust__list — list-style: none; padding: 0; max-width: 920px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--rule).
   @media (max-width: 768px) { grid-template-columns: 1fr; }
— .trust__list li — background: var(--paper); padding: 28px.
— .trust__list h3 — font-family: var(--font-display); font-weight: 600; font-size: 19px; margin: 0 0 12px; color: var(--ink).
— .trust__list p — font-size: 15px; line-height: 1.6; margin: 0; color: var(--ink-muted).
— .trust__list a — color: var(--accent); text-decoration: underline.

ЗАПРЕТЫ:
— НЕТ слов «Instagram», «Meta», «дёшево», «вайбкодинг».
— Все три ссылки на юр. документы — относительные на тот же домен (/privacy-policy.html и т.д.), target="_blank" + rel="noopener".
— Цифра штрафа — «до 6 млн ₽», не «300–700 тыс.» (это нижняя планка, нам нужна верхняя).
```

---

## Промпт 7 — Future Pacing (8) + FAQ (9) + Кто я (10)

**Что получаем на выходе:**
- `#future-pacing` — две колонки: «Утро Елены (психолог)» и «Утро Анны (студия)», по 2 сцены в каждой.
- `#faq` — 8 вопросов через `<details>/<summary>`, без JS. Включая фиксированный ответ на «работали ли с моей нишей» (без PORTFOLIO_PLACEHOLDER).
- `#about` — личная история Марины + 3 подтверждённых результата + фото.

**Опора на SPEC.md:** §4 Future Pacing (две колонки), §3 «Главные возражения», §5 «Уточнения → Секция 9» (FAQ ответ про нишу), §0 (Позиционирование, личная история).

**Скиллы 152-ФЗ:** не применяются.

**Текст промпта (копировать целиком):**

```
Заполни три секции подряд: #future-pacing, #faq, #about.

Тексты Future Pacing — дословно из SPEC §4 (две колонки).
Тексты FAQ — на основе SPEC §3 «Главные возражения» + SPEC §5 «Уточнения → Секция 9» (ответ про нишу — фиксированный, не использовать PORTFOLIO_PLACEHOLDER).
Тексты About — из SPEC §0 «Позиционирование» + «Подтверждённые результаты».

ЧАСТЬ 1 — СЕКЦИЯ #future-pacing (две колонки: Елена + Анна)

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

CSS (/* === Future Pacing === */):

— .future__eyebrow — font-family: var(--font-mono); font-size: 14px; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; text-align: center; margin: 0 0 12px.
— .future__title — font-family: var(--font-display); font-weight: 700; font-size: clamp(32px, 4vw, 48px); text-align: center; max-width: 22ch; margin: 0 auto 56px; line-height: 1.1.
— .future__grid — display: grid; grid-template-columns: 1fr 1fr; gap: 48px; max-width: 980px; margin: 0 auto.
   @media (max-width: 768px) { grid-template-columns: 1fr; gap: 40px; }
— .future__column — border-top: 1px solid var(--rule); padding-top: 24px.
— .future__column-title — font-family: var(--font-display); font-weight: 600; font-size: 22px; margin: 0 0 24px.
— .future__scenes — list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 20px.
— .future__scenes li — padding-left: 24px; position: relative; font-size: 17px; line-height: 1.6.
   .future__scenes li::before { content: '—'; position: absolute; left: 0; top: 0; color: var(--accent); font-weight: 700; }

ЧАСТЬ 2 — СЕКЦИЯ #faq

Аккордеон через <details>/<summary>, без JS. 8 вопросов.

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
          <p>YCLIENTS и DIKIDI отдают API — работаю напрямую. IDENT и Renovatio — через промежуточные интеграции, делаю обходные пути, чтобы данные синхронизировались автоматически. Если ваш сервис не из этого списка — на демо проверим, что есть, и придумаем, как связать.</p>
        </div>
      </details>
    </div>
  </div>
</section>

CSS (/* === FAQ === */):

— .faq__title — font-family: var(--font-display); font-weight: 700; font-size: clamp(30px, 3.6vw, 44px); text-align: center; margin: 0 0 56px.
— .faq__list — max-width: 780px; margin: 0 auto.
— .faq__item — border-bottom: 1px solid var(--rule).
   .faq__item:first-child { border-top: 1px solid var(--rule); }
— .faq__item summary — cursor: pointer; padding: 24px 40px 24px 0; font-family: var(--font-body); font-weight: 500; font-size: 18px; list-style: none; position: relative.
   summary::-webkit-details-marker { display: none; }
   summary::after { content: '+'; font-family: var(--font-mono); position: absolute; right: 0; top: 50%; transform: translateY(-50%); font-size: 24px; color: var(--accent); transition: transform 200ms; }
   .faq__item[open] summary::after { content: '−'; }
— .faq__answer — padding: 0 40px 24px 0; font-size: 16px; line-height: 1.65; color: var(--ink-muted).

ЧАСТЬ 3 — СЕКЦИЯ #about

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

CSS (/* === About === */):

— .about__inner — display: grid; grid-template-columns: 280px 1fr; gap: 56px; align-items: start; max-width: 980px; margin: 0 auto.
   @media (max-width: 768px) { grid-template-columns: 1fr; gap: 32px; }
— .about__photo img — width: 100%; max-width: 280px; border-radius: 0; filter: grayscale(0.15).
   @media (max-width: 768px) { .about__photo { max-width: 200px; } }
— .about__eyebrow — font-family: var(--font-mono); font-size: 13px; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 8px.
— .about__name — font-family: var(--font-display); font-weight: 700; font-size: clamp(36px, 4.5vw, 56px); margin: 0 0 8px; line-height: 1.05.
— .about__line — font-family: var(--font-mono); font-size: 14px; color: var(--ink-muted); margin: 0 0 32px.
— .about__bio — font-size: 17px; line-height: 1.7; margin: 0 0 40px.
— .about__results-title — font-family: var(--font-display); font-weight: 600; font-size: 18px; margin: 0 0 16px.
— .about__results — list-style: none; padding: 0; margin: 0 0 16px.
— .about__results li — padding: 12px 0 12px 24px; position: relative; font-size: 15px; line-height: 1.55; border-bottom: 1px solid var(--rule).
   .about__results li::before { content: '—'; position: absolute; left: 0; top: 12px; color: var(--accent); font-weight: 700; }
   .about__results li:last-child { border-bottom: none; }
— .about__note — font-family: var(--font-mono); font-size: 13px; color: var(--ink-muted); margin: 16px 0; line-height: 1.5.
— .about__contact — font-size: 16px; margin: 0.

ЗАПРЕТЫ:
— НЕТ номера телефона. Контакт только Telegram.
— НЕТ слов «AI Product Manager», «вайбкодинг», «заменим администратора».
— Profi.ru — только как платформа клиентов, не как работодатель.
```

---

## Промпт 8 — Финальный CTA (11) + Footer (12) + Cookie-banner

**Что получаем на выходе:**
- `#cta-final` — закрывающий аргумент с loss-aversion и ссылкой на эпифанию (не повтор Hero).
- `#footer` — три блока (юр-документы, контакты, реквизиты оператора), кнопка «Управление согласиями».
- Cookie-banner на чистом Vanilla JS: всплывает на первом визите, равные кнопки, settings-modal с раздельными чекбоксами, динамическая инжекция Метрики после согласия.

**Опора на SPEC.md:** §5 «Уточнения → Секция 11» (текст финального CTA дословно), §0 (оператор), §8 (cookie-banner требования), §9 (пути к документам).

**Скиллы 152-ФЗ:** cookie-banner-part-1 (Vanilla JS), cookie-banner-part-2 (Vanilla JS-принципы), legal-docs (footer), consent-forms-part-1 (формулировки).

**Текст промпта (копировать целиком):**

```
Заполни три блока: #cta-final, #footer, и cookie-banner.

Тексты финального CTA — дословно из SPEC §5 «Уточнения → Секция 11». Это НЕ повтор Hero, а закрывающий аргумент.

ЧАСТЬ 1 — СЕКЦИЯ #cta-final

<section id="cta-final" data-section="11" data-title="Финальный CTA" class="cta-final">
  <div class="container cta-final__inner">
    <h2 class="cta-final__title">Если дочитали — значит узнали себя.</h2>
    <p class="cta-final__lead">Пока вы решаете, в каком из соседних мест уже сидит ваш следующий клиент. Посчитайте, во сколько это обходится за месяц.</p>
    <a class="cta-final__btn" href="#quiz">Посчитать за 2 минуты</a>
  </div>
</section>

CSS (/* === Final CTA === */):

— .cta-final — background: var(--inverted); color: var(--paper); text-align: center.
— .cta-final__inner — padding-top: 96px; padding-bottom: 96px; max-width: 720px.
— .cta-final__title — font-family: var(--font-display); font-weight: 700; font-size: clamp(32px, 4.2vw, 52px); color: var(--paper); margin: 0 0 24px; line-height: 1.1.
— .cta-final__lead — font-size: 19px; color: var(--paper); opacity: 0.85; margin: 0 0 40px; line-height: 1.55; max-width: 50ch; margin-left: auto; margin-right: auto.
— .cta-final__btn — display: inline-block; padding: 20px 44px; min-height: 56px; background: var(--mark); color: var(--ink); border-radius: 0; font-family: var(--font-body); font-weight: 600; font-size: 18px; text-decoration: none; transition: transform 240ms ease-out.
   .cta-final__btn:hover, .cta-final__btn:focus-visible { transform: translateY(-2px); background: var(--paper); color: var(--ink); }

ЧАСТЬ 2 — FOOTER

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

CSS (/* === Footer === */):

— .footer — background: var(--inverted); color: var(--paper); padding: 80px 0 32px.
— .footer__grid — display: grid; grid-template-columns: repeat(3, 1fr); gap: 56px.
   @media (max-width: 768px) { grid-template-columns: 1fr; gap: 40px; }
— .footer__col-title — font-family: var(--font-display); font-weight: 600; font-size: 18px; margin: 0 0 20px; color: var(--paper).
— .footer__col ul — list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px.
— .footer__col a, .footer__manage — color: var(--paper); opacity: 0.8; text-decoration: underline; background: none; border: none; padding: 0; font: inherit; cursor: pointer; text-align: left.
   .footer__col a:hover, .footer__manage:hover { opacity: 1; }
— .footer__col p — margin: 0 0 8px; font-size: 15px; line-height: 1.6; opacity: 0.85.
— .footer__operator-note — font-family: var(--font-mono); font-size: 13px; opacity: 0.6.
— .footer__bottom — margin-top: 56px; padding-top: 24px; border-top: 1px solid rgba(244, 239, 230, 0.1); font-family: var(--font-mono); font-size: 13px; opacity: 0.6.

ЧАСТЬ 3 — COOKIE-BANNER (Vanilla JS, 152-ФЗ)

ТРЕБОВАНИЯ:
1. Появляется при первом визите ДО любых не-essential скриптов.
2. Кнопки «Принять все» и «Только необходимые» — РАВНЫЕ по визуальному весу (одинаковый класс .cb-btn, без primary/secondary).
3. Чекбоксы analytics/marketing — БЕЗ checked.
4. Согласие в localStorage по ключу 'pdp_cookie_consent'.
5. Динамическая инжекция Яндекс.Метрики ТОЛЬКО после analytics: true.
6. Кнопка «Управление согласиями» в footer переоткрывает модал.
7. METRIKA_ID = null (заполнится вручную перед запуском).

HTML (перед </body>, после </footer>):

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

JS — создай /assets/js/cookie-consent.js:

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
      if (prev && prev.analytics && !c.analytics) location.reload();
    });
    document.getElementById('cs-cancel').addEventListener('click', closeSettings);

    const manage = document.getElementById('manage-consent');
    if (manage) manage.addEventListener('click', openSettings);
  });
})();

В <head> добавить:
<script>window.METRIKA_ID = null;</script>
<script src="/assets/js/cookie-consent.js" defer></script>

CSS (/* === Cookie banner === */):

— .cookie-banner — position: fixed; left: 0; right: 0; bottom: 0; background: var(--inverted); color: var(--paper); z-index: 9999; padding: 24px 16px; border-top: 1px solid rgba(244, 239, 230, 0.1).
— .cookie-banner__inner — max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center.
   @media (max-width: 768px) { grid-template-columns: 1fr; }
— .cookie-banner__text — font-size: 14px; line-height: 1.55; margin: 0.
— .cookie-banner__text a — color: var(--paper); text-decoration: underline.
— .cookie-banner__actions — display: flex; gap: 12px; flex-wrap: wrap.
— .cb-btn — min-height: 44px; padding: 12px 20px; border-radius: 0; border: 1px solid rgba(244, 239, 230, 0.3); background: transparent; color: var(--paper); font: inherit; font-size: 14px; cursor: pointer; transition: background 200ms.
   .cb-btn:hover, .cb-btn:focus-visible { background: rgba(244, 239, 230, 0.1); }
   ВАЖНО: «Принять все» и «Только необходимые» — одинаковый класс, одинаковый стиль. Это требование 152-ФЗ.
— .cb-btn--link — text-decoration: underline; border-color: transparent; padding: 12px 8px.
— .cookie-settings — position: fixed; inset: 0; background: rgba(14, 14, 15, 0.6); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px.
— .cookie-settings__inner — background: var(--paper); color: var(--ink); padding: 36px; max-width: 520px; width: 100%.
— .cookie-settings__row — display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; font-size: 15px; line-height: 1.55.
— .cookie-settings__row input — margin-top: 4px; width: 18px; height: 18px.
— .cookie-settings__actions — display: flex; gap: 12px; margin-top: 28px.
— .cookie-settings__actions .cb-btn — color: var(--ink); border-color: var(--rule).

ЗАПРЕТЫ:
— НЕТ Метрики статически в <head>. Только через loadYandexMetrika() после согласия.
— НЕТ других скриптов аналитики.
— Кнопки баннера РАВНОЗНАЧНЫ. Никаких primary/secondary.
— Чекбоксы analytics/marketing БЕЗ checked.
```

---

## Промпт 9 — 152-ФЗ аудит

**Что получаем на выходе:** заполненный чеклист SPEC §8 + полный чеклист скилла, grep-команда из audit.md, список нарушений (если есть) с планом правки, таблица штрафов с моим статусом.

**Опора на SPEC.md:** §8 (12 строк чеклиста), §9 (статус документов), §0 (плейсхолдеры).

**Скиллы 152-ФЗ:** audit, checklists-and-fines, cookie-banner-part-1 (повтор), consent-forms-part-1 (повтор). **mobile-specifics НЕ применяется** (это про нативные мобильные приложения).

**Текст промпта (копировать целиком):**

```
Проведи 152-ФЗ-аудит лендинга. Цель — найти всё, что не соответствует 152-ФЗ.

Опирайся на:
— SPEC §8 (12 строк чеклиста).
— SPEC §9 (статус трёх юр. документов).
— SPEC §0 (плейсхолдеры WEBHOOK_URL, METRIKA_ID, [ИНН_ЗАПОЛНИТЬ] — это ОЖИДАЕМО, не нарушение).

ШАГ 1 — Чеклист «Все типы проектов»:

1. HTTPS и редирект с HTTP — настраивается на Timeweb (не в HTML, отметь NA).
2. Запрещённые сервисы удалены (Google Analytics, GTM, Fonts, reCAPTCHA, Facebook Pixel, Meta Pixel, Hotjar, Intercom, Cloudflare Insights, HubSpot, Mixpanel, Segment).
3. Яндекс.Метрика — только после согласия (через cookie-consent.js).
4. Каждая форма: чекбокс согласия не предустановлен — проверить fallback в quiz.html.
5. Каждая форма: ссылки на Политику и Согласие рядом с чекбоксом.
6. Кнопка submit заблокирована до согласия.
7. Маркетинговые рассылки — отдельный чекбокс (либо отсутствуют — это валидно).
8. В форме только необходимые поля.
9. /privacy-policy.html опубликована, доступна без регистрации.
10. /consent.html — отдельный документ.
11. /cookie-policy.html создана.
12. Ссылки на все три документа в footer.
13. В Политике заявлена локализация в РФ.
14. Хостинг в России — Timeweb.
15. Уведомление в РКН — отметь как «вручную перед запуском».

ШАГ 2 — Чеклист «Сайты с cookie»:

1. Cookie-баннер при первом визите.
2. Кнопка «Только необходимые» равнозначна «Принять все» (одинаковый класс .cb-btn).
3. Аналитические/маркетинговые cookie выключены по умолчанию.
4. Cookie-предпочтения в localStorage по ключу 'pdp_cookie_consent'.
5. Кнопка «Управление согласиями» в footer — работает.

ШАГ 3 — grep-аудит запрещённых сервисов:

В терминале или через поиск Lovable выполни:
grep -rE "google-analytics|googletagmanager|fonts\.googleapis|recaptcha\.google|connect\.facebook\.net|static\.hotjar|cdn\.mxpnl|cdn\.segment|cloudflareinsights|js\.hs-scripts|widget\.intercom\.io|script\.hotjar" . --include="*.html" --include="*.js" --include="*.css"

Ожидаемый результат: пустой вывод. Любая строка = нарушение, штраф 1–6 млн ₽.

ШАГ 4 — Самопроверка cookie-banner:
— Метрика НЕ статически в <head>, только через loadYandexMetrika().
— Кнопки баннера — одинаковый класс, одинаковый стиль.
— Чекбоксы analytics/marketing БЕЗ checked.
— localStorage 'pdp_cookie_consent' с {necessary, analytics, marketing, ts}.

ШАГ 5 — Финальная таблица штрафов:

| Нарушение | Штраф первичный | Мой статус |
|-----------|-----------------|------------|
| Неуведомление РКН | 100–300 тыс. | вручную перед запуском |
| Обработка ПДн без согласия | 300–700 тыс. | проверено, чекбоксы есть |
| Запрещённые зарубежные сервисы | 1–6 млн | grep не нашёл |
| Отсутствие cookie-баннера | 150–300 тыс. | баннер есть, кнопки равны |
| Утечка ПДн | 3–15 млн | хостинг РФ, шифрование Timeweb |
| Утечка биометрии | 15–20 млн | биометрия не собирается |

ВАЖНО — что НЕ применимо:
— mobile-specifics.md из 152-ФЗ — это про нативные мобильные приложения (React Native), у нас веб-лендинг.
— saas-specifics.md — нет личного кабинета.
— ecommerce-specifics.md — платежи на лендинге не принимаются.

На выходе:
1. Заполненные оба чеклиста (Y/N/NA + обоснование).
2. Результат grep.
3. Список нарушений с планом правки или «нарушений не найдено».
4. Финальная таблица штрафов со статусом.
```

---

## Промпт 10 — Мобильная адаптация и финальная полировка

**Что получаем на выходе:** проход по всем секциям с медиа-запросами 320–768px, touch-targets ≥ 52px, safe-area-inset, контраст ≥ 4.5:1 (WCAG AA), `:focus-visible`, `prefers-reduced-motion`.

**Опора на SPEC.md:** §6 (mobile-first 320–768px), `docs/quiz-spec.md` §11 (touch-target 52px, safe-area, контраст 4.5:1, focus-outline). **mobile-specifics.md из 152-ФЗ НЕ применяется** — это про нативные мобильные приложения.

**Текст промпта (копировать целиком):**

```
Финальная мобильная адаптация и полировка.

Опирайся на:
— SPEC §6 — mobile-first, основной диапазон 320–768px.
— docs/quiz-spec.md §11 — полный список требований к мобильной адаптации и доступности.
— ЯВНО НЕ ПРИМЕНЯЙ: mobile-specifics.md из 152-ФЗ — это про нативные мобильные приложения, не про веб.

ШАГ 1 — Touch-targets:
— Все .hero__cta, .package__cta, .cta-final__btn: min-height: 56px.
— Все <button> в баннере и формах: min-height: 44px.
— Footer ссылки на mobile: padding: 8px 0 (минимальная hit-area).
— FAQ summary: padding-top/bottom ≥ 18px.

ШАГ 2 — Safe-area для iPhone:

@supports (padding: env(safe-area-inset-bottom)) {
  .cookie-banner { padding-bottom: max(24px, env(safe-area-inset-bottom)); }
  .cta-final { padding-bottom: max(96px, calc(72px + env(safe-area-inset-bottom))); }
  .footer { padding-bottom: max(32px, env(safe-area-inset-bottom)); }
}

ШАГ 3 — Контраст ≥ 4.5:1:

Проверь и приведи таблицу пар «текст/фон» с коэффициентом контраста:
— var(--ink) #111111 на var(--paper) #F4EFE6 — должно быть ~16:1 ✓
— var(--paper) #F4EFE6 на var(--accent) #1A2B6B — проверить (для CTA-кнопки)
— var(--accent) #1A2B6B на var(--paper) #F4EFE6 — проверить (для ссылок)
— var(--paper) #F4EFE6 на var(--inverted) #0E0E0F — должно быть ~16:1 ✓
— var(--ink-muted) #4A4A48 на var(--paper) #F4EFE6 — проверить (на грани AA)

Если какая-то пара ниже 4.5:1 — поправь HEX-код или замени на --ink-muted.

ШАГ 4 — Focus-outline:

Везде, где outline: none добавлен — заменить на :focus-visible с outline: 2px solid var(--accent); outline-offset: 3px.

ШАГ 5 — Шрифты ≥ 14px:

Самые мелкие тексты — .hero__editor-credit, .case__client-line, .footer__operator-note, .pain__voice-meta — не меньше 13px на mobile, не меньше 14px на desktop.

ШАГ 6 — prefers-reduced-motion:

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

ШАГ 7 — Проход по секциям на 320, 375, 768, 1024px:
Hero — заголовок не обрезается, редакторская подпись не наезжает на CTA.
Pain — две колонки в одну, цитаты читабельны.
Story — фото снизу, лонгрид 17px.
Case — три карточки в одну.
Quiz — высота #quiz-root корректна.
Packages — три карточки в одну, бэйдж «Чаще выбирают» не наезжает.
Trust 152-ФЗ — две колонки в одну.
Future Pacing — две колонки в одну.
FAQ — summary раскрывается, тап без промаха.
About — фото сверху, текст снизу.
Final CTA — кнопка крупная.
Footer — три колонки в одну.
Cookie banner — кнопки в столбец на 320px.
Нумерация секций — на mobile уезжает в правый верхний угол.

ШАГ 8 — ARIA:
— Cookie-banner и settings: role="dialog", aria-modal="true", aria-labelledby. Уже есть.
— FAQ <details>/<summary> — нативные, ARIA не нужна.
— Никаких <div role="button">.

На выходе:
1. Сводка по каждому шагу: Y/N + список правок.
2. Дополнение к main.css в одном блоке /* === Mobile polish === */.
```

---

## Привязка скиллов 152-ФЗ к промптам — сводная таблица

| Промпт | Применённые скиллы | Что взято |
|--------|--------------------|-----------|
| 1. Каркас | core-init, technical-requirements, hosting-rkn | Локальные шрифты `@font-face`, CSP-meta, `/assets/`-структура под РФ-хостинг, никаких CDN |
| 2. Hero | core-init | Никаких трекеров на CTA, голая `<a>` |
| 3. Боль | — | Чистый копирайт |
| 4. Эпифания + Решение | — | Чистый копирайт + editorial-вёрстка |
| 5. Кейс + Квиз | consent-forms-part-1, consent-forms-part-2 (Vanilla JS-принципы) | Самопроверка fallback-формы внутри встроенного квиза |
| 6. Пакеты + 152-ФЗ блок | legal-docs, consent-forms-part-1 | Ссылки на 3 юр. документа, формулировка согласия под пакетами |
| 7. Future Pacing + FAQ + Кто я | — | Чистый копирайт |
| 8. CTA + Footer + Cookie-banner | cookie-banner-part-1, cookie-banner-part-2 (Vanilla JS), legal-docs, consent-forms-part-1 | Полный Vanilla JS банner, равные кнопки, динамическая Метрика, footer с тремя ссылками |
| 9. 152-ФЗ аудит | audit, checklists-and-fines, cookie-banner-part-1 (повтор), consent-forms-part-1 (повтор) | grep-команда, чеклист, таблица штрафов |
| 10. Мобильная адаптация | — *(только SPEC §6 + docs/quiz-spec.md §11)* | mobile-specifics.md из 152-ФЗ НЕ применяется |

**Не применены вовсе:** `mobile-specifics.md`, `saas-specifics.md`, `ecommerce-specifics.md`.

---

## Памятка перед запуском

- Создать проект в Lovable, подключить GitHub-репо Personal-brand-152-fz.
- В первый чат загрузить SPEC.md (по желанию также CLAUDE.md и docs/quiz-spec.md).
- Все 10 промптов отправлять в одном чате внутри проекта Lovable.
- Порядок строгий: 1 → 10. Не менять, не пропускать.
- В Промпте 1 явно сказать: «No React, no Tailwind, vanilla only». Если Lovable начнёт сопротивляться — повторять в каждом следующем промпте.
- После Промпта 10 — экспортировать проект через GitHub-sync.
- Перед публикацией заполнить вручную:
  - `[ИНН_ЗАПОЛНИТЬ]` в `consent.html`, `privacy-policy.html`, `cookie-policy.html`.
  - `WEBHOOK_URL` и `METRIKA_ID` в `assets/js/constants.js`.
  - `window.METRIKA_ID = N` в `<head>` index.html.
  - Положить WOFF2-файлы Geologica + Onest + PT Mono в `/assets/fonts/`.
  - Создать бота `@KirinaAI_bot` через `@BotFather`.
  - Подать уведомление в РКН по [pd.rkn.gov.ru](https://pd.rkn.gov.ru).

---

*Конец плана.*
