## ФАЗА 1: ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ

### 1.1 HTTPS (обязательно для всех типов)

```nginx
# nginx
server {
    listen 80;
    server_name {{WEBSITE_URL}} www.{{WEBSITE_URL}};
    return 301 https://$host$request_uri;
}
```

```apache
# Apache — .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 1.2 Локальные шрифты

**Удалить:**
```html
<!-- ЗАПРЕЩЕНО — удалить полностью -->
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
```

**Заменить на:**
```css
/* /public/fonts/roboto.css */
@font-face {
    font-family: 'Roboto';
    src: url('/fonts/roboto-400.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}
@font-face {
    font-family: 'Roboto';
    src: url('/fonts/roboto-700.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
}
```

> Скачать шрифты: [fontsource.org](https://fontsource.org) (npm) или [gwfh.mranftl.com](https://gwfh.mranftl.com) (файлы напрямую)

**Для React/Next.js — через fontsource (локально, без внешних запросов):**
```bash
npm install @fontsource/roboto
```
```javascript
// _app.jsx (Next.js Pages) или layout.tsx (App Router)
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
```

### 1.3 Яндекс.Метрика (подключать ТОЛЬКО через Cookie Manager)

> Не вставляй код метрики в `<head>` напрямую. Он должен загружаться только после явного согласия на аналитические cookie.

```javascript
// Вызывается из Cookie Manager при analytics: true
function loadYandexMetrika(counterId) {
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        k=e.createElement(t); a=e.getElementsByTagName(t)[0];
        k.async=1; k.src=r; a.parentNode.insertBefore(k,a);
    })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
    ym(counterId, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
}
```

### 1.4 Яндекс SmartCaptcha (замена reCAPTCHA)

```html
<script src="https://smartcaptcha.yandexcloud.net/captcha.js" defer></script>

<div class="smart-captcha"
     data-sitekey="{{SMARTCAPTCHA_KEY}}"
     data-callback="onCaptchaSuccess">
</div>
```

```javascript
function onCaptchaSuccess(token) {
    document.querySelector('[name="captcha-token"]').value = token;
    document.getElementById('submit-btn').disabled = false;
}
```
