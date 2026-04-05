---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

## 152-FZ Design Compliance

> **Scope of this section**: UI/design layer only — what the browser renders and how the user interacts with consent elements.
> Architecture layer (server hosting in RU, analytics backend configuration, data subject rights processing, breach notification to Роскомнадзор) → see the `152-fz` skill.

---

### ❌ PROHIBITED (Design)

- DO NOT: use pre-checked consent checkboxes (dark pattern — consent must be an active opt-in gesture) — risk: fine 300,000–700,000 RUB, repeat 1,500,000 RUB (ч. 2 ст. 13.11 КоАП РФ)

- DO NOT: load fonts from Google Fonts (fonts.googleapis.com / fonts.gstatic.com) or any other foreign CDN — loading transmits user IP to foreign servers without consent, banned since 01.07.2025 — risk: fine 1,000,000–6,000,000 RUB, repeat 18,000,000 RUB (ч. 9-11 ст. 13.11 КоАП РФ)

- DO NOT: load icons, images, or any static assets from foreign CDNs (jsDelivr with foreign nodes, cdnjs.cloudflare.com, unpkg.com, etc.) that automatically transmit user IP without explicit consent — risk: fine 1,000,000–6,000,000 RUB, repeat 18,000,000 RUB (ч. 9-11 ст. 13.11 КоАП РФ)

- DO NOT: render the "Reject" button in a cookie banner smaller, lower-contrast, or visually subordinate to the "Accept" button — dark pattern that invalidates consent — risk: fine 150,000–300,000 RUB, repeat 500,000 RUB (ч. 2 ст. 13.11 КоАП РФ)

- DO NOT: enable the form submit button before the consent checkbox is checked — the UI must enforce the consent gate visually — risk: fine 300,000–700,000 RUB, repeat 1,500,000 RUB (ч. 2 ст. 13.11 КоАП РФ)

- DO NOT: embed Google reCAPTCHA widget in forms — it transfers behavioral/IP data to Google on page load without consent, banned since 01.07.2025 — risk: fine 1,000,000–6,000,000 RUB, repeat 18,000,000 RUB (ч. 9-11 ст. 13.11 КоАП РФ)

- DO NOT: bundle the consent checkbox visually inside a general terms-of-service block or hide it in the body of a legal text — consent must be a standalone, visually distinct UI element — risk: fine 300,000–700,000 RUB, repeat 1,500,000 RUB (ч. 2 ст. 13.11 КоАП РФ)

- DO NOT: use a single checkbox that covers multiple consent purposes (e.g., "I agree to the terms AND personal data processing AND marketing") — each purpose must have its own individual checkbox since 01.09.2025 — risk: fine 300,000–700,000 RUB, repeat 1,500,000 RUB (ч. 2 ст. 13.11 КоАП РФ)

- DO NOT: embed Google Maps (`maps.googleapis.com` iframe or JS API) — fires cross-origin requests on page load and transmits user IP to Google without consent, banned since 01.07.2025 — risk: fine 1,000,000–6,000,000 RUB, repeat 18,000,000 RUB (ч. 9-11 ст. 13.11 КоАП РФ)

- DO NOT: place any third-party analytics script tag (Google Analytics, Yandex.Metrika cloud snippet, Facebook Pixel, etc.) in `<head>` as a static tag — it executes on page load before consent is obtained — risk: fine 1,000,000–6,000,000 RUB, repeat 18,000,000 RUB (ч. 9-11 ст. 13.11 КоАП РФ)

- DO NOT: make the "withdraw consent" action harder to find or slower to complete than the original "give consent" action — asymmetric UX invalidates the voluntary nature of consent — risk: fine 300,000–700,000 RUB, repeat 1,500,000 RUB (ч. 2 ст. 13.11 КоАП РФ)

---

### ✅ REQUIRED (Design)

- DO: self-host all fonts on the same domain or a Russian CDN (Яндекс CDN, Selectel CDN) — prevents cross-border IP transmission; use Fontsource npm packages or manually downloaded font files served from `/fonts/` — reason: ст. 12, 18 152-ФЗ; banned foreign font CDNs since 01.07.2025
  > Note: the server **serving** the font files must be physically located in Russia — self-hosting on a foreign server does not satisfy this requirement; full infrastructure compliance → see `152-fz` skill

- DO: display consent checkboxes unchecked by default with a clearly visible, tappable hit area (minimum 24×24 px) — reason: explicit opt-in required under ст. 9 ч. 1 152-ФЗ

- DO: visually disable (greyed-out, `disabled` attribute) the form submit button until all required consent checkboxes are checked — reason: enforces explicit consent gate (ст. 9 ч. 1 152-ФЗ)

- DO: give the cookie banner "Reject" and "Accept" buttons equal visual weight — same size, same button style, placed side by side — reason: symmetry of choice prevents dark pattern (ст. 9 152-ФЗ)

- DO: add a separate, visually distinct checkbox for each consent purpose — PD processing, marketing/newsletter, cookie analytics — each on its own line with its own label and Privacy Policy link since 01.09.2025 — reason: ст. 15 152-ФЗ, ст. 18 ФЗ-38

- DO: place a clearly visible hyperlink to the Privacy Policy directly adjacent to every consent checkbox — reason: subjects must have immediate access to the full consent terms (ст. 18.1 152-ФЗ)

- DO: replace Google reCAPTCHA with Яндекс SmartCaptcha — Russian-hosted widget, no cross-border data transfer — reason: compliant CAPTCHA alternative (ч. 5 ст. 18 152-ФЗ)

