# QuantumGuard - UX Improvement Plan

## Priority 1: Critical UX Fixes

### 1.1 Fix Assessment Data Bug (Blocking Issue)
The practice ID mismatch (bug #1) means the comprehensive assessment produces incorrect scores for 60 of 120 questions. This must be fixed before any other UX work.

### 1.2 Add Mobile Navigation
- Implement hamburger menu for mobile viewports
- Use a slide-out drawer or dropdown menu pattern
- Ensure all navigation links are accessible on mobile

### 1.3 Fix Auto-Advance on Back Navigation
- Track whether user is navigating forward or backward
- Only auto-advance when a new answer is selected (not when pre-filling existing answers)
- Or remove auto-advance entirely and rely on explicit Next button

## Priority 2: Assessment Experience

### 2.1 Assessment Onboarding Flow
- Add a welcome modal explaining the assessment process
- Show estimated time (Quick: 2-3 min, Comprehensive: 15-30 min)
- Explain what happens with the data (stays in browser, nothing sent to server)
- Add option to start fresh or resume previous assessment

### 2.2 Progress Persistence UX
- Show "Resume Assessment" banner on landing page if saved progress exists
- Add "Start Fresh" button that clears localStorage
- Save timestamp of last activity to show "Last updated X ago"

### 2.3 Question UX Improvements
- Add question numbering within each practice (e.g., "3 of 10")
- Show practice completion percentage during assessment
- Allow bookmarking questions for review
- Add "Mark for Review" toggle on each question
- Summary screen before submission showing unanswered questions

### 2.4 Keyboard Shortcuts
- Implement consistent keyboard navigation across all pages
- Show keyboard shortcut hints (e.g., "Press 1-4 to select, Enter to continue")
- Support Escape to go back, Space to select

## Priority 3: Results & Visualization

### 3.1 Results Page Enhancements
- Add radar chart for dimension comparison
- Add trend line if multiple assessments exist
- Implement PDF export for full results (not just JSON)
- Add "Share Results" feature (generate shareable link or image)

### 3.2 Interactive Data Exploration
- Click on practice bars to see individual question breakdown
- Drill-down from dimension → practice → questions
- Compare current score against industry benchmark visually

### 3.3 Actionable Recommendations
- Generate specific, prioritized action items based on lowest scores
- Link each recommendation to relevant framework documentation
- Provide estimated effort/impact matrix for improvements

## Priority 4: Scanner UX

### 4.1 Scanner Onboarding
- Add tutorial/tooltips explaining each scanner tool
- Show example files to try (link to test-data files)
- Add "Try with sample data" button for each scanner

### 4.2 Scan Result Interactions
- Click finding to jump to file location (highlight line)
- Filter findings by severity, algorithm type, or file
- Sort columns in findings tables
- Export findings as CSV/SARIF

### 4.3 CBOM Report Improvements
- Better PDF layout with proper page breaks
- Include charts and visualizations in PDF
- Add executive summary section to CBOM
- QR code linking to assessment results

## Priority 5: Accessibility

### 5.1 WCAG 2.1 AA Compliance
- Add proper ARIA labels to all interactive elements
- Ensure sufficient color contrast ratios (some text on dark backgrounds may fail)
- Add focus indicators for keyboard navigation
- Implement skip-to-content link
- Add alt text for all visual elements
- Support screen readers for chart data

### 5.2 Reduced Motion Support
- Respect `prefers-reduced-motion` media query
- Provide static alternatives for animations

## Priority 6: Performance

### 6.1 Asset Optimization
- Self-host Tailwind CSS instead of CDN (eliminate render-blocking)
- Preload critical fonts
- Lazy-load non-critical resources
- Implement service worker for offline support

### 6.2 Code Organization
- Extract shared Tailwind config to a single file
- Create shared component templates (nav, footer)
- Minify and bundle JS files for production
