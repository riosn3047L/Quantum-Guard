# QuantumGuard (QRAMM)
**Quantum Readiness Assurance Maturity Model**

🌐 **Live Demo:** [https://social-482013.web.app/](https://social-482013.web.app/)

> **Built by Team IravoVoid for the PSB Hackathon 2026** in association with the CyberSecurity NonProfit (CSNP).

QuantumGuard is an open-source framework and web application designed to help organizations assess and improve their readiness for Post-Quantum Cryptography (PQC). It directly addresses the **"Harvest Now, Decrypt Later"** threat, where adversaries collect encrypted data today to decrypt once quantum computers become capable of breaking RSA/ECC cryptosystems (estimated 2029-2033+).

---

## 📑 Table of Contents
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#️-technology-stack)
-[🚀 Getting Started (Local Setup)](#-getting-started-local-setup)
- [🧠 Scoring Methodology](#-scoring-methodology)
- [🏗️ Architecture](#️-architecture)
- [📁 Repository Structure](#-repository-structure)
- [🛡️ Security & Privacy](#️-security--privacy)
- [🗺️ Roadmap](#️-roadmap)

---

## ✨ Key Features

1. **Maturity Assessment Engine**
   - **Quick Assessment:** 12 representative questions for a fast baseline.
   - **Comprehensive Assessment:** 120 questions across 4 dimensions and 12 practices.
   - **Org Profile Customization:** Tailors the context based on industry, size, and regulatory requirements.

2. **Quantum Cryptography Scanners**
   - **CryptoScan:** Source code regex analysis for detecting 12 vulnerable algorithm families and 7 PQC-safe patterns.
   - **TLS Scanner:** Deep TLS/SSL analysis powered by SSLyze (protocols, ciphers, cert chains, quantum readiness scoring).
   - **CryptoDeps:** Dependency manifest analysis (npm, pip, maven, go, etc.) against known vulnerable packages.

3. **CBOM Generator (Cryptographic Bill of Materials)**
   - Aggregates findings into a CBOM with automated **PQC Labeling** (Fully Quantum Safe, PQC Ready, Partially Compliant, Not Quantum Safe).
   - Exportable to PDF.

4. **Results & Compliance Dashboard**
   - Interactive visualizations (Donut charts, heatmaps, dimension scorecards).
   - Real-time mapping to **NIST PQC, CMMC 2.0, FedRAMP, and FISMA** frameworks.
   - Gap analysis and prioritized recommendations.

5. **AI Chat Advisor**
   - Integrated **Google Gemini 1.5 Flash** AI for streaming, context-aware cybersecurity advice based on your scan results.

---

## 🛠️ Technology Stack

**Frontend (Zero-Build Static App)**
* HTML5 / CSS3 / Vanilla JavaScript (ES6+)
* Tailwind CSS (via CDN)
* Browser `localStorage` (Client-side persistence)
* `html2pdf.js` for report generation

**Backend (Python REST API)**
* Flask & Flask-CORS
* SSLyze (TLS scanning engine)
* Cryptography package (Certificate parsing)
* Google Gemini SDK (AI Chat Advisor)

**Deployment**
* Vercel (Frontend & UI)
* Local/Self-hosted (Backend Flask API)

---

## 🚀 Getting Started (Local Setup)

Because QuantumGuard utilizes a decoupled architecture, you need to run both the static frontend and the Python backend to use all features (specifically the TLS scanner and AI Chat).

### Prerequisites
* Python 3.8+
* A modern web browser
* Google Gemini API Key (for Chat Advisor)

### 1. Start the Backend API
The backend powers the TLS Scanner and AI Chat Advisor.

```bash
# Navigate to the backend directory
cd implementation/backend

# Install dependencies
pip install -r requirements.txt

# Set your Gemini API key as an environment variable
export GEMINI_API_KEY="your_api_key_here"  # On Windows use: set GEMINI_API_KEY="your_api_key_here"

# Run the Flask server
python tls_api_server.py

*The server will start on `http://localhost:5000`.*

### 2. Run the Frontend
Because the frontend is pure HTML/JS, you can serve it using any basic HTTP server to avoid CORS issues with local files.

```bash
# Open a new terminal and navigate to the frontend directory
cd implementation/frontend

# Run a simple Python HTTP server
python -m http.server 8000
```
*Open your browser and navigate to `http://localhost:8000`.*

---

## 🧠 Scoring Methodology

QuantumGuard evaluates readiness across **4 Dimensions**:
1. CVI (Cryptographic Visibility & Inventory)
2. SGRM (Strategic Governance & Risk Management)
3. DPE (Data Protection Engineering)
4. ITR (Implementation & Technical Readiness)

**The Weakest Link Principle:** 
A chain is only as strong as its weakest link. Therefore, your **Dimension Score** is the *minimum* of its underlying practice scores. Your **Overall Score** is the average of your 4 dimension scores, mapped to a 5-level maturity tier:

* **Basic** (1.0 - 1.4)
* **Developing** (1.5 - 2.4)
* **Established** (2.5 - 3.4)
* **Advanced** (3.5 - 3.9)
* **Optimizing** (4.0)

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                    VERCEL CDN (Static)                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Frontend (HTML/CSS/JS)              │   │
│  │  index.html │ assessment │ results │ compliance  │   │
│  │  tools.html │ engine.js  │ scanner-engine.js     │   │
│  └──────────────────────┬───────────────────────────┘   │
└─────────────────────────┼───────────────────────────────┘
                          │ HTTPS / fetch()
┌─────────────────────────▼───────────────────────────────┐
│              Python Flask Backend (Local)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │tls_api_server│  │sslyze_scanner│  │chat_advisor  │   │
│  │  :5000/scan  │  │   (SSLyze)   │  │  (Gemini AI) │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```text
QuantumGuard/
├── implementation/
│   ├── frontend/          # Vanilla JS + Tailwind HTML App
│   │   ├── index.html            # Landing page
│   │   ├── quick-assessment.html # 12-question baseline
│   │   ├── comprehensive...html  # Full 120-question audit
│   │   ├── results.html          # Interactive Dashboard
│   │   ├── tools.html            # Scanners & CBOM Generator
│   │   ├── data.js               # QG 120-question schema
│   │   └── engine.js             # Core scoring engine
│   └── backend/           # Flask API
│       ├── tls_api_server.py     # Main API entry point
│       ├── sslyze_scanner.py     # SSLyze wrapper & logic
│       ├── chat_advisor.py       # Gemini AI integration
│       └── requirements.txt
├── framework/             # Methodology documentation
├── templates/             # Markdown report templates
└── README.md
```

---

## 🛡️ Security & Privacy

* **Client-Side First**: All assessment answers and organization profiles are stored exclusively in your browser's `localStorage`. No assessment data is transmitted to the backend.
* **Source Code Scanning**: `CryptoScan` runs entirely in the browser using Regex. Source code files uploaded to the scanner *never* leave your machine.
* **Backend Targeting**: The backend TLS scanner interacts directly with the hostnames you provide. Please ensure you have authorization to scan target infrastructure.

---

## 🗺️ Roadmap

As a Hackathon MVP, QuantumGuard is constantly evolving. Planned future features include:
* **Phase 1:** Server-side user authentication, team collaboration, and PostgreSQL storage.
* **Phase 2:** Advanced visualizations (Radar charts, trend tracking) and White-label PDF executive reports.
* **Phase 3:** AST-based code scanning (replacing Regex), CI/CD pipeline integration, and automated SBOM generation.
* **Phase 4:** Expanding compliance mappings to ISO/IEC 27001:2022 and NSM 10.

---
*Built to secure tomorrow, today. Prepare for the Quantum Era with QuantumGuard.*
```
