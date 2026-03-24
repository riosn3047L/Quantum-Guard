const fs = require('fs');
const path = require('path');

const mdContent = fs.readFileSync(path.join(__dirname, 'SRS_QuantumGuard.md'), 'utf8');

// Remove the first header block (title + meta up to first ---)
const lines = mdContent.split('\n');
let startIdx = 0;
let dashCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '---') {
    dashCount++;
    if (dashCount === 1) { startIdx = i + 1; break; }
  }
}
const bodyMd = lines.slice(startIdx).join('\n');
const escapedMd = JSON.stringify(bodyMd);

// Dynamically generate Table of Contents from headings
let tocHtml = '';
const headingRegex = /^(##+)\s+(.+)$/gm;
let match;
while ((match = headingRegex.exec(bodyMd)) !== null) {
  const level = match[1].length; // 2 for ##, 3 for ###
  const title = match[2];
  
  // Clean off markdown from title if any (like links, bold)
  let cleanTitle = title.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '');
  
  if (level === 2) {
    tocHtml += `      <li class="toc-main">${cleanTitle}</li>\n`;
  } else if (level === 3) {
    // Strip "1.1 ", "2.1 " prefix if it exists to match PNB style
    cleanTitle = cleanTitle.replace(/^\d+\.\d+\s+/, '');
    tocHtml += `      <li class="toc-sub">${cleanTitle}</li>\n`;
  }
}

