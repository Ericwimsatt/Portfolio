---
name: Eric Wimsatt Portfolio
description: A Canaletto-informed portfolio system for product engineering with human warmth and frontend craft.
colors:
  canal-sky: "#b9d8dc"
  canal-water: "#2f6f78"
  lagoon-teal: "#4c8790"
  venetian-stone: "#ede1c9"
  aged-paper: "#fff8e8"
  brick-vermilion: "#aa553d"
  ink: "#1d2523"
  ink-muted: "#53615d"
  gallery-shadow: "rgba(29, 37, 35, 0.22)"
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 4.4vw, 4rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "0"
  headline:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.6rem, 3vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "0"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    fontFamily: "'SFMono-Regular', 'Cascadia Code', Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"
  stat:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(58px, 8vw, 128px)"
    fontWeight: 500
    lineHeight: 0.82
    letterSpacing: "0"
rounded:
  none: "0"
  sm: "4px"
  md: "8px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "40px"
  xl: "72px"
components:
  button-primary:
    backgroundColor: "{colors.brick-vermilion}"
    textColor: "{colors.aged-paper}"
    rounded: "{rounded.sm}"
    padding: "12px 18px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 18px"
---

# Design System: Eric Wimsatt Portfolio

## Overview

**Creative North Star: "The Living Veduta"**

This portfolio behaves like a contemporary engineering annotation laid over a huge public-domain Venetian art plate. The painting leads: full-bleed, image-first, textured, and atmospheric. The interface is secondary, precise, and useful, like museum captions, conservation notes, map legends, and architectural measurements placed directly on the work.

The system refuses the generic engineer portfolio hero. No centered slogan floating over a gradient, no grid of same-size project cards as the main event. The first viewport should feel like opening a large painting and discovering the evidence embedded in it.

**Key Characteristics:**
- Oversized public-domain art surfaces with text overlaid directly on image.
- Small-to-medium editorial text, never huge startup-poster shouting.
- Warm civic palette: sky, canal water, stone, aged paper, brick, ink.
- Engineering proof appears as captions, route markers, ledgers, and plates.
- Frontend craft is demonstrated by composition, layering, responsive behavior, and motion.

## Colors

The palette comes from Venetian light: faded sky, green-blue canal water, limestone, old paper, brick, and dark architectural ink.

