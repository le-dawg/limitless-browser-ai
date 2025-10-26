# Limitless Browser AI

AI-powered browser extension for limitless possibilities. IYKYK.

## 🚀 Features

- **AI-Powered Analysis**: Analyze web pages with advanced AI capabilities
- **Browser Integration**: Seamlessly integrates with Google Chrome
- **Content Analysis**: Extract and analyze page content, links, and structure
- **Customizable Settings**: Configure the extension to your needs

## 📦 Installation

### As an Unpacked Extension (Development Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/le-dawg/limitless-browser-ai.git
   cd limitless-browser-ai
   ```

2. Open Google Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" by toggling the switch in the top right corner

4. Click "Load unpacked" button

5. Select the `limitless-browser-ai` directory (the root directory containing `manifest.json`)

6. The extension should now be installed and visible in your Chrome toolbar!

## 🛠️ Development

### Project Structure

```
limitless-browser-ai/
├── manifest.json       # Extension manifest (required)
├── background.js       # Background service worker
├── popup.html          # Extension popup UI
├── popup.css           # Popup styling
├── popup.js            # Popup functionality
├── content.js          # Content script (runs on web pages)
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── .gitignore
├── LICENSE
└── README.md
```

### Making Changes

1. Make your changes to the extension files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Limitless Browser AI extension card
4. Test your changes

### Key Files

- **manifest.json**: Defines extension metadata, permissions, and resources
- **background.js**: Background service worker for handling events and long-running tasks
- **popup.html/css/js**: The UI that appears when clicking the extension icon
- **content.js**: Script that runs in the context of web pages

## 🎯 Usage

1. Click the extension icon in your Chrome toolbar to open the popup
2. Use the toggle to enable/disable the extension
3. Click "Analyze Current Page" to analyze the active tab
4. Check the console for detailed logs and analysis results

## 🔧 Permissions

This extension requires the following permissions:

- **activeTab**: Access the currently active tab
- **storage**: Store extension settings
- **scripting**: Execute scripts on web pages
- **host_permissions (<all_urls>)**: Access all websites for content analysis

## 📝 License

This is free and unencumbered software released into the public domain. See [LICENSE](LICENSE) for details.

## 🤝 Contributing

Feel free to fork, modify, and contribute! This project is open for everyone.
