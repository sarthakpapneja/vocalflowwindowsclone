const axios = require('axios');

class GroqService {
    constructor(config) {
        this.apiKey = config.GROQ_API_KEY;
    }

    async getBalance() {
        // Mock balance for Groq/Grok as there is no public API
        return "Prepaid ($25.00)";
    }

    async processText(text, model, instructions) {
        if (!this.apiKey) return text;
        try {
            const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
                model: model,
                messages: [
                    { role: 'system', content: instructions },
                    { role: 'user', content: text }
                ],
                temperature: 0
            }, {
                headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' }
            });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error in Groq processing:', error);
            return text;
        }
    }
}

module.exports = GroqService;
