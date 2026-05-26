# Лендинг личного бренда — Марина Кирина

Репозиторий проекта: лендинг фрилансера, который строит связку «сайт + Telegram-бот + автоматизация на n8n» для экспертов-практиков и владельцев малого бизнеса в России.

## Статус

В разработке. Лендинг реализуется через **Claude Code** с **subagent-driven-development** по плану в [docs/superpowers/plans/2026-04-28-landing-implementation.md](docs/superpowers/plans/2026-04-28-landing-implementation.md). Дизайн-направление — Slow Editorial Print (Geologica + Onest + PT Mono, чернильно-синий акцент).

## Что внутри

| Файл / папка | Что это |
|---|---|
| PROJECT_PASSPORT.md | Снапшот текущего состояния и приоритетов |
| CLAUDE.md | Правила работы (язык, табу, карта проекта, журналы) |
| SPEC.md | Индекс с ссылками на нарезку по разделам |
| docs/spec/ | Нарезанный спек: ЦА, смыслы, структура, дизайн, 152-ФЗ |
| docs/journal/ | Журналы: SESSIONS (саммари сессий), DECISIONS, PATTERNS, CASES |
| docs/quiz-spec.md | Архитектура и логика квиза |
| docs/superpowers/plans/ | Планы реализации |
| docs/superpowers/specs/ | Дизайн-документы |
| quiz.html | Квиз-диагностика (встраивается в лендинг) |
| index.html | Лендинг |
| consent.html, privacy-policy.html, cookie-policy.html | Юр.документы |
| assets/css/quiz.css | Стили квиза |
| assets/js/ | JS-модули квиза (11 файлов + 9 экранов) |
| assets/fonts/ | Geologica + Onest + PT Mono (variable-TTF, SIL OFL 1.1) |
| .claude/skills/ | Скиллы Claude Code: 152-fz, frontend-design, uluchshatel-promptov |
| .claude/settings.json | Read-only-допуски для Claude Code |
| photo.png | Фото автора для лендинга |

## Перед запуском — заполнить вручную

- [ ] ИНН в consent.html, privacy-policy.html, cookie-policy.html (маркер [ИНН_ЗАПОЛНИТЬ])
- [ ] WEBHOOK_URL в assets/js/constants.js
- [ ] METRIKA_ID в assets/js/constants.js (та же цифра — в `<head>` index.html, в `window.METRIKA_ID`)
- [x] Шрифты Geologica + Onest + PT Mono — уже в /assets/fonts/ как variable-TTF (SIL OFL 1.1)
- [ ] Создать бота @KirinaAI_bot через @BotFather, установить имя «Марина Кирина | автоматизация»
- [ ] Подать уведомление в РКН по pd.rkn.gov.ru до начала обработки персональных данных

## Как работать с планом

1. Открыть Claude Code в этой папке.
2. Прочитать [docs/superpowers/plans/2026-04-28-landing-implementation.md](docs/superpowers/plans/2026-04-28-landing-implementation.md).
3. Для каждой из 10 задач (Task 0 → Task 9) запустить сабагента: скопировать **Subagent prompt** из соответствующей секции плана и вызвать `Agent` tool.
4. Между задачами проверять diff и открывать `index.html` в браузере для визуальной проверки.
5. После Task 9 — финальный коммит + push, затем заполнение вручную из чек-листа выше.

## Резервная копия

Ветка backup-before-cleanup — состояние репозитория до очистки (апрель 2026).

---

*Соответствие 152-ФЗ обязательно. Все требования зафиксированы в SPEC.md раздел 8 и .claude/skills/152-fz/.*
