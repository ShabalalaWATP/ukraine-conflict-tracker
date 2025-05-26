import { useState, useEffect } from 'react'
import './App.css'
import Map from './components/Map/Map'
import News from './components/News/News'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading'
import NewsSearch from './components/NewsSearch/NewsSearch'
import { fetchFireData } from './services/firmsApi'
import { fetchNewsData } from './services/newsApi'

function App() {
  const [fireData, setFireData] = useState([])
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [newsSearchParams, setNewsSearchParams] = useState({
    keywords: 'attack missile drone explosion killed death fire',
    days: 3
  })

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const [fires, news] = await Promise.all([
          fetchFireData(selectedDate),
          fetchNewsData(newsSearchParams)
        ])
        
        setFireData(fires)
        setNewsData(news)
      } catch (err) {
        setError(err.message)
        console.error('Error loading data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedDate, newsSearchParams])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleNewsSearchChange = (searchParams) => {
    setNewsSearchParams(searchParams)
  }

  return (
    <div className="app">
      <Header onDateChange={handleDateChange} selectedDate={selectedDate} />
      
      <div className="content-wrapper">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="error-message">
            <h2>Error loading data</h2>
            <p>{error}</p>
          </div>
        ) : (
          <div className="main-content">
            <div className="map-container">
              <Map fireData={fireData} />
            </div>
            <div className="news-section">
              <NewsSearch 
                onSearchChange={handleNewsSearchChange}
                currentFilters={newsSearchParams}
              />
              <div className="news-container">
                <News newsData={newsData} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <footer className="app-footer">
        <p className="footer-credit">Created by Alex Orr as part of JHUB Module 9</p>
        <p className="footer-apis">
          Powered by <a href="https://firms.modaps.eosdis.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA FIRMS API</a> and <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">News API</a>
        </p>
      </footer>
    </div>
  )
}

export default App