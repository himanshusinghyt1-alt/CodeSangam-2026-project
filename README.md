# Inteva — Smart Interview & Campus Placement Platform

Inteva is a modern web-based platform designed to simplify campus recruitment and interview management. It helps candidates, HR teams, interviewers, and placement coordinators manage the recruitment process through a centralized dashboard.

The platform provides candidate applications, interview scheduling, candidate verification, interview progress tracking, live coding interview interfaces, and recruitment analytics — all through a clean, responsive user interface.

## 🚀 Features

- **Candidate Application Portal** — Submit personal details, skills, work experience, and resumes.
- **Interview Scheduling** — View available interview slots and select suitable timings.
- **Candidate Dashboard** — Track application status, interview stages, scores, and progress.
- **HR Dashboard** — Monitor upcoming interviews, recruitment analytics, and interview schedules.
- **Coordinator Dashboard** — Review candidate information, identify verification issues, and manage the recruitment pipeline.
- **Live Coding Interview Interface** — Includes a code editor, interview timer, microphone and camera controls, and evaluation criteria.
- **Candidate Verification** — Flag issues such as duplicate profiles, invalid contact details, and unreadable resumes.
- **Notifications** — View recruitment updates, interview results, and scheduling notifications.
- **Calendar Integration** — Add interview schedules to your calendar.
- **Recruitment Analytics** — Visualize interview activity and candidate progression.
- **Responsive UI** — Designed to work across desktop and mobile screen sizes.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Routing:** TanStack Router
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI and custom reusable components
- **Animations:** Framer Motion
- **Code Editor:** Monaco Editor
- **Charts:** Recharts
- **Notifications:** Sonner
- **Build Tool:** Vite
- **Testing:** Vitest and React Testing Library

## 📂 Project Structure

```text
inteva/
├── public/                  # Static assets and logo
├── src/
│   ├── components/
│   │   ├── inteva/          # Custom application components
│   │   └── ui/              # Reusable UI components
│   ├── data/
│   │   └── mock.ts          # Sample recruitment data
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Services and utility functions
│   ├── routes/              # Application pages
│   ├── test/                # Automated tests
│   ├── router.tsx           # Router configuration
│   ├── server.ts            # Server entry point
│   └── start.ts             # Application startup
├── package.json
├── vite.config.ts
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- Git

### Installation

**1. Clone the repository**

```bash
git clone <your-github-repository-url>
```

**2. Navigate to the project directory**

```bash
cd <repository-name>
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the application.

## 🧪 Testing

Run the automated tests with:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

Run the production preview:

```bash
npm run preview
```

Check code quality using ESLint:

```bash
npm run lint
```

## 🔮 Future Enhancements

- Integrate a backend API and database for persistent recruitment data.
- Implement secure authentication and role-based access control.
- Enable real-time collaboration during coding interviews.
- Integrate video conferencing and screen sharing.
- Add automated candidate evaluation and interview feedback.
- Implement email notifications and automated scheduling conflict resolution.
- Introduce advanced recruitment reports and analytics.

## 🎯 Project Objective

The primary objective of Inteva is to make campus recruitment more organized, transparent, and efficient by bringing candidate management, interview scheduling, verification, and evaluation into a single platform.

## 👨‍💻 Contributing

Contributions, suggestions, and feature requests are welcome. Feel free to fork the repository and submit a pull request.

## 📄 License

This project currently does not specify a license. Add an appropriate open-source license before distributing it for reuse.

---

**Inteva — Interviews, Scheduled Without the Chaos.**
