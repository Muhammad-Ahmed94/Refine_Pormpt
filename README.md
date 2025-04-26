# PromptRefine

PromptRefine is a professional Chrome extension designed to help users optimize, shorten, and clarify prompts for Large Language Models (LLMs) such as Gemini, ChatGPT, and Claude (currently working for Claude only).
PromptRefine rewrites verbose or unclear prompts into concise, token-efficient instructions, helping you get better results while saving on token usage.

---

## Features

- **One-Click Optimization:** Instantly rewrite prompts to be shorter, clearer, and more effective.
- **Token Savings:** See input/output token counts and how many tokens you save with each optimization.
- **Seamless Integration:** Works on major LLM platforms, including ChatGPT, Gemini, and Claude (Current version supports Claude only).
- **Privacy First:** No prompt data is stored or sent anywhere except directly to the Gemini API.

---

## Installation

1. **Clone or Download** this repository.
2. Open `chrome://extensions` in your Chrome browser.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project directory.
5. The PromptRefine icon will appear in your Chrome toolbar.

---

## Usage

1. Navigate to [Claude](https://claude.ai).
2. Click the PromptRefine extension icon.
3. Enter your prompt in the popup window.
4. Click **Optimize Prompt**.
5. View the optimized prompt and token savings. Copy the result with one click and use it for original task.

---

## Configuration (for developer mode only)

- The extension requires a valid Gemini API key.
- Get your key from [Api key](https://aistudio.google.com/).
  Set your API key in the `env.js` file:
  ```js
  var GEMINI_API_KEY = "YOUR_API_KEY_HERE";
