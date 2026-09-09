const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
    // Colors
    { regex: /(text|bg|border)-\[\#000000[a-zA-Z0-9]*\]/gi, replace: '$1-slate-900' },
    { regex: /(text|bg|border)-\[\#000\]/gi, replace: '$1-slate-900' },
    { regex: /(text|bg|border)-\[\#1d1a1a\]/gi, replace: '$1-slate-900' },
    { regex: /(text|bg|border)-\[\#3d3a3a\]/gi, replace: '$1-slate-800' },
    { regex: /(text|bg|border)-\[\#3a120a\]/gi, replace: '$1-slate-900' },
    { regex: /(text|bg|border)-\[\#333\]/gi, replace: '$1-slate-800' },
    
    { regex: /(text|bg|border)-\[\#555\]/gi, replace: '$1-slate-600' },
    { regex: /(text|bg|border)-\[\#444\]/gi, replace: '$1-slate-700' },
    { regex: /(text|bg|border)-\[\#a7abb1\]/gi, replace: '$1-slate-400' },
    { regex: /(text|bg|border)-\[\#7d879c\]/gi, replace: '$1-slate-500' },
    { regex: /(text|bg|border)-\[\#c7b9b9\]/gi, replace: '$1-slate-300' },

    { regex: /(text|bg|border)-\[\#fff\]/gi, replace: '$1-white' },
    { regex: /(text|bg|border)-\[\#f5f6fb\]/gi, replace: '$1-slate-50' },
    { regex: /(text|bg|border)-\[\#f6f9fc\]/gi, replace: '$1-slate-50' },
    { regex: /(text|bg|border)-\[\#f8fafc\]/gi, replace: '$1-slate-50' },

    { regex: /(text|bg|border)-\[\#475ad2\]/gi, replace: '$1-indigo-600' },
    { regex: /(text|bg|border)-\[\#342ac8\]/gi, replace: '$1-indigo-600' },
    { regex: /(text|bg|border)-\[\#3321c8\]/gi, replace: '$1-indigo-600' },
    { regex: /(text|bg|border)-\[\#6443d1\]/gi, replace: '$1-indigo-500' },

    { regex: /(text|bg|border)-\[\#44a55e\]/gi, replace: '$1-emerald-500' },
    { regex: /(text|bg|border)-\[\#17dd1f\]/gi, replace: '$1-emerald-500' },
    { regex: /(text|bg|border)-\[\#3ad132\]/gi, replace: '$1-emerald-400' },
    { regex: /(text|bg|border)-\[\#68d284\]/gi, replace: '$1-emerald-400' },

    { regex: /(text|bg|border)-\[\#f6b100\]/gi, replace: '$1-amber-500' },
    { regex: /(text|bg|border)-\[\#f6ba00\]/gi, replace: '$1-amber-500' },
    { regex: /(text|bg|border)-\[\#ffbb38\]/gi, replace: '$1-amber-400' },

    { regex: /(text|bg|border)-\[\#e44343\]/gi, replace: '$1-rose-600' },

    // Shape & Layout refinements (to make it look noticeably better)
    { regex: /rounded-\[4px\]/g, replace: 'rounded-lg' },
    { regex: /rounded-\[5px\]/g, replace: 'rounded-lg' },
    { regex: /rounded-\[8px\]/g, replace: 'rounded-xl' },
    { regex: /rounded-\[10px\]/g, replace: 'rounded-2xl' },
    { regex: /shadow-sm/g, replace: 'shadow-md' },

    // A few specific component class improvements:
    // Make cards look better
    { regex: /bg-white rounded-lg mb-3/g, replace: 'bg-white rounded-2xl shadow-md mb-4 overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300' },
    { regex: /bg-white shadow-md rounded-lg/g, replace: 'bg-white shadow-lg rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300' },
    
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
