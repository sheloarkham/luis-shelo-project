# Luis Shelo Project - Monorepo

Proyecto Full Stack con arquitectura monorepo y Clean Architecture.

## 📁 Estructura del Proyecto

```
luis-shelo-project-1/
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── pages/        # Páginas/Vistas
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/              # API Node.js con Clean Architecture
│   ├── src/
│   │   ├── domain/                    # 🧠 Lógica de negocio pura
│   │   │   ├── entities/             # Entidades (Serie, Game, Book)
│   │   │   └── repositories/         # Interfaces (contratos)
│   │   │
│   │   ├── application/              # 🎯 Casos de uso
│   │   │   └── useCases/
│   │   │       ├── series/           # CRUD de series
│   │   │       ├── games/            # CRUD de juegos
│   │   │       └── books/            # CRUD de libros
│   │   │
│   │   ├── infrastructure/           # 🔧 Detalles técnicos
│   │   │   ├── repositories/        # Implementaciones (InMemory, DB)
│   │   │   └── api/                 # Express routes & controllers
│   │   │       ├── routes/
│   │   │       └── controllers/
│   │   │
│   │   └── server.js                # Punto de entrada
│   │
│   └── package.json
│
└── package.json          # Scripts para manejar todo el monorepo
```

## 🏗️ Clean Architecture

### Capas (de dentro hacia afuera):

1. **Domain** 🧠: Reglas de negocio puras, independientes de frameworks
   - Entidades: Modelos con lógica de validación
   - Interfaces: Contratos que define el dominio

2. **Application** 🎯: Casos de uso (orquestación de lógica)
   - Coordinan las entidades del dominio
   - Independientes de la UI y base de datos

3. **Infrastructure** 🔧: Detalles técnicos (frameworks, BD, APIs)
   - Implementaciones concretas de repositorios
   - Controllers y routes de Express
   - Conexiones a bases de datos

### Ventajas:

✅ **Testeable**: Cada capa se puede testear independientemente  
✅ **Flexible**: Fácil cambiar de base de datos sin afectar lógica  
✅ **Mantenible**: Código organizado y con responsabilidades claras  
✅ **Escalable**: Fácil agregar nuevas funcionalidades

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias de ambos proyectos
npm run install:all

# O instalarlas por separado
npm run install:frontend
npm run install:backend
```

### Desarrollo

```bash
# Iniciar frontend y backend simultáneamente
npm run dev

# O iniciarlos por separado
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:3001
```

### Producción

```bash
# Build del frontend
npm run build:frontend

# Iniciar backend en producción
npm run start:backend
```

## 📡 API Endpoints

Base URL: `http://localhost:3001/api`

### Series

- `GET /api/series` - Obtener todas las series
- `GET /api/series/:id` - Obtener una serie por ID
- `POST /api/series` - Crear nueva serie
- `PUT /api/series/:id` - Actualizar serie
- `DELETE /api/series/:id` - Eliminar serie

### Health Check

- `GET /api/health` - Verificar estado de la API

## 🔄 Flujo de Datos (Clean Architecture)

```
Usuario → Controller → Use Case → Repository → Entity
   ↓                                              ↓
Response ← Controller ← Use Case ← Repository ← Entity
```

**Ejemplo: Agregar una serie**

1. Usuario envía POST a `/api/series`
2. **Controller** recibe la petición
3. **Use Case** (AddSerie) valida y procesa
4. **Entity** (Serie) aplica reglas de negocio
5. **Repository** guarda en base de datos/memoria
6. Respuesta viaja de vuelta al usuario

## 🛠️ Tecnologías

### Frontend
- React 18
- React Router
- Material-UI (MUI)
- Vite

### Backend
- Node.js
- Express
- Clean Architecture
- ES Modules

## 📝 Próximos Pasos

- [ ] Implementar autenticación (JWT)
- [ ] Conectar a base de datos real (MongoDB/PostgreSQL)
- [ ] Agregar tests unitarios y de integración
- [ ] Implementar Games y Books endpoints
- [ ] Dockerizar la aplicación

## 🤝 Contribuir

1. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Commit: `git commit -m "Agregar nueva funcionalidad"`
3. Push: `git push origin feature/nueva-funcionalidad`
4. Crear Pull Request

## 📄 Licencia

ISC
