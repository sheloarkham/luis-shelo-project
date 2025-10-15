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
        console.log('🔍 Ruta actual detectada:', path);
        
        if (path.includes('/Home/') || path.endsWith('/Home')) return 'home';
        if (path.includes('/Ocio/')) return 'ocio';
        if (path.includes('/Presupuestos/')) return 'presupuestos';
        if (path.includes('/Proyecto/')) return 'proyecto';
        if (path.includes('/Archivos/')) return 'archivos';
        if (path.includes('/Yeni') || path.includes('Yeni%20%F0%9F%92%9E') || path.includes('Yeni%20💞') || path.includes('Yeni%C2%A0')) return 'yeni';
        
        // Si estamos en la raíz, default a home
        return 'home';
    },
    
    // Enlaces del navbar con rutas relativas inteligentes
    getNavLinks() {
        const currentPage = this.getCurrentPage();
        const basePath = this.getBasePath(currentPage);
        
        // Codificar correctamente el nombre de la carpeta con emoji
        const yeniFolder = encodeURIComponent('Yeni 💞');
        
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
                href: `${basePath}${yeniFolder}/index.html`,
                active: currentPage === 'yeni'
            }
        ];
    },
    
    // Calcula la ruta base según la ubicación actual
    getBasePath(currentPage) {
        const path = window.location.pathname;
        
        console.log('🛣️ Ruta actual:', path);
        
        // Siempre usar rutas relativas simples
        // Si estamos en la raíz o index principal
        if (path === '/' || path === '/index.html' || path.endsWith('/luis-shelo-project/') || path.endsWith('/luis-shelo-project/index.html')) {
            return './';
        }
        
        // Si estamos en una subcarpeta, subir un nivel
        return '../';
    }
};

// Función para generar el HTML del navbar
function generateNavbarHTML() {
    const links = NAVBAR_CONFIG.getNavLinks();
    const currentPage = NAVBAR_CONFIG.getCurrentPage();
    
    const navItemsHTML = links.map(link => {
        if (link.dropdown) {
            // Generar dropdown con estilos específicos
            const dropdownItems = link.dropdown.map(item => 
                `<li><a href="${item.href}">${item.text}</a></li>`
            ).join('');
            
            return `
                <li class="dropdown">
                    <a href="${link.href}" class="dropdown-toggle nav-${link.id} ${link.active ? 'active' : ''}">${link.text}</a>
                    <ul class="dropdown-menu dropdown-${link.id}">
                        ${dropdownItems}
                    </ul>
                </li>
            `;
        } else {
            // Enlace normal con clase específica por sección
            return `
                <li>
                    <a href="${link.href}" class="nav-${link.id} ${link.active ? 'active' : ''}">${link.text}</a>
                </li>
            `;
        }
    }).join('');
    
    return `
        <nav class="navbar navbar-theme-${currentPage}">
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
        const currentPage = NAVBAR_CONFIG.getCurrentPage();
        console.log('🎯 Página actual detectada:', currentPage);
        console.log('🌐 URL completa:', window.location.href);
        
        // Aplicar tema a toda la página
        applyPageTheme(currentPage);
        
        container.innerHTML = generateNavbarHTML();
        console.log('✅ Navbar universal cargado correctamente');
    } else {
        console.error('❌ No se encontró el contenedor #navbar-container');
        console.error('📋 Elementos disponibles con ID:', document.querySelectorAll('[id]'));
    }
}

// Función para aplicar el tema completo a la página
function applyPageTheme(currentPage) {
    // Remover temas anteriores
    document.body.classList.remove('theme-yeni', 'theme-proyecto', 'theme-ocio', 'theme-presupuestos', 'theme-home');
    
    // Aplicar tema actual
    if (currentPage !== 'home') {
        document.body.classList.add(`theme-${currentPage}`);
    } else {
        document.body.classList.add('theme-home');
    }
    
    console.log(`🎨 Tema aplicado: theme-${currentPage}`);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initNavbar);

// También exportar para uso manual si es necesario
window.LuisSheloNavbar = {
    init: initNavbar,
    config: NAVBAR_CONFIG
};