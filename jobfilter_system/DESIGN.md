---
name: JobFilter System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-badge:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  metric-tabular:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system is constructed for a high-trust, technical career acceleration portal serving computer science and software engineering students navigating the Korean recruitment landscape (신입 공채, 수시 채용, 전환형 인턴십). 

The emotional tone balances the precision of an engineering IDE with the polish and calm of an executive SaaS dashboard. It rejects decorative clutter, ambiguous gamification, and soft consumer pastel tones in favor of information density, high scannability, and razor-sharp structural hierarchy. Visual trust is established through crisp slate borders, strict tabular alignment, and assertive functional color coding (D-Day countdowns, technical match deltas, and algorithmic scoring).

The visual language follows **Corporate Modern with Technical Utility**:
- **Structured Surface Hierarchy:** High-contrast foundation utilizing an authoritative dark navy shell for persistent navigation juxtaposed against cool, clinical slate workspaces.
- **Data-Dense Clarity:** Monospaced metrics, clear visual badges, and comparison matrices optimized for evaluating tech stacks, hiring stages, and coding test schedules at a glance.
- **Calibrated Feedback:** Deliberate micro-interactions using distinct semantic signals rather than decorative transitions.

## Colors

The color palette is engineered for cognitive clarity in data-dense workflows, pairing deep executive navies with high-performance indigo and strict functional accents.

### Core Roles
- **Primary Indigo (`#4F46E5`)**: Key interactive elements, primary action triggers, active tabs, and identity emphasis. Supported by `#6366F1` for focused states and `#4338CA` for pressed interactions.
- **Secondary Slate Navy (`#0F172A`)**: Anchor shell color utilized across left persistent navigation bars, primary modal headers, and dense data table header rows. Paired with `#1E293B` and `#334155` for contextual navigation layers.
- **Tertiary Match Emerald (`#10B981`)**: Algorithmic validation and high-affinity indicators (e.g., `적합도 90%+`, verified skills, passed test criteria).
- **Neutral Core (`#64748B`)**: Balanced cool gray for supporting metadata, field placeholders, and secondary text, avoiding visual fatigue.

### Canvas & Surfaces
- **Canvas Base (`#F8FAFC`)**: Cool, crisp off-white foundation that separates clearly against pure white card surfaces.
- **Sub-Surface/Trough (`#F1F5F9`)**: Neutral fill for nested panels, data tables, search inputs, and inactive chip containers.
- **Surface Elevation (`#FFFFFF`)**: Crisp foreground card containers and modal viewports.
- **Structural Dividers (`#E2E8F0` / `#CBD5E1`)**: Precise hairline boundaries maintaining visual order across adjacent modules.

### Semantic Signals
- **Critical / Urgent (`#F43F5E`)**: D-Day alerts (`D-Day`, `D-1`, `마감 직전`), failed requirements, and hard blockers.
- **Attention / Warning (`#F59E0B`)**: Imminent deadlines (`D-3`, `D-5`) and partially met prerequisites.
- **Tech Stack Sky (`#0EA5E9`)**: Technical taxonomy, repository tags, and runtime/infrastructure categories.
- **Growth Purple (`#8B5CF6`)**: Career coaching recommendations, mock interview feedback, and resume revision cues.

## Typography

Typography balances technical rigor with multi-script Korean readability. **Hanken Grotesk** serves as the primary display and headline face, providing geometric stability with an analytical personality. **Inter** handles high-volume Korean and English body copy, rendering Hangul glyphs with neutral, uniform clarity when backed by system CJK fonts (`Pretendard`, `-apple-system`, `Apple SD Gothic Neo`).

**JetBrains Mono** is utilized strictly for technical information structures:
- Coding test languages and frameworks (`C++20`, `Python 3.11`, `Spring Boot`).
- D-Day urgency indicators (`D-01`, `D-DAY`, `D-07`).
- Percentage match analytics (`96.4% MATCH`).
- Salary, algorithmic complexity, and submission timestamps.

All metric representations enforce OpenType tabular figures (`tnum`) to ensure strict vertical column alignment across comparison matrices and recruitment boards.

## Layout & Spacing

The layout is built on a 12-column adaptive fluid grid governed by an **8px vertical rhythm**.

### Breakpoints & Structural Framing
- **Desktop (≥ 1280px)**: Persistent 260px dark navy (`#0F172A`) sidebar on the left with a flexible main workspace (max 1440px content bound). 12-column grid with `1.5rem` gutters and `2rem` outer page margins.
- **Tablet (768px – 1279px)**: Collapsed icon-rail navigation (72px width). 8-column layout with `1.25rem` gutters and `1.5rem` outer margins. Filter controls shift into an accordion or expandable slide-out panel.
- **Mobile (< 768px)**: Bottom bar or off-canvas drawer navigation. Single-column stacked layout with `1rem` outer screen margins. Complex recruitment comparison tables become swipeable horizontal cards with sticky primary identifier headers.

