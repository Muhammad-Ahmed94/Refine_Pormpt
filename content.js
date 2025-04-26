// content.js - Prompt Optimizer UI and API logic

// Utility: Approximate token count using GPT-3 encoding (rough estimate)
function estimateTokenCount(text) {
  // 1 token ≈ 4 chars in English for GPT-3/4, rough estimate
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

// Create slide-in UI
function createPromptOptimizerUI() {
  if (document.querySelector('.prompt-optimizer-popup')) return;
  const container = document.createElement('div');
  container.className = 'prompt-optimizer-popup';
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <label for="promptOptimizerInput">Original Prompt</label>
      <textarea id="promptOptimizerInput" rows="3" style="resize:vertical"></textarea>
      <button id="promptOptimizerBtn" class="prompt-optimizer-btn">Optimize Prompt</button>
      <div id="promptOptimizerLoading" class="prompt-optimizer-loading" style="display:none">Optimizing...</div>
      <label for="promptOptimizerOutput">Optimized Prompt</label>
      <textarea id="promptOptimizerOutput" rows="3" readonly style="resize:vertical"></textarea>
      <button id="promptOptimizerCopy" class="prompt-optimizer-btn">Copy</button>
      <div id="promptOptimizerStats" class="prompt-optimizer-stats"></div>
    </div>
  `;
  document.body.appendChild(container);
  const inputField = container.querySelector('#promptOptimizerInput');
  const outputField = container.querySelector('#promptOptimizerOutput');
  const statsField = container.querySelector('#promptOptimizerStats');
  const loadingIndicator = container.querySelector('#promptOptimizerLoading');
  container.querySelector('#promptOptimizerBtn').addEventListener('click', async () => {
    const input = inputField.value.trim();
    if (!input) return;
    loadingIndicator.style.display = 'block';
    outputField.value = '';
    statsField.innerHTML = '';
    const optimized = await optimizePrompt(input);
    outputField.value = optimized;
    loadingIndicator.style.display = 'none';
    // Token stats
    const inputTokens = estimateTokenCount(input);
    const outputTokens = estimateTokenCount(optimized);
    const saved = inputTokens - outputTokens;
    const percent = inputTokens > 0 ? Math.round((saved / inputTokens) * 100) : 0;
    statsField.innerHTML = `<b>Input tokens:</b> ${inputTokens} &nbsp; <b>Output tokens:</b> ${outputTokens} &nbsp; <b>Saved:</b> ${saved} (${percent}%)`;
  });
  container.querySelector('#promptOptimizerCopy').addEventListener('click', () => {
    const text = outputField.value;
    if (text) navigator.clipboard.writeText(text);
  });
}

// Call Gemini API
async function optimizePrompt(promptText) {
  try {
    // Use Gemini 1.5 Pro endpoint and payload
    const endpoint = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=AIzaSyBtiAebvNrd6Ry0cw17nlwJ81noLNfQ_1w";
    const payload = {
      contents: [
        { role: "user", parts: [ { text: `Shorten and optimize this prompt but dont give answer only shorten it, preserve meaning, reduce tokens: ${promptText}` } ] }
      ]
    };
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('API error', data);
      return `Error optimizing prompt: ${data.error?.message || res.statusText}`;
    }
    // Extract model response
    const candidate = data.candidates && data.candidates[0];
    const text = candidate?.content?.parts?.map(p => p.text).join(' ') || JSON.stringify(data);
    return text;
  } catch (e) {
    console.error('Optimizer error', e);
    return 'Error optimizing prompt';
  }
}

// Listen for background message
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.action === 'open_prompt_optimizer') {
    createPromptOptimizerUI();
  }
});
