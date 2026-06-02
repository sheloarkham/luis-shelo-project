import { useState } from 'react';
import './Books.css';

export default function Books() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'El Hombre en Busca de Sentido',
      author: 'Viktor Frankl',
      status: 'Leído',
      rating: 5,
      year: 2024,
      notes: 'Transformador. Logoterapia y sentido de vida.'
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      status: 'Leyendo',
      rating: 0,
      year: 2025,
      notes: ''
    }
  ]);

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    status: 'Pendiente',
    rating: 0,
    year: new Date().getFullYear(),
    notes: ''
  });

  const [showForm, setShowForm] = useState(false);

  const addBook = () => {
    if (newBook.title.trim() && newBook.author.trim()) {
      setBooks([...books, { ...newBook, id: Date.now() }]);
      setNewBook({
        title: '',
        author: '',
        status: 'Pendiente',
        rating: 0,
        year: new Date().getFullYear(),
        notes: ''
      });
      setShowForm(false);
    }
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, status: newStatus } : book
    ));
  };

  const statusColors = {
    'Pendiente': '#6c757d',
    'Leyendo': '#007bff',
    'Leído': '#28a745',
    'Abandonado': '#dc3545'
  };

  return (
    <div className="books-container">
      <div className="books-hero">
        <h1 className="books-title">BIBLIOTECA</h1>
        <p className="books-subtitle">Colección de Libros & Lecturas</p>
      </div>

      <div className="books-content">
        <div className="books-stats">
          <div className="stat-card">
            <span className="stat-number">{books.filter(b => b.status === 'Leído').length}</span>
            <span className="stat-label">Leídos</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{books.filter(b => b.status === 'Leyendo').length}</span>
            <span className="stat-label">Leyendo</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{books.filter(b => b.status === 'Pendiente').length}</span>
            <span className="stat-label">Pendientes</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{books.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>

        <button 
          className="add-book-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancelar' : '+ Agregar Libro'}
        </button>

        {showForm && (
          <div className="book-form">
            <input
              type="text"
              placeholder="Título del libro"
              value={newBook.title}
              onChange={(e) => setNewBook({...newBook, title: e.target.value})}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Autor"
              value={newBook.author}
              onChange={(e) => setNewBook({...newBook, author: e.target.value})}
              className="form-input"
            />
            <select
              value={newBook.status}
              onChange={(e) => setNewBook({...newBook, status: e.target.value})}
              className="form-select"
            >
              <option>Pendiente</option>
              <option>Leyendo</option>
              <option>Leído</option>
              <option>Abandonado</option>
            </select>
            <input
              type="number"
              placeholder="Año"
              value={newBook.year}
              onChange={(e) => setNewBook({...newBook, year: parseInt(e.target.value)})}
              className="form-input small"
            />
            <textarea
              placeholder="Notas o reflexiones..."
              value={newBook.notes}
              onChange={(e) => setNewBook({...newBook, notes: e.target.value})}
              className="form-textarea"
              rows="3"
            />
            <button onClick={addBook} className="submit-btn">
              Guardar Libro
            </button>
          </div>
        )}

        <div className="books-grid">
          {books.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-header">
                <h3 className="book-title">{book.title}</h3>
                <button 
                  className="delete-btn"
                  onClick={() => deleteBook(book.id)}
                >
                  ✕
                </button>
              </div>
              <p className="book-author">{book.author}</p>
              <p className="book-year">{book.year}</p>
              
              <div className="book-status-container">
                <select
                  value={book.status}
                  onChange={(e) => updateStatus(book.id, e.target.value)}
                  className="status-select"
                  style={{ borderColor: statusColors[book.status] }}
                >
                  <option>Pendiente</option>
                  <option>Leyendo</option>
                  <option>Leído</option>
                  <option>Abandonado</option>
                </select>
              </div>

              {book.notes && (
                <p className="book-notes">{book.notes}</p>
              )}

              {book.status === 'Leído' && book.rating > 0 && (
                <div className="book-rating">
                  {'⭐'.repeat(book.rating)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
