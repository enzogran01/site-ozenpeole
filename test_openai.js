require('dotenv').config();
const axios = require('axios');

// Pegue a chave da API do arquivo .env
const apiKey = process.env.OPENAI_API_KEY;

async function testOpenAI() {
    const prompt = "Diga olá em português.";

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        console.log("Resposta da OpenAI:", response.data.choices[0].message.content);
    } catch (error) {
        console.error('Erro ao chamar a API OpenAI:', error.response ? error.response.data : error.message);
    }
}

testOpenAI();