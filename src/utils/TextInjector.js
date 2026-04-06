const robot = require('robotjs');

class TextInjector {
    static async inject(text) {
        if (!text) return;

        try {
            // Dynamic import for ESM-only clipboardy
            const { default: clipboardy } = await import('clipboardy');
            
            // Copy to clipboard
            await clipboardy.write(text);

            // Simulate Ctrl+V (Windows/Linux) or Cmd+V (Mac)
            const modifier = process.platform === 'darwin' ? 'command' : 'control';
            
            // Short delay to allow window focus switch if necessary
            setTimeout(() => {
                robot.keyTap('v', modifier);
            }, 100);

        } catch (error) {
            console.error('Failed to inject text:', error);
        }
    }
}

module.exports = TextInjector;
