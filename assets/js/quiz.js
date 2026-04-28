import { createState } from './state.js';
import { renderHero } from './screens/hero.js';
import { renderQ1 } from './screens/q1.js';
import { renderQ2 } from './screens/q2.js';
import { renderQ3 } from './screens/q3.js';
import { renderQ4 } from './screens/q4.js';
import { renderQ5 } from './screens/q5.js';
import { renderFinal } from './screens/final.js';
import { renderExit } from './screens/exit.js';
import { renderThanks } from './screens/thanks.js';
import { postPayload, buildPayload } from './webhook.js';
import { analytics } from './analytics.js';

const TOTAL_STEPS = 5;

export function startQuiz(rootSelector = '#quiz-root') {
  const root = typeof rootSelector === 'string'
    ? document.querySelector(rootSelector)
    : rootSelector;
  if (!root) throw new Error(`quiz: root ${rootSelector} not found`);

  const state = createState();

  function goHero() {
    renderHero(root, {
      onStart: () => {
        state.markTime('hero');
        analytics.quizStarted();
        goQ1();
      },
    });
  }

  function goQ1() {
    renderQ1(root, {
      stepNumber: 1,
      total: TOTAL_STEPS,
      onBack: () => goHero(),
      onNext: ({ q1, niche_guess }) => {
        state.set('q1', q1);
        state.set('niche_guess', niche_guess);
        state.markTime('q1_done');
        analytics.q1Answered(q1);
        goQ2();
      },
    });
  }

  function goQ2() {
    renderQ2(root, {
      stepNumber: 2,
      total: TOTAL_STEPS,
      onBack: () => goQ1(),
      onNext: ({ q2, niche, exit: exitPath }) => {
        state.set('q2', q2);
        state.set('niche', niche);
        state.markTime('q2_done');
        analytics.q2Answered(q2);
        if (exitPath) {
          state.set('path', exitPath);
          goExit(exitPath);
          return;
        }
        state.set('path', 'main');
        goQ3();
      },
    });
  }

  function goQ3() {
    renderQ3(root, {
      niche: state.get('niche'),
      stepNumber: 3,
      total: TOTAL_STEPS,
      onBack: () => goQ2(),
      onNext: ({ q3 }) => {
        state.set('q3', q3);
        state.markTime('q3_done');
        analytics.q3Answered(q3);
        goQ4();
      },
    });
  }

  function goQ4() {
    renderQ4(root, {
      niche: state.get('niche'),
      stepNumber: 4,
      total: TOTAL_STEPS,
      onBack: () => goQ3(),
      onNext: ({ q4a, q4b }) => {
        state.set('q4a', q4a);
        state.set('q4b', q4b);
        state.markTime('q4_done');
        analytics.q4Answered(q4a, q4b);
        goQ5();
      },
    });
  }

  function goQ5() {
    renderQ5(root, {
      stepNumber: 5,
      total: TOTAL_STEPS,
      onBack: () => goQ4(),
      onNext: ({ q5 }) => {
        state.set('q5', q5);
        state.markTime('q5_done');
        analytics.q5Answered(q5);
        goFinal();
      },
    });
  }

  function goFinal() {
    renderFinal(root, {
      state,
      onSubmit: async ({ path, contact, consent, tag }) => {
        if (contact) state.set('contact', contact);
        if (typeof consent === 'boolean') state.set('consent', consent);
        const payload = buildPayload(state, {
          path,
          contact: contact || { username: null },
          consent: path === 'main' ? false : !!consent,
        });
        if (path === 'main') {
          postPayload(payload, { mode: 'fire-and-forget' }).catch((err) => {
            analytics.webhookError('main', err?.message || 'unknown');
            console.warn('[quiz] webhook main failed', err);
          });
          return;
        }
        try {
          await postPayload(payload, { mode: 'await' });
        } catch (err) {
          analytics.webhookError('fallback', err?.message || 'unknown');
          throw err;
        }
        analytics.fallbackSubmitted(tag || null);
        goThanks({ variant: 'main_fallback' });
      },
    });
  }

  function goExit(reason) {
    renderExit(root, {
      reason,
      onSubmit: async ({ path, contact, consent }) => {
        state.set('contact', contact);
        state.set('consent', consent);
        const payload = buildPayload(state, { path, contact, consent });
        try {
          await postPayload(payload, { mode: 'await' });
        } catch (err) {
          analytics.webhookError('exit', err?.message || 'unknown');
          throw err;
        }
        analytics.outSubmitted(reason);
        goThanks({ variant: 'exit' });
      },
    });
  }

  function goThanks({ variant }) {
    renderThanks(root, { variant });
  }

  function resolveResumeStep() {
    const a = state.all();
    if (a.q5) return 'final';
    if (a.q4a && a.q4b) return 'q5';
    if (a.q3) return 'q4';
    if (a.q2) {
      if (a.path && a.path !== 'main') return { kind: 'exit', reason: a.path };
      return 'q3';
    }
    if (a.q1) return 'q2';
    return 'hero';
  }

  const resume = resolveResumeStep();
  if (resume === 'hero') goHero();
  else if (resume === 'q2') goQ2();
  else if (resume === 'q3') goQ3();
  else if (resume === 'q4') goQ4();
  else if (resume === 'q5') goQ5();
  else if (resume === 'final') goFinal();
  else if (resume?.kind === 'exit') goExit(resume.reason);
  else goHero();
}
