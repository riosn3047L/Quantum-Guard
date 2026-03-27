# QuantumGuard - Bug Fix Logic

## Bug #1: Practice ID Mismatch in DPE and ITR Questions

### Root Cause
When the 120 questions were generated from the framework, questions for DPE (dimensions 3.x) and ITR (dimensions 4.x) were all assigned `practice: '2.3'` instead of their correct practice IDs.

### Fix Strategy
Re-map questions in blocks of 10 per practice:

| Question IDs | Current Practice | Correct Practice | Dimension |
|---|---|---|---|
| 61-70 | `2.3` | `3.1` | DPE |
| 71-80 | `2.3` | `3.2` | DPE |
| 81-90 | `2.3` | `3.3` | DPE |
| 91-100 | `2.3` | `4.1` | ITR |
| 101-110 | `2.3` | `4.2` | ITR |
| 111-120 | `2.3` | `4.3` | ITR |

### Implementation
In `data.js`, change `practice: '2.3'` to the correct practice ID for each block. Example:
```javascript
// Question 61: Change from
{ id: 61, dimension: 'DPE', practice: '2.3', ... }
// To
{ id: 61, dimension: 'DPE', practice: '3.1', ... }
```

### Validation
After fix, verify:
1. `QG.PRACTICES.filter(p => p.dimension === 'DPE').forEach(p => console.log(p.id, QG.QUESTIONS.filter(q => q.practice === p.id).length))` should output `3.1 10, 3.2 10, 3.3 10`
2. Same for ITR: `4.1 10, 4.2 10, 4.3 10`

---

## Bug #2: Compliance Page Null Reference

### Root Cause
```javascript
const answers = Engine.getAnswers('quick') || Engine.getAnswers('comprehensive') || {};
const questions = Object.keys(Engine.getAnswers('comprehensive') || {}).length > 0 ? QG.QUESTIONS : QG.QUICK_QUESTIONS;
```
If `Engine.getAnswers('comprehensive')` returns `null` (no data), `Object.keys(null)` throws TypeError.

### Fix
```javascript
const compAnswers = Engine.getAnswers('comprehensive') || {};
const quickAnswers = Engine.getAnswers('quick') || {};
const answers = Object.keys(compAnswers).length > 0 ? compAnswers : quickAnswers;
const questions = Object.keys(compAnswers).length > 0 ? QG.QUESTIONS : QG.QUICK_QUESTIONS;
```

---

## Bug #3: Donut Chart Double-Counting

### Root Cause
```javascript
else if (score === 3) { levelCounts.Established++; levelCounts.Advanced++; }
```
Score of 3 increments both Established and Advanced, causing total > actual answers.

### Fix
```javascript
else if (score === 3) { levelCounts.Established++; }
```
Remove the `levelCounts.Advanced++` from the score===3 branch. Advanced should only be counted from score === 4 (Optimizing).

---

## Bug #4: Auto-Advance on Back Navigation

### Root Cause
When rendering a previously-answered question, the radio input is pre-checked, which triggers the `change` event listener, causing auto-advance.

### Fix
Add a flag to distinguish programmatic selection from user selection:
```javascript
let isRestoring = false;

function renderQuestion() {
  isRestoring = true;
  // ... render options with pre-checked state ...
  // After DOM is ready:
  setTimeout(() => { isRestoring = false; }, 100);
}

radio.addEventListener('change', function() {
  if (isRestoring) return;
  answers[q.id] = parseInt(this.value);
  Engine.saveAnswers(answers, 'quick');
  buildProgressBars();
  setTimeout(() => { if (currentIdx < questions.length - 1) goNext(); }, 600);
});
```

---

## Bug #5: Clear Assessment Data on New Start

### Root Cause
No mechanism to clear previous assessment data when starting fresh.

### Fix
Add "Start Fresh" functionality:
```javascript
function startFresh(type) {
  Engine.storage.clear(); // clears all qg_ prefixed keys
  window.location.href = type === 'quick' ? 'quick-assessment.html' : 'comprehensive-assessment.html';
}
```
Add this button to the landing page near the assessment CTAs.

---

## Bug #6: Tailwind Config Duplication

### Root Cause
Full Tailwind config object is duplicated in each HTML file's `<script id="tailwind-config">` block.

### Fix
Create `tailwind-config.js`:
```javascript
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: "class",
  theme: { extend: { /* shared config */ } }
};
```
Then in each HTML file:
```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script src="tailwind-config.js"></script>
```

---

## Bug #7: TLS Scanner Hardcoded URL

### Root Cause
```javascript
const SSLYZE_API_URL = 'http://localhost:5000';
```
This will fail when the frontend is deployed on Vercel but the backend runs elsewhere.

### Fix
Make it configurable with sensible defaults:
```javascript
const SSLYZE_API_URL = window.QG_CONFIG?.sslyzeApiUrl || 
  (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '/api');
```
And configure Vercel to proxy `/api` to the backend server.
