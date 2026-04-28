export const WEBHOOK_URL = '__PLACEHOLDER__';
export const TG_BOT_USERNAME = 'KirinaAI_bot';
export const METRIKA_ID = null;

export const PRICE_MID_EXPERT = {
  price_under_2k: 1000,
  price_2_4k: 3000,
  price_4_7k: 5500,
  price_7_15k: 11000,
  price_over_15k: 18000,
};

export const PRICE_MID_SALON = {
  price_under_1_5k: 750,
  price_1_5_3k: 2250,
  price_3_6k: 4500,
  price_6_12k: 9000,
  price_over_12k: 15000,
};

export const COUNT_MID_EXPERT = {
  count_under_20: 10,
  count_20_40: 30,
  count_40_80: 60,
  count_80_plus: 90,
};

export const MISSED_MID_SALON = {
  missed_1_3: 2,
  missed_4_7: 5.5,
  missed_8_15: 11.5,
  missed_15_plus: 17,
};

export const A_SIGNALS_EXPERT = ['tg_channel', 'aggregators'];
export const A_SIGNALS_SALON = ['yclients', 'dikidi', 'aloxo', 'tg_built_in_bot'];
export const C_SIGNALS = ['only_sarafan', 'excel_manual'];

export const EXPERT_TARGET_SESSIONS = 40;
export const LOSS_CAP = 500000;
export const LOSS_MIN_THRESHOLD = 10000;
