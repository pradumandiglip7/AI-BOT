# AI Market Prediction Bot Landing Page

A premium, high-fidelity landing page for an AI Market Prediction Telegram Bot built with Next.js 15, React, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Animated Background**: Beautiful gradient animations that cover the entire scrollable page
- **Smooth Hover Effects**: All interactive cards have smooth lift/scale effects using Framer Motion
- **Fully Scrollable**: Fixed scrolling issues - page now scrolls properly through all sections
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Modern UI/UX**: Dark mode Fintech/SaaS aesthetic with trustworthy design
- **Framer Motion Animations**: Smooth entrance and hover animations throughout

## 🎨 Design System

- **Primary Color**: `#2D68FF` (AI Blue)
- **Secondary Color**: `#0D1117` (Deep Dark Background)
- **Accent Color**: `#00D18F` (Success Green)
- **Typography**: Inter font family for clean, modern look

## 📁 Project Structure

```
├── app/
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main landing page
├── components/
│   └── ui/
│       ├── background-gradient-animation.tsx  # Scrollable animated background
│       └── button.tsx                         # Reusable button component
├── lib/
│   └── utils.ts          # Utility functions (cn helper)
├── tailwind.config.ts    # Tailwind configuration with custom animations
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies

```

## 🚀 Getting Started

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the page.

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Sections

1. **Hero Section**: Main headline with CTA buttons and live signal preview card
2. **Key Features**: 3-column grid showcasing realtime AI signals, multi-asset coverage, and smart confidence engine
3. **How It Works**: 4-step horizontal flow (Add Bot → Verify → Join Group → Receive Signals)
4. **AI Technology**: Showcase of ML models (LSTM, LightGBM) and technical indicators (RSI, MACD, EMA, etc.)
5. **Footer**: Legal links and contact information

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Radix UI** - Headless UI components
- **CVA** - Class variance authority for component variants

## ⚡ Key Fixes Implemented

1. ✅ Changed background from `h-screen overflow-hidden` to `min-h-screen` for proper scrolling
2. ✅ Added `whileHover` effects to all interactive cards
3. ✅ Configured custom Tailwind animations for background gradients
4. ✅ Implemented proper TypeScript types throughout
5. ✅ Fixed all configuration conflicts between Tailwind v3 and module types

## 📝 Notes

- The background gradient uses fixed positioning so it stays visible while scrolling
- All animations are GPU-accelerated for smooth performance
- Hover effects use Framer Motion's `whileHover` for optimal UX
- Project uses ES modules (type: "module" in package.json)

## 🎨 Customization

To customize colors, edit the `tailwind.config.ts` file:

```typescript
colors: {
  primary: "#2D68FF",    // Change primary color
  secondary: "#0D1117",  // Change background color
  accent: "#00D18F",     // Change accent color
}
```

To adjust animations, modify the `keyframes` section in the same file.

---

**Built with ❤️ for AI Market Trading**
"# AI-BOT" 
"# AI-BOT" 
