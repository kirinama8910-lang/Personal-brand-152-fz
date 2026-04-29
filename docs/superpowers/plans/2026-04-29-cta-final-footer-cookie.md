# Task 7: CTA Final, Footer, Cookie-banner — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Реализовать секции #cta-final (11) и #footer (12) и куки-баннер (Vanilla JS) на лендинге Personal-brand-152-fz.

**Architecture:** Три независимых UI-компонента добавляются в `index.html` (замена заглушек + новый HTML куки-баннера), CSS — в конец `assets/css/main.css`, логика куки-баннера — в новый файл `assets/js/cookie-banner.js`. Никаких внешних зависимостей.

**Tech Stack:** HTML5, CSS (CSS-переменные из main.css), Vanilla JS (IIFE, localStorage)

---

## Файловая карта

| Файл | Действие | Что меняется |
|------|----------|--------------|
| `index.html` | Modify | Заменить заглушки #cta-final и #footer; добавить HTML куки-баннера; добавить `<script>` для cookie-banner.js в `<head>` |
| `assets/css/main.css` | Modify (append) | Добавить блоки `/* === CTA Final === */`, `/* === Footer === */`, `/* === Cookie Banner === */` и класс `.btn-mark` |
| `assets/js/cookie-banner.js` | Create | Vanilla JS IIFE — проверка localStorage, показ баннера, кнопки, настройки, инжекция аналитики |

**НЕ ТРОГАТЬ:** `quiz.html`, `quiz-*.js`, `quiz.css`, `consent.html`, `privacy-policy.html`, `cookie-policy.html`, `photo.png`, `assets/fonts/`

---

## Task 1: Секция #cta-final — HTML и CSS

**Files:**
- Modify: `index.html:627-629` (заменить заглушку)
- Modify: `assets/css/main.css` (append в конец)

- [ ] **Шаг 1. Открыть index.html, найти заглушку #cta-final**

Строки 627–629 выглядят так:
```html
  <section id="cta-final" data-section="11" data-title="Финальный CTA">
    <h2>Секция 11 — Финальный CTA (наполнение в Task 7)</h2>
  </section>
```

- [ ] **Шаг 2. Заменить заглушку на готовый HTML**

```html
  <section id="cta-final" data-section="11" data-title="Финальный CTA" class="reveal">
    <div class="container">
      <div class="cta-final__inner">
        <span class="cta-final__eyebrow">11 / ФИНАЛЬНЫЙ ШАГ</span>
        <h2 class="cta-final__heading">Если дочитали — значит узнали себя.</h2>
        <p class="cta-final__sub">Пока вы решаете, в каком из соседних мест уже сидит ваш следующий клиент. Посчитайте, во сколько это обходится за месяц.</p>
        <div class="cta-final__btn-wrap">
          <div class="cta-final__orb" aria-hidden="true"></div>
          <a href="#quiz" class="btn-mark">Посчитать за 2 минуты</a>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Шаг 3. Добавить в конец assets/css/main.css класс .btn-mark и стили #cta-final**

Заметка: существующий `.btn-primary` — синий градиент. Для жёлтой кнопки нужен отдельный класс `.btn-mark`.

```css
/* === Кнопка — mark (жёлтая) === */
.btn-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 36px;
  min-height: 52px;
  background: var(--mark);
  color: var(--mark-ink);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: transform .2s, box-shadow .2s;
}
.btn-mark:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 40px rgba(246,224,87,.35);
  color: var(--mark-ink);
}

/* === CTA Final === */
#cta-final {
  padding: var(--section-gap) 0;
}
.cta-final__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  max-width: 640px;
  margin: 0 auto;
}
.cta-final__eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: rgba(0,200,255,.5);
  letter-spacing: .15em;
  text-transform: uppercase;
}
.cta-final__eyebrow::before {
  content: '';
  display: block;
  width: 32px;
  height: 1px;
  background: rgba(0,200,255,.3);
  flex-shrink: 0;
}
.cta-final__heading {
  font-family: var(--font-display);
  font-size: clamp(36px, 6vw, 60px);
  font-weight: 800;
  color: var(--ink);
  line-height: 1.1;
  margin: 0;
}
.cta-final__sub {
  font-size: 18px;
  color: var(--ink-muted);
  max-width: 52ch;
  line-height: 1.65;
  margin: 0;
}
.cta-final__btn-wrap {
  position: relative;
  display: inline-flex;
  margin-top: 8px;
}
.cta-final__orb {
  position: absolute;
  inset: -60px;
  background: radial-gradient(circle, var(--neon) 0%, transparent 70%);
  filter: blur(80px);
  opacity: .15;
  pointer-events: none;
  border-radius: 50%;
}
```

- [ ] **Шаг 4. Проверить визуально**

Открыть `index.html` в браузере (или live server). Прокрутить до секции 11.
Убедиться:
- Eyebrow «11 / ФИНАЛЬНЫЙ ШАГ» с линией слева, тусклый голубой цвет
- Крупный белый заголовок «Если дочитали...»
- Серый подзаголовок
- Жёлтая кнопка без градиента, нет синего свечения
- Секция появляется при scroll (reveal), если скролл уже выполнен — видна сразу

- [ ] **Шаг 5. Коммит**

```bash
git add index.html assets/css/main.css
git commit -m "feat: секция #cta-final — финальный CTA с жёлтой кнопкой"
```

---

## Task 2: Секция #footer — HTML и CSS

**Files:**
- Modify: `index.html:630-632` (заменить заглушку)
- Modify: `assets/css/main.css` (append в конец)

- [ ] **Шаг 1. Найти заглушку #footer в index.html**

Строки 630–632:
```html
  <footer id="footer" data-section="12" data-title="Footer">
    <h2>Секция 12 — Footer (наполнение в Task 7)</h2>
  </footer>
