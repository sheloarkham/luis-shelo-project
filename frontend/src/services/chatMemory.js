// Sistema de memoria persistente con IndexedDB
// Nunca olvida nada de lo que hablas

const DB_NAME = 'ChatMemoryDB';
const DB_VERSION = 1;
const STORE_NAME = 'conversations';

class ChatMemory {
  constructor() {
    this.db = null;
  }

  // Inicializar base de datos
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          objectStore.createIndex('sessionId', 'sessionId', { unique: false });
        }
      };
    });
  }

  // Guardar mensaje (usuario o AI)
  async saveMessage(message, role, sessionId = 'default') {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const messageData = {
        message,
        role, // 'user' o 'assistant'
        timestamp: Date.now(),
        sessionId,
        date: new Date().toISOString()
      };

      const request = store.add(messageData);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Obtener toda la conversación (TODO el historial)
  async getAllMessages(sessionId = 'default') {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('sessionId');
      const request = index.getAll(sessionId);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Obtener últimos N mensajes para contexto
  async getRecentMessages(limit = 20, sessionId = 'default') {
    const all = await this.getAllMessages(sessionId);
    return all.slice(-limit);
  }

  // Obtener resumen de memoria (para context window grande)
  async getMemorySummary(sessionId = 'default') {
    const messages = await this.getAllMessages(sessionId);
    return {
      totalMessages: messages.length,
      firstMessage: messages[0]?.date || null,
      lastMessage: messages[messages.length - 1]?.date || null,
      messages
    };
  }

  // Limpiar conversación (opcional)
  async clearSession(sessionId = 'default') {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('sessionId');
      const request = index.openCursor(sessionId);

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  // Exportar toda la memoria (backup)
  async exportMemory() {
    const messages = await this.getAllMessages();
    return JSON.stringify(messages, null, 2);
  }

  // Contar total de mensajes
  async getMessageCount(sessionId = 'default') {
    const messages = await this.getAllMessages(sessionId);
    return messages.length;
  }
}

export default new ChatMemory();
