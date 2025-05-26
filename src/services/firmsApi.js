import axios from 'axios'
import { format, subDays } from 'date-fns'

const NASA_FIRMS_API_KEY = import.meta.env.VITE_NASA_FIRMS_API_KEY
const FIRMS_BASE_URL = 'https://firms.modaps.eosdis.nasa.gov/api/area/csv'

// Determine if we're in production (Azure) or development (local)
const isProduction = import.meta.env.PROD

export const fetchFireData = async (selectedDate) => {
  try {
    console.log('FIRMS API Key exists:', !!NASA_FIRMS_API_KEY)
    console.log('Environment:', isProduction ? 'Production' : 'Development')
    
    // Use a wider date range to ensure we get some data
    const endDate = format(selectedDate, 'yyyy-MM-dd')
    const startDate = format(subDays(selectedDate, 7), 'yyyy-MM-dd') // Look back 7 days
    
    console.log('Fetching fires from', startDate, 'to', endDate)
    
    const north = 52.4
    const south = 44.3
    const east = 40.3
    const west = 22.1
    
    // Area parameter for FIRMS API
    const area = `${west},${south},${east},${north}`
    
    // Try both MODIS and VIIRS satellites
    const satellites = ['VIIRS_SNPP_NRT', 'MODIS_NRT']
    
    let allFires = []
    
    for (const satellite of satellites) {
      try {
        console.log('Trying satellite:', satellite)
        
        let csvData
        
        if (isProduction) {
          // In production, use the proxy
          const queryParams = new URLSearchParams({
            area: area,
            dayRange: 7,
            date: startDate,
            satellite: satellite
          })
          
          const response = await fetch(`/api/firms?${queryParams}`)
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          csvData = await response.text()
        } else {
          // In development, use direct API call
          const url = `${FIRMS_BASE_URL}/${NASA_FIRMS_API_KEY}/${satellite}/${area}/7/${startDate}`
          console.log('Trying URL:', url.replace(NASA_FIRMS_API_KEY, 'API_KEY'))
          
          const response = await axios.get(url)
          csvData = response.data
        }
        
        if (csvData && csvData.trim()) {
          const lines = csvData.trim().split('\n')
          console.log('Response lines:', lines.length)
          
          if (lines.length > 1) {
            const headers = lines[0].split(',')
            const fires = lines.slice(1).map(line => {
              const values = line.split(',')
              const fire = {}
              headers.forEach((header, index) => {
                fire[header.trim()] = values[index]
              })
              
              // Ensure we have the required fields
              fire.latitude = parseFloat(fire.latitude)
              fire.longitude = parseFloat(fire.longitude)
              fire.bright_ti4 = parseFloat(fire.bright_ti4 || fire.brightness || 300)
              fire.confidence = fire.confidence || 'nominal'
              
              return fire
            })
            
            allFires = allFires.concat(fires)
          }
        }
      } catch (err) {
        console.error('Error with satellite data:', err.message)
      }
    }
    
    console.log('Total fires found:', allFires.length)
    
    // If still no fires, return mock data
    if (allFires.length === 0) {
      console.log('No fires found, using mock data')
      return getMockFireData()
    }
    
    return allFires
    
  } catch (error) {
    console.error('FIRMS API Error:', error)
    return getMockFireData()
  }
}

const getMockFireData = () => {
  console.log('Using mock fire data')
  const mockFires = []
  const cities = [
    { name: 'Kyiv', lat: 50.4501, lon: 30.5234 },
    { name: 'Kharkiv', lat: 49.9935, lon: 36.2304 },
    { name: 'Odesa', lat: 46.4825, lon: 30.7233 },
    { name: 'Dnipro', lat: 48.4647, lon: 35.0462 },
    { name: 'Mariupol', lat: 47.0975, lon: 37.5497 }
  ]
  
  cities.forEach(city => {
    for (let i = 0; i < 2; i++) {
      mockFires.push({
        latitude: city.lat + (Math.random() - 0.5) * 0.2,
        longitude: city.lon + (Math.random() - 0.5) * 0.2,
        bright_ti4: 300 + Math.random() * 200,
        confidence: Math.random() > 0.3 ? 'nominal' : 'high',
        acq_date: format(new Date(), 'yyyy-MM-dd'),
        acq_time: format(new Date(), 'HHmm')
      })
    }
  })
  
  return mockFires
}