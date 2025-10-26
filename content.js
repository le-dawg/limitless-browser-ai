// Content script for Limitless Browser AI
// This script runs in the context of web pages

console.log('Limitless Browser AI content script loaded on:', window.location.href);

// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script received message:', request);
  
  if (request.action === 'analyzePage') {
    const pageData = analyzeCurrentPage();
    sendResponse({ success: true, data: pageData });
  }
  
  return true;
});

// Function to analyze the current page
function analyzeCurrentPage() {
  const pageInfo = {
    title: document.title,
    url: window.location.href,
    textContent: document.body.innerText.substring(0, 1000), // First 1000 chars
    links: Array.from(document.querySelectorAll('a')).length,
    images: Array.from(document.querySelectorAll('img')).length,
    headings: {
      h1: document.querySelectorAll('h1').length,
      h2: document.querySelectorAll('h2').length,
      h3: document.querySelectorAll('h3').length
    }
  };
  
  console.log('Page analysis:', pageInfo);
  return pageInfo;
}

// Check if extension is enabled
chrome.storage.sync.get(['enabled'], (result) => {
  if (result.enabled !== false) {
    console.log('Extension is enabled on this page');
    // Initialize any page-specific features here
  }
});

// Example: Add a visual indicator that the extension is active (optional)
function showExtensionActive() {
  const indicator = document.createElement('div');
  indicator.id = 'limitless-ai-indicator';
  indicator.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    z-index: 999999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    opacity: 0;
    transition: opacity 0.3s;
  `;
  indicator.textContent = '🤖 Limitless AI Active';
  document.body.appendChild(indicator);
  
  // Fade in
  setTimeout(() => indicator.style.opacity = '1', 100);
  
  // Fade out after 3 seconds
  setTimeout(() => {
    indicator.style.opacity = '0';
    setTimeout(() => indicator.remove(), 300);
  }, 3000);
}

// Uncomment to show indicator on page load
// showExtensionActive();
