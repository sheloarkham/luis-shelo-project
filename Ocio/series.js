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
        const stars = '★'.repeat(serie.rating);
        
        return `
            <div class="gh-song-row">
                <div class="gh-song-title">${serie.title}</div>
                <div class="gh-song-stars">${stars}</div>
                <div class="gh-song-details">${serie.year}</div>
            </div>
        `;
    }).join('');
    
    seriesContainer.innerHTML = `
        <div class="gh-setlist-container">
            <div class="gh-setlist-header">
                <h1>Series 2026</h1>
                
            </div>
            <div class="gh-song-list">
                ${seriesHTML}
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

// Renderizar al cargar
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('series-container')) {
        renderSeriesList();
    }
});
