# Design System Specification: The Kinetic Shield

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Shield."** 

This system moves away from the static, "boxy" nature of traditional security dashboards. Instead, it treats the UI as a living, breathing digital environment. We achieve a premium editorial feel by blending the precision of high-tech data with the fluid elegance of modern glassmorphism. By utilizing intentional asymmetry, overlapping "frosted" layers, and a strict "No-Line" philosophy, we create an interface that feels less like a database and more like a high-end command center.

The goal is **Authoritative Depth**: use the depth of the dark navy void (`#041329`) to make the vibrant accents (`#00D4FF` and `#7C3AED`) feel like they are emitting actual light, guiding the user’s eye through complex security data with effortless hierarchy.

---

## 2. Colors
Our palette is rooted in the deep shadows of the `surface` and `background` tokens, allowing our "Quantum" accents to pop with neon-like intensity.

### The "No-Line" Rule
**Strict Mandate:** 1px solid borders for sectioning are prohibited. 
Structure is defined through:
- **Tonal Shifts:** Placing a `surface_container_high` card against a `surface` background.
- **Luminance:** Using the glow of a `primary_container` to define an active area.
- **Negative Space:** Relying on the 8px spacing scale to separate concepts.

### Surface Hierarchy & Nesting
Treat the UI as a stack of physical, semi-transparent materials.
- **Base Layer:** `surface` (#041329) – The infinite void.
- **Structural Sections:** `surface_container_low` (#0D1C32) – Large content areas.
- **Interactive Components:** `surface_container_highest` (#27354C) – Cards, modals, and drawers.

### The "Glass & Gradient" Rule
To escape the "flat" look, main CTAs and hero headers must use **Signature Textures**. 
- **The Core Gradient:** Transition from `primary` (#A8E8FF) to `primary_container` (#00D4FF) at a 135-degree angle.
- **Glass Elements:** Use `surface_variant` at 60% opacity with a `backdrop-filter: blur(20px)` for floating navigation or high-level overlays.

---

## 3. Typography
We pair the Swiss precision of **Inter** with the technical rigor of **JetBrains Mono** to balance editorial elegance with "security-first" aesthetics.

- **Display & Headlines (Inter):** High-contrast sizing. Use `display-lg` (3.5rem) for critical status updates to create a sense of scale. The tracking should be tightened (-0.02em) for headlines to feel "locked-in."
- **Titles & Body (Inter):** Optimized for readability. Use `body-lg` for narrative descriptions and `title-md` for card headers.
- **Data & Labels (Space Grotesk / JetBrains Mono):** Use `label-md` (Space Grotesk) for UI metadata and JetBrains Mono for all scores, hashes, and code snippets. The monospaced nature of JetBrains conveys a sense of raw, unedited truth.

---

## 4. Elevation & Depth
Depth in this system is a product of light and layering, not artificial drop-shadows.

### The Layering Principle
Achieve lift by "stacking" tones. A `surface_container_lowest` item sitting inside a `surface_container_high` wrapper creates a "cut-out" effect, suggesting depth through subtraction rather than addition.

### Ambient Shadows
If a floating state (like a context menu) is required:
- **Color:** Use `surface_tint` at 8% opacity.
- **Blur:** Minimum 32px.
- **Spread:** -4px to keep the shadow "tucked" under the element, mimicking a soft glow from the UI itself.

### The "Ghost Border" Fallback
If contrast is needed for accessibility, use a **Ghost Border**: `outline_variant` (#3C494E) at **15% opacity**. This provides a hint of a boundary without breaking the fluid glass aesthetic.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`) with `on_primary` text. No border. On hover, add a `primary_fixed_dim` outer glow (4px blur).
- **Secondary:** Glass container (`surface_variant` + blur) with a Ghost Border.
- **Tertiary:** No background. Text in `secondary` (#D2BBFF). Underline on hover only.

### Cards & Lists
- **Rule:** Forbid divider lines. Use `surface_container_low` vs `surface_container_high` to distinguish between list items.
- **Padding:** Always use the `8` (2rem) or `10` (2.5rem) spacing tokens for internal card padding to maintain a "premium" airy feel.

### Input Fields
- **Resting:** `surface_container_lowest` with a 15% opacity `outline`.
- **Active/Focus:** Border becomes `primary` (#A8E8FF) with a subtle 2px blur glow. The background shifts to `surface_container_high`.

### Chips
- **Status Chips:** High-saturation backgrounds (e.g., `error_container` for alerts) with `on_error_container` text. Use `full` roundedness for a pill shape.

### Security-Specific Components
- **The Pulse Score:** A large `display-lg` number in JetBrains Mono, sitting atop a blurred `secondary_container` (#6001D1) radial gradient.
- **Threat Timeline:** Use a vertical "light-pipe" instead of a line—a 2px wide gradient from `primary` to transparent to indicate the flow of events.

---

## 6. Do's and Don'ts

### Do
- **Do** use `6` (1.5rem) and `8` (2rem) spacing to allow the UI to breathe. 
- **Do** use `9999px` (full) roundedness for small interactive elements like chips and toggles to contrast against `lg` (0.5rem) card corners.
- **Do** animate state changes with a `cubic-bezier(0.4, 0, 0.2, 1)` transition for a "heavy" premium feel.

### Don't
- **Don't** use pure white (#FFFFFF) for text. Always use `on_surface` (#D6E3FF) to maintain the deep-sea tonal harmony.
- **Don't** use 100% opaque borders. They flatten the glassmorphism effect.
- **Don't** use standard "drop shadows." If it doesn't look like an ambient glow, it doesn't belong in this system.
- **Don't** crowd the layout. If a screen feels full, increase the container depth (`surface_container_high`) instead of adding more lines.