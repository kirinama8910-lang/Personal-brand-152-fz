import { Q4 } from '../questions.js';
import { renderFrame } from '../renderer.js';

function subGroup(sub) {
  return `
    <h3 class="quiz-sub-title">${sub.title}</h3>
    <div class="quiz-sub-options" data-group="${sub.key}">
      ${sub.options.map((opt) => `
        <button type="button" class="quiz-chip" data-id="${opt.id}">${opt.label}</button>
      `).join('')}
    </div>
  `;
}

export function renderQ4(root, { niche, stepNumber, total, onBack, onNext }) {
  const cfg = Q4[niche];
  if (!cfg) throw new Error(`Q4: unknown niche "${niche}"`);

  const bodyHtml = `
    ${subGroup(cfg.subA)}
    ${subGroup(cfg.subB)}
    <button type="button" class="quiz-primary quiz-next" disabled>Далее</button>
  `;

  const frame = renderFrame(root, {
    stepNumber,
    total,
    title: cfg.title,
    bodyHtml,
    onBack,
  });

  const picks = { [cfg.subA.key]: null, [cfg.subB.key]: null };
  const nextBtn = frame.querySelector('.quiz-next');

  frame.querySelectorAll('.quiz-sub-options').forEach((group) => {
    const key = group.dataset.group;
    group.querySelectorAll('.quiz-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.quiz-chip').forEach((c) => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
        picks[key] = chip.dataset.id;
        nextBtn.disabled = !(picks[cfg.subA.key] && picks[cfg.subB.key]);
      });
    });
  });

  nextBtn.addEventListener('click', () => {
    onNext({ q4a: picks[cfg.subA.key], q4b: picks[cfg.subB.key] });
  });
}
