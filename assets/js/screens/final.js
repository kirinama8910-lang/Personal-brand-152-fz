import { calcLoss, shouldShowLoss, formatLossRange } from '../calculator.js';
import { scoreLead } from '../scoring.js';
import { FINAL_REASON_TEXT } from '../questions.js';
import { TG_BOT_USERNAME } from '../constants.js';
import { analytics } from '../analytics.js';

export function renderFinal(root, { state, onSubmit }) {
  const answers = state.all();
  const calc = calcLoss({
    niche: answers.niche,
    q1: answers.q1,
    q3: answers.q3 || [],
    q4a: answers.q4a,
    q4b: answers.q4b,
  });
  const scoring = scoreLead({
    niche: answers.niche,
    q3: answers.q3 || [],
    q4a: answers.q4a,
    q4b: answers.q4b,
    q5: answers.q5,
  });
  state.set('calc', calc);
  state.set('scoring', scoring);
  analytics.finalShown(calc, scoring.tag);

  const showCipher = shouldShowLoss(calc);
  const lossHtml = showCipher
    ? `<div class="quiz-loss-amount">${formatLossRange(calc.loss_min, calc.loss_max)}</div>
       <p class="quiz-loss-reason">${FINAL_REASON_TEXT[calc.scenario]}</p>`
    : `<p class="quiz-loss-fallback">Потери в вашем случае небольшие, но в деньгах всё равно есть куда расти. Покажу где именно.</p>`;

  const deepLink = `https://t.me/${TG_BOT_USERNAME}?start=${state.sessionId}`;

  root.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'quiz-wrapper quiz-final';
  wrapper.innerHTML = `
    <h2 class="quiz-final-heading">По вашим ответам, вы теряете ориентировочно</h2>
    ${lossHtml}
    <a class="quiz-primary quiz-tg-cta" href="${deepLink}" target="_blank" rel="noopener noreferrer">
      Получить точный расчёт и план за 15 минут в Telegram
    </a>
    <p class="quiz-muted quiz-final-consent">Нажимая кнопку, вы соглашаетесь с <a href="/privacy/">Политикой конфиденциальности</a>.</p>
    <div class="quiz-what-next">
      <p><strong>Что получите в ответ:</strong></p>
      <ul>
        <li>Точный расчёт потерь на ваших цифрах</li>
        <li>2–3 первых шага, которые можно внедрить за неделю</li>
        <li>Бесплатно, без обязательств</li>
      </ul>
    </div>
    <div id="quiz-fallback-slot"></div>
  `;
  root.appendChild(wrapper);

  const ctx = { leftViaSubmit: false, tag: scoring.tag };
  const tgBtn = wrapper.querySelector('.quiz-tg-cta');
  let tgClicked = false;
  tgBtn.addEventListener('click', () => {
    if (tgClicked) return;
    tgClicked = true;
    ctx.leftViaSubmit = true;
    analytics.tgOpened(scoring.tag);
    tgBtn.classList.add('is-loading');
    onSubmit({ path: 'main', tag: scoring.tag });
  });

  mountFallbackForm(wrapper.querySelector('#quiz-fallback-slot'), onSubmit, ctx);

  window.addEventListener('beforeunload', () => {
    if (!ctx.leftViaSubmit) analytics.abandonAtFinal();
  }, { once: true });
}

function mountFallbackForm(slot, onSubmit, ctx) {
  slot.innerHTML = `
    <div class="quiz-divider"><span>или</span></div>
    <form class="quiz-fallback" novalidate>
      <label class="quiz-field">
        <span>Ваш @username в Telegram или MAX</span>
        <input type="text" name="username" autocomplete="off" placeholder="@username" required minlength="3" />
      </label>
      <label class="quiz-checkbox">
        <input type="checkbox" name="consent" required />
        <span>Я даю <a href="/consent/">Согласие на обработку персональных данных</a> и принимаю <a href="/privacy/">Политику конфиденциальности</a></span>
      </label>
      <input type="text" name="ignore_me" tabindex="-1" autocomplete="off" class="quiz-hp" aria-hidden="true" />
      <button type="submit" class="quiz-primary" disabled>Отправить</button>
      <p class="quiz-form-error" role="alert" hidden></p>
    </form>
  `;

  const form = slot.querySelector('form');
  const usernameInput = form.elements.namedItem('username');
  const consentInput = form.elements.namedItem('consent');
  const honeypot = form.elements.namedItem('ignore_me');
  const submitBtn = form.querySelector('button[type="submit"]');
  const errorEl = form.querySelector('.quiz-form-error');

  const syncDisabled = () => {
    submitBtn.disabled = !(usernameInput.value.trim().length >= 3 && consentInput.checked);
  };
  usernameInput.addEventListener('input', syncDisabled);
  consentInput.addEventListener('change', syncDisabled);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (honeypot.value) return;
    if (submitBtn.disabled) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем…';
    errorEl.hidden = true;
    analytics.fallbackSubmitted(ctx.tag);
    ctx.leftViaSubmit = true;
    try {
      await onSubmit({
        path: 'fallback',
        contact: { username: usernameInput.value.trim() },
        consent: true,
        tag: ctx.tag,
      });
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить';
      errorEl.hidden = false;
      errorEl.textContent = 'Что-то пошло не так, попробуйте ещё раз.';
    }
  });
}
