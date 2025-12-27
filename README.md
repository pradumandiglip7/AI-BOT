<div align="center">

# AI Bot

_Next-Gen AI Market Prediction & Trading Dashboard_

[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-ED2590?logo=framer)](https://www.framer.com/motion/)
[![Recharts](https://img.shields.io/badge/Recharts-3.x-FF6D00)](https://recharts.org/en-US/)

<br/>

<!-- Placeholder for dashboard screenshot -->
![Affynex Dashboard Placeholder](https://via.placeholder.com/1280x720?text=Affynex+Dashboard)

</div>

## ✨ Overview

Affynex is a production-grade, high-fidelity AI trading platform built on Next.js App Router. It delivers a real-time, glassmorphic fintech experience that feels like Bloomberg meets Cyberpunk — fast, responsive, and premium.

- Dark theme by default (`bg-background`, approx `#0B0E14`)
- Accents: Cyan `#00D18F` and Electric Blue `#2D68FF`
- Glassmorphism via `glass-card` utility, neon glows via `animate-pulse-glow`
- Smooth transitions powered by Framer Motion

---

## ⚡ Key Features (Technical Breakdown)

- Real-time Market Simulation
  - Simulated streaming UI using timed updates and motion transitions
  - Displayed in the Trader Dashboard overview with animated confidence bars
- AI Confidence Engine
  - Dynamic confidence meters and risk badges rendered in the dashboard
  - Inline signals with animated progress indicators and target/stop overlays
- Sentiment Analysis
  - Bullish/Neutral/Bearish sentiment bars with animated width transitions
  - Present in the overview panel with recent achievements and status icons
- Live Ticker
  - Infinite marquee-style ticker concept for crypto/forex prices
  - Integrates well with Lucide icons and Tailwind utility classes
- Glassmorphic UI
  - `glass-card` utility for backdrop blur, borders, and rounded edges
  - Neon glow utilities like `animate-pulse-glow` for premium highlights

> Note: Some modules are implemented inline within the dashboard (e.g., signals and sentiment), while chart/ticker components can be extracted into dedicated files as needed.

---

## 🛠️ Tech Stack

- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + CSS Variables (HSL-based theme)
- Animation: Framer Motion (`AnimatePresence`, `whileHover`, transitions)
- Icons: Lucide React
- Charts: Recharts (responsive containerization)

---

## 🚀 Getting Started

```bash
git clone [repo]
cd affynex
npm install
npm run dev
```

Visit `http://localhost:3000` to view the app.

### Production

```bash
npm run build
npm start
```

---

## 🎨 Theming & Customization

Theme variables are defined in `app/globals.css`. Key variables:

```css
:root {
  --background: 222 47% 6%;     /* Base background (dark) */
  --primary: 187 92% 50%;       /* Electric Blue / Primary */
  --accent: 160 84% 45%;        /* Cyan / Success / AI */
  --border: 217 33% 17%;        /* Subtle border */
  --ring: 187 92% 50%;          /* Focus ring color */
}
```

UI utilities:

- `glass-card` → glassmorphism (blurred panels with soft borders)
- `gradient-text` → cyan/blue gradient text
- `animate-pulse-glow` → neon glow animation for accents

Update these values to customize brand colors, glow intensity, and backgrounds.

---

## 📂 Folder Structure Overview

```
├── app/
│   ├── dashboard/            # Main Trader Interface
│   ├── get-signals/          # Signal Receiver Onboarding Flow
│   ├── provide-signals/      # Signal Provider Onboarding Flow
│   ├── login/                # Auth Pages
│   ├── signup/               # Auth Pages
│   ├── globals.css           # Tailwind & CSS Variables (Theming)
│   ├── layout.tsx            # Root Layout
│   └── page.tsx              # Landing Page
├── components/
│   ├── dashboard/            # Sidebar, TopNavbar, Trader/Admin dashboards
│   └── ui/                   # Button, BackgroundAnimations, Trial/Gradient buttons
├── lib/
│   └── utils.ts              # `cn` helper (clsx + tailwind-merge)
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

- `app/` contains routes and top-level pages driven by the App Router.
- `components/` contains reusable UI and dashboard modules.

> If you plan to add static assets, create a `public/` directory and place images/fonts there for direct serving.

---

## 🧭 Pages & Flows

- Landing (`app/page.tsx`) — hero CTA, feature grid, and technology overview
- Dashboard (`app/dashboard/page.tsx`) — Trader/Admin role switcher, sidebar + top navbar, overview panels
- Get Signals (`app/get-signals/page.tsx`) — 4-step onboarding (About → Choose Type → Connect → Subscribe)
- Provide Signals (`app/provide-signals/page.tsx`) — 4-step provider onboarding (Platforms → Connect → Auto Replies → Dashboard)
- Auth (`app/login`, `app/signup`) — authentication pages

---

## ✅ Production Notes

- Fully typed with TypeScript and strict mode enabled
- GPU-accelerated animations and blur effects for smooth UX
- Uses App Router conventions for scalable routing and layouts

---

Built with pride for modern algorithmic trading teams 🧠📈
