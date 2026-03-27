# QuantumGuard - Recommended Features

## High Priority Recommendations

### 1. Fix the Practice ID Bug (Critical)
The comprehensive assessment is fundamentally broken for 60 of 120 questions. This is the single most impactful fix. See `06-bug-fix-logic.md` for the fix.

### 2. Add Data Validation and Error Boundaries
Currently, if localStorage is corrupted or data structures are unexpected, the app silently fails or shows "—". Add:
- JSON schema validation for stored data
- Try-catch boundaries around score calculations
- User-friendly error messages instead of blank results
- Data integrity checks on page load

### 3. Implement Proper State Management
The current approach of reading/writing localStorage directly in each page script is fragile. Recommended:
- Create a centralized `QGState` module that manages all application state
- Use a pub/sub pattern for state changes
- Add state versioning for migration when data format changes
- Implement undo/redo for assessment answers

### 4. Add Automated Testing
Zero tests exist. Priority order:
1. **Unit tests for engine.js**: Test scoring calculations with edge cases (empty answers, partial answers, all max scores)
2. **Unit tests for scanner-engine.js**: Test pattern matching, dependency scanning, CBOM generation
3. **Integration tests**: Test assessment flow from start to results
4. **E2E tests**: Use Playwright/Cypress to test full user journeys

### 5. Improve Mobile Experience
The app is not usable on mobile:
- Navigation links are hidden with no hamburger menu
- Assessment questions overflow on small screens
- Results dashboard charts don't resize
- Scanner tables are not scrollable horizontally

### 6. Add Data Export/Import
Users need to:
- Export assessment results as PDF (currently only JSON for results)
- Import previous assessment data
- Transfer data between devices
- Share assessment results with stakeholders (read-only link)

## Medium Priority Recommendations

### 7. Progressive Web App (PWA)
- Add service worker for offline assessment capability
- Cache all static assets
- Enable "Add to Home Screen"
- Background sync for when connectivity returns

### 8. Assessment Analytics
- Time spent per question
- Question difficulty analysis (which questions have lowest scores)
- Drop-off points (where users abandon assessment)
- Average completion time by assessment type

### 9. Accessibility Audit
- Run axe-core or Lighthouse accessibility audit
- Fix color contrast issues (some text on dark backgrounds may fail WCAG)
- Add ARIA labels to custom controls
- Ensure keyboard-only navigation works completely

### 10. Performance Optimization
- Bundle and minify JS files for production
- Self-host Tailwind CSS (currently CDN adds ~100KB blocking request)
- Lazy-load scanner-engine.js (only needed on tools page)
- Optimize font loading (use `font-display: swap`)

### 11. Internationalization (i18n)
- Extract all user-facing strings to translation files
- Support RTL layouts for Arabic/Hebrew
- Localize number formats and dates
- Translate assessment questions to multiple languages

### 12. API Security Hardening
- Add rate limiting to Flask API
- Implement input sanitization for hostname
- Add request logging and monitoring
- Use environment variables for all configuration
- Add CORS origin restriction (currently allows all)

## Low Priority Recommendations

### 13. Code Quality
- Add ESLint configuration for JavaScript
- Add type checking (JSDoc annotations or TypeScript migration)
- Extract shared components (nav, footer) to template partials
- Remove code duplication across HTML files

### 14. Documentation
- Add JSDoc comments to all public functions in engine.js
- Create API documentation for backend endpoints
- Write developer setup guide
- Document the scoring methodology in detail

### 15. Monitoring & Observability
- Add client-side error tracking (Sentry)
- Track page views and user journeys
- Monitor scanner API response times
- Set up alerts for backend failures
