import { useState } from 'react'
import './NewsSearch.css'
import { format, subDays } from 'date-fns'

const NewsSearch = ({ onSearchChange, currentFilters }) => {
  const [searchTerms, setSearchTerms] = useState(
    currentFilters.keywords || 'attack missile drone explosion killed death fire'
  )
  const [dateRange, setDateRange] = useState(currentFilters.days || 3)
  const [fromDate, setFromDate] = useState(
    format(subDays(new Date(), dateRange), 'yyyy-MM-dd')
  )
  const [toDate, setToDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  )
  const [searchMode, setSearchMode] = useState('keywords') // 'keywords' or 'custom'

  const predefinedSearches = [
    { label: 'Conflict News', terms: 'attack missile drone explosion killed death fire' },
    { label: 'Military Updates', terms: 'military defense forces army troops' },
    { label: 'Humanitarian', terms: 'humanitarian aid refugees evacuation civilian' },
    { label: 'Infrastructure', terms: 'infrastructure power electricity water damage' },
    { label: 'Diplomatic', terms: 'diplomatic negotiations talks peace sanctions' }
  ]

  const handleSearch = () => {
    onSearchChange({
      keywords: searchTerms,
      fromDate: fromDate,
      toDate: toDate,
      days: dateRange
    })
  }

  const handlePredefinedSearch = (terms) => {
    setSearchTerms(terms)
    setSearchMode('keywords')
  }

  const handleDateRangeChange = (days) => {
    setDateRange(days)
    setFromDate(format(subDays(new Date(), days), 'yyyy-MM-dd'))
    setToDate(format(new Date(), 'yyyy-MM-dd'))
  }

  return (
    <div className="news-search">
      <h3>🔍 News Search Filters</h3>
      
      <div className="search-mode-tabs">
        <button 
          className={searchMode === 'keywords' ? 'active' : ''}
          onClick={() => setSearchMode('keywords')}
        >
          Keyword Search
        </button>
        <button 
          className={searchMode === 'custom' ? 'active' : ''}
          onClick={() => setSearchMode('custom')}
        >
          Custom Search
        </button>
      </div>

      {searchMode === 'keywords' && (
        <div className="keywords-section">
          <div className="predefined-searches">
            <label>Quick Searches:</label>
            <div className="search-buttons">
              {predefinedSearches.map((search, index) => (
                <button 
                  key={index}
                  className="preset-button"
                  onClick={() => handlePredefinedSearch(search.terms)}
                >
                  {search.label}
                </button>
              ))}
            </div>
          </div>

          <div className="current-keywords">
            <label>Current Search Terms:</label>
            <textarea
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
              placeholder="Enter keywords separated by spaces..."
              rows="3"
            />
            <small>Tip: Add keywords like "explosion missile attack" to find conflict news</small>
          </div>
        </div>
      )}

      {searchMode === 'custom' && (
        <div className="custom-search">
          <label>Custom Search Query:</label>
          <input
            type="text"
            value={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value)}
            placeholder="Enter any search query..."
          />
          <small>Search for any topic related to Ukraine</small>
        </div>
      )}

      <div className="date-section">
        <h4>📅 Date Range</h4>
        
        <div className="date-quick-select">
          <button 
            className={dateRange === 1 ? 'active' : ''}
            onClick={() => handleDateRangeChange(1)}
          >
            Today
          </button>
          <button 
            className={dateRange === 3 ? 'active' : ''}
            onClick={() => handleDateRangeChange(3)}
          >
            3 Days
          </button>
          <button 
            className={dateRange === 7 ? 'active' : ''}
            onClick={() => handleDateRangeChange(7)}
          >
            Week
          </button>
          <button 
            className={dateRange === 30 ? 'active' : ''}
            onClick={() => handleDateRangeChange(30)}
          >
            Month
          </button>
        </div>

        <div className="date-inputs">
          <div className="date-input-group">
            <label>From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              max={toDate}
            />
          </div>
          <div className="date-input-group">
            <label>To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate}
              max={format(new Date(), 'yyyy-MM-dd')}
            />
          </div>
        </div>
      </div>

      <button className="search-button" onClick={handleSearch}>
        🔍 Search News
      </button>
    </div>
  )
}

export default NewsSearch