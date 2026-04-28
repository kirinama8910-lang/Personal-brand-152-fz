### 3.3 Vue 3 (Composable)

```javascript
// composables/useCookieConsent.js
import { ref, onMounted } from 'vue';

const STORAGE_KEY = 'pdp_cookie_consent';
let analyticsLoaded = false;

function loadYandexMetrika(ymId) {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t);a=e.getElementsByTagName(t)[0];
    k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,"script",
    "https://mc.yandex.ru/metrika/tag.js","ym");
    ym(ymId,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});
}

export function useCookieConsent(ymId = 0) {
    const consent = ref(null);
    const showBanner = ref(false);

    onMounted(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (saved) { consent.value = saved; if (saved.analytics) loadYandexMetrika(ymId); }
            else showBanner.value = true;
        } catch { showBanner.value = true; }
    });

    function save(c) {
        const data = { ...c, ts: Date.now() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        consent.value = data;
        showBanner.value = false;
        if (c.analytics) loadYandexMetrika(ymId);
    }

    return {
        consent,
        showBanner,
        acceptAll: () => save({ necessary: true, analytics: true, marketing: true }),
        acceptNecessary: () => save({ necessary: true, analytics: false, marketing: false }),
        saveSettings: (analytics, marketing) => save({ necessary: true, analytics, marketing }),
    };
}
```

### 3.4 Next.js (App Router)

```tsx
// components/CookieBanner.tsx
'use client';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pdp_cookie_consent';

export default function CookieBanner({ ymId }: { ymId: number }) {
    const [show, setShow] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [analytics, setAnalytics] = useState(false);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
            if (!saved) setShow(true);
        } catch { setShow(true); }
    }, [ymId]);

    function save(c: { necessary: boolean; analytics: boolean; marketing: boolean }) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...c, ts: Date.now() }));
        setShow(false);
    }

    if (!show) return null;
    return (
        <>
            <div className="cookie-banner" role="dialog" aria-modal="true">
                <p>Используем cookie. <a href="/cookie-policy">Подробнее</a></p>
                <div className="cookie-banner__actions">
                    <button onClick={() => save({ necessary:true, analytics:true, marketing:true })}>Принять все</button>
                    <button onClick={() => save({ necessary:true, analytics:false, marketing:false })}>Только необходимые</button>
                    <button onClick={() => setSettingsOpen(true)}>Настроить</button>
                </div>
            </div>
            {settingsOpen && (
                <div className="cookie-settings">
                    <label><input type="checkbox" disabled checked /> Необходимые</label>
                    <label>
                        <input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} />
                        Аналитические
                    </label>
                    <button onClick={() => { save({ necessary:true, analytics, marketing:false }); setSettingsOpen(false); }}>
                        Сохранить
                    </button>
                </div>
            )}
        </>
    );
}
```
