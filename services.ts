// Data access layer. Swap these for Supabase / Express API calls later.
import { candidates, slots, interviews, notifications, audit, questions, weekly, funnel } from "@/data/mock";

const delay = <T,>(v: T, ms = 300) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const api = {
  getCandidates: () => delay(candidates),
  getSlots: () => delay(slots),
  getInterviews: () => delay(interviews),
  getNotifications: () => delay(notifications),
  getAudit: () => delay(audit),
  getQuestions: () => delay(questions),
  getAnalytics: () => delay({ weekly, funnel }),
  verifyGradingPassword: (pw: string) => delay(pw === "inteva2026", 500),
};
