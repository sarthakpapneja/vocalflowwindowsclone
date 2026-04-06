const recorder = require('node-record-lpcm16');

class AudioRecorder {
    constructor() {
        this.recording = null;
    }

    start(onData) {
        console.log('Starting audio recording with sox...');
        this.recording = recorder.record({
            sampleRate: 16000,
            channels: 1,
            recorder: 'sox',
            device: null
        });

        this.recording.stream().on('data', (data) => {
            // console.log('Audio data received');
            onData(data);
        });

        this.recording.stream().on('error', (err) => {
            console.error('Audio recording stream error:', err);
        });
    }

    stop() {
        if (this.recording) {
            this.recording.stop();
            this.recording = null;
        }
    }
}

module.exports = AudioRecorder;
