export function renderExit(root, { reason, onSubmit }) {
  const copy = reason === 'out_clinic'
    ? {
        title: 'Для клиник у меня отдельный формат',
        sub: 'Не квиз, а разбор на ваших цифрах. Оставьте @username, напишу лично.',
      }
    : {
        title: 'Сейчас фокус на «экспертах» и «салонах»',
        sub: 'Но если ваша ситуация близко — оставьте контакт, я скажу честно, подходим мы или нет.',
      };

  root.innerHTML = `
    <div class="quiz-wrapper quiz-exit">
      <h2 class="quiz-title">${copy.title}</h2>
      <p class="quiz-muted">${copy.sub}</p>
      <form class="quiz-fallback" novalidate>
        <label class="quiz-field">
          <span>Ваш @username в Telegram или MAX</span>
          <input type="text" name="username" autocomplete="off" placeholder="@username" required minlength="3" />
        </label>
        <label class="quiz-checkbox">
          <input type="checkbox" name="consent" required />
          <span>Я даю <a href="/consent/">Согласие</a> и принимаю <a href="/privacy/">Политику</a></span>
        </label>
        <input type="text" name="ignore_me" tabindex="-1" autocomplete="off" class="quiz-hp" aria-hidden="true" />
        <button type="submit" class="quiz-primary" disabled>Отправить</button>
        <p class="quiz-form-error" role="alert" hidden></p>
      </form>
    </div>
  `;

  const form = root.querySelector('form');
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
    try {
      await onSubmit({
        path: reason,
        contact: { username: usernameInput.value.trim() },
        consent: true,
      });
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить';
      errorEl.hidden = false;
      errorEl.textContent = 'Что-то пошло не так, попробуйте ещё раз.';
    }
  });
}
