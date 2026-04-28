export const HERO = {
  title: 'Посчитайте, сколько денег ваш бизнес теряет каждый месяц',
  subtitle: '5 вопросов, 2 минуты. На выходе — диапазон потерь в рублях и план возврата в Telegram',
  cta: 'Начать — 2 минуты',
  footer: 'Без регистрации. Контакт оставляете только если сами захотите в конце',
};

export const Q1 = {
  title: 'Что сильнее всего мешает зарабатывать больше прямо сейчас?',
  type: 'single',
  required: true,
  options: [
    { id: 'pain_1', emoji: '📞', label: 'Записи теряются после 20:00 — клиенты пишут, когда некому ответить, и уходят в соседнее место', nicheGuess: 'salon_strong' },
    { id: 'pain_2', emoji: '📉', label: 'Нет стабильного потока новых клиентов: Instagram больше не работает, сарафан не тянет', nicheGuess: 'expert_strong' },
    { id: 'pain_3', emoji: '🔁', label: 'Рутина съедает день: каждое типовое сообщение — вручную, до ночи в мессенджерах', nicheGuess: null },
    { id: 'pain_4', emoji: '💸', label: 'Клиенты приходят один раз и пропадают — возвратов почти нет', nicheGuess: null },
    { id: 'pain_5', emoji: '🎯', label: 'Сайт/канал есть, но заявок с него нет — деньги на рекламу улетают в пустоту', nicheGuess: 'expert_lean' },
  ],
};

export const Q2 = {
  title: 'Коротко про ваш формат работы:',
  type: 'single',
  required: true,
  options: [
    { id: 'format_expert', emoji: '👤', label: 'Я работаю самостоятельно — продаю своё время (психолог, коуч, нутрициолог, репетитор, методолог)', niche: 'expert' },
    { id: 'format_salon', emoji: '✂️', label: 'У меня студия / салон: 2–5 мастеров, принимаем клиентов в одном месте', niche: 'salon' },
    { id: 'format_clinic', emoji: '🏥', label: 'Клиника с врачами (стоматология, ветеринария, косметология с медлицензией)', niche: 'clinic', exit: 'out_clinic' },
    { id: 'format_other', emoji: '🛒', label: 'Другое (производство, розница, онлайн-школа…)', niche: 'other', exit: 'out_other' },
  ],
};

export const Q3 = {
  expert: {
    title: 'Где сейчас ведёте практику и продвигаетесь?',
    type: 'multi',
    maxSelect: 3,
    options: [
      { id: 'tg_channel',  label: 'Telegram-канал (мой, веду регулярно)' },
      { id: 'instagram',   label: 'Instagram через VPN' },
      { id: 'aggregators', label: 'Ясно / Meta / Alter / Профи.ру (агрегаторы)' },
      { id: 'site',        label: 'Свой сайт / Tilda / Readymag' },
      { id: 'avito',       label: 'Авито Услуги' },
      { id: 'only_sarafan',label: 'Только сарафан, никакой площадки' },
    ],
  },
  salon: {
    title: 'Что используете для записи клиентов и общения с ними?',
    type: 'multi',
    maxSelect: 3,
    options: [
      { id: 'yclients',         label: 'YCLIENTS' },
      { id: 'dikidi',           label: 'DIKIDI' },
      { id: 'aloxo',            label: 'Aloxo / Sonline / другой online-сервис' },
      { id: 'tg_booking',       label: 'Telegram-канал с записью через @username' },
      { id: 'tg_built_in_bot',  label: 'Встроенный бот от YCLIENTS/DIKIDI' },
      { id: 'excel_manual',     label: 'Excel / тетрадь / админ вручную' },
    ],
  },
};

export const Q4 = {
  expert: {
    title: 'Масштаб вашей практики',
    subA: {
      key: 'q4a',
      title: 'Средний чек одной консультации/сессии?',
      options: [
        { id: 'price_under_2k', label: 'До 2 000 ₽' },
        { id: 'price_2_4k',     label: '2 000 – 4 000 ₽' },
        { id: 'price_4_7k',     label: '4 000 – 7 000 ₽' },
        { id: 'price_7_15k',    label: '7 000 – 15 000 ₽' },
        { id: 'price_over_15k', label: 'Свыше 15 000 ₽' },
      ],
    },
    subB: {
      key: 'q4b',
      title: 'Сколько консультаций в среднем проводите в месяц?',
      options: [
        { id: 'count_under_20', label: 'До 20' },
        { id: 'count_20_40',    label: '20 – 40' },
        { id: 'count_40_80',    label: '40 – 80' },
        { id: 'count_80_plus',  label: '80 и больше' },
      ],
    },
  },
  salon: {
    title: 'Масштаб вашего салона',
    subA: {
      key: 'q4a',
      title: 'Средний чек одного клиента за визит?',
      options: [
        { id: 'price_under_1_5k', label: 'До 1 500 ₽' },
        { id: 'price_1_5_3k',     label: '1 500 – 3 000 ₽' },
        { id: 'price_3_6k',       label: '3 000 – 6 000 ₽' },
        { id: 'price_6_12k',      label: '6 000 – 12 000 ₽' },
        { id: 'price_over_12k',   label: 'Свыше 12 000 ₽' },
      ],
    },
    subB: {
      key: 'q4b',
      title: 'Сколько записей/обращений в неделю пропускаете, когда некому ответить (вечером, в выходные, админ не на месте)?',
      options: [
        { id: 'missed_1_3',     label: '1 – 3' },
        { id: 'missed_4_7',     label: '4 – 7' },
        { id: 'missed_8_15',    label: '8 – 15' },
        { id: 'missed_15_plus', label: '15 и больше' },
      ],
    },
  },
};

export const Q5 = {
  title: 'Если найдётся решение, которое реально возвращает эти деньги — когда хотите запуститься?',
  type: 'single',
  required: true,
  options: [
    { id: 'urgency_now',     emoji: '🔥', label: 'Нужно прямо сейчас — болит уже долго' },
    { id: 'urgency_month',   emoji: '📅', label: 'В ближайший месяц' },
    { id: 'urgency_quarter', emoji: '🗓', label: 'В течение квартала' },
    { id: 'urgency_looking', emoji: '👀', label: 'Просто смотрю варианты, ничего срочного' },
  ],
};

export const FINAL_REASON_TEXT = {
  expert_commission: 'Агрегаторы забирают 30–50% с каждой сессии',
  expert_flow:       'Свободные слоты в расписании остаются пустыми — это и есть потери',
  expert_rutina:     'Без автоматизации напоминаний и возвратов теряется 15–30% выручки',
  salon_missed:      'Это записи, которые уходят, когда некому ответить после 20:00',
};
