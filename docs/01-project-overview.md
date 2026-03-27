# QuantumGuard - Project Overview

## Project Identity
- **Name**: QuantumGuard - Quantum Readiness Assurance Maturity Model (QRAMM)
- **Team**: IravoVoid (Built for PSB Hackathon 2026)
- **Organization**: CyberSecurity NonProfit (CSNP)
- **License**: MIT
- **Deployment**: Vercel (static frontend) + Python Flask backend (local/self-hosted)

## Purpose
QuantumGuard is an open-source framework and web application designed to help organizations assess and improve their readiness for post-quantum cryptography (PQC). It addresses the "harvest now, decrypt later" threat where adversaries collect encrypted data today to decrypt once quantum computers become capable of breaking RSA/ECC cryptosystems (estimated 2029-2033+).

## Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| **HTML5/CSS3** | Static pages (no build step, no framework) |
| **Tailwind CSS (CDN)** | Utility-first CSS framework via CDN |
| **Vanilla JavaScript (ES6+)** | All client-side logic, scoring engine, scanner |
| **Material Symbols Outlined** | Icon library from Google Fonts |
| **Inter / Space Grotesk / JetBrains Mono** | Typography |
| **html2pdf.js (CDN)** | PDF export for CBOM reports |
| **localStorage** | Client-side data persistence for assessments |

### Backend (Python)
| Technology | Purpose |
|---|---|
| **Flask** | REST API server for TLS scanning |
| **Flask-CORS** | Cross-origin resource sharing |
| **SSLyze** | TLS/SSL scanning engine |
| **cryptography** | Certificate parsing |
| **requests** | Gemini API integration for chat advisor |
| **Google Gemini 1.5 Flash** | AI-powered security chat advisor |

### Deployment
| Platform | Configuration |
|---|---|
| **Vercel** | Static site deployment with URL rewrites |
| **Output Directory** | `implementation/frontend` |
| **Security Headers** | X-Content-Type-Options, X-Frame-Options, Referrer-Policy |

## Repository Structure

```
PNB-2/
├── QuantumGuard/
│   ├── implementation/
│   │   ├── frontend/          # All frontend code
│   │   │   ├── index.html            # Landing page
│   │   │   ├── quick-assessment.html # 12-question quick assessment
│   │   │   ├── comprehensive-assessment.html # Full 120-question assessment
│   │   │   ├── results.html          # Results dashboard
│   │   │   ├── compliance.html       # Compliance mapping page
│   │   │   ├── tools.html            # Crypto scanner tools
│   │   │   ├── org-profile.html      # Organization profile setup
│   │   │   ├── docs.html             # Documentation page
│   │   │   ├── about.html            # About page
│   │   │   ├── shared.css            # Design system styles
│   │   │   ├── data.js               # QG data layer (120 questions, dimensions, practices)
│   │   │   ├── engine.js             # Scoring engine
│   │   │   └── scanner-engine.js     # Crypto scan, TLS, dependency scanner
│   │   └── backend/
│   │       ├── tls_api_server.py     # Flask API for SSLyze
│   │       ├── sslyze_scanner.py     # SSLyze wrapper with quantum scoring
│   │       ├── chat_advisor.py       # Gemini AI chat integration
│   │       └── requirements.txt      # Python dependencies
│   ├── framework/             # Framework documentation (120 questions, scoring)
│   ├── toolkit/               # Excel assessment toolkit
│   ├── toolkit-specs/         # Technical specifications
│   ├── templates/             # Markdown templates (executive report, etc.)
│   ├── docs/                  # SRS and reference docs
│   ├── ref/                   # Reference HTML implementations
│   ├── assets/                # Visual assets
│   ├── vercel.json            # Vercel deployment config
│   └── README.md              # Project README
└── doc-2/                     # This documentation folder
```

## Core Features Summary

### 1. Maturity Assessment Engine
- **Quick Assessment**: 12 questions (1 per practice), fast baseline scoring
- **Comprehensive Assessment**: 120 questions across 4 dimensions and 12 practices
- **5-Level Maturity Model**: Basic (1.0-1.4) → Developing (1.5-2.4) → Established (2.5-3.4) → Advanced (3.5-3.9) → Optimizing (4.0)
- **Scoring**: Practice average → Dimension score (min of practices) → Overall average

### 2. Organization Profile & Risk Multiplier
- Industry vertical, org size, geographic scope, data sensitivity, regulatory requirements
- Composite risk multiplier (1.0-1.5x) adjusts assessment weighting

### 3. Results Dashboard
- Overall score display with maturity badge
- Dimension score cards with progress bars
- Practice-level breakdown with benchmark comparison
- Maturity spread donut chart
- Practice heatmap visualization
- Strengths & improvements analysis
- Compliance coverage cards
- JSON export capability

### 4. Compliance Mapping
- 4 frameworks: NIST PQC, CMMC 2.0, FedRAMP, FISMA
- Framework selector tabs
- Practice-to-framework mapping table
- Gap analysis with priority scoring

### 5. Quantum Cryptography Scanner
- **CryptoScan**: Source code analysis for quantum-vulnerable algorithms (RSA, ECC, DSA, DH, MD5, SHA-1, 3DES, RC4, etc.)
- **TLS Scanner**: SSLyze-powered deep TLS/SSL analysis (protocols, ciphers, certificates, vulnerabilities, quantum readiness scoring)
- **CryptoDeps**: Dependency manifest analysis (npm, pip, maven, go, cargo, ruby)
- **CBOM Generator**: Cryptographic Bill of Materials output
- **PQC Labeling**: Quantum-safe certification badges (Fully Quantum Safe, PQC Ready, Partially Compliant, Not Quantum Safe)

### 6. AI Chat Advisor
- Gemini 1.5 Flash integration for scan result analysis
- Streaming responses with contextual security advice
