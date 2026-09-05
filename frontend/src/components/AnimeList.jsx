import { useLocalList } from '../hooks/useLocalList'
import MediaList from './MediaList'
import { animeListConfig } from '../config/ocioListConfigs'

const STORAGE_KEY = 'anime-list'
const initialAnimeData = [
  {
    title: "Re:Zero",
    episodes: 75,
    studio: "White Fox",
    year: 2016,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Frieren: Beyond Journey's End",
    episodes: 28,
    studio: "Madhouse",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Fairy Tail",
    episodes: 353,
    studio: "A-1 Pictures",
    year: 2009,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Danmachi",
    episodes: 70,
    studio: "J.C.Staff",
    year: 2015,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Bungo Stray Dogs",
    episodes: 60,
    studio: "Bones",
    year: 2016,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "To Your Eternity",
    episodes: 40,
    studio: "Brain's Base",
    year: 2021,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Shangri-La Frontier",
    episodes: 50,
    studio: "C2C",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Overlord",
    episodes: 52,
    studio: "Madhouse",
    year: 2015,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Ace of Diamond",
    episodes: 178,
    studio: "Madhouse / Production I.G",
    year: 2013,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Classroom of the Elite",
    episodes: 38,
    studio: "Lerche",
    year: 2017,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Daily Life of the Immortal King",
    episodes: 60,
    studio: "Haoliners Animation",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Log Horizon",
    episodes: 62,
    studio: "Satelight / Studio Deen",
    year: 2013,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Magi",
    episodes: 63,
    studio: "A-1 Pictures",
    year: 2012,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Detective Conan",
    episodes: 1130,
    studio: "TMS Entertainment",
    year: 1996,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Fire Force",
    episodes: 72,
    studio: "David Production",
    year: 2019,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Record of Ragnarok",
    episodes: 27,
    studio: "Graphinica",
    year: 2021,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "The Great Pretender",
    episodes: 23,
    studio: "Wit Studio",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Edens Zero",
    episodes: 50,
    studio: "J.C.Staff",
    year: 2021,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Trigun Stampede",
    episodes: 12,
    studio: "Orange",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Solo Leveling",
    episodes: 24,
    studio: "A-1 Pictures",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Dr. Stone",
    episodes: 58,
    studio: "TMS Entertainment",
    year: 2019,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Sakamoto Days",
    episodes: 12,
    studio: "TMS Entertainment",
    year: 2025,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Zenshu",
    episodes: 12,
    studio: "MAPPA",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "I Have a Crush at Work",
    episodes: 12,
    studio: "Unknown",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Medalist",
    episodes: 12,
    studio: "ENGI",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Orb: On the Movements of the Earth",
    episodes: 25,
    studio: "Madhouse",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Hell's Paradise",
    episodes: 13,
    studio: "MAPPA",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "My Hero Academia",
    episodes: 159,
    studio: "Bones",
    year: 2016,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Claymore",
    episodes: 26,
    studio: "Madhouse",
    year: 2007,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Kokkoku",
    episodes: 12,
    studio: "Geno Studio",
    year: 2018,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Noein: To Your Other Self",
    episodes: 24,
    studio: "Satelight",
    year: 2005,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Ninja Kamui",
    episodes: 13,
    studio: "E&H Production",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Future Diary",
    episodes: 26,
    studio: "Asread",
    year: 2011,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Zom 100",
    episodes: 12,
    studio: "Bug Films",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Dan Da Dan",
    episodes: 12,
    studio: "Science SARU",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Blue Exorcist",
    episodes: 50,
    studio: "A-1 Pictures",
    year: 2011,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Blue Box",
    episodes: 25,
    studio: "Telecom Animation Film",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "No. 6",
    episodes: 11,
    studio: "Bones",
    year: 2011,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Dragon Ball Daima",
    episodes: 20,
    studio: "Toei Animation",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Trillion Game",
    episodes: 24,
    studio: "Madhouse",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Übel Blatt",
    episodes: 12,
    studio: "LIDENFILMS",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Wistoria: Wand and Sword",
    episodes: 12,
    studio: "Actas / Bandai Namco Pictures",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "The Unwanted Undead Adventurer",
    episodes: 12,
    studio: "CONNECT",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Eden of the East",
    episodes: 11,
    studio: "Production I.G",
    year: 2009,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Honey Lemon Soda",
    episodes: 12,
    studio: "J.C.Staff",
    year: 2025,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Unnamed Memory",
    episodes: 12,
    studio: "ENGI",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Texhnolyze",
    episodes: 22,
    studio: "Madhouse",
    year: 2003,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Grimgar of Fantasy and Ash",
    episodes: 12,
    studio: "A-1 Pictures",
    year: 2016,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Berserk of Gluttony",
    episodes: 12,
    studio: "A.C.G.T.",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "The Kingdom of Ruin",
    episodes: 12,
    studio: "Yokohama Animation Lab",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Ragna Crimson",
    episodes: 24,
    studio: "Silver Link",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Plunderer",
    episodes: 24,
    studio: "Geek Toys",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Headhunter to Another World",
    episodes: 12,
    studio: "Unknown",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Baccano!",
    episodes: 16,
    studio: "Brain's Base",
    year: 2007,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "86 - Eighty Six",
    episodes: 23,
    studio: "A-1 Pictures",
    year: 2021,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Seraph of the End",
    episodes: 24,
    studio: "Wit Studio",
    year: 2015,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Arifureta",
    episodes: 38,
    studio: "Asread / MOTHER",
    year: 2019,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Ao Ashi",
    episodes: 24,
    studio: "Production I.G",
    year: 2022,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Noblesse",
    episodes: 13,
    studio: "Production I.G",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "The Devil is a Part-Timer!",
    episodes: 37,
    studio: "White Fox / Studio 3Hz",
    year: 2013,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Spy x Family",
    episodes: 37,
    studio: "Wit Studio / CloverWorks",
    year: 2022,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Moriarty the Patriot",
    episodes: 24,
    studio: "Production I.G",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "World's Finest Assassin",
    episodes: 12,
    studio: "Silver Link / Studio Palette",
    year: 2021,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Even Given the Worthless 'Appraiser' Class",
    episodes: 12,
    studio: "Okuruto Noboru",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Toilet-Bound Hanako-kun",
    episodes: 12,
    studio: "Lerche",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Golden Kamuy",
    episodes: 49,
    studio: "Geno Studio",
    year: 2018,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Ishura",
    episodes: 12,
    studio: "Passione",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Mashle",
    episodes: 24,
    studio: "A-1 Pictures",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  }
]

const AnimeList = ({ searchTerm = '' }) => {
  const list = useLocalList({ storageKey: STORAGE_KEY, initialData: initialAnimeData })
  return <MediaList searchTerm={searchTerm} config={animeListConfig} {...list} />
}

export default AnimeList

