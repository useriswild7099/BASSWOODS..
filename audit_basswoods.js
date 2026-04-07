const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let report = '# BASSWOODS Site-Wide Integrity Audit Report\n\n';

function fileExists(filePath) {
    try {
        return fs.existsSync(filePath);
    } catch (e) {
        return false;
    }
}

htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    report += `## File: ${file}\n`;
    
    // Check Links
    const linkRegex = /href="([^"#]+)\.html"/g;
    let match;
    let brokenLinks = [];
    while ((match = linkRegex.exec(content)) !== null) {
        const link = match[1] + '.html';
        if (!fileExists(path.join(rootDir, link))) {
            brokenLinks.push(link);
        }
    }
    if (brokenLinks.length > 0) {
        report += `- **Broken Links Found**: ${brokenLinks.join(', ')}\n`;
    } else {
        report += `- Link Integrity: ✅ OK\n`;
    }
    
    // Check Images
    const imgRegex = /src="([^"]+)"/g;
    let brokenImages = [];
    while ((match = imgRegex.exec(content)) !== null) {
        let imgSrc = match[1];
        if (imgSrc.startsWith('http')) continue;
        let decodedSrc = decodeURIComponent(imgSrc);
        let imgPath = path.join(rootDir, decodedSrc);
        if (!fileExists(imgPath)) {
            brokenImages.push(decodedSrc);
        }
    }
    if (brokenImages.length > 0) {
        report += `- **Broken Images Found**: ${brokenImages.join(', ')}\n`;
    } else {
        report += `- Image Integrity: ✅ OK\n`;
    }

    // Check PWA
    const hasSW = content.includes('navigator.serviceWorker.register');
    const hasManifest = content.includes('manifest.json');
    report += `- Service Worker Registered: ${hasSW ? '✅' : '❌'}\n`;
    report += `- Manifest Linked: ${hasManifest ? '✅' : '❌'}\n\n`;
});

fs.writeFileSync('audit_report.md', report);
console.log('Audit Report generated: audit_report.md');