```

- [ ] **Шаг 2. Заменить на готовый HTML**

```html
  <footer id="footer" data-section="12" data-title="Footer">
    <div class="footer__inner container">
      <div class="footer__grid">

        <div class="footer__col">
          <p class="footer__name">Марина Кирина</p>
          <p class="footer__status">Самозанятая · Пенза</p>
          <p class="footer__copy">© 2025 Марина Кирина</p>
        </div>

        <div class="footer__col">
          <nav class="footer__links" aria-label="Юридические документы">
            <a href="./privacy-policy.html" class="footer__link">Политика конфиденциальности</a>
            <a href="./cookie-policy.html" class="footer__link">Политика cookie</a>
            <a href="./consent.html" class="footer__link">Согласие на обработку ПД</a>
            <a id="manage-consent" href="./consent.html" class="footer__link">Управление согласиями</a>
          </nav>
        </div>

        <div class="footer__col">
          <div class="footer__contacts">
            <a href="https://t.me/marinakirina111" class="footer__tg-link" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a href="mailto:m_kirina@mail.ru" class="footer__link">m_kirina@mail.ru</a>
          </div>
        </div>

      </div>
      <div class="footer__bottom">
        <p class="footer__inn">ИНН: 583680314756</p>
      </div>
    </div>
  </footer>
