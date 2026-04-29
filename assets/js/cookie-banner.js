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
