const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const DeepgramService = require('./services/DeepgramService');
const GroqService = require('./services/GroqService');
const AudioRecorder = require('./utils/AudioRecorder');
const HotkeyManager = require('./utils/HotkeyManager');
const TextInjector = require('./utils/TextInjector');

// Load config
const configPath = path.join(__dirname, '../config.json');
let config = {};
if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

const deepgram = new DeepgramService(config);
const groq = new GroqService(config);
const recorder = new AudioRecorder();
let isRecording = false;
let accumulatedTranscript = "";

let mainWindow;

function startDictation() {
    isRecording = true;
    accumulatedTranscript = "";
    mainWindow.webContents.send('toggle-record', true);

    deepgram.connect('nova-3-general', 'en-US', (text, isFinal) => {
        if (isFinal) {
            accumulatedTranscript += (accumulatedTranscript ? " " : "") + text;
        }
        mainWindow.webContents.send('transcript-update', text, isFinal);
    });

    recorder.start((data) => {
        deepgram.sendAudio(data);
    });
}

async function stopDictation() {
    isRecording = false;
    recorder.stop();
    deepgram.close();
    mainWindow.webContents.send('toggle-record', false);

    // Post-process with Groq if needed
    let finalOutput = accumulatedTranscript;
    if (config.GROQ_API_KEY && finalOutput) {
        finalOutput = await groq.processText(
            finalOutput, 
            'llama-3-70b-8192', 
            "Clean up the following dictation. Fix grammar and spelling. Return ONLY the cleaned text."
        );
    }

    // Inject text
    await TextInjector.inject(finalOutput);
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: false,
        transparent: true,
        alwaysOnTop: true
    });

    mainWindow.loadFile('src/renderer/index.html');
}

app.whenReady().then(() => {
    createWindow();

    // Setup global hold-to-record
    const hotkeys = new HotkeyManager(
        () => startDictation(),
        () => stopDictation()
    );
    hotkeys.start();
});

ipcMain.handle('get-balances', async () => {
    const deepgramBalance = await deepgram.getBalance();
    const groqBalance = await groq.getBalance();
    return { deepgram: deepgramBalance, grok: groqBalance };
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
