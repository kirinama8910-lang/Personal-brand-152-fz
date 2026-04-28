export function renderFrame(root, { stepNumber, total, title, bodyHtml, onBack }) {
  root.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'quiz-wrapper';

  if (stepNumber !== null && total !== null) {
    const progress = document.createElement('div');
    progress.className = 'quiz-progress';
    progress.innerHTML = `
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${(stepNumber / total) * 100}%"></div>
      </div>
      <div class="quiz-progress-label">${stepNumber}/${total}</div>
    `;
    wrapper.appendChild(progress);
  }

  if (typeof onBack === 'function') {
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'quiz-back';
    back.setAttribute('aria-label', 'Вернуться к предыдущему вопросу');
    back.textContent = '← назад';
    back.addEventListener('click', onBack);
    wrapper.appendChild(back);
  }

  const h = document.createElement('h2');
  h.className = 'quiz-title';
  h.textContent = title;
  wrapper.appendChild(h);

  const body = document.createElement('div');
  body.className = 'quiz-screen-body';
  body.innerHTML = bodyHtml;
  wrapper.appendChild(body);

  root.appendChild(wrapper);
  return wrapper;
}
