# Шрифты — инструкция по скачиванию

Папка для самохостинга шрифтов. Все файлы должны лежать здесь — никаких Google Fonts CDN.
После скачивания файлы уже подключены в index.html через @font-face.

---

## Нужные файлы

### Playfair Display (заголовки)

Скачать с https://gwfh.mranftl.com/fonts/playfair-display — выбрать форматы: woff2

| Файл                               | Начертание       |
|------------------------------------|------------------|
| playfair-display-400.woff2         | Regular          |
| playfair-display-700.woff2         | Bold             |
| playfair-display-400-italic.woff2  | Regular Italic   |
| playfair-display-700-italic.woff2  | Bold Italic      |

### DM Sans (основной текст)

Скачать с https://gwfh.mranftl.com/fonts/dm-sans — выбрать форматы: woff2

| Файл                     | Начертание |
|--------------------------|------------|
| dm-sans-400.woff2        | Regular    |
| dm-sans-500.woff2        | Medium     |
| dm-sans-700.woff2        | Bold       |

---

## Быстрый способ — npm + fontsource (если есть Node.js)

```bash
npm install @fontsource/playfair-display @fontsource/dm-sans
```

Файлы окажутся в `node_modules/@fontsource/*/files/` — скопировать нужные woff2 сюда.

---

## Проверка после скачивания

Открыть DevTools → Network → отфильтровать по Font.
Не должно быть ни одного запроса к fonts.googleapis.com или fonts.gstatic.com.
