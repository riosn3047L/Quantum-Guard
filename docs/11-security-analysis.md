# QuantumGuard - Security Analysis

## Frontend Security

### Data Storage
- **localStorage** is used for all data persistence
- No sensitive data is stored (assessment answers are scored 1-4)
- No authentication tokens or credentials stored
- Data is origin-scoped to the deployment domain

### External Dependencies (CDN)
| Dependency | Risk |
|---|---|
| `cdn.tailwindcss.com` | Medium — SRI not used, could be tampered if CDN compromised |
| `fonts.googleapis.com` | Low — Font loading, no code execution |
| `fonts.gstatic.com` | Low — Font file serving |
| `cdnjs.cloudflare.com/ajax/libs/html2pdf.js` | Medium — PDF generation library, SRI not used |
| External image URLs (lh3.googleusercontent.com) | Low — Decorative images, but could be used for tracking |

### Recommendations
- Add Subresource Integrity (SRI) hashes for all CDN scripts
- Self-host critical dependencies to eliminate CDN supply chain risk
- Remove external image URLs or host them locally
- Add Content Security Policy (CSP) headers

## Backend Security

### API Security (tls_api_server.py)
- **CORS**: Currently allows ALL origins (`CORS(app)` with no restrictions)
- **No authentication**: Anyone can call the `/scan` endpoint
- **No rate limiting**: Vulnerable to abuse/DoS
- **No input validation**: Hostname is minimally validated (stripped of protocol prefix)
- **Debug mode**: `app.run(debug=True)` is enabled, which exposes the Werkzeug debugger

### SSLyze Scanner
- Scans external hosts which could be used for SSRF attacks
- No allowlist/blocklist for target hosts
- Could scan internal network hosts if the server has access

### Chat Advisor
- **API Key**: Relies on `GEMINI_API_KEY` environment variable (good practice)
- **No authentication**: Endpoint likely unauthenticated
- **Context truncation**: Limited to 8000 chars to prevent token overflow
- **Timeout handling**: Has proper timeout configuration (10s connect, 120s read)

### Recommendations
- Restrict CORS to specific origins
- Add API key or JWT authentication
- Implement rate limiting (e.g., Flask-Limiter)
- Add hostname blocklist (prevent scanning localhost, internal IPs)
- Disable debug mode in production
- Add request logging and monitoring

## Deployment Security (Vercel)

### Security Headers
```
X-Content-Type-Options: nosniff  ✓
X-Frame-Options: DENY           ✓
Referrer-Policy: strict-origin-when-cross-origin  ✓
```

### Missing Headers
```
Content-Security-Policy          ✗ (not set)
Strict-Transport-Security        ✗ (not set, but Vercel enforces HTTPS)
Permissions-Policy               ✗ (not set)
X-XSS-Protection                 ✗ (deprecated but still useful)
```

### Recommendations
- Add CSP header to restrict script sources
- Add HSTS header (even though Vercel provides HTTPS)
- Add Permissions-Policy to restrict browser features

## Supply Chain Risks

### Frontend
- Tailwind CDN: Could serve malicious code if compromised
- html2pdf.js CDN: Same risk
- Google Fonts: Lower risk (font files only)

### Backend
- SSLyze: Well-maintained open-source library, low risk
- Flask: Well-maintained, low risk
- requests: Well-maintained, low risk
- cryptography: Well-maintained, low risk

### Recommendations
- Pin all dependency versions
- Use lock files (requirements.txt already does this)
- Regularly audit dependencies for vulnerabilities
- Consider vendoring critical dependencies
