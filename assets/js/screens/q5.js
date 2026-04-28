import { Q5 } from '../questions.js';
import { renderFrame } from '../renderer.js';

export function renderQ5(root, { stepNumber, total, onBack, onNext }) {
  const bodyHtml = Q5.options.map((opt) => `
    <button type="button" class="quiz-option" data-id="${opt.id}">
      <span class="quiz-option-emoji" aria-hidden="true">${opt.emoji}</span>
      <span>${opt.label}</span>
    </button>
  `).join('');

  const frame = renderFrame(root, {
    stepNumber,
    total,
    title: Q5.title,
    bodyHtml,
    onBack,
  });

  frame.querySelectorAll('.quiz-option').forEach((btn) => {
    btn.addEventListener('click', () => onNext({ q5: btn.dataset.id }));
  });
}
