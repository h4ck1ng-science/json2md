# Development Notes (For Future Agents)

## Design Philosophy
The UI MUST maintain the **Vintage / Hacker** aesthetic.
- **Colors**: Strict adherence to `#0d0d0d` (background) and `#00ff41` (text).
- **Font**: Usage of 'VT323' or similar pixelated/monospace fonts is mandatory.
- **Atmosphere**: Keep the scanlines and CSS-only glow effects.

## Core Logic
The conversion logic in `script.js` is a simple recursive function:
- It handles Objects, Arrays, and Primitives.
- Depth is tracked to generate correct Header levels (`#`, `##`, etc.).
- **Caution**: Circular references are not currently handled.

## Implemented Features (v2)
- **Toolbars**: Added controls for downloading files, generating TOCs, and demoting headers.
- **Marquee Guide**: Interactive marquee with button explanations (styled like buttons).
- **Tooltips**: Custom CRT-styled tooltips positioned smartly below elements.
- **Error Linting**: Enhanced visual feedback (Red/White) for JSON errors.
- **Logic Enhancements**:
    - `generateTOC()`: Creates a linked Table of Contents.
    - `shouldDemoteHeaders`: Global toggle to shift header levels deeper.
    - `titleOverride`: Logic to replace the document root title.
- **Footer & Branding**: Dynamic footer with date and attribution links.
- **JSON-Chan Assistant** (Experimental):
    - Floating ASCII art overlay with usage instructions.
    - Logic for "First Visit" check using `localStorage`.
    - Auto-dismiss timer (15s) and manual dismiss button.
    - **Easter Egg**: Hidden button `( ^..^ )` in footer to recall the assistant.
    - **Keyboard Control**: ESC key functionality to close the assistant.
- **Input Enhancements**:
    - **Load Example Button**: Pre-fills input with a Cyber-Cat themed sample.
    - **Drag & Drop**: Native support for dragging `.json` files into the input area with visual feedback.

## Future Roadmap
- **Synchronized Scrolling**: Implementing locked scrolling between the JSON input and Markdown output panels.
- **Syntactic Analysis**: Deeper JSON validation beyond basic syntax errors.

