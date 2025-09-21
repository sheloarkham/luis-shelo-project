// Estructura de un libro:
/*
{
    title: String,        // Título del libro
    author: String,       // Autor del libro
    releaseYear: Number,  // Año de publicación original
    pages: Number,        // Número de páginas
    image: String,        // Ruta a la imagen del libro en la carpeta assetsB
    synopsis: String,     // Sinopsis del libro
    Estado: String        // Estado de lectura (e.g., "Leyendo", "Pendiente", "Leido")
}
*/

const books = [
    {
        title: "El Hombre Invisible",
        author: "H. G. Wells",
        releaseYear: 1897,
        pages: 192,
        image: "./assetsB/invisible.png",
        synopsis: "Griffin, un científico brillante, descubre la fórmula para volverse invisible, pero su experimento lo condena a una existencia de aislamiento y locura. Una reflexión sobre el poder, la moralidad y las consecuencias de la ciencia sin ética.",
        Estado: "Leyendo"
    },
    {
        title: "La Amortajada",
        author: "María Luisa Bombal",
        releaseYear: 1938,
        pages: 142,
        image: "./assetsB/amortajda.jpg",
        synopsis: "Ana María, desde su ataúd, rememora su vida, sus amores y desamores. Una obra pionera del realismo mágico latinoamericano que explora la condición femenina y la muerte desde una perspectiva poética y surrealista.",
        Estado: "Leido"
    },
    {
        title: "Cartas a Lucilio",
        author: "Séneca",
        releaseYear: 65,
        pages: 448,
        image: "./assetsB/lucilio.png",
        synopsis: "Una colección de 124 cartas donde el filósofo estoico Séneca comparte con su amigo Lucilio reflexiones sobre la virtud, la sabiduría, la muerte y cómo vivir una vida plena. Una guía práctica de filosofía estoica.",
        Estado: "Pendiente"
    },
    {
        title: "Maus",
        author: "Art Spiegelman",
        releaseYear: 1991,
        pages: 296,
        image: "./assetsB/mauz.jpg",
        synopsis: "Art Spiegelman narra la historia de su padre, superviviente del Holocausto, representando a los judíos como ratones y a los nazis como gatos. Una novela gráfica pionera que aborda el trauma intergeneracional y la memoria histórica.",
        Estado: "Pendiente"
    },
    {
        title: "El Aleph",
        author: "Jorge Luis Borges",
        releaseYear: 1949,
        pages: 224,
        image: "./assetsB/aleph.png",
        synopsis: "Una colección de cuentos que incluye la famosa historia del Aleph, un punto en el espacio que contiene todos los otros puntos del universo. Borges explora temas de infinito, literatura y realidad con su característico estilo laberíntico.",
        Estado: "Pendiente"
    },
    {
        title: "Persépolis",
        author: "Marjane Satrapi",
        releaseYear: 2000,
        pages: 352,
        image: "./assetsB/persepolis.png",
        synopsis: "Marjane crece durante la Revolución Islámica en Irán y luego como adolescente en Europa. Una autobiografía en novela gráfica que retrata con humor y dolor la búsqueda de identidad entre dos culturas en tiempos turbulentos.",
        Estado: "Pendiente"
    },
    {
        title: "No tengo boca y debo gritar",
        author: "Harlan Ellison",
        releaseYear: 1967,
        pages: 162,
        image: "./assetsB/notengoboca.png",
        synopsis: "Cinco humanos son torturados eternamente por AM, una supercomputadora que ha exterminado a la humanidad. Una escalofriante colección de ciencia ficción que explora temas de sufrimiento, venganza y la naturaleza del mal artificial.",
        Estado: "Pendiente"
    },
    {
        title: "Percy Jackson y el ladrón del rayo",
        author: "Rick Riordan",
        releaseYear: 2005,
        pages: 384,
        image: "./assetsB/percy.png",
        synopsis: "Percy descubre que es hijo de Poseidón y debe encontrar el rayo maestro de Zeus antes de que estalle una guerra entre los dioses. Primera entrega de una saga que mezcla mitología griega con aventuras modernas para adolescentes.",
        Estado: "Leido"
    },
    {
        title: "Rebelión en la granja",
        author: "George Orwell",
        releaseYear: 1945,
        pages: 144,
        image: "./assetsB/rebelion.png",
        Estado: "Leido"
    },
    {
        title: "Mapas de Significado: La arquitectura de la creencia",
        author: "Jordan B. Peterson",
        releaseYear: 1999,
        pages: 564,
        image: "./assetsB/mapasdel.png",
        synopsis: "Peterson explora cómo los seres humanos construyen significado a través de mitos, religiones y narrativas. Un análisis profundo que combina psicología, neurociencia, filosofía y mitología para entender la condición humana.",
        Estado: "Pendiente"
    },
    {
        title: "From Hell",
        author: "Alan Moore",
        releaseYear: 1989,
        pages: 572,
        image: "./assetsB/fromhell.png",
        synopsis: "Una interpretación ficticia de los asesinatos de Jack el Destripador en el Londres victoriano. Moore teje una compleja teoría conspirativa que involucra a la realeza, la masonería y el ocultismo en esta obra maestra del cómic adulto.",
        Estado: "Pendiente"
    },
    {
        title: "12 Reglas para vivir: Un antídoto al caos",
        author: "Jordan B. Peterson",
        releaseYear: 2018,
        pages: 409,
        image: "./assetsB/12 reglas.png",
        synopsis: "Doce principios profundos para vivir una vida significativa, desde 'Ordena tu habitación' hasta 'Acaricia a un gato cuando te encuentres uno en la calle'. Peterson combina psicología clínica, filosofía y sabiduría práctica.",
        Estado: "Leido"
    },
    {
        title: "El Psicoanalista",
        author: "John Katzenbach",
        releaseYear: 2002,
        pages: 544,
        image: "./assetsB/psico.png",
        synopsis: "El Dr. Frederick Starks recibe una carta anónima que le da 15 días para suicidarse o enfrentar las consecuencias. Un thriller psicológico intenso donde debe descubrir la identidad de su torturador mientras su vida se desmorona.",
        Estado: "Leido"
    },
    {
        title: "1984",
        author: "George Orwell",
        releaseYear: 1949,
        pages: 326,
        image: "./assetsB/1984.png",
        synopsis: "Winston Smith vive en Oceanía, una sociedad totalitaria donde el Gran Hermano vigila cada movimiento. La novela distópica definitiva sobre vigilancia masiva, control del pensamiento y la lucha por la libertad individual contra el Estado.",
        Estado: "Leido"
    },
    {
        title: "Black Paradox",
        author: "Junji Ito",
        releaseYear: 2009,
        pages: 248,
        image: "./assetsB/blackpa.png",
        synopsis: "Cuatro jóvenes con tendencias suicidas se conocen en un foro de internet y planean suicidarse juntos. Pero su encuentro desencadena eventos sobrenaturales y grotescos típicos del maestro del horror japonés Junji Ito.",
        Estado: "Leido"
    },
    {
        title: "El Túnel",
        author: "Ernesto Sabato",
        releaseYear: 1948,
        pages: 165,
        image: "./assetsB/tunel.png",
        synopsis: "Juan Pablo Castel, desde la cárcel, narra por qué mató a María Iribarne, la única mujer que comprendía su arte. Una novela existencialista sobre la incomunicación humana, la soledad y la obsesión amorosa destructiva.",
        Estado: "Leido"
    }
];
