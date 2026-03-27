# QuantumGuard - Architecture Analysis

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL CDN (Static)                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Frontend (HTML/CSS/JS)               │   │
│  │  index.html │ assessment │ results │ compliance  │   │
│  │  tools.html │ org-profile │ docs │ about         │   │
│  │  data.js │ engine.js │ scanner-engine.js         │   │
│  └──────────────────────┬───────────────────────────┘   │
└─────────────────────────┼───────────────────────────────┘
                          │ HTTPS
                          │ fetch()
┌─────────────────────────▼───────────────────────────────┐
│              Python Flask Backend (Local)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ tls_api_server│  │sslyze_scanner│  │chat_advisor  │  │
│  │  :5000/scan   │  │ (SSLyze)    │  │ (Gemini AI)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│              Browser localStorage                        │
│  qg_orgProfile │ qg_quick_answers │ qg_comprehensive    │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### Assessment Flow
1. User visits `org-profile.html` → fills org details → saved to `localStorage`
2. User starts assessment (quick or comprehensive) → questions from `data.js`
3. Answers saved to `localStorage` on each selection
4. User navigates to `results.html` → engine.js reads answers → computes scores
5. Results rendered client-side with charts and breakdowns

### Scanner Flow
1. User uploads files or enters hostname in `tools.html`
2. **CryptoScan**: `scanner-engine.js` runs regex pattern matching on file content → returns findings
3. **TLS Scanner**: `scanner-engine.js` sends POST to Flask backend → SSLyze scans host → results returned
4. **CryptoDeps**: `scanner-engine.js` parses dependency file → checks against vulnerability DB
5. **CBOM**: Aggregates all scan results → generates Cryptographic Bill of Materials

## Key Design Decisions

### No Framework / No Build Step
- Pure HTML/CSS/JS with Tailwind CDN
- Advantages: Zero build complexity, instant deployment, easy to understand
- Disadvantages: Code duplication across pages (Tailwind config repeated 8+ times), no component reuse, harder to maintain

### Client-Side Only for Assessment
- All assessment logic runs in browser
- localStorage for persistence
- No server needed for core assessment functionality
- Enables static deployment on Vercel

### Weakest Link Scoring
- Dimension score = MIN of its 3 practice scores
- Rationale: A chain is only as strong as its weakest link; quantum readiness requires all areas to be adequate

### Regex-Based Crypto Scanner
- Pattern matching against source code using regular expressions
- Covers 12 vulnerable algorithm families and 7 PQC-safe patterns
- Limitation: No AST parsing, so false positives possible (e.g., comments, strings)
