import { METRIKA_ID } from './constants.js';

function send(event, params = {}) {
  window.__quizAnalyticsLog = window.__quizAnalyticsLog || [];
  window.__quizAnalyticsLog.push({ event, params, at: Date.now() });
  if (METRIKA_ID && typeof window.ym === 'function') {
    window.ym(METRIKA_ID, 'reachGoal', event, params);
  }
}

export const analytics = {
  quizStarted:       ()            => send('quiz_started'),
  q1Answered:        (pain)        => send('quiz_q1_answered', { pain }),
  q2Answered:        (format)      => send('quiz_q2_answered', { format }),
  q3Answered:        (tools)       => send('quiz_q3_answered', { tools }),
  q4Answered:        (a, b)        => send('quiz_q4_answered', { price_bucket: a, count_bucket: b }),
  q5Answered:        (urgency)     => send('quiz_q5_answered', { urgency }),
  finalShown:        (calc, tag)   => send('quiz_final_shown', { scenario: calc.scenario, loss_min: calc.loss_min, loss_max: calc.loss_max, tag }),
  tgOpened:          (tag)         => send('quiz_tg_opened', { tag }),
  fallbackSubmitted: (tag)         => send('quiz_fallback_submitted', { tag }),
  outSubmitted:      (reason)      => send('quiz_out_submitted', { reason }),
  webhookError:      (stage, code) => send('quiz_webhook_error', { stage, code }),
  abandonAtFinal:    ()            => send('abandon_at_final'),
};
