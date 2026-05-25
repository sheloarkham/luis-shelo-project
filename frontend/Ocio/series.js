// Lista de Series - Estilo Guitar Hero
const series = [
    {
        title: "Mayans M.C.",
        rating: 5,
        Estado: "Completada",
        temporadas: 5,
        year: 2018
    },
    {
        title: "Daredevil: Born Again",
        rating: 5,
        Estado: "Viendo",
        temporadas: 1,
        year: 2025
    },
    {
        title: "Black Mirror T7",
        rating: 5,
        Estado: "Pendiente",
        temporadas: 7,
        year: 2025
    },
    {
        title: "Secret Level",
        rating: 5,
        Estado: "Viendo",
        temporadas: 1,
        year: 2024
    }
];

// Función para renderizar la lista al estilo Guitar Hero
function renderSeriesList() {
    const seriesContainer = document.getElementById('series-container');
    
    const seriesHTML = series.map((serie, index) => {
        // Usar las estrellas mejoradas
        const stars = serie.rating ? '★'.repeat(Math.min(serie.rating, 5)) : '☆☆☆☆☆';
        
        return `
            <div class="gh-song-row">
                <div class="gh-song-title">${serie.title}</div>
                <div class="gh-song-stars">${stars}</div>
                <div class="gh-song-details">${serie.year} • ${serie.Estado} • ${serie.temporadas} temp.</div>
            </div>
        `;
    }).join('');
    
    seriesContainer.innerHTML = `
        <div class="gh-series-wrapper">
            <div class="gh-setlist-container">
                <div class="gh-setlist-header">
                    <h1>Series 2026</h1>
                </div>
                <div class="gh-song-list">
                    ${seriesHTML}
                    <div class="gh-song-row gh-add-row" id="add-serie-btn">
                        <div class="gh-song-title">+ AGREGAR NUEVA SERIE</div>
                        <div class="gh-song-stars">☆☆☆☆☆</div>
                        <div class="gh-song-details">NUEVA</div>
                    </div>
                </div>
            </div>
            
            <div class="gh-form-panel" id="form-panel" style="display: none;">
                <div class="gh-form-header">
                    <h2>NUEVA SERIE</h2>
                    <button id="close-panel-btn" class="gh-close-btn">✕</button>
                </div>
                <div class="gh-form-content">
                    <div class="gh-form-group">
                        <label>NOMBRE DE LA SERIE</label>
                        <input type="text" id="serie-name" placeholder="Ej: Breaking Bad">
                        <button id="search-imdb-btn" class="gh-search-btn">🔍 BUSCAR IMDB</button>
                    </div>
                    
                    <div id="imdb-result" class="gh-imdb-result"></div>
                    
                    <div id="manual-inputs" class="gh-manual-inputs" style="display: none;">
                        <div class="gh-form-group">
                            <label>AÑO</label>
                            <input type="number" id="serie-year" min="1900" max="2030" placeholder="2023">
                        </div>
                        
                        <div class="gh-form-group">
                            <label>PUNTUACIÓN (1-5 ⭐ o 0-10 IMDb)</label>
                            <input type="number" id="serie-rating" min="0" max="10" step="0.1" placeholder="8.5">
                        </div>
                        
                        <div class="gh-form-group">
                            <label>TEMPORADAS</label>
                            <input type="number" id="serie-temporadas" min="1" placeholder="1">
                        </div>
                        
                        <div class="gh-form-group">
                            <label>ESTADO</label>
                            <select id="serie-estado">
                                <option value="Pendiente">PENDIENTE</option>
                                <option value="Viendo">VIENDO</option>
                                <option value="Completada">COMPLETADA</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="gh-form-buttons">
                        <button id="save-serie-btn" class="gh-save-btn">💾 GUARDAR</button>
                        <button id="manual-entry-btn" class="gh-manual-btn">✏️ MANUAL</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar animaciones
    const items = seriesContainer.querySelectorAll('.gh-song-row');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 50);
    });
}

// Función para crear estrellas basadas en rating
function createStars(rating) {
    const maxStars = 5;
    let stars = 0;
    
    // Si es rating de IMDb (0-10), convertir a escala 1-5
    if (rating >= 0 && rating <= 10) {
        stars = Math.round(rating / 2);
    } else if (rating >= 1 && rating <= 5) {
        stars = Math.round(rating);
    }
    
    // Asegurar que esté en rango válido
    stars = Math.max(1, Math.min(stars, maxStars));
    
    return '★'.repeat(stars) + '☆'.repeat(maxStars - stars);
}

// Función para buscar en IMDb usando OMDb API
async function searchIMDb(seriesName) {
    try {
        const apiKey = '8265bd1c'; // Clave pública de OMDb
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(seriesName)}&type=series`);
        const data = await response.json();
        
        if (data.Response === 'True') {
            return {
                found: true,
                title: data.Title,
                year: parseInt(data.Year),
                rating: parseFloat(data.imdbRating) || 0,
                plot: data.Plot
            };
        }
        return { found: false };
    } catch (error) {
        console.error('Error buscando en IMDb:', error);
        return { found: false };
    }
}

