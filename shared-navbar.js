/* ========================================
   NAVBAR UNIVERSAL - LUIS SHELO PROJECT
   ========================================
   Este archivo genera dinámicamente el navbar
   en todas las páginas para mantener consistencia
   y facilitar el mantenimiento.
*/

// Configuración del navbar - fácil de modificar
const NAVBAR_CONFIG = {
    // Detecta automáticamente la página actual basado en la ruta
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('/Home/') || path.endsWith('/Home') || path.includes('index.html') && path.includes('/Home/')) return 'home';
        if (path.includes('/Ocio/')) return 'ocio';
        if (path.includes('/Presupuestos/')) return 'presupuestos';
        if (path.includes('/Proyecto/')) return 'proyecto';
        if (path.includes('/Archivos/')) return 'archivos';
        if (path.includes('/Yeni 💞/') || path.includes('/Yeni%20💞/')) return 'yeni';
        return 'home'; // default
    },
    
    // Enlaces del navbar con rutas relativas inteligentes
    getNavLinks() {
        const currentPage = this.getCurrentPage();
        const basePath = this.getBasePath(currentPage);
        
        return [
            {
                id: 'home',
                text: 'Home',
                href: `${basePath}Home/index.html`,
                active: currentPage === 'home'
            },
            {
                id: 'ocio',
                text: 'Ocio',
                href: `${basePath}Ocio/index.html`,
                active: currentPage === 'ocio',
                dropdown: [
                    { text: 'Juegos', href: `${basePath}Ocio/index.html#juegos` },
                    { text: 'Libros', href: `${basePath}Ocio/index.html#libros` },
                    { text: 'Series', href: `${basePath}Ocio/index.html#series` },
                    { text: 'Animes', href: `${basePath}Ocio/index.html#animes` }
                ]
            },
            {
                id: 'presupuestos',
                text: 'Presupuestos',
                href: `${basePath}Presupuestos/index.html`,
                active: currentPage === 'presupuestos'
            },
            {
                id: 'proyecto',
                text: 'Proyecto',
                href: `${basePath}Proyecto/index.html`,
                active: currentPage === 'proyecto'
            },
            {
                id: 'yeni',
                text: '💞Yeni💞',
                href: `${basePath}Yeni 💞/index.html`,
                active: currentPage === 'yeni'
            }
        ];
    },
    
    // Calcula la ruta base según la página actual
    getBasePath(currentPage) {
        switch (currentPage) {
            case 'home': return '../';
            case 'ocio': return '../';
            case 'presupuestos': return '../';
            case 'proyecto': return '../';
            case 'archivos': return '../';
            case 'yeni': return '../';
            default: return '../';
        }
    }
};

// Función para generar el HTML del navbar
function generateNavbarHTML() {
    const links = NAVBAR_CONFIG.getNavLinks();
    
    const navItemsHTML = links.map(link => {
        if (link.dropdown) {
            // Generar dropdown
            const dropdownItems = link.dropdown.map(item => 
                `<li><a href="${item.href}">${item.text}</a></li>`
            ).join('');
            
            return `
                <li class="dropdown">
                    <a href="${link.href}" class="dropdown-toggle ${link.active ? 'active' : ''}">${link.text}</a>
                    <ul class="dropdown-menu">
                        ${dropdownItems}
                    </ul>
                </li>
            `;
        } else {
            // Enlace normal
            return `
                <li>
                    <a href="${link.href}" class="${link.active ? 'active' : ''}">${link.text}</a>
                </li>
            `;
        }
    }).join('');
    
    return `
        <nav class="navbar">
            <ul class="nav-links">
                ${navItemsHTML}
            </ul>
        </nav>
    `;
}

// Función para inicializar el navbar
function initNavbar() {
    const container = document.getElementById('navbar-container');
    if (container) {
        container.innerHTML = generateNavbarHTML();
        console.log('✅ Navbar universal cargado correctamente');
    } else {
        console.error('❌ No se encontró el contenedor #navbar-container');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initNavbar);

// También exportar para uso manual si es necesario
window.LuisSheloNavbar = {
    init: initNavbar,
    config: NAVBAR_CONFIG
};