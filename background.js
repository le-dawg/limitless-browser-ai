// Background service worker for Limitless Browser AI
// This script runs in the background and handles extension lifecycle events

console.log('Limitless Browser AI background service worker started');

// Listen for extension installation or update
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed/updated:', details.reason);
  
  if (details.reason === 'install') {
    console.log('First time installation');
    // Initialize default settings
    chrome.storage.sync.set({
      enabled: true,
      settings: {}
    });
  } else if (details.reason === 'update') {
    console.log('Extension updated to version:', chrome.runtime.getManifest().version);
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  
  // Handle different message types
  if (request.action === 'processPage') {
    // Forward to content script in the specified tab
    chrome.tabs.sendMessage(
      request.tabId,
      { action: 'analyzePage' },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message to content script:', chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          sendResponse(response);
        }
      }
    );
    return true; // Keep the message channel open for async response
  }
  
  return true; // Keep the message channel open for async response
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('Tab updated:', tab.url);
  }
});
