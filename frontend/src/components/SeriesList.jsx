import { useLocalList } from '../hooks/useLocalList'
import MediaList from './MediaList'
import { seriesListConfig } from '../config/ocioListConfigs'

const STORAGE_KEY = 'series-list'
const initialSeriesData = [
  { title: "Mayans M.C.", episodes: 50, year: 2018, image: "/series.png", Estado: "Pendiente" },
  { title: "Percy Jackson and the Olympians", episodes: 8, year: 2023, image: "/series.png", Estado: "Pendiente" },
  { title: "Daredevil: Born Again", episodes: 9, year: 2025, image: "/series.png", Estado: "Pendiente" },
  { title: "Black Mirror T7", episodes: 6, year: 2025, image: "/series.png", Estado: "Pendiente" },
  { title: "Secret Level", episodes: 15, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "Love, Death & Robots T3", episodes: 9, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "The Pitt", episodes: 15, year: 2025, image: "/series.png", Estado: "Pendiente" },
  { title: "Efectos Colaterales", episodes: 10, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "Tierra de Mafia", episodes: 10, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "The Bear T4", episodes: 10, year: 2025, image: "/series.png", Estado: "Pendiente" },
  { title: "El Eternauta", episodes: 6, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "Adolescencia", episodes: 4, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "The White Lotus T3", episodes: 7, year: 2025, image: "/series.png", Estado: "Pendiente" },
  { title: "El Juego del Calamar T2 & T3", episodes: 13, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "Murderbot", episodes: 10, year: 2025, image: "/series.png", Estado: "Pendiente" },
  { title: "The Penguin", episodes: 8, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "Creature Commandos", episodes: 7, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "Sandman T2", episodes: 12, year: 2025, image: "/series.png", Estado: "Pendiente" },
  { title: "Twilight of the Gods", episodes: 8, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "Dune: Prophecy", episodes: 6, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "3 Body Problem", episodes: 8, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "Berlin", episodes: 8, year: 2023, image: "/series.png", Estado: "Pendiente" },
  { title: "Severance", episodes: 9, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "Ted Lasso", episodes: 34, year: 2020, image: "/series.png", Estado: "Pendiente" },
  { title: "House of the Dragon T2", episodes: 8, year: 2024, image: "/series.png", Estado: "Pendiente" },
  { title: "Casa de Papel Korea", episodes: 12, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "Night Sky", episodes: 8, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "Resident Evil", episodes: 8, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "Russian Doll", episodes: 14, year: 2019, image: "/series.png", Estado: "Pendiente" },
  { title: "Archive 81", episodes: 8, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "Los Anillos de Poder", episodes: 8, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "El Paciente", episodes: 10, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "Tokyo Vice", episodes: 18, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "Andor T2", episodes: 12, year: 2025, image: "/series.png", Estado: "Pendiente" },
  { title: "Irma Vep", episodes: 8, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "Under the Banner of Heaven", episodes: 7, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "Pachinko", episodes: 8, year: 2022, image: "/series.png", Estado: "Pendiente" },
  { title: "For All Mankind", episodes: 40, year: 2019, image: "/series.png", Estado: "Pendiente" }
]

const SeriesList = ({ searchTerm = '' }) => {
  const list = useLocalList({ storageKey: STORAGE_KEY, initialData: initialSeriesData })
  return <MediaList searchTerm={searchTerm} config={seriesListConfig} {...list} />
}
export default SeriesList


