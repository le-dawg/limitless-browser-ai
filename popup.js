// Popup script for Limitless Browser AI

// DOM elements
const enableToggle = document.getElementById('enableToggle');
const analyzeBtn = document.getElementById('analyzeBtn');
const settingsBtn = document.getElementById('settingsBtn');
const statusDiv = document.getElementById('status');

// Load saved settings
chrome.storage.sync.get(['enabled'], (result) => {
  enableToggle.checked = result.enabled !== false;
});

// Handle toggle change
enableToggle.addEventListener('change', () => {
  const enabled = enableToggle.checked;
  chrome.storage.sync.set({ enabled }, () => {
    updateStatus(enabled ? 'Extension enabled' : 'Extension disabled');
  });
});

// Handle analyze button click
analyzeBtn.addEventListener('click', async () => {
  updateStatus('Analyzing page...');
  
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Send message to background script
    chrome.runtime.sendMessage(
      { action: 'processPage', tabId: tab.id },
      (response) => {
        if (response && response.success) {
          updateStatus('Analysis complete!');
        } else {
          updateStatus('Analysis failed');
        }
      }
    );
  } catch (error) {
    console.error('Error analyzing page:', error);
    updateStatus('Error occurred');
  }
});

// Handle settings button click
settingsBtn.addEventListener('click', () => {
  updateStatus('Settings clicked (not implemented yet)');
  // TODO: Open settings page or modal
});

// Helper function to update status message
function updateStatus(message) {
  statusDiv.textContent = message;
  
  // Reset status after 3 seconds
  setTimeout(() => {
    statusDiv.textContent = 'Ready';
  }, 3000);
}

// Initialize
console.log('Limitless Browser AI popup loaded');
