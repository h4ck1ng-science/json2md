# JSON to Markdown Converter

A single-page static web application that converts JSON objects into Markdown formatted text.

## Features
- **Vintage "Hacker" Aesthetic**: Dark mode, neon green text, and scanlines.
- **Two-Column Layout**: JSON input on the left, real-time Markdown output on the right.
- **Interactive Toolbars**: Controls to download JSON/MD, generate Table of Contents, and manage header levels.
- **Smart Tooltips**: Helpful guides that appear below buttons in a retro style.
- **Recursive Conversion**: Automatically turns keys into headers and values into content.
- **Privacy Focused**: Client-side only; no data leaves your browser.
- **Customizable**: Override document titles and demote header structures on the fly.

## How to Run Locally

You can simply open the `index.html` file in your browser, or serve it using a local server for the best experience.

### Using Python
If you have Python installed, you can easily start a local server:

1. Open your terminal/command prompt.
2. Navigate to the project directory:
   ```bash
   cd json2md.github.io
   ```
3. Run the HTTP server command:
   ```bash
   python -m http.server
   ```
4. Open your browser and go to `http://localhost:8000`.

### Other Methods
- **Node.js**: `npx serve`
- **VS Code**: Use the "Live Server" extension.

## TODO

- [ ] Add support for drag and drop
- [ ] Add support for loading JSON files
- [ ] Responsive design 