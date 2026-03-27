# QuantumGuard - Technical Debt

## High Impact Debt

### 1. Tailwind Config Duplication
**Effort**: Low | **Impact**: High

The full Tailwind CSS configuration (~70 custom colors, fonts, border-radius) is copy-pasted across 8 HTML files. Changing a single color requires editing 8 files.

**Resolution**: Extract to a single `tailwind-config.js` file loaded after the Tailwind CDN script.

### 2. No Build System
**Effort**: Medium | **Impact**: High

The project has no build pipeline. This means:
- No minification of CSS/JS
- No tree-shaking of unused code
- No asset optimization
- No source maps for debugging
- No environment-specific configurations

**Resolution**: Add Vite or esbuild as a lightweight build tool. Since the project is static HTML, the build step can be minimal.

### 3. Inline JavaScript in HTML Files
**Effort**: High | **Impact**: High

All page-specific logic is embedded in `<script>` tags within HTML files. This makes:
- Code reuse impossible
- Testing impossible
- Linting/formatting difficult
- Code review painful (mixed HTML and JS)

**Resolution**: Extract inline scripts to separate `.js` files. Use ES modules or script tags.

### 4. No Automated Tests
**Effort**: High | **Impact**: Critical

Zero test coverage. The scoring engine, scanner engine, and data layer have no tests. Any refactoring risks introducing silent regressions.

**Resolution**: Add Vitest or Jest. Start with engine.js scoring tests (pure functions, easy to test).

## Medium Impact Debt

### 5. No CSS Architecture
**Effort**: Medium | **Impact**: Medium

Styles are scattered across:
- `shared.css` (91 lines)
- Inline `<style>` blocks in each HTML file
- Tailwind utility classes

Some CSS is duplicated (`.glass-card` vs `.glass-panel`, `.text-gradient` vs `.gradient-text`).

**Resolution**: Consolidate all custom CSS into `shared.css`. Remove duplicates. Consider CSS custom properties for the color system.

### 6. No Error Handling Strategy
**Effort**: Medium | **Impact**: Medium

- No try-catch around scoring calculations
- No error boundaries for DOM operations
- No user-facing error messages
- Scanner failures show raw error text

**Resolution**: Add error handling at key boundaries. Create a toast/notification system for user-facing errors.

### 7. Hardcoded Configuration
**Effort**: Low | **Impact**: Medium

- Backend URL: `http://localhost:5000`
- Gemini API model: `gemini-1.5-flash`
- Assessment question count: implicitly 12/120
- Maturity level thresholds: hardcoded in data.js

**Resolution**: Create a configuration module. Load from environment or config file.

### 8. No State Persistence Strategy
**Effort**: Medium | **Impact**: Medium

localStorage is used inconsistently:
- Assessment answers: stored by type (`quick_answers`, `comprehensive_answers`)
- Org profile: stored as `orgProfile`
- No data versioning or migration strategy
- No way to clear/reset state programmatically (only `Engine.storage.clear()`)

**Resolution**: Design a proper state schema with versioning. Add migration utilities.

## Low Impact Debt

### 9. Code Comments and Documentation
**Effort**: Low | **Impact**: Low

- `data.js` and `engine.js` have some JSDoc comments
- HTML files have minimal comments
- `scanner-engine.js` has good section headers but no function documentation
- No architecture decision records (ADRs)

### 10. Naming Inconsistencies
**Effort**: Low | **Impact**: Low

- Dimension IDs use different naming in different places (CVI vs "Cryptographic Visibility")
- `QG` vs `Engine` vs `Scanner` naming patterns
- CSS class naming: `.glass-card` vs `.glass-panel` (similar but not identical)
- Color references: sometimes hex, sometimes Tailwind class names, sometimes CSS variables

### 11. Dead/Unused Code
**Effort**: Low | **Impact**: Low

- `docs/extract_images.js`, `docs/extract_mermaids.js`, `docs/build_srs.js` — utility scripts for SRS generation
- `docs/test.html` — test file
- `ref/` directory contains 9 reference HTML files not used by the app
- `fix.py` — purpose unclear from name alone
- Backend test files (`test_sslyze.py`, `test_scan.py`) — not integrated into CI

### 12. Asset Management
**Effort**: Low | **Impact**: Low

- External images hosted on `lh3.googleusercontent.com` (Google user content)
- No local image assets for the app itself
- `assets/toolkit-visuals/` contains screenshots referenced by README but not the app
- Font files loaded from Google Fonts (3 font families × multiple weights = ~200KB+)
