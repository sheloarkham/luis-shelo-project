// Estructura de un juego:
/*
{
    title: String,        // Título del juego
    releaseYear: Number,  // Año de lanzamiento
    developer: String,    // Equipo de desarrollo
    duration: Number,     // Duración aproximada en horas
    image: String         // Ruta a la imagen del juego en la carpeta assets
}
*/

const games = [
    {
        title: "Hi-Fi RUSH",
        releaseYear: 2023,
        developer: "Tango Gameworks",
        duration: 12,
        image: "./assets/hifi.jpg",
        synopsis: "Un juego de acción rítmica donde Chai, un aspirante a rockstar con un brazo robótico, debe derrotar a una corporación malvada al ritmo de la música. Combina combate hack-and-slash con mecánicas musicales únicas.",
        Estado: "Jugando"
    },
    {
        title: "Assassin's Creed Valhalla",
        releaseYear: 2020,
        developer: "Ubisoft Montreal",
        duration: 60,
        image: "./assets/valhalla.jpg",
        synopsis: "Encarna a Eivor, un guerrero vikingo que lidera su clan desde Noruega hasta Inglaterra en el siglo IX. Construye asentamientos, forma alianzas y lucha contra sajones y templarios en una épica aventura nórdica.",
        Estado: "Pendiente"
    },
  
    {
        title: "Dead Space Remake",
        releaseYear: 2023,
        developer: "Motive Studio",
        duration: 12,
        image: "assets/deadspace.jpg",
        synopsis: "Isaac Clarke, ingeniero de sistemas, debe sobrevivir en una estación espacial infestada de criaturas alienígenas llamadas Necromorphs. Un remake del clásico survival horror con gráficos modernos y terror psicológico.",
        Estado: "Pendiente"
    },
    {
        title: "Dragon Age 2",
        releaseYear: 2011,
        developer: "BioWare",
        duration: 25,
        image: "assets/dragonage2.jpg",
        synopsis: "Hawke escapa de la destrucción de Lothering y se convierte en el Campeón de Kirkwall. Una historia centrada en las tensiones entre magos y templarios que cambiará el destino del mundo de Thedas para siempre.",
        Estado: "Completado"
    },
    {
        title: "Dragon Age: Inquisition",
        releaseYear: 2014,
        developer: "BioWare",
        duration: 45,
        image: "assets/dragonageinquisition.jpg",
        synopsis: "Como Inquisidor, debes cerrar una brecha en el cielo que amenaza con destruir el mundo. Lidera la Inquisición, forja alianzas políticas y enfrenta al misterioso Corifeo en esta épica aventura de fantasía.",
        Estado: "Completado"
    },
    {
        title: "Gris",
        releaseYear: 2018,
        developer: "Nomada Studio",
        duration: 4,
        image: "assets/gris.jpg",
        synopsis: "Una joven despierta en un mundo sin color tras perder su voz. Un hermoso viaje emocional a través de etapas del duelo, donde la protagonista debe restaurar el color y la vida a su mundo mediante puzles y plataformas.",
        Estado: "Completado"
    },

    {
        title: "Kona",
        releaseYear: 2017,
        developer: "Parabole",
        duration: 4,
        image: "assets/kona.jpg",
        synopsis: "Carl Faubert, un detective privado, llega a un pueblito de Quebec en 1970 para investigar actos de vandalismo. Pero una tormenta de nieve sobrenatural lo atrapa en un misterio que desafía la realidad.",
        Estado: "Completado"
    },
    {
        title: "Kona II: Brume",
        releaseYear: 2023,
        developer: "Parabole",
        duration: 6,
        image: "assets/kona 2.jpg",
        synopsis: "Carl Faubert regresa para investigar una misteriosa bruma que ha envuelto el norte de Canadá. Con nuevos aliados y más misterios sobrenaturales, deberá descubrir la verdad detrás de los extraños fenómenos.",
        Estado: "Completado"
    },
    {
        title: "Ghostbusters: The Video Game Remastered",
        releaseYear: 2019,
        developer: "Saber Interactive",
        duration: 10,
        image: "assets/ghostbusters.jpg",
        synopsis: "Únete a los Cazafantasmas originales como un nuevo recluta en 1991. Experimenta una nueva aventura con las voces originales del reparto de la película, enfrentando fantasmas con equipos auténticos en Nueva York.",
        Estado: "Completado"
    },
    {
        title: "Exoprimal",
        releaseYear: 2023,
        developer: "Capcom",
        duration: 15,
        image: "assets/exoprimal.jpg",
        synopsis: "En 2040, los dinosaurios aparecen misteriosamente através de portales. Como piloto de un exosuit de última generación, debes trabajar en equipo para completar misiones y descubrir la verdad detrás de estos brotes de dinosaurios.",
        Estado: "Completado"
    },
    {
        title: "Harold Halibut",
        releaseYear: 2024,
        developer: "Slow Bros",
        duration: 12,
        image: "assets/harol.png",
        synopsis: "Harold vive en una nave espacial que ha estado sumergida en un océano alienígena por décadas. Una aventura narrativa hecha completamente con modelos físicos y stop-motion sobre amistad, propósito y encontrar tu lugar en el mundo.",
        Estado: "Pendiente ver en yotube"
    },
    {
        title: "Star Wars Jedi: Survivor",
        releaseYear: 2023,
        developer: "Respawn Entertainment",
        duration: 20,
        image: "assets/jedisur.jpg",
        synopsis: "Cal Kestis continúa su viaje como Jedi superviviente cinco años después de los eventos de Fallen Order. Explora nuevos planetas, domina nuevas habilidades de la Fuerza y enfrenta al Imperio en esta secuela épica.",
        Estado: "Pendiente"
    },
    {
        title: "Too Human",
        releaseYear: 2008,
        developer: "Silicon Knights",
        duration: 10,
        image: "assets/toohuman.png",
        synopsis: "Baldur, un cyber-guerrero nórdico, debe defender a la humanidad de una invasión de máquinas en un mundo donde la mitología nórdica se mezcla con la ciencia ficción. Un RPG de acción que reimagina a los dioses como cyborgs.",
        Estado: "Completado"
    },
    {
        title: "South Park: The Fractured But Whole",
        releaseYear: 2017,
        developer: "Ubisoft San Francisco",
        duration: 20,
        image: "assets/south.jpg",
        synopsis: "Los niños de South Park se convierten en superhéroes para salvar su ciudad. Un RPG lleno del humor irreverente característico de la serie, con combate por turnos y una historia que parodia el género superheroico.",
        Estado: "Completado"
    },
    {
        title: "Super Meat Boy",
        releaseYear: 2010,
        developer: "Team Meat",
        duration: 15,
        image: "assets/meet.jpg",
        synopsis: "Meat Boy debe rescatar a su novia Bandage Girl del malvado Dr. Fetus. Un plataformas indie súper desafiante que requiere precisión perfecta y reflejos rápidos, con niveles que ponen a prueba hasta el jugador más hábil.",
        Estado: "Completado"
    },
    {
        title: "Crackdown",
        releaseYear: 2007,
        developer: "Realtime Worlds",
        duration: 12,
        image: "assets/crackdown.png",
        synopsis: "Como un super agente genéticamente modificado, debes limpiar Pacific City de tres organizaciones criminales. Un sandbox de acción con habilidades que evolucionan y la libertad de abordar cada situación como quieras.",
        Estado: "Completado"
    },
    {
        title: "Tales from the Borderlands",
        releaseYear: 2014,
        developer: "Telltale Games",
        duration: 10,
        image: "assets/talesfrom.jpg",
        synopsis: "Rhys y Fiona buscan una misteriosa bóveda en el planeta Pandora. Una aventura narrativa episódica que combina el humor de Borderlands con el storytelling de Telltale Games, llena de decisiones que afectan la historia.",
        Estado: "Completado"
    },
    {
        title: "Alan Wake 2",
        releaseYear: 2023,
        developer: "Remedy Entertainment",
        duration: 20,
        image: "./assets/alanwake.jpg",
        synopsis: "Trece años después de su desaparición, Alan Wake lucha por escapar del Dark Place mientras la agente del FBI Saga Anderson investiga una serie de asesinatos rituales. Un thriller psicológico que mezcla realidad y pesadilla.",
        Estado: "Pendiente"
    },
    {
        title: "Game of Thrones: A Telltale Games Series",
        releaseYear: 2014,
        developer: "Telltale Games",
        duration: 15,
        image: "./assets/juegotronos.jpg",
        synopsis: "Sigue la historia de la Casa Forrester, vassallos de los Stark, durante los eventos de la serie de TV. Toma decisiones difíciles que determinaran el destino de la familia en este juego narrativo basado en el universo de George R.R. Martin.",
        Estado: "Pendiente"
    },
    {
        title: "Resident Evil 4 Remake",
        releaseYear: 2023,
        developer: "Capcom",
        duration: 16,
        image: "assets/re4remake.jpeg",
        synopsis: "Leon S. Kennedy, agente especial del gobierno, debe rescatar a la hija del presidente de un pueblo rural europeo infectado por un parásito misterioso. Un remake moderno del clásico survival horror con gráficos de nueva generación.",
        Estado: "Completado"
    }
];