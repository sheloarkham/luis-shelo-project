// Función para crear placeholder optimizado
function createPlaceholder() {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='14' fill='%23666'%3ECargando...%3C/text%3E%3C/svg%3E";
}

// Función para renderizar una card de juego
function renderGameCard(game) {
    return `
        <div class="game-card">
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
                <p><strong>Estado:</strong> ${game.Estado}</p>
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
    const gamesHTML = games.map(game => renderGameCard(game)).join('');
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
function renderBookCard(book) {
    return `
        <div class="book-card">
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
                <p><strong>Estado:</strong> ${book.Estado}</p>
            </div>
        </div>
    `;
}

// Función para renderizar todos los libros
function renderBooks() {
    const booksContainer = document.getElementById('books-container');
    const booksHTML = books.map(book => renderBookCard(book)).join('');
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
    
    // Ocultar todas las secciones primero
    gamesSection.style.display = 'none';
    booksSection.style.display = 'none';
    
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
    }
}

// Función para mostrar todas las secciones (página inicial)
function showAllSections() {
    const gamesSection = document.querySelector('.games-section');
    const booksSection = document.querySelector('.books-section');
    
    gamesSection.style.display = 'block';
    booksSection.style.display = 'block';
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

