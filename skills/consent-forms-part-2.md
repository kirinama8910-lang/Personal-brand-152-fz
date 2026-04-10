### 2.3 Vue 3 (Composition API)

```vue
<!-- components/ContactForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <div class="form-group">
      <label for="name">Имя *</label>
      <input id="name" v-model="fields.name" type="text" required autocomplete="given-name" />
    </div>
    <div class="form-group">
      <label for="phone">Телефон *</label>
      <input id="phone" v-model="fields.phone" type="tel" required autocomplete="tel" />
    </div>

    <div class="consent-block">
      <label class="consent-label">
        <input type="checkbox" v-model="consentPdp" />
        <span>
          Даю <a href="/consent" target="_blank">согласие на обработку ПДн</a>
          согласно <a href="/privacy-policy" target="_blank">Политике</a>
        </span>
      </label>
    </div>

    <div class="consent-block">
      <label class="consent-label">
        <input type="checkbox" v-model="consentMarketing" />
        <span>Согласен получать рекламные рассылки</span>
      </label>
    </div>

    <button type="submit" :disabled="!consentPdp">Отправить</button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';

const fields = reactive({ name: '', phone: '' });
const consentPdp = ref(false);
const consentMarketing = ref(false);

async function handleSubmit() {
    if (!consentPdp.value) return;
    await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, consentPdp: consentPdp.value }),
    });
}
</script>
```

### 2.4 Next.js (App Router, Server Actions)

```tsx
// components/ContactForm.tsx
'use client';
import { useState } from 'react';
import { submitContact } from '@/app/actions/contact';

export default function ContactForm() {
    const [consentPdp, setConsentPdp] = useState(false);
    const [pending, setPending] = useState(false);

    async function handleSubmit(formData: FormData) {
        if (!consentPdp) return;
        setPending(true);
        await submitContact(formData);
        setPending(false);
    }

    return (
        <form action={handleSubmit} noValidate>
            <input type="text" name="name" required autoComplete="given-name" placeholder="Имя *" />
            <input type="tel" name="phone" required autoComplete="tel" placeholder="Телефон *" />
            <input type="hidden" name="consentPdp" value={consentPdp ? '1' : '0'} />

            <div className="consent-block">
                <label>
                    <input
                        type="checkbox"
                        checked={consentPdp}
                        onChange={(e) => setConsentPdp(e.target.checked)}
                    />
                    <span>
                        Даю <a href="/consent">согласие на обработку ПДн</a>{' '}
                        согласно <a href="/privacy-policy">Политике</a>
                    </span>
                </label>
            </div>

            <button type="submit" disabled={!consentPdp || pending}>
                {pending ? 'Отправка...' : 'Отправить'}
            </button>
        </form>
    );
}
```

```typescript
// app/actions/contact.ts
'use server';
export async function submitContact(formData: FormData) {
    if (formData.get('consentPdp') !== '1') {
        throw new Error('Consent required');
    }
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    // сохранить в БД на российском сервере...
}
```
