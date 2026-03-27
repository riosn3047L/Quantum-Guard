# QuantumGuard - Page-by-Page Analysis

## index.html (Landing Page)
**Lines**: 342 | **Dependencies**: Tailwind CDN, shared.css, data.js, engine.js

### Sections
1. **Navigation** — Fixed top nav with 6 links (Home, Assessment, Results, Compliance, Tools, Docs) + About CTA
2. **Hero** — Title "QuantumGuard", subtitle, two CTAs (Quick/Comprehensive Assessment), Quantum Threat Timeline (2024-2033+)
3. **Feature Grid** — 4-column bento grid explaining the 4 dimensions
4. **Stats Section** — 120 Questions, 4 Dimensions, 12 Practices, 4 Compliance Frameworks
5. **Tools Section** — 3 tool cards (CryptoScan, TLS Analyzer, CryptoDeps) + trust badges
6. **Final CTA** — Glass card with "Start Free Assessment" and "Talk to a Cryptographer"
7. **Footer** — Logo, links, copyright

### Issues
- Dark mode toggle button has no functionality (just an icon)
- "Talk to a Cryptographer" links to about.html (misleading)
- GitHub link is `#` (placeholder)
- Privacy Policy and Security Standards links are `#`

---

## quick-assessment.html
**Lines**: 303 | **Dependencies**: Tailwind CDN, shared.css, data.js, engine.js

### Features
- Progress stepper with 4 dimension progress bars
- Question card with practice label, question text, 4 radio options
- Auto-advance after 600ms on answer selection
- Previous/Next navigation
- Keyboard shortcuts (1-4 for options, arrows for navigation)
- Context card explaining "Why this matters?"
- Visual context image (external Google-hosted image)

