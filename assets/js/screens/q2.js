import { Q2 } from '../questions.js';
import { renderFrame } from '../renderer.js';

export function renderQ2(root, { stepNumber, total, onBack, onNext }) {
  const bodyHtml = Q2.options.map((opt) => `
    <button type="button"
            class="quiz-option"
            data-id="${opt.id}"
            data-niche="${opt.niche}"
            data-exit="${opt.exit ?? ''}">
      <span class="quiz-option-emoji" aria-hidden="true">${opt.emoji}</span>
      <span>${opt.label}</span>
    </button>
  `).join('');

  const frame = renderFrame(root, {
    stepNumber,
    total,
    title: Q2.title,
    bodyHtml,
    onBack,
  });

  frame.querySelectorAll('.quiz-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      onNext({
        q2: btn.dataset.id,
        niche: btn.dataset.niche,
        exit: btn.dataset.exit || null,
      });
    });
  });
}
