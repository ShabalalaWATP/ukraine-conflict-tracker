import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'
import { UKRAINE_CENTER, MAP_CONFIG } from '../../utils/constants'

const Map = ({ fireData }) => {
  useEffect(() => {
    // Fix for default markers issue in React-Leaflet
    delete window.L.Icon.Default.prototype._getIconUrl
    window.L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }, [])

  const getFireColor = (confidence) => {
    return confidence === 'high' ? '#ff4444' : '#ff8800'
  }

  const getFireRadius = (brightness) => {
    // Scale radius based on brightness (300-500 range)
    const minRadius = 8
    const maxRadius = 20
    const scaledBrightness = Math.min(Math.max(brightness - 300, 0), 200) / 200
    return minRadius + (maxRadius - minRadius) * scaledBrightness
  }

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[UKRAINE_CENTER.lat, UKRAINE_CENTER.lng]}
        zoom={MAP_CONFIG.defaultZoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        className="leaflet-map"
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {fireData.map((fire, index) => (
          <CircleMarker
            key={`fire-${index}-${fire.latitude}-${fire.longitude}`}
            center={[fire.latitude, fire.longitude]}
            radius={getFireRadius(fire.bright_ti4)}
            fillColor={getFireColor(fire.confidence)}
            color={getFireColor(fire.confidence)}
            weight={2}
            opacity={0.8}
            fillOpacity={0.6}
            className="fire-marker"
          >
            <Popup className="fire-popup">
              <div className="popup-content">
                <h4>Fire Detection</h4>
                <p><strong>Confidence:</strong> {fire.confidence}</p>
                <p><strong>Brightness:</strong> {fire.bright_ti4?.toFixed(1)}K</p>
                <p><strong>Date:</strong> {fire.acq_date}</p>
                <p><strong>Time:</strong> {fire.acq_time}</p>
                <p><strong>Coordinates:</strong><br/>
                  {fire.latitude.toFixed(4)}, {fire.longitude.toFixed(4)}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      
      <div className="map-overlay">
        <div className="fire-count">
          <span className="count-number">{fireData.length}</span>
          <span className="count-label">Active Detections</span>
        </div>
      </div>
    </div>
  )
}

export default Map