- DO: replace Google Maps embed with Яндекс.Карты or 2ГИС widget — both are Russian-hosted and do not fire cross-origin requests on load — reason: ст. 12 152-ФЗ, ban effective 01.07.2025

- DO: ensure the cookie banner appears on first page load before any non-essential scripts fire, with analytics/marketing toggles switched OFF by default — reason: consent must precede data collection (ст. 9 152-ФЗ)

- DO: inject analytics script tags **dynamically via JS** only after the user grants the corresponding consent — never place them as static `<script>` tags in `<head>` or `<body>`:
  ```js
  // Correct: inject only after consent granted
  function loadAnalytics() {
    const s = document.createElement('script');
    s.src = 'https://mc.yandex.ru/metrika/tag.js';
    s.async = true;
    document.head.appendChild(s);
  }
  // Call loadAnalytics() only inside your consent callback, never on DOMContentLoaded
  ```

- DO: render a "Manage consent" or "Withdraw consent" link in the site footer and/or user account settings — it must be at most 2 clicks from any page — reason: withdrawal must be as easy as giving consent (ст. 9 ч. 2 152-ФЗ)

- DO: serve all third-party JS libraries (chart libraries, UI toolkits, icon sets) from the same origin or a Russian CDN — download the files and commit them to `/vendor/` or use a build tool (Vite, Webpack) to bundle them locally — reason: any foreign CDN request transmits user IP without consent (ст. 12 152-ФЗ, ban since 01.07.2025)

---

### 🧩 UI Patterns

**Cookie Banner — correct structure:**
```html
<!-- Fires before any non-essential scripts. All toggles OFF by default. -->
<div role="dialog" aria-label="Cookie settings" id="cookie-banner">
  <p>We use cookies to improve the site. Choose what you allow.</p>

  <label>
    <input type="checkbox" id="consent-analytics"> <!-- unchecked -->
    Analytics cookies
    <a href="/privacy" target="_blank">Privacy Policy</a>
  </label>

  <label>
    <input type="checkbox" id="consent-marketing"> <!-- unchecked -->
    Marketing cookies
    <a href="/privacy" target="_blank">Privacy Policy</a>
  </label>

  <!-- Equal visual weight: same class, same size, side by side -->
  <div class="banner-actions">
    <button class="btn btn-secondary" id="btn-reject">Reject all</button>
    <button class="btn btn-primary"   id="btn-accept">Accept selected</button>
  </div>
</div>
```

**Consent Form — correct structure:**
```html
<form id="contact-form">
  <!-- form fields -->

  <!-- Each purpose = its own checkbox, each unchecked by default -->
  <fieldset>
    <legend>Consent</legend>

    <label>
      <input type="checkbox" name="consent-pd" required> <!-- unchecked -->
      I consent to the processing of my personal data
      <a href="/privacy">Privacy Policy</a>
    </label>

    <label>
      <input type="checkbox" name="consent-marketing"> <!-- unchecked, optional -->
      I agree to receive marketing emails
      <a href="/privacy#marketing">Details</a>
    </label>
  </fieldset>

  <!-- Disabled until consent-pd is checked -->
  <button type="submit" disabled id="submit-btn">Send</button>
</form>

<script>
  document.querySelector('[name="consent-pd"]').addEventListener('change', (e) => {
    document.getElementById('submit-btn').disabled = !e.target.checked;
  });
</script>
```

**Withdraw Consent — footer link pattern:**
```html
<footer>
  <!-- ... -->
  <a href="/consent" class="consent-manage-link">Manage or withdraw consent</a>
</footer>
```
The `/consent` page must allow the user to uncheck previously granted consents and save the choice. Deleting stored consent flags is a backend operation — see `152-fz` skill.

---

### ⚠️ RECENT LEGAL UPDATES (Design-relevant only)

- **2025-07-01**: All foreign third-party resources banned (Google Fonts, reCAPTCHA, Google Maps embed, Facebook Pixel, Cloudflare Analytics) — design impact: audit every `<link>`, `<script>`, and `@import` for external origins; migrate all font loading to self-hosted files; replace embedded Google Maps with Яндекс.Карты or 2ГИС widgets (LU-2025-001)

- **2025-09-01**: Each consent purpose must be a separate standalone document — design impact: forms must render one individual checkbox per consent purpose (e.g., PD processing, marketing emails), not a single bundled checkbox covering all purposes (LU-2025-002)

---

### ✅ 152-FZ Design QA Checklist

Run before every deploy for projects with Russian audience:

- [ ] No `<link>` or `<script>` pointing to foreign CDNs (Google, Cloudflare, jsDelivr, unpkg)
- [ ] Fonts served from `/fonts/` or Russian CDN — verified in Network tab (no `fonts.googleapis.com` requests)
- [ ] No Google Maps, Google reCAPTCHA, Facebook Pixel anywhere in the HTML
- [ ] Яндекс SmartCaptcha used where CAPTCHA is needed
- [ ] Cookie banner present, appears before any non-essential scripts fire
- [ ] Both "Reject" and "Accept" buttons identical in size and visual weight
- [ ] All consent checkboxes unchecked on page load
- [ ] Each consent purpose has its own individual checkbox
- [ ] Privacy Policy link adjacent to every consent checkbox
- [ ] Form submit button disabled until required consent checkbox is checked
- [ ] Analytics `<script>` tags absent from static HTML — injected dynamically after consent only
- [ ] "Manage/withdraw consent" link accessible from footer (≤ 2 clicks from any page)
- [ ] All third-party JS libraries bundled locally or served from Russian CDN
