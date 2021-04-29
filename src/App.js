import {useState,useEffect} from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Header from './components/Header'

const url = 'https://api.jikan.moe/v3'

function App() {

  const [animeList,setAnimeList] = useState([])
  const [topAnime,setTopAnime] = useState([])
  const [search,setSearch] = useState('')

  const getTopAnime = async () => {
    const response = await fetch(url+'/top/anime/1/bypopularity')
    const temp = await response.json()

    setTopAnime(temp.top.slice(0,11))
  }

  const handleSearch = e => {
    e.preventDefault()

    fetchAnime(search)
  }

  const fetchAnime = async (query) => {
    const response = await fetch(url+'/search/anime?q='+query+'&order_by=title&sort=asc&limit=10')

    const temp = await response.json()

    setAnimeList(temp.results)
  }

  useEffect(() => {
    getTopAnime()
  },[])

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent handleSearch={handleSearch}
          search={search} setSearch={setSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
}

export default App;
