# Copilot Instructions for limitless-browser-ai

## Repository Summary

This repository contains **HARPA AI** (version 11.4.0), a Chrome browser extension that provides AI automation capabilities. The extension is a ChatGPT/Claude copilot that works on any website, enabling users to automate tasks, search, summarize, translate, and write content using AI. The repository contains pre-built, production-ready code with minified JavaScript files.

**IMPORTANT: This is a pre-built extension with NO build process, NO tests, and NO linting. All JavaScript files are minified and production-ready.**

## High-Level Repository Information

- **Repository Size**: ~21MB
- **Project Type**: Chrome Manifest V3 Browser Extension
- **Primary Language**: JavaScript (minified)
- **Framework**: Vanilla JavaScript with custom architecture
- **Key Technologies**:
  - Chrome Extension APIs (Manifest V3)
  - Content Scripts, Background Service Worker, Offscreen documents
  - Monaco Editor (VS Code editor component) in `/vs` directory
  - PDF.js, XLSX parsing, Mammoth (document processing)
  - GPT Tokenizer
- **Target Runtime**: Chrome/Chromium browsers (version supporting Manifest V3)
- **Localization**: 33 languages supported in `/_locales` directory

## Architecture Overview

The extension uses a multi-component architecture:

### Core Components

1. **Background Service Worker** (`bg.js` - 1.5MB)
   - Main background process handling extension logic
   - Service worker for Manifest V3

2. **Content Scripts**
   - `cs.js` (44KB) - Injected into all web pages (`*://*/*`)
   - `cs-openai.js` (5KB) - Specific to OpenAI domains
   - `cs-web.js` (5KB) - Specific to harpa.ai domains
   - Runs at `document_start` for all frames

3. **Page Scripts** (Injected into page context)
   - `nj.js` (12KB) - Main injection script
   - `nj-engine.js` (127KB) - Engine components
   - `nj-youtube.js` (7KB) - YouTube-specific functionality
   - `nj-chatgpt.js` (37KB) - ChatGPT integration

4. **Popup/Panel UI**
   - `harpa.html` - Main extension UI
   - `pp.js` (1.8MB) - Popup/panel logic
   - `pp-libs.js` (765KB) - UI libraries
   - `pp.css` (251KB), `tw.css` (31KB) - Styling

5. **Offscreen Documents**
   - `offscreen.html`, `os.js` (35KB) - Offscreen API functionality

6. **Other Scripts**
   - `oi.js` (24KB) - Integration script for harpa.ai/oi
   - `gpt-tokenizer.js` (3MB) - GPT tokenization library

## Identity Management & Authentication

**Location**: Authentication and user management are handled in the minified `bg.js` background service worker.

**Related URLs** (from manifest.json):
- Login page: `https://harpa.ai/login` (blacklisted in shortcuts - see `cs.js`)
- App dashboard: `https://app.harpa.ai/` or `https://harpa.ai/app`
- Welcome page: `https://welcome.harpa.ai/` or `https://harpa.ai/welcome`
- Integration endpoint: `https://harpa.ai/oi`

**Storage**: Uses Chrome's `storage` permission to persist user data and authentication state.

**Key Files**:
- `bg.js` - Contains authentication logic (minified)
- `cs-web.js` - Content script for harpa.ai domains
- `oi.js` - OAuth/integration script

## Pricing Tiers & Limitations

**Payment Integration**: FastSpring payment processor

**Configuration Locations**:
- `manifest.json` - Defines FastSpring domains:
  - `https://harpaai.onfastspring.com/*` (production)
  - `https://harpaai.test.onfastspring.com/*` (testing)
- `css/fastspring.css` - Custom styling for payment UI
- `bg.js` - Contains pricing logic and feature-gating (minified)

**Feature Configuration**:
- `commands/command-suggestions.yaml` (15.6KB) - Command mappings for different contexts
- `tasks/predefined-tasks.json` (11KB) - Pre-configured watcher tasks
- `recipes/*.recipe` - Watcher recipe definitions (5 files)

**Quotas & Limits**: Implemented in the minified background script (`bg.js`). Pricing tier features are enforced through the background service worker logic.

## Build, Test & Validation

### NO BUILD PROCESS

**This repository contains pre-built, production-ready code. There is NO compilation, bundling, or build step required.**

### Installation & Loading

To load this extension in Chrome for development:

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the repository root directory (`/home/runner/work/limitless-browser-ai/limitless-browser-ai`)
5. The extension will load with manifest.json as the entry point

### NO TESTS

**This repository has NO test files, test runners, or testing infrastructure.**

### NO LINTING

**This repository has NO linting configuration, ESLint, Prettier, or code style enforcement.**

### Validation Steps

Since there are no automated tests, validate changes manually:

1. **Load the extension** in Chrome as described above
2. **Check for errors** in `chrome://extensions/` - look for red error badges
3. **Open DevTools** for different contexts:
   - Background: Click "service worker" link in extension details
   - Popup: Right-click extension icon → "Inspect popup"
   - Content script: Inspect any web page (F12)
