// background.js - service worker for Prompt Optimizer

chrome.action.onClicked.addListener((tab) => {
  const url = tab.url || "";
  const SUPPORTED_HOSTS = [
    "chat.openai.com",
    "google.gemini.com",
    "claude.ai"
  ];
  if (SUPPORTED_HOSTS.some(host => url.includes(host))) {
    // Send message to content script to open optimizer UI
    chrome.tabs.sendMessage(tab.id, { action: "open_prompt_optimizer" });
  } else {
    console.warn('Prompt Optimizer: Unsupported host -', url);
  }
});