```

- [ ] **Шаг 3. Добавить в конец assets/css/main.css стили footer**

```css
/* === Footer === */
#footer {
  background: var(--bg-card);
  border-top: 1px solid var(--rule-solid);
  padding: 48px 0 32px;
}
.footer__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 32px;
}
.footer__name {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--neon);
  margin: 0 0 8px;
}
.footer__status {
  font-size: 13px;
  color: var(--ink-muted);
  margin: 0 0 4px;
}
.footer__copy {
  font-size: 12px;
  color: var(--ink-muted);
  margin: 0;
}
.footer__links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer__link {
  font-size: 14px;
  color: var(--ink-muted);
  text-decoration: none;
  transition: color .2s;
}
.footer__link:hover {
  color: var(--neon);
}
.footer__contacts {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.footer__tg-link {
  color: var(--ink-muted);
  display: inline-flex;
  align-items: center;
  transition: color .2s;
  line-height: 1;
}
.footer__tg-link:hover {
  color: var(--neon);
}
.footer__bottom {
  border-top: 1px solid var(--rule-solid);
  padding-top: 20px;
}
.footer__inn {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-faint);
  margin: 0;
}
@media (max-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

- [ ] **Шаг 4. Проверить визуально**

Открыть `index.html` в браузере, прокрутить до футера.
Убедиться:
- «Марина Кирина» светится `var(--neon)` (голубой), PT Mono
- 4 ссылки в колонке 2 кликабельны, открывают нужные страницы (./privacy-policy.html и т.д.)
- Иконка Telegram кликабельна, при ховере голубеет, ведёт на t.me/marinakirina111
- Email `m_kirina@mail.ru` — текст-ссылка
- ИНН `583680314756` в нижней строке, очень тусклый
- `id="manage-consent"` присутствует в DOM (проверить в DevTools: `document.getElementById('manage-consent')` не null)
- Mobile ≤768px: три колонки схлопываются в стек

- [ ] **Шаг 5. Коммит**

```bash
git add index.html assets/css/main.css
git commit -m "feat: секция #footer — три колонки, юр-ссылки, Telegram-иконка"
```

---

## Task 3: Cookie-banner — JavaScript

**Files:**
- Create: `assets/js/cookie-banner.js`

- [ ] **Шаг 1. Создать файл assets/js/cookie-banner.js**

```javascript
(function () {
  var KEY = 'pdp_cookie_consent';
  var YM_ID = 0; // заменить на ID счётчика Яндекс.Метрики перед запуском

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }

  function saveConsent(c) {
    localStorage.setItem(KEY, JSON.stringify({ necessary: c.necessary, analytics: c.analytics, marketing: c.marketing, ts: Date.now() }));
  }

  function loadAnalytics() {
    if (!YM_ID) return;
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t);a=e.getElementsByTagName(t)[0];
    k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,'script',
    'https://mc.yandex.ru/metrika/tag.js','ym');
    ym(YM_ID,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true});
  }

  function applyConsent(c) {
    if (c.analytics) loadAnalytics();
  }

  function hideBanner() {
    var el = document.getElementById('cookie-banner');
    if (el) el.setAttribute('hidden', '');
  }

  function hideSettings() {
    var el = document.getElementById('cookie-settings');
    if (el) el.setAttribute('hidden', '');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var consent = getConsent();
    if (consent) { applyConsent(consent); return; }

    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    banner.removeAttribute('hidden');

    document.getElementById('cb-accept-all').addEventListener('click', function () {
      var c = { necessary: true, analytics: true, marketing: true };
      saveConsent(c); applyConsent(c); hideBanner();
    });

    document.getElementById('cb-reject').addEventListener('click', function () {
      saveConsent({ necessary: true, analytics: false, marketing: false });
      hideBanner();
    });

    document.getElementById('cb-settings-open').addEventListener('click', function () {
      var s = document.getElementById('cookie-settings');
      if (s) s.removeAttribute('hidden');
    });

    document.getElementById('cs-save').addEventListener('click', function () {
      var c = {
        necessary: true,
        analytics: document.getElementById('cs-analytics').checked,
        marketing: document.getElementById('cs-marketing').checked
      };
      saveConsent(c); applyConsent(c); hideSettings(); hideBanner();
    });
  });
})();
```

- [ ] **Шаг 2. Добавить тег script в `<head>` в index.html**

Найти строку `<link rel="stylesheet" href="./assets/css/quiz.css">` (≈строка 11) и после неё добавить:

```html
  <script src="./assets/js/cookie-banner.js"></script>
```

- [ ] **Шаг 3. Проверить в DevTools**

Открыть `index.html` в браузере. В DevTools → Application → Local Storage: убедиться, что ключ `pdp_cookie_consent` отсутствует (если нужно — удалить его вручную).
Баннер не должен быть виден ещё (HTML не добавлен — это следующий Task).
Убедиться, что скрипт загружается без ошибок (вкладка Console — нет exceptions).

- [ ] **Шаг 4. Коммит**

```bash
git add assets/js/cookie-banner.js index.html
git commit -m "feat: cookie-banner.js — Vanilla JS, localStorage, инжекция аналитики"
```

---

## Task 4: Cookie-banner — HTML и CSS

**Files:**
- Modify: `index.html` (добавить HTML перед `</body>`)
- Modify: `assets/css/main.css` (append в конец)

- [ ] **Шаг 1. Найти комментарий-заглушку в index.html**

Строка вида:
```html
  <!-- cookie-banner будет добавлен в Task 7 -->
```

- [ ] **Шаг 2. Заменить комментарий на HTML баннера и панели настроек**

```html
  <div id="cookie-banner" class="cookie-banner" role="dialog" aria-modal="true" hidden>
    <div class="cookie-banner__inner">
      <p class="cookie-banner__text">
        Используем cookie для аналитики. Аналитические cookie — только с вашего согласия.
        <a href="./cookie-policy.html" class="cookie-banner__link">Подробнее</a>
      </p>
      <div class="cookie-banner__actions">
        <button id="cb-accept-all" class="cb-btn cb-btn--primary">Принять все</button>
        <button id="cb-reject" class="cb-btn cb-btn--secondary">Только необходимые</button>
        <button id="cb-settings-open" class="cb-btn cb-btn--link">Настроить</button>
      </div>
    </div>
  </div>

  <div id="cookie-settings" class="cookie-settings" role="dialog" aria-modal="true" hidden>
    <div class="cookie-settings__inner">
      <h3 class="cookie-settings__title">Настройки cookie</h3>
      <div class="cookie-settings__list">
        <label class="cookie-settings__item">
          <input type="checkbox" checked disabled> Необходимые (всегда активны)
        </label>
        <label class="cookie-settings__item">
          <input type="checkbox" id="cs-analytics"> Аналитические (Яндекс.Метрика)
        </label>
        <label class="cookie-settings__item">
          <input type="checkbox" id="cs-marketing"> Маркетинговые
        </label>
      </div>
      <button id="cs-save" class="cb-btn cb-btn--primary">Сохранить</button>
    </div>
  </div>
```

- [ ] **Шаг 3. Добавить в конец assets/css/main.css стили cookie-banner**

```css
/* === Cookie Banner === */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: var(--bg-card);
  border-top: 1px solid var(--rule-solid);
  padding: 16px 24px;
}
.cookie-banner__inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.cookie-banner__text {
  flex: 1;
  font-size: 14px;
  color: var(--ink-muted);
  margin: 0;
  min-width: 200px;
  line-height: 1.5;
}
.cookie-banner__link {
  color: var(--neon);
  text-decoration: none;
  white-space: nowrap;
}
.cookie-banner__link:hover {
  text-decoration: underline;
}
.cookie-banner__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
}
.cookie-settings {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  background: var(--bg-card);
  border-top: 1px solid var(--rule);
  padding: 24px;
}
.cookie-settings__inner {
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cookie-settings__title {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--ink);
  margin: 0;
}
.cookie-settings__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cookie-settings__item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--ink-muted);
  cursor: pointer;
}
.cookie-settings__item input[type="checkbox"]:disabled {
  cursor: not-allowed;
  opacity: .5;
}
.cb-btn {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity .2s;
  white-space: nowrap;
}
.cb-btn:hover { opacity: .85; }
.cb-btn--primary {
  background: var(--mark);
  color: var(--mark-ink);
  border: none;
}
.cb-btn--secondary {
  background: transparent;
  border: 1px solid var(--rule-solid);
  color: var(--ink);
}
.cb-btn--link {
  background: none;
  border: none;
  color: var(--ink-muted);
  text-decoration: underline;
  padding: 10px 8px;
}
@media (max-width: 768px) {
  .cookie-banner__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .cookie-banner__actions {
    width: 100%;
    flex-direction: column;
  }
  .cb-btn {
    width: 100%;
    text-align: center;
  }
}
```

- [ ] **Шаг 4. Проверить полный флоу в браузере**

1. Удалить ключ `pdp_cookie_consent` из localStorage (DevTools → Application → Local Storage → Delete)
2. Перезагрузить страницу — внизу должна появиться тёмная полоса баннера
3. Нажать **«Только необходимые»** → баннер скрывается, в localStorage появляется `{ necessary: true, analytics: false, marketing: false, ts: ... }`
4. Перезагрузить страницу — баннер не появляется
5. Снова удалить ключ → перезагрузить → нажать **«Настроить»** → появляется панель с тремя чекбоксами
6. Отметить «Аналитические», нажать **«Сохранить»** → панель и баннер скрываются, в localStorage `analytics: true`
7. Снова удалить ключ → нажать **«Принять все»** → в localStorage `{ necessary: true, analytics: true, marketing: true, ts: ... }`
8. Mobile 375px: кнопки стекуются в колонку, баннер не перекрывает контент жёстко

- [ ] **Шаг 5. Финальные проверки (checklist)**

Пройти по списку перед коммитом:
- [ ] Нет слов: Instagram, Meta, блокировка, вайбкодинг, дёшево
- [ ] Нет переменных: `var(--accent)`, `var(--paper)`, `var(--inverted)`
- [ ] `id="manage-consent"` есть в footer (проверить в DOM)
- [ ] Все href: `./consent.html`, `./privacy-policy.html`, `./cookie-policy.html` — точные
- [ ] ИНН `583680314756` в футере
- [ ] Email `m_kirina@mail.ru` в футере
- [ ] Файлы quiz.html, quiz-*.js, quiz.css, consent.html, privacy-policy.html, cookie-policy.html — не изменены (проверить `git diff --name-only`)

- [ ] **Шаг 6. Финальный коммит**

```bash
git add index.html assets/css/main.css
git commit -m "feat: cookie-banner — HTML, CSS, панель настроек, 152-ФЗ"
```

---

## Итоговая структура изменений

```
index.html
  ├── <head>: +<script src="./assets/js/cookie-banner.js">
  ├── #cta-final: заглушка → секция с eyebrow, h2, sub, btn-mark, orb
  ├── #footer: заглушка → три колонки + нижняя строка ИНН
  └── перед </body>: +#cookie-banner + #cookie-settings

assets/css/main.css (append)
  ├── .btn-mark (жёлтая кнопка)
  ├── /* === CTA Final === */
  ├── /* === Footer === */
  └── /* === Cookie Banner === */

assets/js/cookie-banner.js (новый)
  └── IIFE: localStorage, 3 кнопки, панель настроек, инжекция аналитики
```