4. **Test functionality** by:
   - Opening the extension on various websites
   - Triggering AI commands
   - Checking keyboard shortcuts work
   - Verifying watcher tasks can be created
5. **Check Console** for JavaScript errors in all contexts
6. **Verify permissions** work (storage, tabs, notifications, etc.)

### Making Changes

When modifying this extension:

1. **Edit the minified files directly** - there are no source files
2. **Reload the extension** after each change:
   - Go to `chrome://extensions/`
   - Click the reload icon for this extension
3. **Test in browser** - no automated testing available
4. **Check all contexts** where your changes may impact (background, content scripts, page scripts)

### Key Constraints

- **Cannot run npm install** - no package.json exists
- **Cannot run build commands** - no build system
- **Cannot run tests** - no test infrastructure
- **Cannot lint** - no linting tools configured
- **All files are production-ready** - edit carefully

## Project Layout & File Structure

### Root Directory Files

```
/
├── manifest.json          # Extension manifest (Manifest V3)
├── LICENSE                # Unlicense (public domain)
├── README.md              # Minimal readme ("IYKYK")
├── .rc                    # Mach-O binary (purpose unclear, not executable in Linux)
├── bg.js                  # Background service worker (1.5MB, minified)
├── cs.js                  # Main content script (44KB)
├── cs-openai.js           # OpenAI content script (5KB)
├── cs-web.js              # HARPA.ai content script (5KB)
├── nj.js                  # Injected page script (12KB)
├── nj-engine.js           # Engine injection (127KB)
├── nj-engine.css          # Engine styles (718 bytes)
├── nj-youtube.js          # YouTube integration (7KB)
├── nj-chatgpt.js          # ChatGPT integration (37KB)
├── oi.js                  # Integration script (24KB)
├── os.js                  # Offscreen script (35KB)
├── pp.js                  # Popup/panel script (1.8MB, minified)
├── pp-libs.js             # Popup libraries (765KB)
├── pp.css                 # Popup styles (251KB)
├── tw.css                 # Tailwind CSS (31KB)
├── gpt-tokenizer.js       # GPT tokenizer (3MB)
├── harpa.html             # Main extension UI
├── host.html              # Host page (161 bytes)
└── offscreen.html         # Offscreen document (143 bytes)
```

### Directories

```
/_locales/                 # 33 language translations
  ├── en/messages.json     # English translations
  └── [32 other locales]   # Other language files

/_metadata/                # Extension metadata
  └── verified_contents.json

/commands/                 # Command configuration
  └── command-suggestions.yaml  # Context-aware command mappings (15.6KB)

/css/                      # Additional stylesheets
  ├── fastspring.css       # Payment page styling
  └── harpa.css            # HARPA.ai specific styles

/img/                      # Images and icons
  ├── badges/              # Extension badges
  ├── commands/            # Command icons (SVG)
  ├── icons/               # Extension icons (128px, 500px)
  ├── misc/                # Miscellaneous images
  └── notifications/       # Notification images

/js/                       # Third-party libraries (2.2MB)
  ├── host.min.js          # Host script
  ├── mammoth.browser.min.js  # DOCX parser (636KB)
  ├── pdf.min.js           # PDF.js (286KB)
  ├── pdf.worker.min.js    # PDF.js worker (1MB)
  ├── timer-worker.min.js  # Timer worker
  └── xlsx.mini.min.js     # Excel parser (280KB)

/recipes/                  # Watcher recipes (24KB)
  ├── watcher.monitor-changes.recipe
  ├── watcher.monitor-element.recipe
  ├── watcher.monitor-health.recipe
  ├── watcher.monitor-price.recipe
  └── watcher.run-command.recipe

/tasks/                    # Task definitions
  └── predefined-tasks.json  # Pre-configured tasks (11KB)

/vs/                       # Monaco Editor (VS Code editor)
  ├── base/                # Base functionality
  ├── basic-languages/     # Language definitions
  ├── editor/              # Editor core
  ├── language/            # Language services
  └── loader.js            # Module loader
```

### Key Configuration Files

