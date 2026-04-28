export const STORAGE_KEY = 'quiz_state_v1';

function randomId() {
  return Math.random().toString(36).slice(2, 12).padEnd(10, '0').slice(0, 10);
}

function readRaw() {
  try {
    const s = sessionStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

function writeRaw(data) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function createState() {
  const existing = readRaw();
  const data = existing || {
    session_id: randomId(),
    ts_start: new Date().toISOString(),
    answers: {},
    timings: {},
  };
  if (!existing) writeRaw(data);

  const persist = () => writeRaw(data);

  return {
    get sessionId() { return data.session_id; },
    get timings() { return data.timings; },
    get tsStart() { return data.ts_start; },
    get(key) {
      if (key === 'session_id') return data.session_id;
      return data.answers[key];
    },
    set(key, value) {
      data.answers[key] = value;
      persist();
    },
    all() {
      return { ...data.answers, session_id: data.session_id };
    },
    markTime(screenKey) {
      data.timings[screenKey] = Date.now();
      persist();
    },
    reset() {
      for (const k of Object.keys(data.answers)) delete data.answers[k];
      data.timings = {};
      try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
    },
  };
}
