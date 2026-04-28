import {
  PRICE_MID_EXPERT, PRICE_MID_SALON,
  COUNT_MID_EXPERT, MISSED_MID_SALON,
  EXPERT_TARGET_SESSIONS, LOSS_CAP, LOSS_MIN_THRESHOLD,
} from './constants.js';

const roundThousand = (v) => Math.round((v + 0.5) / 1000) * 1000;
const capLoss = (v) => Math.min(v, LOSS_CAP);

function expertScenarioA(price, sessions) {
  return {
    scenario: 'expert_commission',
    loss_min: roundThousand(sessions * price * 0.30),
    loss_max: capLoss(roundThousand(sessions * price * 0.50)),
  };
}

function expertScenarioC(price, sessions) {
  return {
    scenario: 'expert_rutina',
    loss_min: roundThousand(sessions * price * 0.15),
    loss_max: capLoss(roundThousand(sessions * price * 0.30)),
  };
}

function expertScenarioB(price, sessions, q3) {
  const gap = Math.max(EXPERT_TARGET_SESSIONS - sessions, 0);
  if (gap === 0) return expertScenarioC(price, sessions);
  const kMax = q3.includes('only_sarafan') ? 0.7 : 1.0;
  return {
    scenario: 'expert_flow',
    loss_min: roundThousand(gap * price * 0.5),
    loss_max: capLoss(roundThousand(gap * price * kMax)),
  };
}

function salonScenario(avgCheck, missedPerWeek) {
  const weekly = missedPerWeek * 4.3 * avgCheck;
  return {
    scenario: 'salon_missed',
    loss_min: roundThousand(weekly * 0.5),
    loss_max: capLoss(roundThousand(weekly * 0.8)),
  };
}

export function calcLoss(answers) {
  const { niche, q1, q3 = [], q4a, q4b } = answers;

  if (niche === 'expert') {
    const price = PRICE_MID_EXPERT[q4a];
    const sessions = COUNT_MID_EXPERT[q4b];
    if (q3.includes('aggregators')) return expertScenarioA(price, sessions);
    if (q1 === 'pain_2' || q1 === 'pain_5') return expertScenarioB(price, sessions, q3);
    return expertScenarioC(price, sessions);
  }

  if (niche === 'salon') {
    const avgCheck = PRICE_MID_SALON[q4a];
    const missed = MISSED_MID_SALON[q4b];
    return salonScenario(avgCheck, missed);
  }

  throw new Error(`calcLoss: unknown niche "${niche}"`);
}

export function shouldShowLoss({ loss_max }) {
  return loss_max >= LOSS_MIN_THRESHOLD;
}

const NB = ' '; // non-breaking space U+00A0

function formatThousands(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NB);
}

export function formatLossRange(min, max) {
  return `${formatThousands(min)}${NB}–${NB}${formatThousands(max)}${NB}₽/мес`;
}
