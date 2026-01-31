const jsonInput = document.getElementById('json-input');
const markdownOutput = document.getElementById('markdown-output');
const filenameInput = document.getElementById('filename-input');
const titleOverrideInput = document.getElementById('title-override');
const demoteBtn = document.getElementById('demote-headers');
const downloadJsonBtn = document.getElementById('download-json');
const downloadMdBtn = document.getElementById('download-md');
const addTocBtn = document.getElementById('add-toc');
const loadExampleBtn = document.getElementById('load-example');
const footerDate = document.getElementById('footer-date');
const toggleJsonBtn = document.getElementById('toggle-json');
const toggleMarkdownBtn = document.getElementById('toggle-markdown');
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');

const CAT_EXAMPLE = {
    "Title": "The Cyber-Cat manual",
    "Author": "JSON-Chan",
    "Description": "A guide to the most advanced cybernetic felines.",
    "Cats": [
        {
            "Name": "Neon-Whisker",
            "Type": "Synth-Kitten",
            "Abilities": ["Night Vision", "Laser Chase", "WiFi Hacking"],
            "Stats": {
                "Agility": 9000,
                "Cuteness": "Overloaded"
            }
        },
        {
            "Name": "Glitch-Paw",
            "Type": "Phantom-Tabby",
            "Abilities": ["Wall Phasing", "Data Corruption", "Purr.exe"],
            "Stats": {
                "Agility": 7500,
                "Confusion": 100
            }
        }
    ],
    "Care Instructions": "# Do not expose to water.\n# Feed high-quality electrons only.\n# Pet vigorously."
};

// Set Footer Date
if (footerDate) {
    footerDate.innerText = new Date().toLocaleDateString();
}

// Mobile Panel Toggle Logic
if (toggleJsonBtn && toggleMarkdownBtn && leftPanel && rightPanel) {
    // Set initial state: JSON panel active on mobile
    leftPanel.classList.add('active');
    toggleJsonBtn.classList.add('active');
    
    toggleJsonBtn.addEventListener('click', () => {
        // Activate JSON panel
        leftPanel.classList.add('active');
        rightPanel.classList.remove('active');
        
        // Update button states
        toggleJsonBtn.classList.add('active');
        toggleJsonBtn.setAttribute('aria-pressed', 'true');
        toggleJsonBtn.setAttribute('data-tooltip', 'Currently viewing JSON Panel');
        toggleJsonBtn.setAttribute('aria-label', 'JSON INPUT - Currently viewing JSON Panel');
        toggleMarkdownBtn.classList.remove('active');
        toggleMarkdownBtn.setAttribute('aria-pressed', 'false');
        toggleMarkdownBtn.setAttribute('data-tooltip', 'Show Markdown Panel');
        toggleMarkdownBtn.setAttribute('aria-label', 'MARKDOWN OUTPUT - Show Markdown Panel');
    });
    
    toggleMarkdownBtn.addEventListener('click', () => {
        // Activate Markdown panel
        rightPanel.classList.add('active');
        leftPanel.classList.remove('active');
        
        // Update button states
        toggleMarkdownBtn.classList.add('active');
        toggleMarkdownBtn.setAttribute('aria-pressed', 'true');
        toggleMarkdownBtn.setAttribute('data-tooltip', 'Currently viewing Markdown Panel');
        toggleMarkdownBtn.setAttribute('aria-label', 'MARKDOWN OUTPUT - Currently viewing Markdown Panel');
        toggleJsonBtn.classList.remove('active');
        toggleJsonBtn.setAttribute('aria-pressed', 'false');
        toggleJsonBtn.setAttribute('data-tooltip', 'Show JSON Panel');
        toggleJsonBtn.setAttribute('aria-label', 'JSON INPUT - Show JSON Panel');
    });
}

// ASCII Assistant Logic
const assistant = document.getElementById('ascii-assistant');
const dismissBtn = document.getElementById('dismiss-assistant');
const easterEggBtn = document.getElementById('easter-egg');

if (assistant && dismissBtn) {
    const showAssistant = () => {
        assistant.style.display = 'flex'; // Changed to flex for centering
        assistant.style.opacity = '1';
    };

    const hideAssistant = () => {
        assistant.style.transition = 'opacity 0.5s ease-out';
        assistant.style.opacity = '0';
        setTimeout(() => {
            assistant.style.display = 'none';
        }, 500);
        localStorage.setItem('seen_intro', 'true');
    };

    // Check localStorage on load
    if (!localStorage.getItem('seen_intro')) {
        showAssistant();
        // Auto hide after 15 seconds (increased time for reading)
        setTimeout(() => {
            if (assistant.style.display !== 'none') {
                hideAssistant();
            }
        }, 15000);
    }

    dismissBtn.addEventListener('click', hideAssistant);

    // Easter Egg Trigger
    if (easterEggBtn) {
        easterEggBtn.addEventListener('click', () => {
            // Reset state and show
            showAssistant();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && assistant.style.display !== 'none') {
            hideAssistant();
        }
    });
}

let shouldDemoteHeaders = false;

// Event Listeners
jsonInput.addEventListener('input', processJson);
filenameInput.addEventListener('input', () => { /* Optional: Validate filename? */ });
titleOverrideInput.addEventListener('input', () => { processJson(); });

demoteBtn.addEventListener('click', () => {
    shouldDemoteHeaders = !shouldDemoteHeaders;
    demoteBtn.innerText = `Demote Headers: ${shouldDemoteHeaders ? 'ON' : 'OFF'}`;
    processJson();
});

