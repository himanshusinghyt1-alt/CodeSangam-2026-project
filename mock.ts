export type Status = "qualified" | "pending" | "rejected";

export const candidates = [
  { id: "c1", name: "Aarav Sharma", college: "IIT Bombay", branch: "CSE", cgpa: 9.1, skills: ["React", "Go", "DSA"], round: 3, score: 88, status: "qualified" as Status, email: "aarav.sharma@iitb.ac.in", phone: "+91 98201 45632", checks: [] as string[] },
  { id: "c2", name: "Diya Iyer", college: "NIT Trichy", branch: "ECE", cgpa: 8.7, skills: ["Python", "ML", "SQL"], round: 2, score: 81, status: "pending" as Status, email: "diya.iyer@nitt.edu", phone: "+91 94440 11223", checks: [] },
  { id: "c3", name: "Kabir Mehta", college: "BITS Pilani", branch: "CSE", cgpa: 8.9, skills: ["Java", "Spring", "Kafka"], round: 2, score: 76, status: "pending" as Status, email: "kabir.mehta@bits", phone: "+91 99876 5432", checks: ["Invalid email", "Invalid phone"] },
  { id: "c4", name: "Ananya Reddy", college: "IIIT Hyderabad", branch: "CSE", cgpa: 9.4, skills: ["C++", "Systems", "Rust"], round: 3, score: 92, status: "qualified" as Status, email: "ananya.r@iiit.ac.in", phone: "+91 90000 77881", checks: [] },
  { id: "c5", name: "Rohan Gupta", college: "DTU Delhi", branch: "IT", cgpa: 7.9, skills: ["Node.js", "MongoDB"], round: 1, score: 54, status: "rejected" as Status, email: "rohan.g@dtu.ac.in", phone: "+91 98111 22334", checks: ["Inconsistent employment dates"] },
  { id: "c6", name: "Meera Nair", college: "VIT Vellore", branch: "CSE", cgpa: 8.4, skills: ["Kotlin", "Android"], round: 1, score: 0, status: "pending" as Status, email: "meera.nair@vit.ac.in", phone: "+91 97450 66778", checks: ["Duplicate profile"] },
  { id: "c7", name: "Ishaan Verma", college: "IIT Delhi", branch: "MnC", cgpa: 9.0, skills: ["Python", "Quant", "C++"], round: 2, score: 84, status: "qualified" as Status, email: "ishaan.v@iitd.ac.in", phone: "+91 98999 00112", checks: ["Unreadable resume"] },
];

export const slots = [
  { id: "s1", day: "Mon, 26 Oct", time: "10:00 – 10:45", taken: false },
  { id: "s2", day: "Mon, 26 Oct", time: "11:00 – 11:45", taken: true },
  { id: "s3", day: "Mon, 26 Oct", time: "14:30 – 15:15", taken: false },
  { id: "s4", day: "Tue, 27 Oct", time: "09:30 – 10:15", taken: true },
  { id: "s5", day: "Tue, 27 Oct", time: "12:00 – 12:45", taken: false },
  { id: "s6", day: "Tue, 27 Oct", time: "16:00 – 16:45", taken: false },
];

export const interviews = [
  { id: "i1", candidate: "Aarav Sharma", round: "Round 3 · System Design", when: "Today, 15:00", panel: "Priya Kapoor" },
  { id: "i2", candidate: "Diya Iyer", round: "Round 2 · Live Coding", when: "Today, 16:30", panel: "Vikram Joshi" },
  { id: "i3", candidate: "Ishaan Verma", round: "Round 2 · Live Coding", when: "Tomorrow, 10:00", panel: "Priya Kapoor" },
  { id: "i4", candidate: "Kabir Mehta", round: "Round 2 · Live Coding", when: "Tomorrow, 11:30", panel: "Neha Bansal" },
];

export const weekly = [
  { d: "Mon", v: 42 }, { d: "Tue", v: 58 }, { d: "Wed", v: 71 }, { d: "Thu", v: 64 }, { d: "Fri", v: 88 }, { d: "Sat", v: 36 }, { d: "Sun", v: 20 },
];

export const funnel = [
  { stage: "Applied", n: 1240 }, { stage: "Verified", n: 982 }, { stage: "Online Test", n: 610 }, { stage: "Round 2", n: 248 }, { stage: "Round 3", n: 96 }, { stage: "Offer", n: 41 },
];

export const notifications = [
  { id: "n1", title: "Qualified for Round 3", body: "Aarav Sharma cleared Round 2 with panel consensus.", time: "2m ago", unread: true, kind: "success" },
  { id: "n2", title: "Slot rescheduled", body: "Priya Kapoor cancelled 14:00 — 3 candidates auto-reassigned.", time: "18m ago", unread: true, kind: "warning" },
  { id: "n3", title: "New verification request", body: "Meera Nair submitted an application.", time: "1h ago", unread: true, kind: "info" },
  { id: "n4", title: "Email delivered", body: "Round 2 invites sent to 48 candidates.", time: "3h ago", unread: false, kind: "info" },
];

export const audit = [
  { who: "Priya Kapoor", when: "22 Oct, 18:42", candidate: "Aarav Sharma", action: "Viewed grades" },
  { who: "Priya Kapoor", when: "22 Oct, 18:44", candidate: "Diya Iyer", action: "Submitted rubric" },
  { who: "Vikram Joshi", when: "22 Oct, 17:10", candidate: "Kabir Mehta", action: "Edited feedback" },
  { who: "System", when: "22 Oct, 16:02", candidate: "—", action: "Vault locked (timeout)" },
];

export const questions = [
  { id: 1, title: "Interval Scheduler", difficulty: "Medium", body: "Given a list of interview slots [start, end], return the minimum number of panel rooms needed so that no two overlapping interviews share a room.", example: "Input: [[0,30],[5,10],[15,20]]\nOutput: 2" },
  { id: 2, title: "Ripple Reassign", difficulty: "Hard", body: "A panelist cancels slot k. Reassign affected candidates to the earliest free slot respecting each candidate's availability. Return the new assignment map.", example: "Input: slots=4, cancel=2\nOutput: {c3: 3, c4: 4}" },
  { id: 3, title: "Verified Unique", difficulty: "Easy", body: "Return the count of unique candidate emails after normalising case and removing dots in the local part.", example: "Input: ['a.b@x.in','AB@x.in']\nOutput: 1" },
];
