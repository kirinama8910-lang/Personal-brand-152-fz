import { HERO } from '../questions.js';

export function renderHero(root, { onStart }) {
  root.innerHTML = '';
  const w = document.createElement('div');
  w.className = 'quiz-wrapper quiz-hero';
  w.innerHTML = `
    <h1 class="quiz-hero-title">${HERO.title}</h1>
    <p class="quiz-hero-sub quiz-muted">${HERO.subtitle}</p>
    <button type="button" class="quiz-primary quiz-hero-cta">${HERO.cta}</button>
    <p class="quiz-hero-foot quiz-muted">${HERO.footer}</p>
  `;
  w.querySelector('.quiz-hero-cta').addEventListener('click', onStart);
  root.appendChild(w);
}