// Read PNB header image and embed as base64
const imgPath = path.join(__dirname, 'Picture1.jpg');
let imgBase64 = '';
try {
  const imgBuf = fs.readFileSync(imgPath);
  imgBase64 = imgBuf.toString('base64');
} catch (e) {
  console.warn('WARNING: Picture1.jpg not found');
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>QuantumGuard — Software Requirement Specification</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"><\/script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #000;
    background: #d0d0d0;
    line-height: 1.5;
    font-size: 11pt;
  }

  /* ==== DOCUMENT PAGE ==== */
  .doc-page {
    max-width: 8in;
    margin: 20px auto;
    background: #fff;
    position: relative;
  }

  /* PNB Header Image on every page */
  .pnb-hdr { width: 100%; display: block; }

  /* Page content area with border */
  .page-body {
    margin: 8px 20px 20px 20px;
    padding: 20px 28px;
    min-height: 10in;
    position: relative;
  }

  /* ==== COVER PAGE ==== */
  .cover-body {
    margin: 8px 20px 20px 20px;
    padding: 0;
    min-height: 10in;
    position: relative;
  }

  .cover-top {
    padding: 12px 24px 0;
  }
  .cover-top .date-line {
    font-size: 11pt;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .cover-top .srs-title {
    font-size: 13pt;
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
    text-align: center;
    margin-bottom: 16px;
  }

  /* Inner box on cover page */
  .cover-box {
    border: 1.5px solid #000;
    margin: 0 24px 24px 24px;
    min-height: 8.5in;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 40px 30px;
  }

  .cover-box .hackathon-title {
    font-size: 16pt;
    font-weight: bold;
    margin-top: 20px;
  }
  .cover-box .version-block {
    text-align: center;
  }
  .cover-box .version-block .srs-label {
    font-size: 14pt;
    font-weight: bold;
  }
  .cover-box .version-block .version-num {
    font-size: 13pt;
    font-weight: bold;
  }
  .cover-box .project-details {
    text-align: center;
    margin-bottom: 20px;
  }
  .cover-box .project-details p {
    font-size: 12pt;
    margin: 6px 0;
  }
  .cover-box .project-details .label {
    font-weight: bold;
    text-decoration: underline;
    color: #000;
  }

  /* ==== REVISION HISTORY & DECLARATION ==== */
  .section-title {
    font-size: 12pt;
    font-weight: bold;
    text-decoration: underline;
    margin: 0 0 14px 0;
  }

  /* Table */
  table {
    width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 10pt;
    border: 1px solid #000; /* Ensure borders appear in Word */
  }
  th, td { border: 1px solid #000; padding: 8px 12px; text-align: left; }
  th { background-color: #f2f2f2; font-weight: bold; }

  /* Section Containers & Buttons */
  .section-wrapper { position: relative; margin-bottom: 30px; }
  .copy-btn {
    position: absolute; right: 0; top: 0;
    background: #004684; color: #fff; border: none;
    padding: 4px 10px; font-size: 8pt; border-radius: 4px;
    cursor: pointer; opacity: 0.6; transition: opacity 0.2s;
    z-index: 10;
  }
  .copy-btn:hover { opacity: 1; }
  .section-wrapper h2 { padding-right: 100px; } /* Room for button */

  /* Signature tables with more height */
  .sig-table td {
    min-height: 40px;
    padding: 8px 10px;
    vertical-align: top;
    line-height: 2;
    border: 1.5px dashed #000;
  }

  .declaration-text {
    font-size: 10.5pt;
    text-align: justify;
    margin: 12px 0 20px;
    line-height: 1.5;
  }
  .mentor-heading, .team-heading {
    font-size: 11pt;
    font-weight: bold;
    margin: 20px 0 10px;
  }

  /* ==== TOC ==== */
  .toc-list { list-style: none; padding: 0; margin: 10px 0; }
  .toc-list li { margin: 5px 0; font-size: 11pt; }
  .toc-main { font-weight: bold; }
  .toc-sub { padding-left: 24px; }
  .toc-sub2 { padding-left: 48px; font-size: 10pt; }

  /* ==== CONTENT (from Markdown) ==== */
  .content { padding: 0; }
  .content h1 {
    font-size: 14pt; font-weight: bold; text-decoration: underline;
    margin: 24px 0 12px;
  }
  .content h2 {
    font-size: 13pt; font-weight: bold; text-decoration: underline;
    margin: 20px 0 10px;
  }
  .content h3 {
    font-size: 11pt; font-weight: bold;
    margin: 16px 0 8px;
  }
  .content h4 {
    font-size: 11pt; font-weight: bold; font-style: italic;
    margin: 14px 0 6px;
  }
  .content p { margin: 6px 0 10px; text-align: justify; }
  .content ul, .content ol { margin: 6px 0 10px 20px; }
  .content ul { list-style-type: disc; }
  .content li { margin-bottom: 3px; }
  .content hr { border: none; border-top: 1px solid #bbb; margin: 16px 0; }
  .content strong { color: #000; }

  /* Mermaid */
  .mermaid {
    display: flex; justify-content: center;
    margin: 8px 0; padding: 0;
    page-break-inside: avoid;
  }
  .mermaid svg { max-width: 100% !important; height: auto !important; max-height: 450px !important; }

  /* Code */
  pre {
    background: #f5f5f5; border: 1px solid #ddd; padding: 10px;
    overflow-x: auto; font-family: "Courier New", monospace;
    font-size: 9pt; margin: 10px 0; page-break-inside: avoid;
  }
  code { font-family: "Courier New", monospace; font-size: 9pt; }
  pre code { background: transparent; padding: 0; }

  /* Topbar (web only) */
  .topbar {
    background: #2c2c2c; color: #fff; padding: 8px 20px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 10pt; position: sticky; top: 0; z-index: 100;
  }
  .topbar button {
    background: #fff; color: #333; border: none;
    padding: 6px 16px; cursor: pointer; font-weight: bold; border-radius: 3px;
  }

  /* ==== PRINT ==== */
  @media print {
    @page { 
      size: A4; 
      margin: 35mm 10mm 15mm 10mm; /* Increased top margin to 35mm for logo clearance */
    }
    body { background: #fff; }
    .topbar { display: none !important; }
    .doc-page { box-shadow: none; margin: 0; max-width: 100%; }
    .page-body, .cover-body { border: none; }
    .cover-body { page-break-after: always; min-height: auto; }
    .page-body { page-break-after: always; }
    .content-page { page-break-after: auto; }
    .content h2 { page-break-before: always; margin-top: 0; padding-top: 0; }
    .content h1, .content h2, .content h3 { page-break-after: avoid; }
    h3, h4 { page-break-after: avoid; }
    table, pre, .mermaid { page-break-inside: avoid; margin-bottom: 20px; }
    .mermaid svg { max-width: 100% !important; max-height: 180mm !important; }
    p, li { orphans: 3; widows: 3; }
    .copy-btn { display: none !important; }

    /* Fixed header for every page in print */
    .print-header {
      display: block !important;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 30mm; /* Explicit height for logo area */
      background: #fff;
      z-index: 1000;
      display: flex;
      align-items: center;
    }
    .pnb-hdr { display: none !important; } /* Hide static headers in print */
  }
</style>
</head>
<body>
<div class="print-header" style="display:none;">
  <img class="pnb-hdr-fixed" src="data:image/jpeg;base64,${imgBase64}" alt="Punjab National Bank" style="width:100%; display:block;">
</div>
<div class="topbar">
  <span>QuantumGuard — Software Requirement Specification</span>
  <button onclick="window.print()">🖨 Print / Save PDF</button>
</div>

<!-- ====== PAGE 1: COVER ====== -->
<div class="doc-page">
  <img class="pnb-hdr" src="data:image/jpeg;base64,${imgBase64}" alt="Punjab National Bank">
  <div class="cover-body">
    <div class="cover-top">
      <div class="date-line">Date:</div>
      <div class="srs-title">Software Requirement Specification (SRS)</div>
    </div>
    <div class="cover-box">
      <div class="hackathon-title">PSB Hackathon 2026</div>
      <div class="version-block">
        <div class="srs-label">Software Requirement Specification</div>
        <div class="version-num">Version 1</div>
      </div>
      <div class="project-details">
        <p><span class="label">Project Name:</span> QuantumGuard — Post Quantum Cryptography Scanner</p>
        <p><span class="label">Team Name:</span></p>
        <p><span class="label">Institute Name:</span></p>
      </div>
    </div>
  </div>
</div>

<!-- ====== PAGE 2: REVISION HISTORY + DECLARATION ====== -->
<div class="doc-page">
  <img class="pnb-hdr" src="data:image/jpeg;base64,${imgBase64}" alt="Punjab National Bank">
  <div class="page-body">
    <div class="section-title">Revision History</div>
    <table>
      <tr><th>Version No</th><th>Date</th><th>Prepared by/Modified by</th><th>Significant Changes</th></tr>
      <tr><td>Draft V1.0</td><td></td><td></td><td></td></tr>
      <tr><td></td><td></td><td></td><td></td></tr>
    </table>

    <br>
    <div class="section-title">Declaration</div>
    <p class="declaration-text">
      The purpose of this Software Requirements Specification (SRS) document is to identify and document the user requirements for the <strong>&lt;project Name&gt;</strong> The end deliverable software that will be supplied by <strong>&lt;team name&gt;</strong> will comprise of all the requirements documented in the current document and will be operated in the manner specified in the document. The Source code will be developed subsequently based on these requirements and will formally go through code review during testing process.
    </p>

    <div class="mentor-heading">Mentor Details (if any):</div>
    <table class="sig-table">
      <tr><td><strong>(Institute Name)</strong></td></tr>
      <tr><td>Signature:<br>Date:</td></tr>
      <tr><td>Name &amp; Title<br><strong>Assistant Professor/Associate/Professor</strong></td></tr>
    </table>

    <div class="team-heading">Team Member Details:</div>
    <table class="sig-table">
      <tr>
        <td><strong>Member 1</strong><br><br><strong>(Institute Name)</strong></td>
        <td><strong>Member 2</strong><br><br><strong>(Institute Name)</strong></td>
        <td><strong>Member 3</strong><br><br><strong>(Institute Name)</strong></td>
      </tr>
      <tr>
        <td>Signature:<br><br><br>Date:</td>
        <td>Signature:<br><br><br>Date:</td>
        <td>Signature:<br><br><br>Date:</td>
      </tr>
      <tr>
        <td>Name &amp; Title<br><br><br><strong>Team Lead</strong></td>
        <td>Name &amp; Title<br><br><br><strong>Developer</strong></td>
        <td>Name &amp; Title<br><br><br><strong>Tester</strong></td>
      </tr>
    </table>
  </div>
</div>

<!-- ====== PAGE 3: TABLE OF CONTENT ====== -->
<div class="doc-page">
  <img class="pnb-hdr" src="data:image/jpeg;base64,${imgBase64}" alt="Punjab National Bank">
  <div class="page-body">
    <div class="section-title">Table of Content</div>
    <ul class="toc-list">
${tocHtml}
    </ul>
  </div>
</div>

<!-- ====== PAGES 4+: SRS CONTENT ====== -->
<div class="doc-page content-page">
  <img class="pnb-hdr" src="data:image/jpeg;base64,${imgBase64}" alt="Punjab National Bank">
  <div class="page-body">
    <div class="content" id="content"></div>
  </div>
</div>

<script>
const md = ${escapedMd};
marked.setOptions({gfm:true, breaks:false});
const rawHtml = marked.parse(md);

// Post-process to wrap sections in containers with copy buttons
const container = document.getElementById('content');
container.innerHTML = rawHtml;

let lastWrapper = null;
const children = Array.from(container.children);
container.innerHTML = ''; // Clear to rebuild

children.forEach((child) => {
  if (child.tagName === 'H2') {
    lastWrapper = document.createElement('div');
    lastWrapper.className = 'section-wrapper';
    
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerText = 'Copy Section';
    btn.onclick = () => copySection(lastWrapper);
    
    lastWrapper.appendChild(btn);
    container.appendChild(lastWrapper);
    lastWrapper.appendChild(child);
  } else if (lastWrapper) {
    lastWrapper.appendChild(child);
  } else {
    container.appendChild(child);
  }
});

async function copySection(element) {
  // Clone element to avoid modifying original during styling for clipboard
  const clone = element.cloneNode(true);
  
  // Remove copy button from clone
  const btn = clone.querySelector('.copy-btn');
  if (btn) btn.remove();

  // Basic inlining of styles for Word compatibility
  const html = clone.innerHTML;
  
  try {
    const type = 'text/html';
    const blob = new Blob([html], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
    
    // Provide feedback
    const originalText = element.querySelector('.copy-btn').innerText;
    element.querySelector('.copy-btn').innerText = 'Copied!';
    element.querySelector('.copy-btn').style.background = '#28a745';
    setTimeout(() => {
      element.querySelector('.copy-btn').innerText = originalText;
      element.querySelector('.copy-btn').style.background = '#004684';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
    alert('Failed to copy. Please check browser permissions.');
  }
}

// Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#e8f4fd',
    primaryTextColor: '#1a3c6e',
    primaryBorderColor: '#6b9bd2',
    lineColor: '#1a3c6e',
    fontSize: '13px'
  }
});
document.querySelectorAll('code.language-mermaid').forEach(block => {
  const code = block.textContent;
  const parentPre = block.parentElement;
  const div = document.createElement('div');
  div.className = 'mermaid';
  div.textContent = code;
  parentPre.replaceWith(div);
});
mermaid.run();
<\/script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'SRS_QuantumGuard.html'), html, 'utf8');
console.log('SUCCESS: Pixel-perfect PNB SRS generated!');
