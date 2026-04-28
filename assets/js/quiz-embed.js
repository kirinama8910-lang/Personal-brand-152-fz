import { startQuiz } from './quiz.js';

function ensureStylesheet() {
  const href = '/assets/css/quiz.css';
  if ([...document.styleSheets].some((s) => (s.href || '').endsWith('/assets/css/quiz.css'))) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

function boot() {
  ensureStylesheet();
  const root = document.getElementById('quiz-root');
  if (!root) {
    console.warn('[quiz-embed] #quiz-root not found');
    return;
  }
  startQuiz(root);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
