import { Q1 } from '../questions.js';
import { renderFrame } from '../renderer.js';

export function renderQ1(root, { stepNumber, total, onBack, onNext }) {
  const bodyHtml = Q1.options.map((opt) => `
    <button type="button" class="quiz-option" data-id="${opt.id}" data-niche="${opt.nicheGuess ?? ''}">
      <span class="quiz-option-emoji" aria-hidden="true">${opt.emoji}</span>
      <span>${opt.label}</span>
    </button>
  `).join('');

  const frame = renderFrame(root, {
    stepNumber,
    total,
    title: Q1.title,
    bodyHtml,
    onBack,
  });

  frame.querySelectorAll('.quiz-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      onNext({ q1: btn.dataset.id, niche_guess: btn.dataset.niche || null });
    });
  });
}
