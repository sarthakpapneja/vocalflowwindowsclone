const { GlobalKeyboardListener } = require('node-global-key-listener');

class HotkeyManager {
    constructor(onHold, onRelease) {
        this.v = new GlobalKeyboardListener();
        this.isHeld = false;
        this.onHold = onHold;
        this.onRelease = onRelease;

        this.targetKeys = ['RIGHT OPTION', 'LEFT OPTION', 'RIGHT COMMAND', 'LEFT COMMAND'];
    }

    start() {
        this.v.addListener((e, down) => {
            console.log(`Key detected: ${e.name}, state: ${e.state}`);
            if (this.targetKeys.includes(e.name) || e.name.includes('ALT') || e.name.includes('OPTION')) {
                if (e.state === 'DOWN' && !this.isHeld) {
                    console.log('Hotkey HELD');
                    this.isHeld = true;
                    this.onHold();
                } else if (e.state === 'UP' && this.isHeld) {
                    console.log('Hotkey RELEASED');
                    this.isHeld = false;
                    this.onRelease();
                }
            }
        });
    }

    stop() {
        this.v.kill();
    }
}

module.exports = HotkeyManager;
