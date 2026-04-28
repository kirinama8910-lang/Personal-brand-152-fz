# Лендинг личного бренда — Марина Кирина

Репозиторий проекта: лендинг фрилансера, который строит связку «сайт + Telegram-бот + автоматизация на n8n» для экспертов-практиков и владельцев малого бизнеса в России.

## Статус

В разработке. Лендинг реализуется через [Lovable](https://lovable.dev/) по плану в LOVABLE_PLAN.md (10 промптов). Дизайн-направление — Slow Editorial Print (Geologica + Onest + PT Mono, чернильно-синий акцент).

## Что внутри

| Файл / папка | Что это |
|---|---|
| SPEC.md | Главная спецификация: ЦА, смыслы, структура, дизайн |
| CLAUDE.md | Правила языка и табу для всех текстов |
| LOVABLE_PLAN.md | План реализации — 10 промптов для Lovable |
| Lovable_Plan.docx | То же в Word — удобно читать и копировать |
| quiz.html | Квиз-диагностика (встраивается в лендинг) |
| assets/css/quiz.css | Стили квиза |
| assets/js/ | JS-модули квиза (11 файлов + 9 экранов) |
| docs/quiz-spec.md | Архитектура и логика квиза |
| consent.html | Согласие на обработку персональных данных |
| privacy-policy.html | Политика конфиденциальности |
| cookie-policy.html | Политика использования cookie |
| .claude/skills/152-fz/ | 13 скиллов по 152-ФЗ |
| assets/fonts/ | Папка для шрифтов Geologica + Onest + PT Mono |
| photo.png | Фото автора для лендинга |

## Перед запуском — заполнить вручную

- [ ] ИНН в consent.html, privacy-policy.html, cookie-policy.html (маркер [ИНН_ЗАПОЛНИТЬ])
- [ ] WEBHOOK_URL в assets/js/constants.js
- [ ] METRIKA_ID в assets/js/constants.js (та же цифра — в `<head>` index.html, в `window.METRIKA_ID`)
- [ ] Скачать шрифты Geologica + PT Mono с paratype.ru и Onest с GitHub-репозитория автора (SIL OFL 1.1) и положить WOFF2-файлы в /assets/fonts/
- [ ] Создать бота @KirinaAI_bot через @BotFather, установить имя «Марина Кирина | автоматизация»
- [ ] Подать уведомление в РКН по pd.rkn.gov.ru до начала обработки персональных данных

## Как работать с планом

1. Открыть Lovable (https://lovable.dev/) и создать новый проект.
2. Подключить GitHub-репозиторий Personal-brand-152-fz через интеграцию Lovable.
3. В первый чат загрузить SPEC.md (по желанию также CLAUDE.md и docs/quiz-spec.md).
4. Вставлять промпты из LOVABLE_PLAN.md по порядку 1 → 10 в одном чате.
5. В Промпте 1 явно прописать «no React, no Tailwind, vanilla only» — у Lovable дефолт React/Vite/Tailwind, нам нужен Vanilla HTML/CSS/JS.
6. После Промпта 10 — экспортировать проект через GitHub-sync.

## Резервная копия

Ветка backup-before-cleanup — состояние репозитория до очистки (апрель 2026).

---

*Соответствие 152-ФЗ обязательно. Все требования зафиксированы в SPEC.md раздел 8 и .claude/skills/152-fz/.*
