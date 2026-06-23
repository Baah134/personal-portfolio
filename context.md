# Portfolio Website — Context Document

> This document provides essential context for any developer or agent continuing work on Prince Baah-Mensah's personal portfolio website. **Update this file whenever changes are made to the website.**

---

## Overview

Personal portfolio for **Prince Baah-Mensah**, an Electrical & Electronics Engineering student at Ashesi University. The site showcases research, technical projects, leadership initiatives, and work experience.

**Live URL (planned):** `https://princebaah.vercel.app`

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2.6 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Vanilla CSS with CSS Modules (NO Tailwind) |
| **Fonts** | Oswald (headings, `next/font/google`) + Inter (body, `next/font/google`) |
| **Deployment** | Vercel (planned) |
| **Contact Form** | Formspree (placeholder — needs form ID setup) |
| **Images** | `next/image` with generated placeholders in `public/images/` |

---

## Design System

### Theme: Clean Light / Editorial
Inspired by [katieheinemann.space](https://www.katieheinemann.space/portfolio).

### Color Palette
```
Background:        #ffffff
Surface:           #f8f9fa
Border:            #e5e7eb
Text Primary:      #1a1a1a
Text Secondary:    #6b7280
Text Tertiary:     #9ca3af
Accent:            #2b6777 (muted teal)
Accent Hover:      #1f4f5c
Accent Light:      rgba(43, 103, 119, 0.08)
Success:           hsl(145 60% 40%)   — publication "Accepted" badges
Warning:           hsl(40 70% 40%)    — publication "Under Review" badges
```

### Typography
- **Headings:** Oswald (condensed, uppercase, `var(--font-heading)`)
- **Body:** Inter (`var(--font-body)`)
- **Hero title:** `clamp(3rem, 8vw, 6rem)`
- **Page titles:** `clamp(2.5rem, 5vw, 4rem)`, uppercase, `letter-spacing: var(--ls-wide)`

### Spacing System
4px base grid: `--space-1` (4px) through `--space-24` (96px).

### Shadows
Light, soft shadows: `--shadow-xs` through `--shadow-xl`. No glow effects.

### Animations
- `fadeInUp`, `fadeIn`, `slideInLeft`, `slideInRight` keyframes in globals.css
- `.reveal` / `.visible` classes for scroll-triggered animations
- `ScrollReveal` component at `src/components/ScrollReveal.tsx`

---

## File Structure

```
src/
├── app/
│   ├── globals.css              # Design tokens, reset, utilities, components
│   ├── fonts.ts                 # Oswald + Inter font config
│   ├── layout.tsx               # Root layout with Navbar + Footer
│   ├── page.tsx                 # Homepage (hero, about, featured projects, skills, CTA)
│   ├── page.module.css
│   ├── not-found.tsx            # 404 page
│   ├── not-found.module.css
│   ├── blog/
│   │   ├── page.tsx             # Blog (coming soon state)
│   │   └── page.module.css
│   ├── contact/
│   │   ├── page.tsx             # Contact form + info panel
│   │   └── page.module.css
│   ├── experience/
│   │   ├── page.tsx             # Work Experience (ARC Lab, CaRINE, CFAO, AquaBlue)
│   │   └── page.module.css
│   ├── leadership/
│   │   ├── page.tsx             # Leadership & Volunteer (categorized: IEEE, Student Clubs, Teaching, Community)
│   │   └── page.module.css
│   ├── projects/
│   │   ├── page.tsx             # Project listing grid (links to detail pages)
│   │   ├── page.module.css
│   │   └── [slug]/
│   │       ├── page.tsx         # Dynamic project detail pages (5 projects)
│   │       └── page.module.css
│   ├── robots.ts                # SEO Robots rules configuration
│   ├── sitemap.ts               # SEO Sitemap.xml generator
│   └── research/
│       ├── page.tsx             # Research & Publications (2 papers + 2 research areas)
│       └── page.module.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Fixed navbar (7 links + Resume download)
│   │   ├── Navbar.module.css
│   │   ├── Footer.tsx           # 3-column footer
│   │   └── Footer.module.css
│   └── ScrollReveal.tsx         # IntersectionObserver scroll animation wrapper
public/
├── CV.pdf                       # Downloadable resume
└── images/
    ├── hero-banner.png          # Abstract circuit board hero image
    ├── project-lumina.png
    ├── project-metaverse.png
    ├── project-whisper.png
    ├── project-hydrogel.png
    ├── project-micromouse.png
    └── project-aquablue.png
```

---

## Routes

| Route | Type | Description |
|---|---|---|
| `/` | Static | Homepage with hero, about, featured projects, skills, CTA |
| `/research` | Static | Publications (2 papers) + current research area (SER) |
| `/projects` | Static | Project listing grid with image cards linking to detail pages |
| `/projects/[slug]` | SSG | Individual project pages (lumina, whisper, coastal-odes, hydrogel, aquablue) |
| `/leadership` | Static | Leadership & Volunteer categorized into IEEE, Student Clubs, Teaching, Community |
| `/blog` | Static | Coming soon state with upcoming topics |
| `/experience` | Static | Work experience timeline (ARC Lab, CaRINE, CFAO, AquaBlue) |
| `/contact` | Static | Contact form (Formspree) + info panel + availability |
| `/_not-found` | Static | 404 page |
| `/robots.txt` | Static | SEO Robots rules file |
| `/sitemap.xml` | Static | SEO Sitemap file |

---

## Navigation Links

7 links in Navbar: Home, Research, Projects, Leadership & Volunteer, Experience, Blog, Contact + Resume download button.

---

## Key Content

### Publications
1. **"Constraint-Aware Bayesian Optimization for PID Controller Tuning"** — IECON 2026 (Under Review)
2. **"Design of an AI-Powered Adaptive Learning System for Education in the Metaverse Classroom"** — 3SCEA 2026 (Accepted)

### Projects (5)
1. Lumina — IoT ambient intelligence (IEEE MYOSA Finalist)
2. Whisper Fine-tuning for African Accents (64% WER reduction)
3. Modeling Climate Change in Coastal Communities using ODEs
4. Hydrogel Salinity Research & IoT Monitoring
5. AquaBlue — Water Filtration System

### Work Experience (4)
1. Student Researcher — Automation, Robotics & Control Lab
2. Student Researcher — CaRINE (Speech Emotion Recognition)
3. Workshop Intern — CFAO Mobility PLC Ghana
4. CTO — AquaBlue

### Leadership Categories
- IEEE Leadership (7 roles)
- Student Clubs and Associations (5 roles)
- Teaching & Mentoring (3 roles)
- Community Service (2 roles)

---

## Environment Notes

- **Node.js:** v26.0.0 via Homebrew
- **PATH:** All CLI commands require: `export PATH="/opt/homebrew/bin:$PATH" &&`
- **Build:** `npm run build` (uses Turbopack)
- **Dev:** `npm run dev`
- **Clear cache:** Delete `.next/` directory before rebuilding if font issues occur

---

## Pending Tasks

- [ ] **Formspree setup** — Configure your Formspree ID by adding `NEXT_PUBLIC_FORMSPREE_KEY` in Vercel settings
- [ ] **Verify GitHub/LinkedIn URLs** — Update actual profile URLs in Footer.tsx and Contact page
- [ ] **Deploy to Vercel** — Connect GitHub repo and deploy
- [ ] **Add Google Analytics** if desired

---

*Last updated: 2026-06-23 (Integrated dark mode, SEO settings, project cover images, and CFAO experience picture)*
