import './Loading.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h2 className="loading-title">Loading Conflict Data</h2>
        <p className="loading-text">Fetching satellite imagery and news reports...</p>
      </div>
    </div>
  )
}

export default Loading