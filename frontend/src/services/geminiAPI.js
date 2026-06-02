// Integración con Groq API (Gratis y súper rápido)
// Llama 3 - Totalmente gratis, más rápido que ChatGPT

class GeminiAPI {
  constructor() {
    // La API key se guarda en localStorage para que el usuario la configure
    this.apiKey = localStorage.getItem('gemini_api_key') || '';
  }

  // Configurar API key
  setApiKey(key) {
    this.apiKey = key;
    localStorage.setItem('gemini_api_key', key);
  }

  // Verificar si hay API key configurada
  hasApiKey() {
    return this.apiKey.length > 0;
  }

  // Generar respuesta del chatbot
  async generateResponse(userMessage, conversationHistory = [], systemPrompt = '') {
    if (!this.hasApiKey()) {
      throw new Error('API key no configurada. Por favor configura tu API key de Groq.');
    }

    // Construir mensajes en formato Groq/OpenAI
    const messages = [];

    // Agregar system prompt (personalidad)
    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt
      });
    }

    // Agregar historial de conversación (últimos 20 para contexto)
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.message
      });
    });

    // Agregar mensaje actual
    messages.push({
      role: 'user',
      content: userMessage
    });

    // Hacer request a Groq
    const url = 'https://api.groq.com/openai/v1/chat/completions';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // Modelo gratuito más potente
          messages: messages,
          temperature: 0.9,
          max_tokens: 2048,
          top_p: 1,
          stream: false
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Error en la API de Groq');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'No pude generar una respuesta.';
      
      return aiResponse.trim();
    } catch (error) {
      console.error('Error calling Groq API:', error);
      throw error;
    }
  }

  // Obtener instrucciones para conseguir API key
  static getApiKeyInstructions() {
    return {
      title: '🔑 Cómo obtener tu API Key GRATIS de Groq',
      steps: [
        '1. Ve a https://console.groq.com',
        '2. Crea una cuenta (gratis, sin tarjeta)',
        '3. Ve a "API Keys" en el menú',
        '4. Haz clic en "Create API Key"',
        '5. Copia la key generada',
        '6. Pégala aquí',
        '',
        '✅ 100% GRATIS - Sin tarjeta de crédito',
        '✅ MÁS RÁPIDO que ChatGPT',
        '✅ Llama 3.3 70B (súper inteligente)',
        '✅ 30 requests por minuto'
      ]
    };
  }
}

export default new GeminiAPI();
