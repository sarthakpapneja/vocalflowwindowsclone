# VocalFlow for Windows

A lightweight Windows desktop app that lets you dictate into any text field using a hold-to-record hotkey. This is a Windows-compatible clone of the original macOS [VocalFlow](https://github.com/Vocallabsai/vocalflow).

## Features

- **Hold-to-record hotkey**: Configurable global hotkey (Default: Right/Left Option).
- **Real-time streaming ASR**: Powered by Deepgram's WebSocket API.
- **Post-processing**: Optional text cleaning via Groq LLM (Llama-3).
- **Balance Tracking**: Real-time display of Deepgram and Grok/Groq balances.
- **Text Injection**: Automatically pastes transcribed text at your cursor.
- **Premium UI**: Modern glassmorphic design for Windows.

## Project Structure

```
vocalflow-windows/
├── src/
│   ├── main.js           # Electron main process
│   ├── renderer/         # UI (HTML/CSS/JS)
│   ├── services/         # Deepgram & Groq handlers
│   ├── utils/            # Audio, Hotkeys, Text Injection
│   └── services.test.js  # Service tests
├── config.json           # API Keys (Hardcoded)
├── package.json          # Dependencies
└── README.md
```

## Setup & Installation

### 1. Prerequisites
- **Node.js**: [Download and install](https://nodejs.org/) (LTS recommended).
- **Sox or FFmpeg**: Required for audio recording (`node-record-lpcm16`).
  - Install via [Chocolatey](https://chocolatey.org/): `choco install sox` or `choco install ffmpeg`.

### 2. Configuration
Open `config.json` and fill in your API keys:
```json
{
  "DEEPGRAM_API_KEY": "your_key_here",
  "GROQ_API_KEY": "your_key_here",
  "DEEPGRAM_PROJECT_ID": "your_project_id_here"
}
```

### 3. Installation
Navigate to the project directory and install dependencies:
```bash
npm install
```
*Note: Some modules (robotjs, node-global-key-listener) are native and will be compiled during installation.*

### 4. Running the App
```bash
npm start
```

### 5. Running Tests
```bash
npm test
```

## How to use
1. Launch the app.
2. Hold the **Option** key (Alt) on your keyboard.
3. Speak clearly.
4. Release the key — the text will be automatically pasted into your active application.


