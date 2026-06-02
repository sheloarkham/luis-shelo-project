// Integración con Google Gemini API (Gratis)
// 60 requests por minuto - Totalmente gratis

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
      throw new Error('API key no configurada. Por favor configura tu API key de Gemini.');
    }

    // Construir el prompt completo con sistema y memoria
    let fullPrompt = '';
    
    // Agregar system prompt (personalidad)
    if (systemPrompt) {
      fullPrompt += `[INSTRUCCIONES DEL SISTEMA]\n${systemPrompt}\n\n`;
    }

    // Agregar historial de conversación (últimos mensajes para contexto)
    if (conversationHistory.length > 0) {
      fullPrompt += '[HISTORIAL DE CONVERSACIÓN]\n';
      conversationHistory.forEach(msg => {
        const prefix = msg.role === 'user' ? 'Usuario' : 'Jack';
        fullPrompt += `${prefix}: ${msg.message}\n`;
      });
      fullPrompt += '\n';
    }

    // Agregar mensaje actual
    fullPrompt += `Usuario: ${userMessage}\nJack:`;

    // Hacer request a Gemini usando v1beta con gemini-pro
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_NONE"
            }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Error en la API de Gemini');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || 'No pude generar una respuesta.';
      
      return aiResponse.trim();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  // Obtener instrucciones para conseguir API key
  static getApiKeyInstructions() {
    return {
      title: '🔑 Cómo obtener tu API Key GRATIS',
      steps: [
        '1. Ve a https://makersuite.google.com/app/apikey',
        '2. Inicia sesión con tu cuenta de Google',
        '3. Haz clic en "Create API Key"',
        '4. Copia la key generada',
        '5. Pégala en el campo de configuración',
        '',
        '✅ Es completamente GRATIS',
        '✅ 60 requests por minuto',
        '✅ Sin tarjeta de crédito'
      ]
    };
  }
}

export default new GeminiAPI();
