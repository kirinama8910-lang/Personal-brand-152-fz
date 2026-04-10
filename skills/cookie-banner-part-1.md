## ФАЗА 3: COOKIE-БАННЕР

### 3.1 Vanilla JS

```html
<!-- Добавить в конец <body> -->
<div id="cookie-banner" class="cookie-banner" role="dialog" aria-modal="true" hidden>
    <p>Используем cookie для аналитики. Аналитические cookie — только с вашего согласия.
       <a href="/cookie-policy">Подробнее</a></p>
    <div class="cookie-banner__actions">
        <button id="cb-accept-all" class="cb-btn cb-btn--primary">Принять все</button>
        <button id="cb-reject" class="cb-btn cb-btn--secondary">Только необходимые</button>
        <button id="cb-settings-open" class="cb-btn cb-btn--link">Настроить</button>
    </div>
</div>

<div id="cookie-settings" class="cookie-settings" role="dialog" aria-modal="true" hidden>
    <h3>Настройки cookie</h3>
    <label><input type="checkbox" checked disabled> Необходимые (всегда активны)</label>
    <label><input type="checkbox" id="cs-analytics"> Аналитические (Яндекс.Метрика)</label>
    <label><input type="checkbox" id="cs-marketing"> Маркетинговые (VK Pixel)</label>
    <button id="cs-save" class="cb-btn cb-btn--primary">Сохранить</button>
</div>
```

```javascript
// public/js/cookie-consent.js — подключить в <head> синхронно
(function () {
    const KEY = 'pdp_cookie_consent';
    const YM_ID = 0; // ← заменить на ID счётчика

    function getConsent() {
        try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
    }

    function saveConsent(c) {
        localStorage.setItem(KEY, JSON.stringify({ ...c, ts: Date.now() }));
    }

    function loadAnalytics() {
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t);a=e.getElementsByTagName(t)[0];
        k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,"script",
        "https://mc.yandex.ru/metrika/tag.js","ym");
        ym(YM_ID,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});
    }

    function applyConsent(c) {
        if (c.analytics) loadAnalytics();
    }

    function hideBanner() {
        document.getElementById('cookie-banner')?.setAttribute('hidden', '');
    }

    document.addEventListener('DOMContentLoaded', function () {
        const consent = getConsent();
        if (consent) { applyConsent(consent); return; }

        document.getElementById('cookie-banner').removeAttribute('hidden');

        document.getElementById('cb-accept-all').onclick = function () {
            const c = { necessary: true, analytics: true, marketing: true };
            saveConsent(c); applyConsent(c); hideBanner();
        };
        document.getElementById('cb-reject').onclick = function () {
            saveConsent({ necessary: true, analytics: false, marketing: false });
            hideBanner();
        };
        document.getElementById('cb-settings-open').onclick = function () {
            document.getElementById('cookie-settings').removeAttribute('hidden');
        };
        document.getElementById('cs-save').onclick = function () {
            const c = {
                necessary: true,
                analytics: document.getElementById('cs-analytics').checked,
                marketing: document.getElementById('cs-marketing').checked,
            };
            saveConsent(c); applyConsent(c);
            document.getElementById('cookie-settings').setAttribute('hidden', '');
            hideBanner();
        };
    });
})();
```

### 3.2 React (Context + Hook)

```jsx
// contexts/CookieConsentContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CookieConsentContext = createContext(null);
const STORAGE_KEY = 'pdp_cookie_consent';
const YM_ID = 0; // ← заменить

let analyticsLoaded = false;
function loadYandexMetrika() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t);a=e.getElementsByTagName(t)[0];
    k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,"script",
    "https://mc.yandex.ru/metrika/tag.js","ym");
    ym(YM_ID,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});
}

export function CookieConsentProvider({ children }) {
    const [consent, setConsent] = useState(null);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (saved) { setConsent(saved); if (saved.analytics) loadYandexMetrika(); }
            else setShowBanner(true);
        } catch { setShowBanner(true); }
    }, []);

    const save = useCallback((c) => {
        const data = { ...c, ts: Date.now() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setConsent(data);
        setShowBanner(false);
        if (c.analytics) loadYandexMetrika();
    }, []);

    const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
    const acceptNecessary = () => save({ necessary: true, analytics: false, marketing: false });
    const saveSettings = (analytics, marketing) => save({ necessary: true, analytics, marketing });

    return (
        <CookieConsentContext.Provider value={{ consent, showBanner, acceptAll, acceptNecessary, saveSettings }}>
            {children}
        </CookieConsentContext.Provider>
    );
}

export const useCookieConsent = () => useContext(CookieConsentContext);
```

```jsx
// components/CookieBanner.jsx
import { useState } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

export default function CookieBanner() {
    const { showBanner, acceptAll, acceptNecessary, saveSettings } = useCookieConsent();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);

    if (!showBanner) return null;

    return (
        <>
            <div className="cookie-banner" role="dialog" aria-modal="true">
                <p>Используем cookie для аналитики. <a href="/cookie-policy">Подробнее</a></p>
                <div className="cookie-banner__actions">
                    <button onClick={acceptAll} className="cb-btn cb-btn--primary">Принять все</button>
                    <button onClick={acceptNecessary} className="cb-btn cb-btn--secondary">Только необходимые</button>
                    <button onClick={() => setSettingsOpen(true)} className="cb-btn cb-btn--link">Настроить</button>
                </div>
            </div>

            {settingsOpen && (
                <div className="cookie-settings" role="dialog" aria-modal="true">
                    <h3>Настройки cookie</h3>
                    <label><input type="checkbox" checked disabled /> Необходимые (всегда)</label>
                    <label>
                        <input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} />
                        Аналитические
                    </label>
                    <label>
                        <input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)} />
                        Маркетинговые
                    </label>
                    <button onClick={() => { saveSettings(analytics, marketing); setSettingsOpen(false); }}
                            className="cb-btn cb-btn--primary">
                        Сохранить
                    </button>
                </div>
            )}
        </>
    );
}
```

```jsx
// app/layout.jsx или App.jsx
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import CookieBanner from '@/components/CookieBanner';

export default function RootLayout({ children }) {
    return (
        <CookieConsentProvider>
            {children}
            <CookieBanner />
        </CookieConsentProvider>
    );
}
```
