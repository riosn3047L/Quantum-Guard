const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mdPath = path.join(__dirname, 'SRS_QuantumGuard.md');
const mdContent = fs.readFileSync(mdPath, 'utf8');

// Find all mermaid blocks
const mermaidRegex = /```mermaid\n([\s\S]*?)```/g;
let match;
let counter = 1;

while ((match = mermaidRegex.exec(mdContent)) !== null) {
    const mermaidCode = match[1].trim();
    const mmdFilePath = path.join(__dirname, `diagram_${counter}.mmd`);
    const pngFilePath = path.join(__dirname, `final_srs_assets`, `QuantumGuard_Diagram_${counter}.png`);
    
    // Write the .mmd file
    fs.writeFileSync(mmdFilePath, mermaidCode);
    console.log(`Extracted diagram ${counter} to ${mmdFilePath}`);
    
    // Ensure final_srs_assets directory exists
    const assetsDir = path.join(__dirname, 'final_srs_assets');
    if (!fs.existsSync(assetsDir)){
        fs.mkdirSync(assetsDir, { recursive: true });
    }

    try {
        console.log(`Rendering diagram ${counter} with mermaid-cli...`);
        // Use npx to run mmdc (mermaid-cli)
        // Install missing dependencies automatically or run if cached
        // Note: passing `-p puppeteer-config.json` is sometimes needed but we'll try the default first
        execSync(`npx -y @mermaid-js/mermaid-cli -i "${mmdFilePath}" -o "${pngFilePath}" -b transparent`, {
            stdio: 'inherit'
        });
        console.log(`Successfully rendered diagram ${counter} to ${pngFilePath}`);
    } catch (e) {
        console.error(`Failed to render diagram ${counter}:`, e.message);
    }
    
    counter++;
}