addTocBtn.addEventListener('click', () => {
    processJson(true);
});


downloadJsonBtn.addEventListener('click', () => {
    downloadFile(getFilename() + ".json", jsonInput.value, 'application/json');
});

downloadMdBtn.addEventListener('click', () => {
    downloadFile(getFilename() + ".md", markdownOutput.innerText, 'text/markdown');
});

loadExampleBtn.addEventListener('click', () => {
    jsonInput.value = JSON.stringify(CAT_EXAMPLE, null, 4);
    processJson();
});

// Drag and Drop Logic
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    jsonInput.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    jsonInput.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    jsonInput.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    jsonInput.classList.add('drag-active');
}

function unhighlight(e) {
    jsonInput.classList.remove('drag-active');
}

jsonInput.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
}

function handleFiles(files) {
    ([...files]).forEach(uploadFile);
}

function uploadFile(file) {
    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
        alert("Please drop a JSON file.");
        return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function () {
        jsonInput.value = reader.result;
        processJson();
    }
}

// Initial Placeholder Processing
// Initial Load
if (!jsonInput.value.trim()) {
    // Auto-load example for user delight
    jsonInput.value = JSON.stringify(CAT_EXAMPLE, null, 4);
}
processJson();

function getFilename() {
    const val = filenameInput.value.trim();
    if (val) return val;

    // Try to get from JSON
    try {
        const data = JSON.parse(jsonInput.value);
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            const keys = Object.keys(data);
            if (keys.length > 0) return keys[0];
        }
    } catch (e) { }

    return "converted";
}

function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function processJson(addToc = false) {
    const rawInput = jsonInput.value;
    if (!rawInput.trim()) {
        markdownOutput.innerText = "// Waiting for JSON data...";
        markdownOutput.classList.add("placeholder");
        markdownOutput.classList.remove("error");
        return;
    }

    try {
        const data = JSON.parse(rawInput);
        markdownOutput.classList.remove("placeholder", "error");
        markdownOutput.innerHTML = ""; // Clear for text/html

        // Start conversion
        let markdown = "";

        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                markdown += `--- Item ${index + 1} ---\n`;
                markdown += convertToMarkdown(item);
                markdown += "\n";
            });
        } else {
            markdown = convertToMarkdown(data);
        }

        if (addToc) {
            const toc = generateTOC(markdown);
            markdown = toc + "\n" + markdown;
        }

        // Title Override Logic
        const titleOverride = titleOverrideInput.value.trim();
        if (titleOverride) {
            // Replace the first H1/H2.. header found with the new title
            // Assumes user wants to replace the main title of the document.
            // We search for the first line starting with #
            markdown = markdown.replace(/^#+ .*/m, `# ${titleOverride}`);
        }

        // We use innerText for safety usually, but for error highlighting we used InnerHTML logic in plan
        // But the plan "Error Linting" section said:
        // Inject HTML into output: <span class="error-label">SYNTAX ERROR:</span> <span class="error-msg">{message}</span>
        // So we need to handle successful markdown as distinct from error HTML.

        markdownOutput.innerText = markdown;

    } catch (e) {
        // Error handling
        markdownOutput.innerHTML = `<span class="error-label">SYNTAX ERROR:</span> <span class="error-msg">${e.message}</span>`;
        markdownOutput.classList.add("error");
    }
}

function generateTOC(markdown) {
    const lines = markdown.split('\n');
    let toc = "# Table of Contents\n\n";
    lines.forEach(line => {
        if (line.startsWith('#')) {
            const level = line.match(/^#+/)[0].length;
            const text = line.replace(/^#+\s*/, '');
            const slug = text.toLowerCase().replace(/[^\w]+/g, '-');
            const indent = "  ".repeat(Math.max(0, level - 1));
            toc += `${indent}- [${text}](#${slug})\n`;
        }
    });
    return toc + "\n---\n";
}

function convertToMarkdown(data, depth = 1) {
    let output = "";

    if (data === null) return "null\n";
    if (data === undefined) return "";

    if (typeof data === 'object') {
        if (Array.isArray(data)) {
            data.forEach(item => {
                output += `- ${JSON.stringify(item)}\n`;
            });
            output += "\n";
        } else {
            for (const [key, value] of Object.entries(data)) {

                // Header demotion logic for string values if requested
                // "When dealing with jsons that contains markdown values, add a button to make their header subheader. calculating this from the header where they are."
                // Wait, the prompt said: "make their header subheader" (the value's header) "calculating this from the header where they are" (the key's level).
                // Example: Key is "Intro" (Level 1). Value is "# Hello". if demote is ON, value becomes "## Hello" (Level 1+1).

                const header = "#".repeat(depth);
                output += `${header} ${key}\n`;

                if (typeof value === 'object' && value !== null) {
                    if (Array.isArray(value) && value.length > 0 && typeof value[0] !== 'object') {
                        value.forEach(v => output += `- ${v}\n`);
                        output += "\n";
                    } else {
                        output += convertToMarkdown(value, depth + 1);
                    }
                } else {
                    let textValue = String(value);
                    if (shouldDemoteHeaders && typeof value === 'string') {
                        // Increase existing headers in the string by 'depth'
                        textValue = textValue.replace(/^(#+)/gm, (match) => {
                            return "#".repeat(depth) + match;
                        });
                    }
                    output += `${textValue}\n\n`;
                }
            }
        }
    } else {
        output += `${data}\n\n`;
    }

    return output;
}
