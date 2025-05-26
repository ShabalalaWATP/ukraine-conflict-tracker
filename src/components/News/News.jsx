import './News.css'
import { formatDistanceToNow } from 'date-fns'

const News = ({ newsData }) => {
  const formatTime = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  const handleArticleClick = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="news-panel">
      <h2 className="news-title">
        <span className="news-icon">📰</span>
        Latest Explosion Reports
      </h2>
      
      {newsData.length === 0 ? (
        <div className="no-news">
          <p>No recent explosion reports found.</p>
        </div>
      ) : (
        <div className="news-list">
          {newsData.map((article, index) => (
            <article 
              key={index} 
              className="news-item"
              onClick={() => handleArticleClick(article.url)}
            >
              <div className="news-header">
                <span className="news-source">{article.source.name}</span>
                <span className="news-time">{formatTime(article.publishedAt)}</span>
              </div>
              
              <h3 className="news-headline">{article.title}</h3>
              
              {article.description && (
                <p className="news-description">{article.description}</p>
              )}
              
              <div className="news-footer">
                <span className="read-more">Read full article →</span>
              </div>
            </article>
          ))}
        </div>
      )}
      
      <div className="news-disclaimer">
        <p>Data sourced from NewsAPI • Updated in real-time</p>
      </div>
    </div>
  )
}

export default News