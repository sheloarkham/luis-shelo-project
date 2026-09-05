export const whiteStrokeSx = {
  color: '#ffffff',
  textShadow: `
    -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000,
    0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000, 1px 0 0 #000
  `,
}

export const IMPERDIBLES = [
  {
    id: 1,
    name: 'Cristo Redentor',
    image: '/images/rio/cristo-redentor.png',
    description: 'El ícono de Río en el Corcovado, con vistas increíbles de toda la ciudad.',
  },
  {
    id: 2,
    name: 'Pan de Azúcar',
    image: '/images/rio/pan-de-azucar.png',
    description: 'Subir en el bondinho y ver la bahía desde las alturas.',
  },
  {
    id: 3,
    name: 'AquaRio',
    image: '/images/rio/aquario.png',
    description: 'El acuario marino más grande de Brasil, con túnel submarino.',
  },
]

export const OTRAS_ACTIVIDADES = [
  { name: 'Playa de Copacabana', emoji: '🏖️', description: 'Camina por la orilla, mira el atardecer y prueba un açaí.', layout: 'hero' },
  { name: 'Playa de Ipanema', emoji: '🌊', description: 'Famosa por su ambiente, los morros y el posto de sol.', layout: 'tall' },
  { name: 'Escadaria Selarón', emoji: '🎨', description: 'Escaleras coloridas en Lapa, perfectas para fotos juntos.', layout: 'default' },
  { name: 'Jardim Botânico', emoji: '🌿', description: 'Paseo entre palmeras, orquídeas y naturaleza tropical.', layout: 'default' },
  { name: 'Maracaná', emoji: '⚽', description: 'Visitar el templo del fútbol brasileño y sentir la pasión.', layout: 'default' },
  { name: 'Feira de São Cristóvão', emoji: '🎶', description: 'Música, comida nordestina y ambiente de fiesta.', layout: 'wide' },
]

export const YENI_PHOTOS = [
  { id: 1, src: '/assetsAmor/IMG-20250223-WA0022.jpg', caption: 'Nuestros momentos juntos 💕' },
  { id: 2, src: '/assetsAmor/IMG-20250711-WA0013.jpg', caption: 'Siempre felices 🥰' },
  { id: 3, src: '/assetsAmor/IMG_20240404_171933.jpg', caption: 'Te amo cada día más ❤️' },
  { id: 4, src: '/assetsAmor/IMG-20240509-WA0023.jpg', caption: 'Recuerdos inolvidables 💖' },
  { id: 5, src: '/assetsAmor/IMG-20240509-WA0061.jpg', caption: 'Juntos para siempre 🌟' },
  { id: 6, src: '/assetsAmor/IMG-20241112-WA0024.jpg', caption: 'Amor verdadero 💞' },
  { id: 7, src: '/assetsAmor/IMG-20241112-WA0025.jpg', caption: 'Nuestra felicidad 😊' },
  { id: 8, src: '/assetsAmor/IMG-20241117-WA0012.jpg', caption: 'Momentos especiales 🥰' },
  { id: 9, src: '/assetsAmor/IMG-20250122-WA0002.jpg', caption: 'Siempre unidos 💑' },
  { id: 10, src: '/assetsAmor/IMG-20250316-WA0009.jpg', caption: 'Mi amor por ti crece 🌹' },
  { id: 11, src: '/assetsAmor/IMG-20250504-WA0034.jpg', caption: 'Contigo todo es mejor 💝' },
  { id: 12, src: '/assetsAmor/IMG_20240328_235414_003.jpg', caption: 'Eres mi todo 💫' },
  { id: 13, src: '/assetsAmor/IMG_20240404_171408.jpg', caption: 'Te amaré por siempre 💗' },
]

export const BRASIL_AUDIO_SRC = '/audio/brasil-bossa.mp3'
export const BRASIL_AUDIO_VOLUME = 0.45
export const BRASIL_AUDIO_START = 27

export const setBrasilAudioStart = (audio) => {
  if (!audio) return
  audio.currentTime = BRASIL_AUDIO_START
}