- **manifest.json**: Extension configuration, permissions, content script injection rules
- **commands/command-suggestions.yaml**: Context-aware AI command mappings for different websites
- **tasks/predefined-tasks.json**: Example watcher tasks (health monitoring, price tracking)
- **recipes/*.recipe**: Watcher automation templates

### Permissions (from manifest.json)

```json
{
  "permissions": [
    "alarms", "background", "browsingData", "cookies",
    "declarativeNetRequest", "notifications", "tabs",
    "storage", "offscreen", "scripting",
    "contextMenus", "sidePanel"
  ],
  "host_permissions": ["*://*/*"]
}
```

## Development Workflow

### No CI/CD Pipeline

**This repository has NO GitHub Actions, CI/CD pipelines, or automated checks.**

### No Pre-commit Hooks

**This repository has NO pre-commit hooks, git hooks, or automated validation.**

### Making Code Changes

1. **Locate the right file**:
   - Background logic → `bg.js`
   - Content script behavior → `cs.js`, `cs-openai.js`, or `cs-web.js`
   - Injected page behavior → `nj*.js` files
   - UI/Popup → `pp.js`, `pp.css`, `harpa.html`
   - Commands → `commands/command-suggestions.yaml`
   - Watchers → `tasks/predefined-tasks.json` or `recipes/*.recipe`

2. **Edit the minified file** - Be extremely careful as files are minified

3. **Reload extension** at `chrome://extensions/`

4. **Test manually** in browser

5. **Check console** for errors in all relevant contexts

### Common Pitfall Areas

- **Minified code**: Easy to break syntax when editing
- **Multiple contexts**: Changes may affect background, content scripts, AND page scripts
- **No error recovery**: No build system to catch syntax errors before runtime
- **Extension permissions**: Changes requiring new permissions need manifest.json updates
- **Content Security Policy**: Strict CSP in manifest limits inline scripts

## Dependencies & External Services

### External Domains Used

- `harpa.ai` - Main service domain
- `app.harpa.ai` - Application dashboard  
- `welcome.harpa.ai` - Onboarding
- `harpaai.onfastspring.com` - Payment processing (production)
- `harpaai.test.onfastspring.com` - Payment processing (test)
- `*.openai.com` - ChatGPT integration
- `youtube.com` - YouTube integration
- `fonts.googleapis.com`, `fonts.gstatic.com` - Google Fonts
- `cdn.jsdelivr.net` - KaTeX CDN

### Embedded Libraries (in /js/)

- PDF.js - PDF rendering
- XLSX parser - Excel file processing
- Mammoth - DOCX file processing
- GPT Tokenizer - Token counting
- Monaco Editor (in /vs/) - Code/text editor

### No Package Manager

**This repository has NO package.json, package-lock.json, yarn.lock, or pnpm-lock.yaml.**

**There are NO npm, yarn, or pnpm commands to run.**

## Important Notes for Coding Agents

### Trust These Instructions

**CRITICAL**: Since this repository has no build system, tests, or linting:

1. **DO NOT search for package.json** - it doesn't exist
2. **DO NOT try to run npm/yarn commands** - not applicable
3. **DO NOT look for test files** - none exist
4. **DO NOT try to run linters** - not configured
5. **DO NOT search for build scripts** - there are none

### Making Safe Changes

1. **Be extremely careful** when editing minified files - one syntax error breaks everything
2. **Test thoroughly in Chrome** after every change
3. **Check all console logs** in all extension contexts (background, content script, page)
4. **Validate permissions** if you modify manifest.json
5. **Reload the extension** after EVERY file change

### What You CAN Do

- Edit JavaScript files (carefully, they're minified)
- Modify CSS files
- Update HTML files
- Change YAML/JSON configuration files
- Add new images or assets
- Update translations in _locales/
- Modify manifest.json (carefully - affects permissions)

### What You CANNOT Do

- Run a build process (none exists)
- Run automated tests (none exist)
- Run linters (none configured)
- Install dependencies (no package manager)
- Compile TypeScript (all files are plain JS)
- Bundle files (already bundled/minified)

### Red Flags to Avoid

If you find yourself:
- Searching for webpack.config.js
- Looking for tsconfig.json  
- Trying to run npm install
- Searching for .eslintrc
- Looking for jest.config.js
- Trying to find src/ directory

**STOP** - None of these exist in this repository. Re-read these instructions.

### Critical Success Factors

1. **Understand the architecture** - Multi-context extension (background, content scripts, page scripts)
2. **Know your context** - Which file runs in which context
3. **Test manually** - Only way to validate changes
4. **Reload thoroughly** - Extension must be reloaded after changes
5. **Check all consoles** - Errors may appear in different DevTools contexts
6. **Respect minification** - Code is production-ready but fragile to edit

## Quick Reference

### File Purposes

| File | Purpose | Context |
|------|---------|---------|
| bg.js | Background logic, auth, pricing | Service Worker |
| cs.js | Main content script | All pages |
| cs-openai.js | OpenAI integration | OpenAI domains |
| cs-web.js | HARPA web integration | harpa.ai domains |
| nj.js | Injected page script | Page context |
| nj-engine.js | Engine injection | Page context |
| nj-youtube.js | YouTube features | YouTube pages |
| nj-chatgpt.js | ChatGPT integration | ChatGPT pages |
| pp.js | Popup/sidebar UI | Extension popup |
| oi.js | OAuth integration | harpa.ai/oi |
| os.js | Offscreen document | Offscreen context |

### Common Tasks

**Add a new command**: Edit `commands/command-suggestions.yaml`

**Add a watcher task**: Edit `tasks/predefined-tasks.json`

**Add a recipe**: Create new file in `recipes/`

**Change UI**: Edit `pp.js`, `pp.css`, or `harpa.html`

**Add translation**: Edit files in `_locales/[locale]/messages.json`

**Change permissions**: Edit `manifest.json` (requires extension reload)

**Style payment page**: Edit `css/fastspring.css`

## Summary

This is a **production-ready Chrome extension** with **NO build, test, or lint infrastructure**. All code is minified and ready to load directly into Chrome. Focus on careful manual testing and validation. Trust these instructions - if you're searching for build tools, you're on the wrong path.
