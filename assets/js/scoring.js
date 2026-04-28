import { A_SIGNALS_EXPERT, A_SIGNALS_SALON, C_SIGNALS } from './constants.js';

function scaleSignal(q4b) {
  const low = new Set(['count_under_20', 'missed_1_3']);
  const high = new Set(['count_80_plus', 'missed_15_plus']);
  if (low.has(q4b)) return 'low';
  if (high.has(q4b)) return 'high';
  return 'mid';
}

function urgencyValue(q5) {
  return {
    urgency_now: 'now',
    urgency_month: 'month',
    urgency_quarter: 'quarter',
    urgency_looking: 'looking',
  }[q5] || 'looking';
}

function aList(niche) {
  return niche === 'salon' ? A_SIGNALS_SALON : A_SIGNALS_EXPERT;
}

function collectToolSignals(niche, q3) {
  const aSignals = aList(niche);
  return q3.filter((t) => aSignals.includes(t) || C_SIGNALS.includes(t));
}

function isX(niche, q4a, q4b) {
  return niche === 'salon' && q4a === 'price_over_12k' && q4b === 'missed_15_plus';
}

function hasASignal(niche, q3) {
  return q3.some((t) => aList(niche).includes(t));
}

function hasCSignal(q3) {
  return q3.some((t) => C_SIGNALS.includes(t));
}

export function scoreLead({ niche, q3 = [], q4a, q4b, q5 }) {
  const urgency = urgencyValue(q5);
  const scale = scaleSignal(q4b);
  const tools = collectToolSignals(niche, q3);
  const signals = { urgency, scale, tools };

  if (isX(niche, q4a, q4b)) return { tag: 'X', signals };

  if (urgency === 'now' && hasASignal(niche, q3) && scale !== 'low') {
    return { tag: 'A', signals };
  }

  if (urgency === 'looking' || hasCSignal(q3) || scale === 'low') {
    return { tag: 'C', signals };
  }

  return { tag: 'B', signals };
}
