import './Header.css'
import { format } from 'date-fns'

const Header = ({ onDateChange, selectedDate }) => {
  const handleDateChange = (e) => {
    onDateChange(new Date(e.target.value))
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">
            <span className="ukraine-blue">Ukraine</span>
            <span className="ukraine-yellow"> Conflict Tracker</span>
          </h1>
          <p className="header-subtitle">
            Real-time satellite fire detection & explosion news monitoring
          </p>
        </div>
        
        <div className="header-right">
          <div className="date-selector">
            <label htmlFor="date-picker">Select Date:</label>
            <input
              id="date-picker"
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={handleDateChange}
              max={format(new Date(), 'yyyy-MM-dd')}
              className="date-input"
            />
          </div>
          
          <div className="legend">
            <div className="legend-item">
              <span className="legend-dot fire-high"></span>
              <span>High Confidence Fire</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot fire-nominal"></span>
              <span>Nominal Confidence Fire</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header