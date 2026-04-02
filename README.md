# daYummeals - Authenticity Starts Here! 🍱

Welcome to the **daYummeals** web experience – a premium, high-performance landing page designed to bridge the gap between traditional home-cooked heritage and modern, express delivery.

![daYummeals Preview](/under90_homescreen.png)

## 🌟 The Vision

daYummeals is built on a single realization: the most profound flavors aren't found in commercial kitchens, but in the heart of homes. This project showcases a dual-reality interface that caters to two distinct culinary needs:
1. **Under 90 Express (Light Mode)**: Fast, fluid, and vibrant. Focused on immediate hunger and neighborhood speed.
2. **Classic Pre-Order (Dark Mode)**: Elegant, sophisticated, and steady. Focused on curated meal planning and heritage.

---

## 🚀 Tech Stack

This project leverages the bleeding edge of web technologies to deliver a "Wow" factor at 60fps.

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14+** | React framework with App Router for optimal routing and SEO. |
| **Tailwind CSS 4** | The latest utility-first CSS for hyper-efficient and scalable styling. |
| **Framer Motion 12** | Master-tier animations, layout transitions, and scroll-linked reveals. |
| **Lenis** | Standard-setting smooth scroll engine for a buttery browsing experience. |
| **Lucide React** | A consistent, clean iconography set. |
| **Radix UI** | Accessible, unstyled primitives for robust component building. |
| **Canvas Confetti** | Dynamic celebration effects for user conversion points. |

---

## 🏗 Architecture & Design System

### 1. Dual-Experience Engine
The entire site is controlled by a global state in `lib/ThemeContext.tsx`. Switching the theme doesn't just change colors; it swaps the entire layout logic:
- `Under90Experience.jsx` takes over in Light Mode, featuring card-stacking layouts and high-speed indicators.
- `Hero`, `Showcase`, and `FreshStory` take over in Dark Mode, utilizing sticky parallax and obsidian-glass aesthetics.

### 2. The Magnetic UI
We've implemented a custom **Magnetic Floating Action Button** (`FloatingPremiumAction.jsx`) that uses spring-physics to follow the user's cursor. It features:
- **Character-Staggered Typography**: Text entries that pop letter-by-letter.
- **Glassmorphic Morphing**: A button that transforms from a circle to a pill based on interaction.
- **Backface Rendering**: Complex 3D transformations for the "Pre-Order" orbital ring.

### 3. Progressively Loaded Splash
Every entry point is gated by a **Splash Screen** (`Splash.jsx`) that enforces brand recognition while components hydrate in the background. It uses `AnimatePresence` to exit gracefully with an upward "curtain" slide.

### 4. Global Dialog System
Managed by the `ThemeContext`, the project features an integrated modal system (`Dialogbox.jsx`, `PolicyDialog.jsx`, etc.) that ensures consistency across the app, complete with confetti triggers and backdrop-blur gradients.

---

## 🛠 Setup & Installation

Follow these steps to get the environment running locally:

### Prerequisites:
- **Node.js**: 20.x or higher
- **npm**: 10.x or higher

### 1. Clone & Install
```bash
# Clone the repository
git clone <your-repo-link>

# Move into the project
cd dayummeals

# Install dependencies
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Cleanup & Maintenance

We maintain a "Zero Bloat" policy. All unnecessary assets (template placeholders, duplicate images, and unused scripts) have been purged. 

- **Key Assets**:
  - `public/under90_bowl.png`: Primary brand dish asset.
  - `public/homescreen_video.mp4`: High-quality hero background.
  - `public/Flip1.png` / `Flip2.png`: Assets for the interactive card flip experience.

---

## 🇮🇳 Made with Love in India
© 2026 **Drowsy Owls LLP**. All rights reserved. 
*"Authenticity Starts Here!"*
