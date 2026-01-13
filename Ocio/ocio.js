// Función para crear placeholder optimizado
function createPlaceholder() {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='14' fill='%23666'%3ECargando...%3C/text%3E%3C/svg%3E";
}

// Función para renderizar una card de juego con tema Ocio
function renderGameCard(game, index) {
    const isCurrentlyPlaying = game.Estado === "Jugando";
    const cardClass = isCurrentlyPlaying ? "card game-card currently-playing" : "card game-card";
    
    return `
        <div class="${cardClass}" data-game-index="${index}">
            <button class="status-menu-btn" onclick="toggleStatusMenu(event, 'game', ${index})">
                <span>⋮</span>
            </button>
            <div class="status-dropdown" id="game-menu-${index}">
                <button onclick="changeGameStatus(${index}, 'Pendiente')">Pendiente</button>
                <button onclick="changeGameStatus(${index}, 'Jugando')">Jugando</button>
                <button onclick="changeGameStatus(${index}, 'Completado')">Completado</button>
            </div>
            <img src="${createPlaceholder()}" 
                 data-src="${game.image}" 
                 alt="${game.title}" 
                 class="game-image lazy-load">
            <div class="game-info">
                <h3>${game.title}</h3>
                <p><strong>Año:</strong> ${game.releaseYear}</p>
                <p><strong>Desarrollador:</strong> ${game.developer}</p>
                <p><strong>Duración:</strong> ${game.duration} horas</p>
                ${game.synopsis ? `<div class="synopsis game-synopsis"><p><strong>Historia:</strong> ${game.synopsis}</p></div>` : ''}
                <p><strong>Estado:</strong> <span class="${isCurrentlyPlaying ? 'status-active' : 'status-normal'}">${game.Estado}</span></p>
            </div>
        </div>
    `;
}

// Configurar el IntersectionObserver para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// IntersectionObserver para lazy loading de imágenes optimizado para imágenes pesadas
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const realSrc = img.dataset.src;
            const card = img.closest('.game-card, .book-card');
            
            if (realSrc) {
                // Agregar indicador visual de carga
                card.classList.add('loading-image');
                
                // Crear una nueva imagen para precargar
                const newImg = new Image();
                
                // Cuando la imagen se carga exitosamente
                newImg.onload = () => {
                    img.src = realSrc;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    card.classList.remove('loading-image');
                    card.classList.add('image-ready');
                };
                
                // Si hay error cargando la imagen
                newImg.onerror = () => {
                    console.warn(`Error cargando imagen: ${realSrc}`);
                    img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='14' fill='%23999'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                    img.classList.add('loaded');
                    card.classList.remove('loading-image');
                };
                
                // Iniciar la carga
                newImg.src = realSrc;
                imageObserver.unobserve(img);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '200px' // Aumentar margen para empezar a cargar antes
});

// Función para renderizar todos los juegos
function renderGames() {
    const gamesContainer = document.getElementById('games-container');
    const gamesHTML = games.map((game, index) => renderGameCard(game, index)).join('');
    gamesContainer.innerHTML = gamesHTML;
    
    // Observar todas las cards de juegos para animaciones
    const gameCards = gamesContainer.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 50); // Reducido a 50ms para más fluidez
    });
    
    // Observar todas las imágenes para lazy loading
    const lazyImages = gamesContainer.querySelectorAll('.lazy-load');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}



// Función para renderizar una card de libro
function renderBookCard(book, index) {
    const isCurrentlyReading = book.Estado === "Leyendo";
    const cardClass = isCurrentlyReading ? "book-card currently-reading" : "book-card";
    
    return `
        <div class="${cardClass}" data-book-index="${index}">
            <button class="status-menu-btn" onclick="toggleStatusMenu(event, 'book', ${index})">
                <span>⋮</span>
            </button>
            <div class="status-dropdown" id="book-menu-${index}">
                <button onclick="changeBookStatus(${index}, 'Pendiente')">Pendiente</button>
                <button onclick="changeBookStatus(${index}, 'Leyendo')">Leyendo</button>
                <button onclick="changeBookStatus(${index}, 'Leido')">Leído</button>
            </div>
            <img src="${createPlaceholder()}" 
                 data-src="${book.image}" 
                 alt="${book.title}" 
                 class="book-image lazy-load">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p><strong>Autor:</strong> ${book.author}</p>
                <p><strong>Año:</strong> ${book.releaseYear}</p>
                <p><strong>Páginas:</strong> ${book.pages}</p>
                ${book.synopsis ? `<div class="synopsis book-synopsis"><p><strong>Historia:</strong> ${book.synopsis}</p></div>` : ''}
                <p><strong>Estado:</strong> <span class="${isCurrentlyReading ? 'status-active' : 'status-normal'}">${book.Estado}</span></p>
            </div>
        </div>
    `;
}

