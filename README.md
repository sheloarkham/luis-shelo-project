# Luis Shelo Project

Aplicación web React para gestión personal: seguimiento de series, anime, videojuegos, libros, presupuestos y más.

## 🚀 Características

- ✅ Gestión de **Series** (38 series con estados: Viendo, Pendiente, Completado)
- ✅ Gestión de **Anime** (68 anime con seguimiento de progreso)
- ✅ Gestión de **Videojuegos** (20 juegos clasificados por estado)
- ✅ Gestión de **Libros** (17 libros con seguimiento de lectura)
- ✅ **Dashboard de Progreso** con estadísticas y porcentajes
- ✅ **Presupuestos 2026** con seguimiento de gastos por categoría
- ✅ **Búsqueda en tiempo real** para filtrar contenido
- ✅ **Persistencia local** con localStorage (sin backend necesario)
- ✅ **Interfaz moderna** con Material-UI y gradientes personalizados

## 📁 Estructura del Proyecto

```
luis-shelo-project-1/
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SeriesList.jsx
│   │   │   ├── AnimeList.jsx
│   │   │   ├── GamesList.jsx
│   │   │   ├── BooksList.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── ActualmenteEnProgreso.jsx
│   │   │
│   │   ├── pages/         # Páginas principales
│   │   │   ├── Home.jsx (Dashboard/Progreso)
│   │   │   ├── Ocio.jsx
│   │   │   ├── Carrera.jsx
│   │   │   ├── Presupuestos.jsx
│   │   │   ├── Proyecto.jsx
│   │   │   └── Yeni.jsx
│   │   │
│   │   ├── App.jsx        # Rutas y layout principal
│   │   └── main.jsx       # Punto de entrada
│   │
│   ├── package.json
│   └── vite.config.js
│
├── package.json          # Scripts principales
└── README.md
```

## 🛠️ Tecnologías

- **React 18.2.0** - Biblioteca UI
- **React Router DOM 6.20.1** - Navegación SPA
- **Material-UI 7.3.7** - Componentes y estilos
- **Vite 5.0.8** - Build tool ultra rápido
- **localStorage** - Persistencia de datos en el navegador

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install
# o
cd frontend && npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación se abrirá en http://localhost:3000
```

### Producción

```bash
# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📊 Datos y Persistencia

Todos los datos se guardan en **localStorage** del navegador:

- `series-list` - 38 series con estados (Viendo, Pendiente, Completado)
- `anime-list` - 68 anime clasificados por progreso
- `games-list` - 20 videojuegos con seguimiento
- `books-list` - 17 libros con estado de lectura
- `presupuestos-gastos` - Gastos y presupuestos 2026

## 🎨 Diseño

- **Navbar**: Gradient dorado/naranjo (#FF8C00 → #FFD700)
- **Footer**: Fondo negro (#000000)
- **Cards**: Gradientes por estado:
  - Viendo/Jugando/Leyendo: Rosa/Azul
  - Pendiente: Dorado/Naranja
  - Completado: Verde/Azul
- **Búsqueda**: Filtrado en tiempo real sin agrupación por estado

## 📂 Características por Sección

### 🏠 Home (Progreso)
- Dashboard con 4 tarjetas de estadísticas
- Porcentaje de progreso circular
- Totales y conteos por categoría
- Componente "Actualmente en Progreso"

### 🎭 Ocio
- Pestañas: Anime, Series, Videojuegos, Libros
- Barra de búsqueda global
- Agrupación por estado (cuando no hay búsqueda)
- Menú de opciones: Cambiar estado, Eliminar

### 💰 Presupuestos 2026
- Tabs por categoría de gastos
- Lista de gastos con monto y descripción
- Persistencia en localStorage

## 🤝 Contribuir

1. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Hacer cambios y commit: `git commit -m "feat: descripción"`
3. Push: `git push origin feature/nueva-funcionalidad`
4. Crear Pull Request hacia `develop`

## 📝 Git Flow

- `main` - Producción
- `develop` - Desarrollo
- `feature/*` - Nuevas funcionalidades

## 📄 Licencia

ISC