### Spacing Scale
- `space-xs` (4px): Micro-spacing between tech badge icons and text labels; nested button icon padding.
- `space-sm` (8px): Internal tag padding, tight list item gaps, inline filter chip spacing.
- `space-md` (16px): Standard form element gap, card internal padding, segmented control separation.
- `space-lg` (24px): Card module padding, section headers, grid module gaps.
- `space-xl` (32px): Primary workspace section boundaries and hero KPI block separation.

## Elevation & Depth

Visual depth relies on **crisp structural borders coupled with micro-diffused ambient shadows**. This maintains the precision expected of an engineering tool, avoiding muddy, floating surfaces.

### Surface Hierarchy
- **Base Canvas (`Level 0`)**: `#F8FAFC`. Completely un-elevated, flat base plane.
- **Inset / Trough (`Level 0.5`)**: `#F1F5F9`. Recessed background for search inputs, comparison slots, and code blocks. Outlined with a hairline border (`1px solid #E2E8F0`).
- **Interactive Surface Card (`Level 1`)**: `#FFFFFF`. Elevated with a subtle, slate-tinted ambient shadow: `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`. Outlined with `1px solid #E2E8F0`.
- **Raised / Hovered State (`Level 2`)**: Interactive recruitment cards on hover lift subtly: `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`. Border shifts dynamically to `#CBD5E1`.
- **Dropdowns & Popovers (`Level 3`)**: Filter menus and quick view panes: `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`.
- **Modal Dialogs (`Level 4`)**: Centered application and deep comparison overlays: `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. Anchored over a `#0F172A` backdrop with 60% opacity.

## Shapes

The design system uses **Soft (`1`)** roundedness. Curvature is applied conservatively to maintain a clean, architectural software feel:

- **Base Components (Inputs, Buttons, Cards, Modals)**: `0.375rem` (6px) to `0.5rem` (8px). This creates structural stability and maximizes data density.
- **Chips, Badges, and Score Rings**: Retain a strict `0.25rem` (4px) to `0.375rem` (6px) radius for technical metadata (e.g., `Java`, `PostgreSQL`), while D-Day countdown pills and status match indicators utilize a full pill radius (`9999px`) to immediately distinguish state from content.
- **Dividers & Hairlines**: Straight, razor-sharp 1px lines without soft rounded terminals.

## Components

### Buttons
- **Primary Action**: Solid `#4F46E5` background, `#FFFFFF` text, `0.375rem` radius, `font-weight: 600`. Subtle hover state shifts to `#4338CA`. Active state scales to `0.99`.
- **Secondary Action**: `#FFFFFF` background, `#1E293B` text, `1px solid #CBD5E1` border. Hover changes background to `#F8FAFC` with border `#94A3B8`.
- **Ghost / Utility**: Transparent background, `#64748B` text; used inside toolbar actions and code copy triggers.
- **Recruitment Apply (High Urgency)**: `#0F172A` background with an integrated right-aligned chevron icon and contrasting D-Day micro-chip.

### Badges & D-Day Indicators
- **D-Day Badges**: Pill-shaped (`rounded-full`), padded `2px 8px`, `JetBrains Mono`, `font-size: 11px`, `font-weight: 700`.
  - *D-Day / D-1*: `#FFF1F2` background, `#E11D48` text, `1px solid #FECDD3` border.
  - *D-3 / D-7*: `#FFFBEB` background, `#D97706` text, `1px solid #FDE68A` border.
  - *상시채용 / 채용시 마감*: `#F1F5F9` background, `#475569` text, `1px solid #E2E8F0` border.
- **Tech Stack Tags**: Low-saturation container `#F0F9FF`, `#0369A1` text, `1px solid #BAE6FD` border. Includes small grayscale SVG technology icon alongside the label.

### Interactive Filter Chips
- Rendered in `#FFFFFF` with `1px solid #E2E8F0` and `font-size: 13px`.
- Active filters receive `#EEF2FF` background, `#4F46E5` border, and `#4F46E5` text, accompanied by an inline dismissible `×` trigger.
- Quick reset trigger is pinned to the filter bar trailing edge with a badge indicating the count of active criteria (e.g., `초기화 (4)`).

### Match-Score Progress Rings & Metric Blocks
- Circular SVG progress ring with `36px` diameter and `3.5px` stroke.
- Track uses `#E2E8F0`; dynamic stroke fills with `#10B981` (score ≥ 85%), `#4F46E5` (score 70–84%), or `#F59E0B` (score < 70%).
- Center text displays raw tabular numerical value (`94%`) using `JetBrains Mono`.

### Profile vs. Job Requirement Diff Matrix
- Two-column visual ledger. Left side shows verified student capabilities; right side shows hiring specification.
- Shared skills display an emerald checkmark badge (`일치`). Missing or required technical dependencies show a muted slate dash with a single-click "학습 로드맵 추가" action link.

### Input Fields & Search Bars
- Background `#FFFFFF`, border `1px solid #CBD5E1`, text `#0F172A`. Focused state utilizes `#4F46E5` border with an indigo ring (`0 0 0 3px rgba(79, 70, 229, 0.15)`).
- Search fields integrate monospaced shortcut indicators on the trailing side (e.g., `⌘K` or `Ctrl + K`).