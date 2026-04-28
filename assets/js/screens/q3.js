import { Q3 } from '../questions.js';
import { renderFrame } from '../renderer.js';

export function renderQ3(root, { niche, stepNumber, total, onBack, onNext }) {
  const cfg = Q3[niche];
  if (!cfg) throw new Error(`Q3: unknown niche "${niche}"`);

  const bodyHtml = `
    <p class="quiz-muted quiz-hint">Выберите до ${cfg.maxSelect} вариантов</p>
    <div class="quiz-multi">
      ${cfg.options.map((opt) => `
        <button type="button" class="quiz-option quiz-option-multi" data-id="${opt.id}">
          <span class="quiz-check" aria-hidden="true"></span>
          <span>${opt.label}</span>
        </button>
      `).join('')}
    </div>
    <button type="button" class="quiz-primary quiz-next" disabled>Далее</button>
  `;

  const frame = renderFrame(root, {
    stepNumber,
    total,
    title: cfg.title,
    bodyHtml,
    onBack,
  });

  const selected = new Set();
  const nextBtn = frame.querySelector('.quiz-next');

  frame.querySelectorAll('.quiz-option-multi').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (selected.has(id)) {
        selected.delete(id);
        btn.classList.remove('is-selected');
      } else {
        if (selected.size >= cfg.maxSelect) return;
        selected.add(id);
        btn.classList.add('is-selected');
      }
      nextBtn.disabled = selected.size === 0;
    });
  });

  nextBtn.addEventListener('click', () => {
    onNext({ q3: Array.from(selected) });
  });
}
