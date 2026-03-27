# QuantumGuard - Bugs, Logical Errors & Issues

## Critical Bugs

### 1. Practice ID Mismatch in DPE and ITR Questions (data.js)
**File**: `implementation/frontend/data.js:692-1232`
**Issue**: Questions for DPE (Dimension 3) and ITR (Dimension 4) all use `practice: '2.3'` instead of their correct practice IDs.
- Questions 61-90 (DPE dimension) should use practice IDs `3.1`, `3.2`, `3.3` but all use `'2.3'`
- Questions 91-120 (ITR dimension) should use practice IDs `4.1`, `4.2`, `4.3` but all use `'2.3'`

**Impact**: 
- Practice scores for DPE and ITR are calculated incorrectly
- Practice 2.3 shows inflated scores (averaging questions from different dimensions)
- Practices 3.1, 3.2, 3.3, 4.1, 4.2, 4.3 all return score 0
- Overall scoring is significantly broken for the comprehensive assessment

**Evidence**:
```javascript
// data.js line 692 — DPE question incorrectly mapped
{ id: 61, dimension: 'DPE', practice: '2.3', stream: 'B', ... }
// Should be practice: '3.1'

// data.js line 962 — ITR question incorrectly mapped
{ id: 91, dimension: 'ITR', practice: '2.3', stream: 'B', ... }
// Should be practice: '4.1'
```

**Fix Required**: Re-map all DPE questions (61-90) to practices 3.1/3.2/3.3 and ITR questions (91-120) to practices 4.1/4.2/4.3 in 10-question blocks.

### 2. Compliance Page Fails When No Comprehensive Answers Exist (compliance.html)
**File**: `implementation/frontend/compliance.html:174-175`
**Issue**: Line 175 tries to access `Engine.getAnswers('comprehensive')` and check `.length` even if it returns null/undefined.
```javascript
const answers = Engine.getAnswers('quick') || Engine.getAnswers('comprehensive') || {};
const questions = Object.keys(Engine.getAnswers('comprehensive') || {}).length > 0 ? QG.QUESTIONS : QG.QUICK_QUESTIONS;
```
If `Engine.getAnswers('comprehensive')` returns `null`, line 175 will throw a TypeError when accessing `.length` on null before the `||` fallback kicks in.

**Fix**: Should be:
```javascript
const compAnswers = Engine.getAnswers('comprehensive') || {};
const quickAnswers = Engine.getAnswers('quick') || {};
const answers = Object.keys(compAnswers).length > 0 ? compAnswers : quickAnswers;
const questions = Object.keys(compAnswers).length > 0 ? QG.QUESTIONS : QG.QUICK_QUESTIONS;
```

## Logical Errors

### 3. Dimension Score Uses MIN Instead of Average (engine.js)
**File**: `implementation/frontend/engine.js:70-75`
**Issue**: `calculateDimensionScore` returns `Math.min(...practiceScores)` (weakest link). While this is a design choice, it means:
- An organization scoring 4.0, 4.0, 1.0 on three practices gets dimension score = 1.0
- This disproportionately penalizes organizations with one weak area
- The README states "Dimension Score = Average of practice scores within dimension" contradicting the implementation

**Severity**: Medium — design inconsistency between documentation and implementation.

### 4. Quick Assessment Questions Filter May Return Empty (data.js)
**File**: `implementation/frontend/data.js:1238`
```javascript
QG.QUICK_QUESTIONS = QG.QUESTIONS.filter(q => [1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 101, 111].includes(q.id));
```
Due to bug #1, questions 61 and 91 have `practice: '2.3'` instead of their correct practices. This means the quick assessment does not properly represent practices 3.1 and 4.1.

### 5. Maturity Spread Donut Chart Double-Counts (results.html)
**File**: `implementation/frontend/results.html:300-302`
```javascript
else if (score === 3) { levelCounts.Established++; levelCounts.Advanced++; }
```
Score 3 is counted in both Established AND Advanced buckets, inflating the Advanced percentage. The donut chart percentages will not add up to 100%.

### 6. Auto-Advance Fires Even When Navigating Back (quick-assessment.html)
**File**: `implementation/frontend/quick-assessment.html:254`
```javascript
setTimeout(() => { if (currentIdx < questions.length - 1) goNext(); }, 600);
```
When a user navigates back to a previously answered question, the saved answer's radio is pre-checked, which triggers the `change` event handler, causing an unwanted auto-advance. The user can never review previous answers without being pushed forward.

## Issues

### 7. Tailwind Config Duplication
The full Tailwind config with 65+ custom colors is duplicated across 8 HTML files. Any color change requires updating all files. Should be extracted to a shared JS file.

### 8. No Responsive Mobile Navigation
The mobile hamburger menu is not implemented. Navigation links are hidden on mobile (`hidden md:flex`) with no fallback menu button.

### 9. localStorage Data Not Cleared on Re-Assessment
Starting a new assessment doesn't clear previous answers. Users can accidentally mix old and new responses.

### 10. TLS Scanner Hardcoded Backend URL
`scanner-engine.js:204` has `const SSLYZE_API_URL = 'http://localhost:5000'`. This will fail in production. Should be configurable or use a proxy.

### 11. Missing HTTP Question Text Terminator
Some question texts in `data.js` lack a question mark at the end (e.g., question 107, 117), making them statements rather than questions.

### 12. Compliance Framework Table Sorting Issue
The compliance mapping table in `compliance.html` renders practices in order, but when switching frameworks, the status/compliance badges don't update to reflect the selected framework's mapping.

### 13. File Input Accept Attribute Mismatch (tools.html)
The CryptoScan file input accepts `.tsx, .jsx, .cfg, .conf, .yaml, .yml, .toml, .xml, .json` but the scanner engine only processes content as text — it doesn't handle binary files or have specific parsers for these formats.
