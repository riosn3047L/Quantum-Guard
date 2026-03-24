# Person Roles & Contributions — QuantumGuard (Team Iravo Void)

**Project:** QuantumGuard — Post Quantum Cryptography Scanner  
**Team:** Iravo Void  
**Institute:** Kalasalingam Academy of Research and Education (KARE)  
**Event:** PSB Hackathon 2026  
**Date:** March 15, 2026

---

## 1. Inbathamizhan S — Team Lead & Cybersecurity Specialist

### Role Summary
Lead the QuantumGuard project end-to-end, owning both high-level project direction and core cybersecurity domain expertise.

### Detailed Contributions

#### Project Leadership & Coordination
- Led the overall QuantumGuard project and made key architectural and design decisions
- Coordinated work distribution across frontend, backend, and testing streams
- Managed stakeholder interactions with PNB / IIT Kanpur officials (Admin Users)
- Oversaw the PSB Hackathon 2026 submission and team deliverables

#### Cybersecurity Architecture & Domain Design
- Designed the 4-dimension assessment framework:
  - **Dimension 1 (CVI):** Cryptographic Visibility & Inventory — Practices: Discovery & Inventory, Vulnerability Assessment, Dependency Mapping
  - **Dimension 2 (SGRM):** Strategic Governance & Risk Management — Practices: Executive Leadership & Policy, Risk Assessment & Compliance, Third-Party & Supply Chain
  - **Dimension 3 (DPE):** Data Protection Engineering — Practices: Data Classification & Protection, Storage Security & Encryption, Transit Security & Protocols
  - **Dimension 4 (ITR):** Implementation & Technical Readiness — Practices: Infrastructure Assessment, Implementation Capability, Testing & Validation
- Defined the 5-level maturity model: Basic (1.0–1.4) → Developing (1.5–2.4) → Established (2.5–3.4) → Advanced (3.5–3.9) → Optimizing (4.0)
- Designed the scoring algorithm:
  - Practice Score: `Σ(10 question scores) / 10`
  - Dimension Score: `MIN(Practice1, Practice2, Practice3)` — weakest-link principle
  - Overall Score: `(CVI + SGRM + DPE + ITR) / 4`
  - Profile Multiplier: Weighted calculation based on 5 organizational factors (Industry 25%, Regulatory 25%, Scale 20%, Data Sensitivity 20%, Tech Complexity 10%), range 0.8×–1.5×

#### Compliance Mapping Design
- Mapped all 120 questions to 8 compliance frameworks:
  - NIST PQC (FIPS 203/204/205, IR 8547) — Full coverage
  - CMMC 2.0 (Levels 1–3) — Full coverage
  - FedRAMP (Low/Moderate/High) — Full coverage
  - FISMA (NIST SP 800-53 Rev. 5) — Full coverage
  - NSM-10, CNSA 2.0, ISO/IEC 27001:2022, ETSI QSC — Partial coverage
- Defined mapping strengths: Direct (●●●), Strong (●●○), Partial (●○○), Supporting (○○○)

#### Security Requirements Definition
- Defined all security requirements (SR-001 through SR-011):
  - Data protection: LocalStorage encryption, no unauthorized data transmission, HTTPS (TLS 1.2+)
  - Application security: CSP headers, XSS/injection prevention, no undisclosed tracking
  - Repository security: No committed secrets, security review in contribution guidelines, signed releases

#### Open Source Tool Strategy
- Designed integration strategy for 3 companion CLI tools:
  - **CryptoScan** → Dimension 1 (CVI): Scans codebases for quantum-vulnerable algorithms (RSA, ECDSA, ECDH, DSA, DH, SHA-1, MD5, 3DES, RC4), outputs SARIF + CBOM
  - **TLS Analyzer** → Dimension 3 (DPE): Evaluates cipher suites, certificates, CNSA 2.0 compliance
  - **CryptoDeps** → Dimension 1 (CVI): Identifies quantum-vulnerable algorithms in supply chain dependencies

---

## 2. Niranjan U — UI/UX & Frontend Developer

### Role Summary
Designed and built the complete QuantumGuard web-based user interface, including all pages, components, visualizations, and the responsive design system.

### Detailed Contributions

