export function renderThanks(root, { variant }) {
  const showCaseLink = variant === 'main_fallback';
  const caseLink = showCaseLink
    ? `<p class="quiz-muted">Пока ждёте — <a href="#" rel="noopener noreferrer">посмотрите, как это работает у других</a></p>`
    : '';
  root.innerHTML = `
    <div class="quiz-wrapper quiz-thanks">
      <h2 class="quiz-title">Принято. Напишу в Telegram/MAX в течение 24 часов</h2>
      ${caseLink}
    </div>
  `;
}
