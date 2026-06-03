---
name: Sayan Portfolio
description: A gamified, technically accomplished interactive personal portfolio website.
colors:
  primary: "#c25027"
  secondary: "#8b8680"
  neutral-bg: "#0d0c0c"
  neutral-fg: "#e0ddd7"
  neutral-header: "#f5f3ef"
  border: "rgba(255,255,255,0.06)"
  card-bg: "rgba(24,23,22,0.6)"
typography:
  display:
    fontFamily: "Playfair Display, Newsreader, serif"
    fontSize: "clamp(2.5rem, 6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Outfit, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "9999px"
    padding: "16px 32px"
  card-glass:
    backgroundColor: "{colors.card-bg}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Sayan Portfolio

## 1. Overview

**Creative North Star: "The Hacker Sanctuary"**

This visual system brings a professional, technically accomplished, yet playful and gamified experience to life. It features a dark, tinted-charcoal background, elegant serif headlines contrasting with modern clean sans-serif body copy, and a striking rust-orange accent. It intentionally steers away from generic "AI-slop" tropes (like bright blue-to-purple gradients, generic soft boxes, and overused Inter typography) by anchoring its aesthetic in rich typography, dark neutral tints, glassmorphism overlays, and fine technical borders.

**Key Characteristics:**
- Dark, tactile aesthetic with a custom CRT/noise grain overlay.
- High-contrast typography combining elegant serif headers and modern clean text.
- Interactive feedback with smooth state transitions (using transform and opacity).

## 2. Colors

A committed dark color strategy: a deep, warm-tinted neutral background anchored by a singular saturated rust-orange brand accent.

### Primary
- **Rust Orange** (#c25027): Used strictly for primary call-to-actions, highlights, active navigation paths, and interactive terminal prompts.

### Secondary
- **Muted Slate Gray** (#8b8680): Used for secondary labels, helper text, subtitles, and inactive states.

### Neutral
- **Charcoal Tint** (#0d0c0c): Canonical body background. A warm, dark neutral that avoids pure black.
- **Warm White** (#f5f3ef): Header text and display titles. Highly readable and soft on the eyes.
- **Ash Tint** (#e0ddd7): Readable body copy ensuring a contrast ratio ≥ 4.5:1 against the charcoal background.
- **Subtle White** (rgba(255, 255, 255, 0.06)): Technical borders, separator lines, and grid overlays.

### Named Rules
**The 10% Accent Rule.** The primary Rust Orange accent is used on ≤ 10% of any given screen. Its rarity is what makes the interactive points stand out.

## 3. Typography

**Display Font:** `Playfair Display`, `Newsreader`, serif
**Body Font:** `Outfit`, `-apple-system`, sans-serif

**Character:** A pairing of editorial serif with high-contrast weight and geometric, legible sans-serif body text that avoids generic templates.

### Hierarchy
- **Display** (Bold (700), clamp(2.5rem, 6vw, 5.5rem), 1.1): Hero title, large section headings.
- **Headline** (Bold (700), 2rem, 1.2): Project titles, modal headers, major section subtitles.
- **Title** (Medium (500), 1.25rem, 1.3): Card headers, small sub-headings.
- **Body** (Regular (400), 1rem, 1.6): Standard content paragraphs, descriptions. Maximum line length capped at 75ch.
- **Label** (Medium (500), 0.875rem, normal): Badges, terminal tags, button text, and small metadata.

### Named Rules
**The Balanced Headline Rule.** Display and Headline typography must use `text-wrap: balance` to prevent awkward wrapping, and Display letter-spacing must never go tighter than `-0.04em`.

## 4. Elevation

Depth is conveyed through clean tonal layering and subtle, sharp technical borders rather than soft, wide drop shadows.

### Named Rules
**The Flat-Border Rule.** Surfaces are flat at rest, using a 1px border at `rgba(255, 255, 255, 0.06)` for structure. Elevation is expressed via subtle background color adjustments or scale transitions, never by blurry shadows.

## 5. Components

### Buttons
- **Shape:** Full pill shape (9999px radius).
- **Primary:** Background `#c25027`, text `#ffffff`, padding `16px 32px`.
- **Hover / Focus:** Interactive scale up (scale: 1.05) and outline ring.

### Cards / Containers
- **Corner Style:** Rounded (12px radius).
- **Background:** Semi-transparent dark charcoal (`rgba(24, 23, 22, 0.6)`) with a blur filter (`backdrop-filter: blur(10px)`).
- **Border:** 1px solid `rgba(255, 255, 255, 0.06)`.

### Inputs / Fields
- **Style:** Flat background, 8px border radius, thin border.
- **Focus:** Border transitions to Rust Orange (`#c25027`) with outline suppression.

## 6. Do's and Don'ts

### Do:
- **Do** check typography contrast ratios to ensure body text remains readable.
- **Do** use left-aligned asymmetric layouts for visual rhythm.
- **Do** use responsive flex layouts (`flex-wrap` and auto-fit grids) without rigid breakpoints.

### Don't:
- **Don't** use blue-to-purple gradients or cyan neon on dark.
- **Don't** nest cards inside cards.
- **Don't** use side-stripe borders greater than 1px.
- **Don't** use a small tracked uppercase kicker/eyebrow on every section.
- **Don't** use `border-radius: 32px+` on container cards.
