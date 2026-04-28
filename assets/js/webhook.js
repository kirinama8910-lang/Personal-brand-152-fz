import { WEBHOOK_URL } from './constants.js';

const BACKOFFS = [500, 1500, 3000];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isDevStub() {
  return !WEBHOOK_URL || WEBHOOK_URL === '__PLACEHOLDER__';
}

export async function postPayload(payload, { mode = 'await', maxAttempts = 3 } = {}) {
  if (isDevStub()) {
    window.__quizWebhookLog = window.__quizWebhookLog || [];
    window.__quizWebhookLog.push({ at: new Date().toISOString(), payload });
    console.info('[quiz:webhook] DEV STUB', payload);
    return { ok: true, stub: true };
  }

  const attempt = async () => {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: mode === 'fire-and-forget',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json().catch(() => ({ ok: true }));
  };

  let lastErr = null;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await attempt();
    } catch (err) {
      lastErr = err;
      if (i < maxAttempts - 1) await sleep(BACKOFFS[i]);
    }
  }
  throw lastErr;
}

export function buildPayload(state, { path, contact, consent }) {
  const answers = state.all();
  const timings = state.timings;
  const meta = readMeta();
  return {
    session_id: state.sessionId,
    ts: state.tsStart,
    path,
    answers: {
      q1: answers.q1 || null,
      q2: answers.q2 || null,
      q3: answers.q3 || [],
      q4a: answers.q4a || null,
      q4b: answers.q4b || null,
      q5: answers.q5 || null,
    },
    calc: answers.calc || null,
    scoring: answers.scoring || null,
    contact: contact || { username: null },
    consent: !!consent,
    meta: { ...meta, time_per_q: toTimePerQ(timings) },
  };
}

function toTimePerQ(timings) {
  const order = ['hero', 'q1_done', 'q2_done', 'q3_done', 'q4_done', 'q5_done'];
  const out = [];
  for (let i = 1; i < order.length; i++) {
    const a = timings[order[i - 1]];
    const b = timings[order[i]];
    if (typeof a === 'number' && typeof b === 'number') {
      out.push(Math.max(0, Math.round((b - a) / 1000)));
    } else {
      out.push(null);
    }
  }
  return out;
}

function readMeta() {
  const u = new URL(location.href);
  const qs = u.searchParams;
  return {
    utm_source: qs.get('utm_source') || null,
    utm_medium: qs.get('utm_medium') || null,
    utm_campaign: qs.get('utm_campaign') || null,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    locale: navigator.language || 'ru-RU',
    viewport: window.innerWidth,
  };
}