// Función para mostrar panel de agregar serie
function showAddSeriePanel() {
    const formPanel = document.getElementById('form-panel');
    const closeBtn = document.getElementById('close-panel-btn');
    
    // Mostrar panel con animación
    formPanel.style.display = 'block';
    setTimeout(() => formPanel.classList.add('visible'), 10);
    
    // Event listeners del panel
    const searchBtn = document.getElementById('search-imdb-btn');
    const saveBtn = document.getElementById('save-serie-btn');
    const manualBtn = document.getElementById('manual-entry-btn');
    const serieNameInput = document.getElementById('serie-name');
    const manualInputs = document.getElementById('manual-inputs');
    const imdbResult = document.getElementById('imdb-result');
    
    let currentSerieData = null;
    
    // Buscar en IMDb
    searchBtn.addEventListener('click', async () => {
        const serieName = serieNameInput.value.trim();
        if (!serieName) {
            alert('Por favor ingresa el nombre de la serie');
            return;
        }
        
        searchBtn.textContent = '🔍 Buscando...';
        searchBtn.disabled = true;
        
        const result = await searchIMDb(serieName);
        
        if (result.found) {
            currentSerieData = result;
            const stars = createStars(result.rating);
            imdbResult.innerHTML = `
                <div class="gh-imdb-found">
                    <div class="gh-result-title">✅ ENCONTRADO</div>
                    <div class="gh-result-item"><strong>TÍTULO:</strong> ${result.title}</div>
                    <div class="gh-result-item"><strong>AÑO:</strong> ${result.year}</div>
                    <div class="gh-result-item"><strong>RATING:</strong> ${result.rating}/10</div>
                    <div class="gh-result-item"><strong>ESTRELLAS:</strong> <span class="gh-result-stars">${stars}</span></div>
                </div>
            `;
        } else {
            imdbResult.innerHTML = `
                <div class="gh-imdb-not-found">
                    <div class="gh-result-title">✕ NO ENCONTRADO</div>
                    <div class="gh-result-item">USA ENTRADA MANUAL</div>
                </div>
            `;
            currentSerieData = null;
        }
        
        searchBtn.textContent = '🔍 Buscar en IMDb';
        searchBtn.disabled = false;
    });
    
    // Entrada manual
    manualBtn.addEventListener('click', () => {
        manualInputs.style.display = 'block';
        manualBtn.style.display = 'none';
        imdbResult.innerHTML = '<div class="gh-manual-msg">💡 COMPLETA LA INFORMACIÓN</div>';
    });
    
    // Guardar serie
    saveBtn.addEventListener('click', () => {
        let newSerie;
        
        if (currentSerieData) {
            // Datos de IMDb - convertir rating de 0-10 a 1-5
            newSerie = {
                title: currentSerieData.title,
                rating: Math.round(currentSerieData.rating / 2), // Convertir de 0-10 a 1-5
                Estado: 'Pendiente',
                temporadas: 1,
                year: currentSerieData.year
            };
        } else {
            // Datos manuales
            const name = serieNameInput.value.trim();
            const year = parseInt(document.getElementById('serie-year').value);
            const rating = parseFloat(document.getElementById('serie-rating').value);
            const temporadas = parseInt(document.getElementById('serie-temporadas').value);
            const estado = document.getElementById('serie-estado').value;
            
            if (!name || !year || !rating || !temporadas) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            // Si el usuario ingresó rating 0-10, convertir a 1-5
            let finalRating = rating;
            if (rating > 5 && rating <= 10) {
                finalRating = Math.round(rating / 2);
            }
            
            newSerie = {
                title: name,
                rating: Math.max(1, Math.min(finalRating, 5)), // Asegurar rango 1-5
                Estado: estado,
                temporadas: temporadas,
                year: year
            };
        }
        
        // Agregar a la lista
        series.push(newSerie);
        
        // Guardar en localStorage
        localStorage.setItem('userSeries', JSON.stringify(series));
        
        // Re-renderizar
        renderSeriesList();
        
        // Cerrar panel
        formPanel.classList.remove('visible');
        setTimeout(() => {
            formPanel.style.display = 'none';
            // Limpiar formulario
            serieNameInput.value = '';
            imdbResult.innerHTML = '';
            manualInputs.style.display = 'none';
            manualBtn.style.display = 'inline-block';
        }, 300);
    });
    
    // Cerrar panel
    closeBtn.addEventListener('click', () => {
        formPanel.classList.remove('visible');
        setTimeout(() => formPanel.style.display = 'none', 300);
    });
}

// Cargar series guardadas
function loadSavedSeries() {
    const saved = localStorage.getItem('userSeries');
    if (saved) {
        const savedSeries = JSON.parse(saved);
        series.length = 0; // Limpiar array actual
        series.push(...savedSeries); // Agregar series guardadas
    }
}

// Renderizar al cargar
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('series-container')) {
        loadSavedSeries();
        renderSeriesList();
        
        // Agregar event listener después de renderizar
        setTimeout(() => {
            const addBtn = document.getElementById('add-serie-btn');
            if (addBtn) {
                addBtn.addEventListener('click', showAddSeriePanel);
            }
        }, 100);
    }
});