// Función para renderizar todos los libros
function renderBooks() {
    const booksContainer = document.getElementById('books-container');
    const booksHTML = books.map((book, index) => renderBookCard(book, index)).join('');
    booksContainer.innerHTML = booksHTML;
    
    // Observar todas las cards de libros para animaciones
    const bookCards = booksContainer.querySelectorAll('.book-card');
    bookCards.forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 50);
    });
    
    // Observar todas las imágenes para lazy loading
    const lazyImages = booksContainer.querySelectorAll('.lazy-load');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Función para mostrar una categoría específica (exclusiva)
function showCategory(category) {
    const gamesSection = document.querySelector('.games-section');
    const booksSection = document.querySelector('.books-section');
    const seriesSection = document.querySelector('.series-section');
    
    // Ocultar todas las secciones primero
    gamesSection.style.display = 'none';
    booksSection.style.display = 'none';
    if (seriesSection) seriesSection.style.display = 'none';
    
    // Mostrar solo la sección seleccionada
    if (category === 'games') {
        gamesSection.style.display = 'block';
        gamesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    } else if (category === 'books') {
        booksSection.style.display = 'block';
        booksSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    } else if (category === 'series') {
        if (seriesSection) {
            seriesSection.style.display = 'block';
            seriesSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Función para mostrar todas las secciones (página inicial)
function showAllSections() {
    const gamesSection = document.querySelector('.games-section');
    const booksSection = document.querySelector('.books-section');
    const seriesSection = document.querySelector('.series-section');
    
    gamesSection.style.display = 'block';
    booksSection.style.display = 'block';
    if (seriesSection) seriesSection.style.display = 'block';
}

// Función para manejar navegación por hash
function handleHashNavigation() {
    const hash = window.location.hash.substring(1); // Quitar el #
    let category = null;
    
    switch(hash) {
        case 'juegos':
            category = 'games';
            break;
        case 'libros':
            category = 'books';
            break;
        case 'series':
            category = 'series';
            break;
        case 'animes':
            category = 'animes';
            break;
    }
    
    if (category) {
        showCategory(category);
    } else {
        // Si no hay hash, mostrar todas las secciones
        showAllSections();
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar todo el contenido
    renderGames();
    renderBooks();

    // Manejar navegación inicial por hash, o mostrar juegos por defecto
    if (!window.location.hash) {
        showCategory('games');
    } else {
        handleHashNavigation();
    }
    
    // Agregar event listeners para el dropdown
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const hash = href.substring(1);
            let category = null;
            
            switch(hash) {
                case 'juegos':
                    category = 'games';
                    break;
                case 'libros':
                    category = 'books';
                    break;
                case 'series':
                    category = 'series';
                    break;
                case 'animes':
                    category = 'animes';
                    break;
            }
            
            if (category) {
                showCategory(category);
            }
        });
    });
});

// Manejar cambios de hash
window.addEventListener('hashchange', handleHashNavigation);

// ========================================
// FUNCIONES PARA MENÚ DE CAMBIO DE ESTADO
// ========================================

// Función para mostrar/ocultar el menú de estado
function toggleStatusMenu(event, type, index) {
    event.stopPropagation();
    const menuId = `${type}-menu-${index}`;
    const menu = document.getElementById(menuId);
    
    // Cerrar todos los demás menús
    document.querySelectorAll('.status-dropdown').forEach(dropdown => {
        if (dropdown.id !== menuId) {
            dropdown.classList.remove('show');
        }
    });
    
    // Toggle del menú actual
    menu.classList.toggle('show');
}

// Función para cambiar el estado de un juego
function changeGameStatus(index, newStatus) {
    games[index].Estado = newStatus;
    renderGames();
    
    // Cerrar el menú
    const menu = document.getElementById(`game-menu-${index}`);
    if (menu) menu.classList.remove('show');
}

// Función para cambiar el estado de un libro
function changeBookStatus(index, newStatus) {
    books[index].Estado = newStatus;
    renderBooks();
    
    // Cerrar el menú
    const menu = document.getElementById(`book-menu-${index}`);
    if (menu) menu.classList.remove('show');
}

// Cerrar menús al hacer click fuera
document.addEventListener('click', (event) => {
    if (!event.target.closest('.status-menu-btn') && !event.target.closest('.status-dropdown')) {
        document.querySelectorAll('.status-dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});
