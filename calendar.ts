export type CalendarEvent = { title: string; description: string; start: Date; end: Date; location?: string };
const pad = (n: number) => String(n).padStart(2, "0");
const stamp = (d: Date) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
const escapeICS = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
export function googleCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({ action: "TEMPLATE", text: event.title, details: event.description, dates: `${stamp(event.start)}/${stamp(event.end)}`, ...(event.location ? { location: event.location } : {}) });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
export function downloadICS(event: CalendarEvent) {
  const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Inteva//Campus Placement//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", `UID:inteva-${event.start.getTime()}@inteva.local`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(event.start)}`, `DTEND:${stamp(event.end)}`, `SUMMARY:${escapeICS(event.title)}`, `DESCRIPTION:${escapeICS(event.description)}`, ...(event.location ? [`LOCATION:${escapeICS(event.location)}`] : []), "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "inteva-interview.ics"; a.click(); URL.revokeObjectURL(url);
}
export function addInterviewToCalendar() {
  const start = new Date(); start.setDate(start.getDate() + 1); start.setHours(15, 0, 0, 0);
  const event = { title: "Inteva campus placement interview — Round 3", description: "Your scheduled interview. Please join a few minutes early.", start, end: new Date(start.getTime() + 45 * 60_000), location: "Online video interview — Inteva" };
  downloadICS(event); return googleCalendarUrl(event);
}
