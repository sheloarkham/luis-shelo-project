// JavaScript para la página Proyecto
console.log('✅ proyecto.js cargado correctamente');

// Función de inicialización
function initProyecto() {
    console.log('✅ Página Proyecto inicializada');
    setupProjectCards();
}

// Configurar interacciones de las cards
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Efecto de hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Añadir efecto de clic
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            console.log(`🎯 Proyecto seleccionado: ${title}`);
            
            // Efecto visual de clic
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
    });
    
    console.log(`🎨 ${projectCards.length} cards de proyecto configuradas`);
}

// Función para agregar un nuevo proyecto (funcionalidad futura)
function addNewProject(projectData) {
    console.log('📋 Funcionalidad de agregar proyecto - En desarrollo');
    // Aquí se implementaría la lógica para agregar nuevos proyectos
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initProyecto();
});

// Función de prueba
function testProyecto() {
    alert('¡Página Proyecto funcionando correctamente con tema futurista!');
    console.log('Función de prueba ejecutada en Proyecto');
}