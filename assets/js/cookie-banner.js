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
    // manage-consent always available regardless of banner state
    var btnManage = document.getElementById('manage-consent');
    if (btnManage) {
      btnManage.addEventListener('click', function (e) {
        e.preventDefault();
        var s = document.getElementById('cookie-settings');
        if (s) s.removeAttribute('hidden');
      });
    }

    var consent = getConsent();
    if (consent) { applyConsent(consent); return; }

    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    banner.removeAttribute('hidden');

    var btnAccept = document.getElementById('cb-accept-all');
    var btnReject = document.getElementById('cb-reject');
    var btnSettings = document.getElementById('cb-settings-open');
    var btnSave = document.getElementById('cs-save');

    if (btnAccept) {
      btnAccept.addEventListener('click', function () {
        var c = { necessary: true, analytics: true, marketing: true };
        saveConsent(c); applyConsent(c); hideBanner();
      });
    }

    if (btnReject) {
      btnReject.addEventListener('click', function () {
        saveConsent({ necessary: true, analytics: false, marketing: false });
        hideBanner();
      });
    }

    if (btnSettings) {
      btnSettings.addEventListener('click', function () {
        var s = document.getElementById('cookie-settings');
        if (s) s.removeAttribute('hidden');
      });
    }

    if (btnSave) {
      btnSave.addEventListener('click', function () {
        var csAnalytics = document.getElementById('cs-analytics');
        var csMarketing = document.getElementById('cs-marketing');
        var c = {
          necessary: true,
          analytics: csAnalytics ? csAnalytics.checked : false,
          marketing: csMarketing ? csMarketing.checked : false
        };
        saveConsent(c); applyConsent(c); hideSettings(); hideBanner();
      });
    }
  });
})();
