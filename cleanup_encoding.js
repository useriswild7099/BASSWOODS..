const fs = require('fs');
const path = require('path');

const replacements = {
    'DzÃƒÂ¼kou': 'Dzükou',
    'DzÃ¼kou': 'Dzükou',
    'Ã‚Â·': '·',
    'Â·': '·',
    'Ã¢â‚¬â€œ': '–',
    'Ã¢â‚¬â€': '—',
    'Ã¢â€ â€™': '→',
    'Ã¢” â‚¬': '─',
    'â†’': '→',
    'â€”': '—',
    'â€“': '–',
    'â€™': "'",
    'â€œ': '“',
    'â€': '”',
    'â‚¹': '₹',
    'Â©': '©',
    'Ã¼': 'ü',
    '&#038;': '&',
    '&amp;': '&',
    '&#8217;': "'",
    '&#8211;': '–',
    '&#8377;': '₹',
    'Â': ' '
};

const rootDir = 'e:\\prince\\Projects\\bass camp\\bass insp\\www.mountainbikeworldwide.com';

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath);
        } else if (file.endsWith('.html') || file.endsWith('.css')) {
            console.log(`Processing ${filePath}...`);
            let content = fs.readFileSync(filePath, 'utf8');
            let changed = false;
            for (const [old, newVal] of Object.entries(replacements)) {
                if (content.includes(old)) {
                    content = content.split(old).join(newVal);
                    changed = true;
                }
            }
            // Robust regex for comment headers
            const commentReplacements = [
                { pattern: /\/\/.*SELECT STATE.*/g, replacement: '// ─── SELECT STATE ───' },
                { pattern: /\/\/.*RESET MAP.*/g, replacement: '// ─── RESET MAP ───' },
                { pattern: /\/\/.*KEYBOARD: ESC to reset.*/g, replacement: '// ─── KEYBOARD: ESC to reset ───' }
            ];
            commentReplacements.forEach(cr => {
                if (cr.pattern.test(content)) {
                    content = content.replace(cr.pattern, cr.replacement);
                    changed = true;
                }
            });
            if (changed) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`  Fixed ${file}`);
            }
        }
    });
}

walk(rootDir);
console.log('Cleanup complete.');