#### Frontend Pages Developed (9 pages)
| Page | Route | What Was Built |
|---|---|---|
| **Landing / Home** | `/` | Hero section with animated threat timeline, "Start Assessment" CTA, feature highlights (4 dimensions), NIST Aligned / Enterprise Ready badges, toolkit download links |
| **Quick Assessment** | `/assessment/quick` | 12-question assessment with progress stepper, 4 radio options per question, dimension indicator, Next/Previous navigation, ≤10 min completion UX |
| **Comprehensive Assessment** | `/assessment/comprehensive` | 120-question assessment with sidebar navigation tree (Dimensions > Practices > Questions), auto-save every 30s, progress bar per dimension, evidence annotation fields |
| **Results Dashboard** | `/results` | Overall score (large numeral + maturity badge), 4-dimension score cards, radar/spider chart, donut chart, bar chart, strengths/improvements panels, export buttons (PDF/Excel/Print) |
| **Compliance Mapping** | `/compliance` | 8 framework selector tabs, coverage % per framework, detailed mapping table (Question → Control → Strength), gap highlighter |
| **Open Source Tools** | `/tools` | CryptoScan/TLS Analyzer/CryptoDeps cards with descriptions, install commands, GitHub links, SARIF/CBOM documentation |
| **Documentation** | `/docs` | Markdown-rendered framework docs with sidebar, search, section anchoring, print-friendly styles |
| **Templates & Downloads** | `/downloads` | Download cards for .xlsx toolkit, sample assessment, executive report, asset inventory, vendor questionnaire, evidence collection templates |
| **About / Leadership** | `/about` | Mission statement, author profiles (Emily Fane, Abdel Fane), CSNP info, LinkedIn links, contact form |

#### UI Component Library
- **Global Components:** Sticky navigation bar (with mobile hamburger), footer (CSNP branding), dark/light theme toggle system, notification toasts, skeleton loaders, spinners
- **Assessment Components:** QuestionCard (question + 4 radio options + evidence textarea), ProgressStepper (visual step indicator), DimensionSidebar (collapsible tree with checkmarks), ScoreGauge (circular gauge 1.0–4.0), ComplianceBadge
- **Visualization Components:** RadarChart (4-axis interactive), BarChart (grouped dimension comparison), DonutChart (maturity distribution), HeatmapGrid (4×3 practice grid), TimelineWidget (quantum threat timeline 2024–2033+)

