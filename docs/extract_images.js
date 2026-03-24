const fs = require('fs');
const path = require('path');

const buildSrsPath = path.join(__dirname, 'build_srs.js');
const buildSrsContent = fs.readFileSync(buildSrsPath, 'utf-8');

// Use a regex to find the base64 string for pnbLogoB64
const match = buildSrsContent.match(/const pnbLogoB64 = '(?:data:image\/[^;]+;base64,)?([^']+)';/);

if (match && match[1]) {
    const base64Data = match[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const outputPath = path.join(__dirname, 'pnb_header_logo.jpg');
    fs.writeFileSync(outputPath, imageBuffer);
    console.log('Successfully extracted pnb_header_logo.jpg to ' + outputPath);
} else {
    console.error('Could not find pnbLogoB64 in build_srs.js');
}
