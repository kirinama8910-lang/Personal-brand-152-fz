## ФАЗА 0: АУДИТ (для существующих проектов)

Перед началом работы найди все запрещённые сервисы в проекте:

```bash
grep -r \
  "google-analytics\|googletagmanager\|fonts\.googleapis\|recaptcha\.google\
\|connect\.facebook\.net\|static\.hotjar\|cdn\.mxpnl\|cdn\.segment\
\|cloudflareinsights\|js\.hs-scripts\|widget\.intercom\.io\|script\.hotjar" \
  . \
  --include="*.html" --include="*.js" --include="*.jsx" --include="*.tsx" \
  --include="*.vue" --include="*.php" --include="*.py" --include="*.erb" \
  -l
```

**Запрещённые сервисы с 01.07.2025 (штраф 1–6 млн руб.):**

| Сервис | Домены | Российская замена |
|--------|--------|-------------------|
| Google Analytics | `google-analytics.com` | Яндекс.Метрика |
| Google Tag Manager | `googletagmanager.com` | Прямое подключение |
| Google Fonts | `fonts.googleapis.com` | Локальные шрифты |
| Google reCAPTCHA | `recaptcha.google.com` | Яндекс SmartCaptcha |
| Google Maps | `maps.googleapis.com` | Яндекс.Карты / 2ГИС |
| Facebook Pixel | `connect.facebook.net` | VK Pixel |
| Hotjar | `static.hotjar.com` | Вебвизор Метрики |
| Intercom | `widget.intercom.io` | Jivo / Carrot Quest |
| Cloudflare Analytics | `cloudflareinsights.com` | Яндекс.Метрика |
| HubSpot | `js.hs-scripts.com` | Битрикс24 / AmoCRM |
| Mixpanel | `cdn.mxpnl.com` | Яндекс.Метрика |
| Segment | `cdn.segment.com` | Серверная аналитика в РФ |