#### Design System Implementation
- **Color Palette:** Deep Navy (#0A192F), Quantum Cyan (#00D4FF), Violet (#7C3AED), Dark Glass (#1A1B2E), Emerald (#10B981), Amber (#F59E0B), Rose (#F43F5E)
- **Typography:** Inter (headings), JetBrains Mono (scores/code), system-ui stack (body)
- **Motion Design:** 300ms ease page transitions, number counter animations, chart entry animations, hover micro-interactions
- **Spacing:** 8px grid system with consistent padding/margin scales
- **Glassmorphism** and dynamic gradient aesthetic

#### Responsive Design
- Mobile (<768px): Single column, hamburger nav, stacked cards, simplified charts
- Tablet (768–1024px): Two-column, collapsible sidebar, 44px min touch targets
- Desktop (>1024px): Full layout with sidebar, multi-panel dashboard, expanded charts

#### Accessibility (WCAG 2.1 AA)
- Keyboard navigation for all interactive elements with visible focus indicators
- ARIA labels and semantic HTML for screen readers
- 4.5:1 minimum color contrast ratio
- `prefers-reduced-motion` media query support

#### Frontend State Management
- Assessment responses: LocalStorage (120 answer slots) + optional server-side save
- Organization profile: LocalStorage
- Calculated scores: Re-computed on change
- Theme preference: LocalStorage
- Assessment progress: Derived from response count

#### Performance Targets Met
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1
- Lighthouse Score ≥ 90
- Bundle Size < 500KB gzipped

---

## 3. Vedhan Subramanian — Backend & Systems Integration

### Role Summary
Built the backend assessment engine, data models, systems integration layer, and infrastructure supporting the QuantumGuard platform.

### Detailed Contributions

#### Assessment Engine Implementation (`engine.js`)
- Implemented the complete scoring calculation engine:
  - Step 1: Practice scores = average of 10 question scores per practice
  - Step 2: Dimension scores = MIN of 3 practice scores (weakest-link principle)
  - Step 3: Overall raw score = average of 4 dimension scores
  - Step 4: Weighted scores = raw scores × profile multiplier
  - Step 5: Maturity level classification based on score thresholds
- Built the organization profile multiplier calculator (5 factors → 0.8–1.5 range)
- Implemented Quick Assessment (12 questions) and Comprehensive Assessment (120 questions) logic

#### Data Model Architecture (Section 7)
- **Assessment Data Model:** Organization → Profile + Assessment → Responses[120] + Results (practice scores, dimension scores, compliance coverage, strengths, improvements, recommendations)
- **Question Data Model:** Question ID, dimension, practice, stream (A/B), text, 4 options (value 1–4), evidence indicators, 8-framework compliance mapping
- **Data Storage Strategy:**
  - Client-side: Browser LocalStorage (responses, profile, theme)
  - File-based: JSON/YAML (question definitions, compliance mappings, scoring thresholds)
  - Excel: Full assessment with formulas, charts, compliance tabs (.xlsx)
  - Server-side (future): Database for user accounts, saved assessments, historical tracking

#### Compliance Mapping Engine
- Built the compliance scoring calculation: `(Direct×1.0 + Strong×0.75 + Partial×0.5 + Supporting×0.25) / Total Requirements`
- Implemented per-framework coverage percentage generation
- Created gap identification and recommended actions engine

#### Gap Analysis System (FR-005)
- Practice-level gap detection (below target scores)
- Stream imbalance detection (Foundation vs Advanced)
- Dimension weakness identification
- Critical deficiency flagging
- Prioritization engine: By business impact, risk exposure, implementation complexity, timeline constraints

#### Systems Integration
- **CryptoScan Integration (FR-014):** Input: codebase path → Output: SARIF report + CBOM
- **TLS Analyzer Integration (FR-015):** Input: hostname/IP → Output: cipher suite analysis, certificate evaluation, CNSA 2.0 status
- **CryptoDeps Integration (FR-016):** Input: dependency manifest (package.json, requirements.txt, etc.) → Output: supply chain vulnerability report

#### Reporting & Export Engine
- PDF report generation (< 5 seconds)
- Excel export with automated scoring
- Print-friendly HTML formatting
- Executive dashboard data pipeline (scores, charts, recommendations)

#### Excel Toolkit Backend
- Built scoring formulas for all 120 questions across 10 Excel tabs:
  - Instructions, Organization Profile, Quick Assessment, Dimensions 1–4 (CVI, SGRM, DPE, ITR), Scorecard, Compliance Mapping, Dynamic Insights
- Ensured 100% offline functionality without macro performance degradation

#### Non-Functional Architecture
- Score calculations < 100ms for full 120 questions
- Chart rendering < 500ms after data availability
- Support for 1,000+ concurrent users
- Extensible assessment architecture (beyond 120 questions)
- Extensible compliance mapping (additional frameworks without code changes)
- Data-driven question management (editable without code changes)
- Structured compliance data in JSON/YAML

---

## 4. Ragul Nagaraj — Security Analysis & Testing

### Role Summary
Responsible for security analysis, quality assurance, testing, and SRS documentation. Created the initial SRS document (Draft V1.0) and validates all system components.

### Detailed Contributions

#### SRS Document Authorship
- **Created the initial SRS** (Draft V1.0, dated 15-03-2025) — the primary author of the Software Requirements Specification
- Documented all 16 functional requirements (FR-001 through FR-016)
- Documented all 23 non-functional requirements (NFR-001 through NFR-023)
- Documented all 11 security requirements (SR-001 through SR-011)
- Created system architecture diagrams and data models
- Maintained the SRS revision history

#### Functional Testing (FR-001 through FR-016)
| Requirement | What Was Tested |
|---|---|
| FR-001 (Quick Assessment) | Completion in ≤10 min, instant results without reload, PDF/print export |
| FR-002 (Comprehensive Assessment) | Save/resume, progress indicator (%), all 12 practices covered |
| FR-003 (Scoring) | Formula accuracy, maturity threshold boundaries, weighted scoring |
| FR-004 (Org Profile) | Multiplier range (0.8–1.5), N/A responses don't affect scoring |
| FR-005 (Gap Analysis) | Practice-level, stream, dimension, and question-level gap detection |
| FR-006 (Save/Resume) | Cross-session persistence, completion status accuracy |
| FR-007 (Compliance Mapping) | All 120 questions mapped to 8 frameworks correctly |
| FR-008 (Coverage Report) | Per-framework coverage %, gap lists, recommended actions |
| FR-009–FR-011 | Dashboard rendering, chart interactivity, export formats (PDF/Excel/HTML) |
| FR-012–FR-013 | Template downloads, auto-population of org details |
| FR-014–FR-016 | CryptoScan/TLS Analyzer/CryptoDeps output validation |

#### Security Testing (SR-001 through SR-011)
- **Data Protection:** Verified LocalStorage encryption, no unauthorized external data transmission, HTTPS enforcement
- **Application Security:** Validated CSP headers, XSS/injection sanitization, no undisclosed tracking
- **Repository Security:** Confirmed no secrets/credentials in committed code, security review guidelines, signed releases

#### Non-Functional Testing (NFR-001 through NFR-023)
- **Performance:** Score calc <100ms, chart render <500ms, PDF gen <5s, Excel no macro degradation
- **Availability:** Web app 99.5% uptime target, Excel 100% offline, GitHub CDN docs
- **Scalability:** 1,000+ concurrent users, extensible question architecture, extensible compliance mapping
- **Usability:** Quick Assessment ≤10 min (non-technical user), Comprehensive 2–4 hours, executive-readable results
- **Portability:** Cross-browser (Chrome/Firefox/Safari/Edge), cross-platform CLI (Win/Mac/Linux), Excel 2016+/LibreOffice 7.0+

#### Accessibility Testing (WCAG 2.1 Level AA)
- All interactive elements keyboard-navigable with visible focus indicators
- ARIA labels on all interactive elements, semantic HTML validation
- Color contrast ratio ≥ 4.5:1 verification
- `prefers-reduced-motion` media query compliance

#### Frontend Performance Testing
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1
- Lighthouse Score ≥ 90 (Performance, Accessibility, SEO, Best Practices)
- Bundle Size < 500KB gzipped

#### Test Data & Fixtures
- Created and managed test data files (e.g., `security-service.go`, `vulnerable-server.py` in `test-data/` directory) for validating:
  - CryptoScan: Detectable algorithm patterns (RSA, ECDSA, ECDH, DSA, DH, SHA-1, MD5, 3DES, RC4)
  - TLS Analyzer: Cipher suite and certificate test cases
  - CryptoDeps: Dependency manifest test files

---

## 5. Dr. K. Venkatesh — Mentor (Associate Professor)

### Role Summary
Faculty advisor and project mentor from Kalasalingam Academy of Research and Education (KARE).

### Contributions
- **Technical Guidance:** Subject matter expertise on Post-Quantum Cryptography (NIST FIPS 203/204/205, CNSA 2.0)
- **SRS Review & Approval:** Reviewed and signed off on the SRS document (signed 15-03-2026)
- **Standards Alignment:** Ensured alignment with NIST PQC, CMMC, FedRAMP, ISO 27001, and other referenced frameworks
- **Academic Supervision:** Guided the team through the PSB Hackathon 2026 development lifecycle
- **Quality Oversight:** Ensured the project meets academic and industry standards

---

## Summary Table

| # | Name | Role | Key Area of Ownership |
|---|---|---|---|
| 1 | **Inbathamizhan S** | Team Lead & Cybersecurity Specialist | Project leadership, framework design, scoring algorithm, compliance mapping, security architecture, CLI tool strategy |
| 2 | **Niranjan U** | UI/UX & Frontend Developer | 9 frontend pages, UI component library, design system, responsive layout, visualizations, accessibility, performance |
| 3 | **Vedhan Subramanian** | Backend & Systems Integration | Assessment engine, data models, compliance engine, gap analysis, CLI tool integration, reporting/export, Excel toolkit |
| 4 | **Ragul Nagaraj** | Security Analysis & Testing | SRS authorship, functional/security/non-functional testing, accessibility testing, test data/fixtures management |
| 5 | **Dr. K. Venkatesh** | Mentor (Associate Professor) | Technical guidance, SRS review, standards alignment, academic supervision |
