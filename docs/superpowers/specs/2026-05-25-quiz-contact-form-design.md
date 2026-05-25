# Спек: расширение формы сбора контактов в квизе

**Дата:** 2026-05-25  
**Статус:** утверждён  
**Файлы затронуты:** `assets/js/screens/final.js`, `assets/js/webhook.js`

---

## Контекст

Финальный экран квиза показывает пользователю диапазон потерь (например, 53 000–85 000 ₽/мес) и предлагает два пути:

1. **Основной CTA** — кнопка «Получить точный расчёт за 15 минут в Telegram» (deeplink → бот).
2. **Резервная форма** — сейчас собирает только `@username` в Telegram.

**Проблема:** часть аудитории не пользуется Telegram. Они уходят без контакта.

**Решение:** заменить поле `@username` на полноценную контактную форму (Имя + Email + Телефон), сохранив Telegram-кнопку как основной путь.

---

## Что меняется

### `assets/js/screens/final.js` — функция `mountFallbackForm()`

#### Копи над формой
```
Нет Telegram? Пришлю расчёт на почту — напишу лично.
```

#### Поля формы

| Поле | `name` атрибут | Тип | Обязательно | Валидация |
|---|---|---|---|---|
| Имя | `name` | `text` | ✅ | ≥ 2 символа |
| Email | `email` | `email` | ✅ | валидный формат (HTML5 + проверка `@`) |
| Телефон | `phone` | `tel` | ✅ | ≥ 10 цифр после удаления нецифровых символов |
| Honeypot | `ignore_me` | `text` | — | скрытое, должно быть пустым |
| Согласие | `consent` | `checkbox` | ✅ | должно быть отмечено |

#### Логика кнопки «Отправить»
Кнопка активна (`disabled = false`) только когда одновременно:
- `name.trim().length >= 2`
- email проходит `HTMLInputElement.checkValidity()` + содержит `@`
- телефон: после `replace(/\D/g, '')` длина ≥ 10
- `consent.checked === true`

#### Вызов `onSubmit`
```js
onSubmit({
  path: 'fallback',
  contact: {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
  },
  consent: true,
  tag: ctx.tag,
})
```

#### Что удаляется
- Поле `@username` (`name="username"`) — полностью убирается.

#### Что остаётся без изменений
- Honeypot (`name="ignore_me"`)
- Чекбокс согласия со ссылками на consent.html и privacy-policy.html
- Кнопка «Отправить» и блок ошибки `.quiz-form-error`
- Вся логика аналитики (`analytics.fallbackSubmitted`, `ctx.leftViaSubmit`)
- Основной Telegram-CTA (`.quiz-tg-cta`) — не трогается

---

### `assets/js/webhook.js` — функция `buildPayload()`

Меняем дефолтный contact-объект:

```js
// было
contact: contact || { username: null }

// станет
contact: contact || { name: null, email: null, phone: null }
```

Это backward-compatible: webhook-эндпоинт получит новые поля вместо `username`.  
Путь `main` (Telegram-кнопка) передаёт `contact: { name: null, email: null, phone: null }` — без изменений логики.

---

## Что НЕ меняется

- `quiz-embed.js`, `quiz.css`, `quiz.html` — не трогаем (embed).
- `renderThanks` — экран «спасибо» остаётся тем же.
- `exit.js` — экран выхода не затронут.
- Аналитика — все события остаются.
- Honeypot — остаётся на месте.

---

## Пример итогового payload (fallback-путь)

```json
{
  "session_id": "abc123",
  "path": "fallback",
  "contact": {
    "name": "Анна",
    "email": "anna@example.com",
    "phone": "+7 999 123 45 67"
  },
  "consent": true,
  "answers": { "q1": "...", "q2": "...", "..." : "..." },
  "calc": { "loss_min": 53000, "loss_max": 85000 },
  "scoring": { "tag": "hot" },
  "meta": { "utm_source": null, "..." : "..." }
}
```

---

## Критерии готовности

- [ ] Поле `@username` убрано
- [ ] Три поля (Имя, Email, Телефон) отображаются в правильном порядке
- [ ] Кнопка неактивна пока не заполнены все три поля + галочка
- [ ] Honeypot защита работает
- [ ] `onSubmit` получает `contact: { name, email, phone }`
- [ ] Webhook payload содержит новые поля вместо `username`
- [ ] В dev-режиме (WEBHOOK_URL = '__PLACEHOLDER__') данные видны в `window.__quizWebhookLog`
- [ ] Экран «спасибо» открывается после успешной отправки