### Primary
- **Canal Water** (#2F6F78): Primary field color for waterline bands, dark panels, active navigation, and high-confidence actions.
- **Brick Vermilion** (#AA553D): Sparse action color for primary buttons, active marks, and small evidence highlights.

### Secondary
- **Canal Sky** (#B9D8DC): Atmospheric background, top-of-viewport light, hover fields, and low-pressure panels.
- **Lagoon Teal** (#4C8790): Secondary emphasis, link hover, image scrims, and diagram lines.

### Neutral
- **Venetian Stone** (#EDE1C9): Main warm surface and section ground.
- **Aged Paper** (#FFF8E8): Caption plates, readable overlays, and high-contrast labels on dark art.
- **Ink** (#1D2523): Primary text.
- **Muted Ink** (#53615D): Secondary text only on light surfaces.

### Named Rules

**The Painting Leads Rule.** Art owns at least 60% of any hero or feature section. Interface color supports the art; it does not compete with it.

**The Vermilion Rarity Rule.** Brick Vermilion is used for one primary action or one active mark at a time. Its scarcity makes it feel intentional.

## Typography

**Display Font:** Georgia, with Times New Roman fallback  
**Body Font:** System sans stack  
**Label/Mono Font:** SF Mono / Cascadia Code / Consolas

**Character:** The serif is historical and human, but kept smaller and more measured than a typical hero headline. The sans keeps hiring-manager scanning clean. Mono is reserved for exact facts: dates, roles, repo metadata, labels, and source captions.

### Hierarchy
- **Display** (500, `clamp(2rem, 4.4vw, 4rem)`, 0.98): Hero statements over art. Keep to 2-4 lines.
- **Headline** (500, `clamp(1.6rem, 3vw, 2.75rem)`, 1.05): Section and project titles.
- **Title** (700, 1.05rem-1.25rem, 1.2): Dense panel headings and project names.
- **Body** (400, 1rem, 1.55): Project descriptions and experience summaries. Keep measure near 65-75ch.
- **Label** (500, 0.75rem, 1.5): Caption labels, metadata, route marks, source notes. No letter spacing.
- **Stat** (500, `clamp(58px, 8vw, 128px)`, 0.82): Roblox impact numbers only. This scale is deliberately heavier than the rest of the page.

### Named Rules

**The Caption, Not Billboard Rule.** Overlay text should feel like a precise caption on a painting, not a marketing headline on top of stock photography.

## Layout

Hero and feature sections are art plates. Use full-bleed or near-full-bleed images with text placed according to the image composition, not a fixed left/right trope. Text may sit lower-right, lower-center, top edge, or inside a quiet architectural/water area. The image decides.

Primary page rhythm:
- First viewport: one huge art plate with 2-3 overlay elements.
- Experience band: two or three art-backed panels showing Roblox, UC Berkeley, and selected proof.
- Project gallery: large alternating plates, not identical cards.
- Contact close: one quiet art detail or waterline band with direct actions.

Desktop compositions can use a 12-column grid over the art. Mobile collapses to stacked art plates, with text moving into readable scrims when the image becomes too busy.

## Elevation & Depth

Depth comes from layered art, translucent scrims, caption plates, and shadows that feel like mounted prints. Avoid glass effects as decoration. Shadows are soft, offset, and warm.

### Shadow Vocabulary
- **Mounted Plate** (`0 26px 60px rgba(29, 37, 35, 0.22)`): Large artwork or preview plate.
- **Caption Lift** (`0 14px 34px rgba(29, 37, 35, 0.16)`): Small overlay plate when image contrast demands it.

### Named Rules

**The Scrim Has a Job Rule.** Every overlay, blur, or translucent plate must improve legibility or guide attention. No decorative glass.

## Shapes

The system is mostly rectilinear: plates, captions, ledgers, routes, and picture edges. Corners stay sharp or slightly eased. Use 4px for controls and 8px for preview containers. Avoid pills except for tiny status marks.

Borders are 1px ink or light-paper strokes, often inset like a picture mat. Art plates can use inner frame lines.

## Components

### Buttons
- **Shape:** Slightly eased rectangle (4px).
- **Primary:** Brick Vermilion background, Aged Paper text, compact padding.
- **Hover / Focus:** Darken toward ink; add clear outline offset on keyboard focus.
- **Ghost:** Transparent with 1px current-color border; used for GitHub, resume, source links.

### Caption Plates
- **Style:** Aged Paper or dark Canal Water surface over image, 1px border, optional Caption Lift shadow.
- **Use:** Overlay summaries, role notes, source notes, and project facts.
- **State:** On hover, plate may reveal one more line of detail or shift 4px along the image perspective.

### Art Plates
- **Style:** Full-bleed or large framed image with inner 1px mat line.
- **Use:** Hero, experience, project detail, and closing sections.
- **Behavior:** Subtle parallax or crop shift; never obscure the art with heavy UI.

### Evidence Ledgers
- **Style:** Thin ruled rows with mono labels and concise values.
- **Use:** Role, stack, year, team, repo status, live demo, writing link.

### Navigation
- **Style:** Small caption-like nav laid over art or in a narrow top rail.
- **Active:** One Vermilion mark or underline.
- **Mobile:** Bottom or top compact rail; keep labels direct.

## Do's and Don'ts

### Do:
- **Do** use huge art images as the main design material.
- **Do** overlay text where the painting naturally has quiet space.
- **Do** use public-domain source notes for real artwork.
- **Do** make project proof exact and compact.
- **Do** use motion to reveal perspective, waterline, crop, or caption layers.

### Don't:
- **Don't** make a generic left-text/right-image hero.
- **Don't** use giant type that competes with the art.
- **Don't** present projects as same-size icon cards.
- **Don't** invent work metrics, customers, or claims.
- **Don't** use KAWS-style character imitation; if that influence appears later, translate it only into scale, tactility, and playfulness.
