export const seriesListConfig = {
  sectionId: 'series',
  title: 'Series',
  titleSx: { color: '#FFD700', fontWeight: 'bold', mb: 4, textAlign: 'center' },
  emptyLabel: 'series',
  allCompletedMessage: 'Ya viste todas las series',
  activeGroups: [
    { status: 'Viendo', label: 'Viendo', color: '#FFD700' },
    { status: 'Pendiente', label: 'Pendiente', color: '#FFD700' },
  ],
  menuItems: [
    { status: 'Viendo', label: 'Marcar como Viendo' },
    { status: 'Pendiente', label: 'Marcar como Pendiente' },
    { status: 'Completado', label: 'Marcar como Completado' },
  ],
  allowDelete: true,
  cardStyle: 'series',
  titleColor: '#FFD700',
  menuButtonColor: '#FFD700',
  getCardBackground: (estado) => {
    switch (estado) {
      case 'Viendo':
        return 'linear-gradient(135deg, rgba(255, 0, 150, 0.2), rgba(0, 204, 255, 0.2))'
      case 'Pendiente':
        return 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 0, 0.2))'
      case 'Completado':
        return 'linear-gradient(135deg, rgba(0, 255, 127, 0.2), rgba(0, 128, 255, 0.2))'
      default:
        return 'rgba(255, 255, 255, 0.05)'
    }
  },
  getChipSx: (estado) => ({
    mt: 0.75,
    height: 20,
    fontSize: '0.65rem',
    background:
      estado === 'Completado'
        ? 'linear-gradient(135deg, #00FF7F, #0080FF)'
        : estado === 'Viendo'
          ? 'linear-gradient(135deg, #FF0096, #00CCFF)'
          : 'linear-gradient(135deg, #FFD700, #FF8C00)',
    color: '#000',
    fontWeight: 'bold',
  }),
  getCardExtraSx: () => ({
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 12px 24px rgba(255, 215, 0, 0.35)',
    },
  }),
  getMetaLines: (item) => [`${item.year} • ${item.episodes} episodios`],
}

export const gamesListConfig = {
  sectionId: 'games',
  title: 'Videojuegos',
  titleSx: { mb: 3, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
  emptyLabel: 'juegos',
  allCompletedMessage: 'Ya completaste todos los juegos',
  activeGroups: [
    { status: 'Jugando', label: 'Jugando', color: '#a78bfa' },
    { status: 'Pendiente', label: 'Pendiente', color: '#fbbf24' },
  ],
  menuItems: [
    { status: 'Pendiente', label: 'Pendiente' },
    { status: 'Jugando', label: 'Jugando' },
    { status: 'Completado', label: 'Completado' },
  ],
  allowDelete: true,
  cardStyle: 'solid',
  getCardBackground: (estado) => {
    switch (estado) {
      case 'Jugando':
        return 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)'
      case 'Pendiente':
        return 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
      case 'Completado':
        return 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      default:
        return 'rgba(255, 255, 255, 0.9)'
    }
  },
  getMetaLines: (item) => [
    `${item.releaseYear} • ${item.developer}`,
    `${item.duration} horas`,
  ],
}

export const booksListConfig = {
  sectionId: 'books',
  title: 'Libros',
  titleSx: { mb: 3, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
  emptyLabel: 'libros',
  allCompletedMessage: 'Ya leíste todos los libros',
  activeGroups: [
    { status: 'Leyendo', label: 'Leyendo', color: '#60a5fa' },
    { status: 'Pendiente', label: 'Pendiente', color: '#fb923c' },
  ],
  menuItems: [
    { status: 'Pendiente', label: 'Pendiente' },
    { status: 'Leyendo', label: 'Leyendo' },
    { status: 'Leido', label: 'Leído' },
  ],
  allowDelete: true,
  cardStyle: 'book',
  getCardBackground: (estado) => {
    switch (estado) {
      case 'Leyendo':
        return 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
      case 'Pendiente':
        return 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
      case 'Leido':
        return 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
      default:
        return 'rgba(255, 255, 255, 0.9)'
    }
  },
  getMetaLines: (item) => [item.author, `${item.releaseYear} • ${item.pages} pág.`],
}

export const animeListConfig = {
  sectionId: null,
  title: 'Anime',
  titleSx: { mb: 3, fontWeight: 'bold', color: '#ff6b6b' },
  emptyLabel: 'animes',
  allCompletedMessage: 'Ya viste todo el anime',
  activeGroups: [
    { status: 'Viendo', label: 'Viendo', color: '#667eea' },
    { status: 'Pendiente', label: 'Pendiente', color: '#f5576c' },
  ],
  menuItems: [
    { status: 'Pendiente', label: 'Pendiente' },
    { status: 'Viendo', label: 'Viendo' },
    { status: 'Completado', label: 'Completado' },
  ],
  allowDelete: true,
  cardStyle: 'solid',
  getCardBackground: (estado) => {
    switch (estado) {
      case 'Viendo':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      case 'Pendiente':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      case 'Completado':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      default:
        return 'rgba(255, 255, 255, 0.9)'
    }
  },
  getMetaLines: (item) => [`${item.studio} • ${item.year}`, `${item.episodes} episodios`],
}
