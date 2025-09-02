# Live Code Reviewer

A React-based, in-browser HTML/CSS/JS playground with instant preview, built for fair online assessments and coding competitions. It uses Monaco Editor (VS Code’s editor) for a rich coding experience, Tailwind CSS for styling, and ships with anti-cheat measures to discourage quick copy/paste or DevTools access. Hosted live for zero‑install use.

Live demo: https://hs-live-editor.vercel.app

## Features
- HTML, CSS, JS editors with real-time iframe preview
- Monaco Editor: syntax highlighting, autocomplete, VS Code feel
- Tailwind UI: clean, responsive layout
- Anti-cheat protections:
  - Blocks copy, paste, cut (Ctrl/Cmd+C/V/X)
  - Disables right-click context menu
  - Intercepts DevTools

## Tech Stack
- React + @monaco-editor/react
- Tailwind CSS
- Deployed as a static site (Vercel)

## Quick Start
- Requirements: Node.js (LTS)
- Install: npm install
- Dev: npm run dev (Vite)

## How it works
- Editors sync to React state; changes are debounced and rendered into an isolated iframe.
- Global listeners block clipboard actions, right-click, and common DevTools shortcuts.
