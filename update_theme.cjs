const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
    { regex: /(text|bg|border)-\[\#000000[a-zA-Z0-9]*\]/gi, replace: '$1-slate-900' },
    { regex: /(text|bg|border)-\[\#000\]/gi, replace: '$1-slate-900' },
    { regex: /(text|bg|border)-\[\#333\]/gi, replace: '$1-slate-800' },
    { regex: /(text|bg|border)-\[\#444\]/gi, replace: '$1-slate-700' },
    { regex: /(text|bg|border)-\[\#555\]/gi, replace: '$1-slate-600' },
    
    // Primary / Accents (Rose/Red)
    { regex: /(text|bg|border)-\[crimson\]/gi, replace: '$1-rose-600' },
    { regex: /(text|bg|border)-\[\#f63b60\]/gi, replace: '$1-rose-600' },
    { regex: /(text|bg|border)-\[\#e44343\]/gi, replace: '$1-rose-600' },
    { regex: /(text|bg|border)-\[\#d02222\]/gi, replace: '$1-rose-700' },
    { regex: /(text|bg|border)-\[\#d55b45\]/gi, replace: '$1-rose-500' },
    { regex: /(text|bg|border)-\[\#e94560\]/gi, replace: '$1-rose-600' },

    // Warnings / Stars
    { regex: /(text|bg|border)-\[\#ffbb38\]/gi, replace: '$1-amber-400' },
    { regex: /(text|bg|border)-\[\#f6ba00\]/gi, replace: '$1-amber-500' },

    // Blues
    { regex: /(text|bg|border)-\[\#3957db\]/gi, replace: '$1-blue-600' },
    { regex: /(text|bg|border)-\[\#3a24db\]/gi, replace: '$1-blue-700' },
    { regex: /(text|bg|border)-\[\#077f9c\]/gi, replace: '$1-cyan-600' },

    // Success / Greens
    { regex: /(text|bg|border)-\[\#3bc177\]/gi, replace: '$1-emerald-500' },
    { regex: /(text|bg|border)-\[\#56d879\]/gi, replace: '$1-emerald-400' },
    { regex: /(text|bg|border)-\[\#38c776\]/gi, replace: '$1-emerald-500' },
    { regex: /(text|bg|border)-\[\#40d132\]/gi, replace: '$1-emerald-500' },
    { regex: /(text|bg|border)-\[\#0eae88\]/gi, replace: '$1-teal-500' },

    // Light Backgrounds
    { regex: /(text|bg|border)-\[\#f5f5f5\]/gi, replace: '$1-slate-100' },
    { regex: /(text|bg|border)-\[\#fde1e6\]/gi, replace: '$1-rose-50' },
    { regex: /(text|bg|border)-\[\#fce1e6\]/gi, replace: '$1-rose-50' },
    { regex: /(text|bg|border)-\[\#e3e9ee\]/gi, replace: '$1-slate-100' },

    // Custom CSS vars & inline props
    { regex: /color="rgb\(255 255 255 \/ 83\%\)"/g, replace: 'color="#f8fafc"' },
    { regex: /color:\s*['"](crimson|#f63b60|#e44343)['"]/gi, replace: 'color: "#e11d48"' },
    { regex: /color:\s*['"]#3bc177['"]/gi, replace: 'color: "#10b981"' },
    { regex: /color:\s*['"]#333['"]/gi, replace: 'color: "#1e293b"' },
    { regex: /color:\s*['"]#000['"]/gi, replace: 'color: "#0f172a"' },
    
    // Corners
    { regex: /rounded-\[4px\]/g, replace: 'rounded-md' },
    { regex: /rounded-\[5px\]/g, replace: 'rounded-md' },
    { regex: /rounded-\[10px\]/g, replace: 'rounded-lg' },
];

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            replacements.forEach(({ regex, replace }) => {
                content = content.replace(regex, replace);
            });
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
}

walk(srcDir);
console.log("Done.");
