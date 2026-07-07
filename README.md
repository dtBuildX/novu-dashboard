# Novu Dashboard

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

> A production-quality SaaS project management dashboard built to demonstrate senior-level frontend engineering.

**[Live Demo](https://your-url.vercel.app)** · **[GitHub](https://github.com/you/novu-dashboard)**

---

## Features

- 11 routed pages with real Next.js App Router URLs
- Login, Signup, Forgot Password with validation and loading states  
- Kanban drag-and-drop across 5 columns
- Recharts analytics (area, bar, line, pie)
- Dark mode with manual toggle
- Command palette (Cmd+K)
- Per-route loading skeletons
- Global error boundary + custom 404
- Notifications panel with unread badge
- Toast notifications
- Collapsible sidebar
- 100% TypeScript

## Tech Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Zustand · Recharts · Lucide React

## Setup

```bash
npx create-next-app@latest novu-dashboard \
  --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd novu-dashboard
npm install zustand recharts lucide-react
# Copy all source files into matching paths
npm run dev
```

## Deploy

```bash
npx vercel
```

Live in ~2 minutes at your-project.vercel.app
