import { WEBHOOK_URL } from './constants.js';

const form = document.getElementById('cta-final-form');
if (!form) throw new Error('[cta-form] #cta-final-form not found');

const nameInput   = form.elements.namedItem('name');
const phoneInput  = form.elements.namedItem('phone');
const emailInput  = form.elements.namedItem('email');
const consentInput = form.elements.namedItem('consent');
const honeypot    = form.elements.namedItem('ignore_me');
const submitBtn   = form.querySelector('button[type="submit"]');
const errorEl     = form.querySelector('.cta-final__error');

function isPhoneValid(val) {
  return val.replace(/\D/g, '').length >= 10;
}

function isEmailValid(val) {
  return val.includes('@') && val.trim().length >= 5;
}

function syncDisabled() {
  submitBtn.disabled = !(
    nameInput.value.trim().length >= 2 &&
    isPhoneValid(phoneInput.value) &&
    isEmailValid(emailInput.value) &&
    consentInput.checked
  );
}

nameInput.addEventListener('input', syncDisabled);
phoneInput.addEventListener('input', syncDisabled);
emailInput.addEventListener('input', syncDisabled);
consentInput.addEventListener('change', syncDisabled);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (honeypot.value) return; // honeypot сработал — тихо игнорируем
  if (submitBtn.disabled) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправляем…';
  errorEl.hidden = true;

  const payload = {
    session_id: `cta_${Date.now()}`,
    ts: Date.now(),
    path: 'cta_final',
    contact: {
      name:  nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
    },
    consent: true,
  };

  const isStub = !WEBHOOK_URL || WEBHOOK_URL === '__PLACEHOLDER__';

  try {
    if (isStub) {
      // DEV: логируем в консоль вместо отправки
      window.__ctaFormLog = window.__ctaFormLog || [];
      window.__ctaFormLog.push({ at: new Date().toISOString(), payload });
      console.info('[cta-form] DEV STUB', payload);
    } else {
      // TODO: добавить домен webhook в connect-src в CSP (index.html <meta http-equiv>)
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    }

    // Успех — заменяем форму сообщением
    form.innerHTML = `
      <p class="cta-final__success">
        Спасибо! Пришлю расчёт в ближайшее время — проверяйте почту.
      </p>
    `;
  } catch {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Отправить';
    errorEl.hidden = false;
    errorEl.textContent = 'Что-то пошло не так. Попробуйте ещё раз.';
  }
});
