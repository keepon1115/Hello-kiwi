export type BusinessHour = {
  day: string;
  time: string;
};

export const BUSINESS_HOURS: BusinessHour[] = [
  { day: '月曜日', time: '09:00～22:00' },
  { day: '火曜日', time: '09:00～13:00' },
  { day: '水曜日', time: '07:00～18:00' },
  { day: '木曜日', time: '07:00～22:00' },
  { day: '金曜日', time: '09:00～22:00' },
  { day: '土曜日', time: '15:30～18:30' },
  { day: '日曜日', time: '12:00～22:00' }
];
