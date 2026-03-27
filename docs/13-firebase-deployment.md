# QuantumGuard - Firebase Deployment Guide

## Project Structure (Firebase)

```
PNB-2/                            ← Firebase project root
├── .firebaserc                   ← Project ID: social-482013
├── firebase.json                 ← Hosting + Functions config
├── Quantum-Guard/
│   └── implementation/
│       ├── frontend/             ← Firebase Hosting (static files)
│       │   ├── index.html
│       │   ├── *.html
│       │   ├── shared.css
│       │   ├── data.js
│       │   ├── engine.js
│       │   └── scanner-engine.js ← Updated to use /api prefix
│       └── backend/              ← Cloud Functions (Python)
│           ├── main.py           ← Cloud Function entry point
│           ├── tls_api_server.py ← Flask API
│           ├── sslyze_scanner.py ← SSLyze scanning logic
│           ├── chat_advisor.py   ← Gemini AI chat (not wired yet)
│           ├── requirements.txt  ← Python deps (incl. functions-framework)
│           └── Dockerfile        ← Custom runtime for C extensions
└── doc-2/                        ← Documentation
```

## How It Works

1. **Frontend** is served by Firebase Hosting from `Quantum-Guard/implementation/frontend/`
2. **API calls** to `/api/*` are rewritten to the Cloud Function named `api`
3. **Cloud Function** (`main.py`) strips the `/api` prefix and routes to the Flask app
4. **Flask app** (`tls_api_server.py`) handles `/health` and `/scan` endpoints

### Request Flow
```
Browser → GET https://social-482013.web.app/quick-assessment.html
           (Firebase Hosting serves static file)

Browser → POST https://social-482013.web.app/api/scan
           { "hostname": "example.com", "port": 443 }
           ↓
Firebase Hosting rewrite → Cloud Function "api"
           ↓
main.py strips /api prefix → path becomes /scan
           ↓
Flask handles /scan → sslyze_scanner.scan_host()
           ↓
Response → JSON with TLS scan results
```

## Prerequisites

1. **Firebase CLI**: `npm install -g firebase-tools` (already installed: v15.8.0)
2. **Google Cloud account** linked to Firebase project `social-482013`
3. **Docker** (for building the Cloud Function with native deps)
4. **Enable Cloud Build API** in Google Cloud Console:
   - Visit: https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com?project=social-482013
   - Click "Enable"

## Deployment Steps

### Step 1: Login to Firebase
```bash
firebase login
```

### Step 2: Set the project
```bash
firebase use social-482013
```

### Step 3: Deploy everything
```bash
# From PNB-2/ directory
firebase deploy
```

Or deploy individually:
```bash
# Frontend only
firebase deploy --only hosting

# Backend only
firebase deploy --only functions
```

### Step 4: Verify
- Frontend: https://social-482013.web.app/
- API Health: https://social-482013.web.app/api/health
- API Scan: POST to https://social-482013.web.app/api/scan

## Local Development

### Frontend (static)
```bash
# Use any static file server, e.g.:
cd Quantum-Guard/implementation/frontend
npx serve .
```

### Backend (Flask, local)
```bash
cd Quantum-Guard/implementation/backend
pip install -r requirements.txt
python tls_api_server.py
# Runs on http://localhost:5000
```

### Firebase Emulators
```bash
firebase emulators:start
# Hosting: http://localhost:5000
# Functions: http://localhost:5001
```

## Environment Variables

For the Gemini AI Chat Advisor, set the API key:
```bash
firebase functions:secrets:set GEMINI_API_KEY
# Then add to firebase.json functions config:
# "secrets": ["GEMINI_API_KEY"]
```

## Notes

- The Cloud Function uses a **custom Docker runtime** because `sslyze` requires `nassl` (C extension with OpenSSL bindings)
- SSLyze scanning can take 10-30 seconds — function timeout is set to 120 seconds
- The function scales to 0 when idle (saves cost)
- Max 10 concurrent instances
- CORS is enabled on the Flask app (same-origin from Firebase Hosting)
