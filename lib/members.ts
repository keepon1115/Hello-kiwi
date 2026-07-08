import studentsData from './data/members/students.json';
import voicesData from './data/members/voices.json';
import nzCardsData from './data/members/nz-cards.json';

export type Tone = 'kids' | 'adult';

export type Lesson = {
  date: string;
  message: string;
  tryThis?: string;
  slideSrc?: string;
  countsForTicket?: boolean;
};

export type BonusStamp = {
  date: string;
  type: string;
  note?: string;
};

export type TicketDef = {
  label: string;
  total: number;
  startDate: string;
};

export type Student = {
  token: string;
  displayName: string;
  tone: Tone;
  quizletUrl?: string | null;
  passphrase?: string | null;
  startedAt: string;
  lessons: Lesson[];
  ticket: TicketDef | null;
  bonusStamps?: BonusStamp[];
};

export type Voice = {
  id: string;
  date: string;
  title: string;
  meaning: string;
  audioSrc: string;
  script?: string;
};

export type NzCard = {
  id: string;
  date: string;
  titleJa: string;
  titleEn: string;
  body: string;
  emoji?: string;
  imageSrc?: string | null;
};

export type TicketSlot = { date: string | null };

export type TicketStatus = {
  label: string;
  total: number;
  slots: TicketSlot[];
  remaining: number;
  isLow: boolean;
  isEmpty: boolean;
};

export type PassportStamp = {
  date: string;
  type: string;
  note?: string;
};

const students = studentsData as Student[];
const voices = voicesData as Voice[];
const nzCards = nzCardsData as NzCard[];

const byDateDesc = (a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date);
const byDateAsc = (a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date);

export function getStudentByToken(token: string): Student | null {
  return students.find((s) => s.token === token) ?? null;
}

export function getLessonHistory(student: Student): Lesson[] {
  return [...student.lessons].sort(byDateDesc);
}

export function getLatestLesson(student: Student): Lesson | undefined {
  return getLessonHistory(student)[0];
}

export function getTicketStatus(student: Student): TicketStatus | null {
  const ticket = student.ticket;
  if (!ticket) return null;

  const eligible = student.lessons
    .filter((l) => l.countsForTicket !== false && l.date >= ticket.startDate)
    .sort(byDateAsc);

  if (eligible.length > ticket.total) {
    console.warn(
      `[members] ticket over-consumed for token="${student.token}": ${eligible.length} lessons consumed against total ${ticket.total}`
    );
  }

  const usedCount = Math.min(eligible.length, ticket.total);
  const slots: TicketSlot[] = Array.from({ length: ticket.total }, (_, i) => ({
    date: i < usedCount ? eligible[i].date : null
  }));
  const remaining = ticket.total - usedCount;

  return {
    label: ticket.label,
    total: ticket.total,
    slots,
    remaining,
    isLow: remaining === 1,
    isEmpty: remaining === 0
  };
}

export function getPassportStamps(student: Student): PassportStamp[] {
  const lessonStamps: PassportStamp[] = student.lessons.map((l) => ({
    date: l.date,
    type: 'lesson',
    note: l.message
  }));
  const bonusStamps: PassportStamp[] = (student.bonusStamps ?? []).map((b) => ({
    date: b.date,
    type: b.type,
    note: b.note
  }));
  return [...lessonStamps, ...bonusStamps].sort(byDateDesc);
}

export function getAllVoices(): Voice[] {
  return [...voices].sort(byDateDesc);
}

export function getLatestVoice(): Voice | undefined {
  return getAllVoices()[0];
}

export function getPastVoices(): Voice[] {
  return getAllVoices().slice(1);
}

export function getAllNzCards(): NzCard[] {
  return [...nzCards].sort(byDateDesc);
}

export function getLatestNzCard(): NzCard | undefined {
  return getAllNzCards()[0];
}

export function getPastNzCards(): NzCard[] {
  return getAllNzCards().slice(1);
}

export function toneText<T>(tone: Tone, kids: T, adult: T): T {
  return tone === 'adult' ? adult : kids;
}

export function studentPageHeading(student: Student): string {
  return toneText(student.tone, `${student.displayName}の ページ`, `${student.displayName}さんのページ`);
}