### Issues
- External image URL may break or track users
- Auto-advance fires on restored answers (bug #4)
- No "Save Progress" button (comprehensive has one)
- No option to jump to specific question

---

## comprehensive-assessment.html
**Lines**: 337 | **Dependencies**: Tailwind CDN, shared.css, data.js, engine.js

### Features
- Sidebar with dimension/practice navigation tree
- Practice-level question display (all 10 questions per practice visible)
- Dimension progress header
- Save & Resume Later button
- Practice pagination with dots
- Submit Practice / Submit Full Assessment buttons
- Global progress bar

### Issues
- "Save & Resume Later" shows native `alert()` (poor UX)
- Practice descriptions show dimension description, not practice-specific
- Submit Practice and Next Practice do the same thing
- Submit Full Assessment doesn't validate completion

---

## results.html
**Lines**: 444 | **Dependencies**: Tailwind CDN, shared.css, data.js, engine.js

### Features
- Overall score display (large number with gradient)
- Maturity badge
- Dimension score cards (4 cards)
- Practice breakdown bars with benchmark overlay
- Maturity spread donut chart (SVG)
- Practice heatmap (12 cells)
- Strengths & improvements lists
- Compliance coverage cards
- JSON export button

### Issues
- Donut chart double-counts score 3 (bug #3)
- No PDF export (only JSON)
- Benchmark overlay doesn't always render (depends on org profile match)
- "Retake Assessment" always links to quick-assessment.html, not the source type

---

## compliance.html
**Lines**: 280 | **Dependencies**: Tailwind CDN, shared.css, data.js, engine.js

### Features
- Global readiness score with progress bar
- Frameworks tracked counter
- Maturity level display
- Framework selector tabs
- Practice mapping table (all 12 practices)
- Gap analysis cards with priority levels
- Compliance engine status indicator

### Issues
- Null reference error when no comprehensive answers exist (bug #2)
- Framework tabs don't change the mapping table content (practices are not framework-specific in the table)
- "LIVE FEED" badge is misleading (no live data)
- Gap analysis shows practices from all dimensions, not filtered by selected framework

---

## tools.html
**Lines**: 800+ | **Dependencies**: Tailwind CDN, shared.css, scanner-engine.js, html2pdf.js

### Features
- 3 tab panels: CryptoScan, TLS Scanner, CryptoDeps
- File upload with drag-and-drop
- Results tables with stats bars
- CBOM generation with PQC labeling
- PDF export via html2pdf.js
- TLS scan with quantum readiness scoring
- Protocol cards, cipher suite tables, certificate details
- Vulnerability checks display

### Issues
- No `data.js` or `engine.js` dependency (standalone page)
- TLS scanner requires backend running (no fallback/offline mode)
- PDF export layout may be poor (html2pdf is limited)
- "Preview" button calls `previewTacticalReport()` which is not defined in the visible code
- Tab state not preserved in URL

---

## org-profile.html
**Lines**: 472 | **Dependencies**: Tailwind CDN, shared.css, data.js, engine.js

### Features
- Organization name input
- Industry dropdown (12 options)
- Org size radio cards (4 options)
- Geographic scope radio cards (4 options)
- Data sensitivity radios (4 options)
- Regulatory requirements radios (4 options)
- Real-time risk multiplier calculator
- Circular SVG meter for multiplier visualization
- Individual risk factor bars
- Profile save/restore

### Issues
- No link from other pages to this page (orphaned)
- "Proceed to Assessment" always goes to quick-assessment.html
- No validation for incomplete profile (only org name is required)
- External image may break

---

## shared.css
**Lines**: 91

### Design System Classes
- `.glass-card` / `.glass-panel` — Frosted glass effect
- `.text-gradient` / `.gradient-text` — Cyan gradient text
- `.quantum-glow` — Blue box shadow
- `.kinetic-shadow` — Subtle blue shadow
- `.glow-border` — Hover glow effect
- `.light-pipe` — Vertical gradient
- `.shimmer` — Animated shimmer effect
- `.custom-scrollbar` — Thin dark scrollbar
- `.no-scrollbar` — Hidden scrollbar

### Issues
- `.glass-card` and `.glass-panel` are nearly identical (redundant)
- `.text-gradient` and `.gradient-text` do the same thing (duplicate)

---

## data.js (1260 lines)
### Sections
1. DIMENSIONS (4 entries)
2. PRACTICES (12 entries with weights)
3. MATURITY_LEVELS (5 entries with score ranges)
4. ORG_PROFILE (industry, size, geo, sensitivity, regulatory)
5. RISK_MULTIPLIERS (5 factors with weights and values)
6. BENCHMARKS (10 industry/size combinations)
7. QUESTIONS (120 assessment questions with options)
8. QUICK_QUESTIONS (12 filtered from QUESTIONS)
9. COMPLIANCE_FRAMEWORKS (4 frameworks with mapped practices)

### Issues
- Practice ID mismatch for questions 61-120 (bug #1)
- All DPE/ITR questions mapped to practice '2.3'
- No data validation or schema enforcement

---

## engine.js (243 lines)
### Functions
- `storage.save/load/clear` — localStorage wrapper
- `saveOrgProfile/getOrgProfile` — Org profile persistence
- `saveAnswers/getAnswers` — Assessment answer persistence
- `calculatePracticeScore` — Average of answered questions
- `calculateDimensionScore` — MIN of practice scores
- `calculateOverallScore` — Average of dimension scores
- `getFullScoreBreakdown` — Complete scoring breakdown
- `getMaturityLevel` — Score to maturity level mapping
- `calculateRiskMultiplier` — Org profile to risk multiplier
- `getNearestBenchmark` — Industry benchmark matching
- `getProgress` — Assessment progress calculation
- `getRecommendation` — Score-based recommendations

### Issues
- Dimension score contradicts README documentation (MIN vs Average)
- Risk multiplier is calculated but never used in scoring
- No error handling for missing/malformed data

---

## scanner-engine.js (694 lines)
### Modules
1. **CryptoScan** — `scanSource()`, `scanMultipleFiles()` — regex pattern matching
2. **TLS Scanner** — `scanWithSSLyze()`, `parseSSLyzeResults()` — backend API calls
3. **CryptoDeps** — `scanDependencies()` — dependency file parsing
4. **CBOM** — `generateCBOM()` — Cryptographic Bill of Materials
5. **PQC Labeler** — `getPQCLabel()`, `getPQCLabelDetails()` — certification labels

### Databases
- VULN_PATTERNS: 12 algorithm families with regex patterns
- SAFE_PATTERNS: 7 PQC-safe algorithm patterns
- VULN_DEPS: 30+ known vulnerable packages (npm, pip, maven, go)
- CNSA2_REQUIREMENTS: NSA CNSA 2.0 compliance rules

### Issues
- Regex patterns may produce false positives (no AST parsing)
- Comment lines are filtered but not string literals
- No version-aware vulnerability checking (all versions flagged)
- TLS scanner assumes backend at localhost:5000
