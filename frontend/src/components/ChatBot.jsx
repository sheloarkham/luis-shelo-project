import { useState, useEffect, useRef } from 'react';
import chatMemory from '../services/chatMemory';
import geminiAPI from '../services/geminiAPI';
import './ChatBot.css';

const PERSONALITY_PRESETS = {
  mentor: {
    name: '🎓 Mentor Sabio',
    prompt: 'Eres un mentor sabio y experimentado. Tu objetivo es guiar, enseñar y ayudar a crecer a través de preguntas reflexivas y consejos profundos. Eres paciente, empático y siempre buscas el desarrollo personal de quien habla contigo.'
  },
  stoic: {
    name: '🏛️ Filósofo Estoico',
    prompt: 'Eres un filósofo estoico moderno. Sigues las enseñanzas de Marco Aurelio, Epicteto y Séneca. Ayudas a ver las situaciones desde la perspectiva del control interno, la virtud y la aceptación. Eres calmado, racional y profundo.'
  },
  friend: {
    name: '🤝 Amigo Cercano',
    prompt: 'Eres un amigo cercano y de confianza. Escuchas sin juzgar, das consejos honestos y celebras los logros. Eres empático, divertido cuando es apropiado, y siempre estás disponible para hablar.'
  },
  coach: {
    name: '💪 Coach Motivacional',
    prompt: 'Eres un coach motivacional enérgico. Tu objetivo es inspirar acción, superar obstáculos y alcanzar metas. Eres directo, positivo y enfocado en resultados. Celebras los progresos y desafías a mejorar constantemente.'
  },
  therapist: {
    name: '🧘 Terapeuta Reflexivo',
    prompt: 'Eres un terapeuta reflexivo y compasivo. Ayudas a explorar emociones, pensamientos y patrones de comportamiento. Haces preguntas poderosas que llevan al autoconocimiento. Eres empático, no juzgas, y creas un espacio seguro.'
  },
  custom: {
    name: '⚙️ Personalizado',
    prompt: ''
  }
};

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('mentor');
  const [customPrompt, setCustomPrompt] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);

  // Cargar memoria al iniciar
  useEffect(() => {
    loadMemory();
    checkApiKey();
  }, []);

  // Auto-scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkApiKey = () => {
    setApiKeyConfigured(geminiAPI.hasApiKey());
  };

  const loadMemory = async () => {
    try {
      const history = await chatMemory.getAllMessages();
      setMessages(history);
      const count = await chatMemory.getMessageCount();
      setMessageCount(count);
    } catch (error) {
      console.error('Error loading memory:', error);
    }
  };

  const saveApiKey = () => {
    if (apiKeyInput.trim()) {
      geminiAPI.setApiKey(apiKeyInput.trim());
      setApiKeyConfigured(true);
      setShowConfig(false);
      setApiKeyInput('');
    }
  };

  const getSystemPrompt = () => {
    if (selectedPersonality === 'custom') {
      return customPrompt;
    }
    return PERSONALITY_PRESETS[selectedPersonality].prompt;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    if (!apiKeyConfigured) {
      alert('⚠️ Primero debes configurar tu API Key de Gemini (es gratis)');
      setShowConfig(true);
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      // Guardar mensaje del usuario
      await chatMemory.saveMessage(userMessage, 'user');
      
      // Actualizar UI inmediatamente
      const newUserMsg = { message: userMessage, role: 'user', timestamp: Date.now() };
      setMessages(prev => [...prev, newUserMsg]);

      // Obtener historial completo para contexto
      const history = await chatMemory.getRecentMessages(50); // Últimos 50 mensajes

      // Generar respuesta con memoria completa
      const systemPrompt = getSystemPrompt();
      const aiResponse = await geminiAPI.generateResponse(userMessage, history, systemPrompt);

      // Guardar respuesta de AI
      await chatMemory.saveMessage(aiResponse, 'assistant');

      // Actualizar UI
      const newAiMsg = { message: aiResponse, role: 'assistant', timestamp: Date.now() };
      setMessages(prev => [...prev, newAiMsg]);

      // Actualizar contador
      const count = await chatMemory.getMessageCount();
      setMessageCount(count);

    } catch (error) {
      console.error('Error:', error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMemory = async () => {
    if (confirm('🗑️ ¿Estás seguro? Esto borrará TODA la memoria del chatbot.')) {
      await chatMemory.clearSession();
      setMessages([]);
      setMessageCount(0);
    }
  };

  const exportMemory = async () => {
    const data = await chatMemory.exportMemory();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-memory-${Date.now()}.json`;
    a.click();
  };

  const instructions = geminiAPI.constructor.getApiKeyInstructions();

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-title">
          <h2>🤖 Jack</h2>
          <span className="memory-count">💾 {messageCount} mensajes guardados</span>
        </div>
        <div className="header-actions">
          <button onClick={() => setShowConfig(!showConfig)} className="config-btn">
            {apiKeyConfigured ? '✅ Configurado' : '⚙️ Configurar'}
          </button>
          <button onClick={exportMemory} className="export-btn" title="Exportar memoria">
            📥
          </button>
          <button onClick={clearMemory} className="clear-btn" title="Borrar memoria">
            🗑️
          </button>
        </div>
      </div>

      {showConfig && (
        <div className="config-panel">
          <div className="api-config">
            <h3>🔑 Configurar API Key</h3>
            <div className="instructions">
              {instructions.steps.map((step, i) => (
                <p key={i}>{step}</p>
              ))}
            </div>
            <input
              type="password"
              placeholder="Pega tu API Key aquí"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="api-input"
            />
            <button onClick={saveApiKey} className="save-btn">💾 Guardar</button>
          </div>

          <div className="personality-config">
            <h3>🎭 Personalidad del Chatbot</h3>
            <select 
              value={selectedPersonality} 
              onChange={(e) => setSelectedPersonality(e.target.value)}
              className="personality-select"
            >
              {Object.entries(PERSONALITY_PRESETS).map(([key, preset]) => (
                <option key={key} value={key}>{preset.name}</option>
              ))}
            </select>

            {selectedPersonality === 'custom' && (
              <textarea
                placeholder="Describe cómo quieres que sea el chatbot..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="custom-prompt"
                rows="4"
              />
            )}

            <p className="personality-description">
              {PERSONALITY_PRESETS[selectedPersonality].prompt || 'Configura tu propia personalidad'}
            </p>
          </div>
        </div>
      )}

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h3>👋 ¡Hola! Soy Jack</h3>
            <p>Nunca olvidaré nada de lo que hablemos.</p>
            <p>Puedes darme una filosofía específica o personalidad.</p>
            {!apiKeyConfigured && (
              <button onClick={() => setShowConfig(true)} className="setup-btn">
                🚀 Configurar Ahora
              </button>
            )}
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                {msg.message}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message assistant">
            <div className="message-avatar">🤖</div>
            <div className="message-content typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe tu mensaje..."
          className="message-input"
          disabled={isLoading}
        />
        <button 
          onClick={sendMessage} 
          className="send-btn"
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? '⏳' : '📤'}
        </button>
      </div>
    </div>
  );
}
