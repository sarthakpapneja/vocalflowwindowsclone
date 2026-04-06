const DeepgramService = require('../services/DeepgramService');
const GroqService = require('../services/GroqService');

describe('Service Integration Tests', () => {
    const config = {
        DEEPGRAM_API_KEY: 'test-key',
        DEEPGRAM_PROJECT_ID: 'test-id',
        GROQ_API_KEY: 'test-groq-key'
    };

    test('DeepgramService handles config correctly', () => {
        const service = new DeepgramService(config);
        expect(service.apiKey).toBe('test-key');
        expect(service.projectId).toBe('test-id');
    });

    test('GroqService handles config correctly', () => {
        const service = new GroqService(config);
        expect(service.apiKey).toBe('test-groq-key');
    });

    test('GroqService getBalance returns N/A', async () => {
        const service = new GroqService(config);
        const balance = await service.getBalance();
        expect(balance).toBe('N/A');
    });
});
