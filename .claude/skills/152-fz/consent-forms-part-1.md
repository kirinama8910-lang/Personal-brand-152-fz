## ФАЗА 2: ФОРМЫ СБОРА ПЕРСОНАЛЬНЫХ ДАННЫХ

Каждая форма с ПДн обязана содержать: чекбокс согласия (не предустановлен) + ссылку на Политику + ссылку на Согласие + заблокированную кнопку до согласия.

### 2.1 HTML + Vanilla JS

```html
<form id="contact-form" novalidate>
    <div class="form-group">
        <label for="name">Имя *</label>
        <input type="text" id="name" name="name" required autocomplete="given-name">
    </div>
    <div class="form-group">
        <label for="phone">Телефон *</label>
        <input type="tel" id="phone" name="phone" required autocomplete="tel">
    </div>
    <!-- Собирай ТОЛЬКО поля, необходимые для цели (ст. 5 ч. 5 152-ФЗ) -->

    <div class="consent-block">
        <label class="consent-label">
            <input type="checkbox" id="consent-pdp" name="consent_pdp" required>
            <!-- НЕ добавляй checked — запрещено (ст. 9 ч. 1 152-ФЗ) -->
            <span>Даю <a href="/consent" target="_blank">согласие на обработку ПДн</a>
            согласно <a href="/privacy-policy" target="_blank">Политике</a></span>
        </label>
    </div>

    <!-- Отдельный чекбокс для рассылок (ст. 15 152-ФЗ, ст. 18 ФЗ-38) -->
    <div class="consent-block">
        <label class="consent-label">
            <input type="checkbox" id="consent-marketing" name="consent_marketing">
            <span>Согласен получать рекламные рассылки</span>
        </label>
    </div>

    <button type="submit" id="submit-btn" disabled>Отправить</button>
</form>

<script>
const pdpCheckbox = document.getElementById('consent-pdp');
const submitBtn = document.getElementById('submit-btn');
pdpCheckbox.addEventListener('change', () => {
    submitBtn.disabled = !pdpCheckbox.checked;
});
document.getElementById('contact-form').addEventListener('submit', (e) => {
    if (!pdpCheckbox.checked) { e.preventDefault(); return; }
});
</script>
```

### 2.2 React

```jsx
// components/ContactForm.jsx
import { useState } from 'react';

export default function ContactForm() {
    const [fields, setFields] = useState({ name: '', phone: '' });
    const [consentPdp, setConsentPdp] = useState(false);
    const [consentMarketing, setConsentMarketing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!consentPdp) return;
        await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...fields, consentPdp, consentMarketing }),
        });
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
                <label htmlFor="name">Имя *</label>
                <input
                    id="name" type="text" required autoComplete="given-name"
                    value={fields.name}
                    onChange={(e) => setFields({ ...fields, name: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Телефон *</label>
                <input
                    id="phone" type="tel" required autoComplete="tel"
                    value={fields.phone}
                    onChange={(e) => setFields({ ...fields, phone: e.target.value })}
                />
            </div>

            {/* Согласие на ПДн — НЕ передавай defaultChecked */}
            <div className="consent-block">
                <label className="consent-label">
                    <input
                        type="checkbox"
                        checked={consentPdp}
                        onChange={(e) => setConsentPdp(e.target.checked)}
                    />
                    <span>
                        Даю <a href="/consent" target="_blank" rel="noreferrer">согласие на обработку ПДн</a> согласно{' '}
                        <a href="/privacy-policy" target="_blank" rel="noreferrer">Политике</a>
                    </span>
                </label>
            </div>

            <div className="consent-block">
                <label className="consent-label">
                    <input
                        type="checkbox"
                        checked={consentMarketing}
                        onChange={(e) => setConsentMarketing(e.target.checked)}
                    />
                    <span>Согласен получать рекламные рассылки</span>
                </label>
            </div>

            <button type="submit" disabled={!consentPdp}>Отправить</button>
        </form>
    );
}
```
