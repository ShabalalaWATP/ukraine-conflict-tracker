const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
const NEWS_BASE_URL = 'https://newsapi.org/v2/top-headlines'
const EVERYTHING_URL = 'https://newsapi.org/v2/everything'

// Determine if we're in production (Azure) or development (local)
const isProduction = import.meta.env.PROD

export const fetchNewsData = async (searchParams = {}) => {
  try {
    console.log('News API Key exists:', !!NEWS_API_KEY)
    console.log('Environment:', isProduction ? 'Production' : 'Development')
    
    const {
      keywords = 'attack missile drone explosion killed death fire',
      fromDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      toDate = new Date().toISOString(),
      searchMode = 'keywords'
    } = searchParams

    console.log('Searching news with params:', searchParams)
    
    let allArticles = []
    
    // Try top-headlines first for Ukraine
    try {
      const response = await fetchNews('top-headlines', {
        country: 'ua',
        pageSize: 100
      })
      allArticles = response.articles || []
    } catch (error) {
      console.log('Top headlines failed:', error.message)
    }
    
    // Build query based on search mode
    let query = 'Ukraine'
    if (searchMode === 'keywords' && keywords) {
      // For keyword mode, create an OR query with all keywords
      const keywordArray = keywords.trim().split(/\s+/)
      const keywordQuery = keywordArray.map(k => k).join(' OR ')
      query = `Ukraine AND (${keywordQuery})`
    } else if (searchMode === 'custom' && keywords) {
      // For custom mode, use the query as-is with Ukraine
      query = `Ukraine AND ${keywords}`
    }
    
    // Search with everything endpoint
    try {
      const queryResponse = await fetchNews('everything', {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 100,
        from: fromDate,
        to: toDate
      })
      
      // Combine articles from both sources
      allArticles = [...allArticles, ...(queryResponse.articles || [])]
    } catch (error) {
      console.log('Everything endpoint failed:', error.message)
    }
    
    // If no search params provided, use default conflict filtering
    if (!searchParams.keywords && !searchParams.searchMode) {
      // Define conflict-related keywords
      const conflictKeywords = [
        'attack', 'attacks', 'attacked',
        'missile', 'missiles',
        'drone', 'drones',
        'explosion', 'explosions', 'explosive', 'exploded',
        'killed', 'kill', 'killing',
        'death', 'deaths', 'dead', 'died',
        'fire', 'fires', 'fired', 'firing',
        'ballistic',
        'strike', 'strikes', 'struck',
        'bomb', 'bombs', 'bombed', 'bombing',
        'shell', 'shelling', 'shelled',
        'blast', 'blasts'
      ]
      
      // Filter articles that contain conflict keywords
      allArticles = allArticles.filter(article => {
        if (!article.title || !article.description) return false
        
        const content = `${article.title} ${article.description}`.toLowerCase()
        
        // Check if any conflict keyword is present
        return conflictKeywords.some(keyword => content.includes(keyword))
      })
    } else if (searchMode === 'keywords' && keywords) {
      // For custom keyword searches, filter by those keywords
      const keywordArray = keywords.toLowerCase().trim().split(/\s+/)
      allArticles = allArticles.filter(article => {
        if (!article.title || !article.description) return false
        
        const content = `${article.title} ${article.description}`.toLowerCase()
        
        // Check if any keyword is present
        return keywordArray.some(keyword => content.includes(keyword))
      })
    }
    // For custom mode, don't filter - show all results from the query
    
    // Remove duplicates based on title
    const uniqueArticles = allArticles.filter((article, index, self) =>
      index === self.findIndex(a => a.title === article.title)
    )
    
    // Sort by relevance (how many keywords match) if in keyword mode
    if (searchMode === 'keywords' && keywords) {
      const keywordArray = keywords.toLowerCase().trim().split(/\s+/)
      
      const scoredArticles = uniqueArticles.map(article => {
        const content = `${article.title} ${article.description}`.toLowerCase()
        let score = 0
        
        keywordArray.forEach(keyword => {
          if (content.includes(keyword)) score++
        })
        
        return { ...article, relevanceScore: score }
      })
      
      // Sort by relevance score (descending) and then by date
      scoredArticles.sort((a, b) => {
        if (b.relevanceScore !== a.relevanceScore) {
          return b.relevanceScore - a.relevanceScore
        }
        return new Date(b.publishedAt) - new Date(a.publishedAt)
      })
      
      console.log(`Found ${scoredArticles.length} articles matching keywords`)
      return scoredArticles.slice(0, 20)
    } else {
      // For custom search or default, just sort by date
      uniqueArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      
      console.log(`Found ${uniqueArticles.length} articles`)
      return uniqueArticles.slice(0, 20)
    }
    
  } catch (error) {
    console.error('News API Error:', error)
    console.error('Error details:', error.response?.data)
    
    // Return mock data based on search params
    return getMockNewsData(searchParams)
  }
}

// Helper function to handle API calls
async function fetchNews(endpoint, params) {
  if (isProduction) {
    // In production (Azure), use the proxy function
    const queryParams = new URLSearchParams({
      endpoint: endpoint,
      ...params
    })
    
    const response = await fetch(`/api/news?${queryParams}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } else {
    // In development, use axios with direct API call
    const axios = (await import('axios')).default
    const url = endpoint === 'top-headlines' ? NEWS_BASE_URL : EVERYTHING_URL
    
    const response = await axios.get(url, {
      params: {
        ...params,
        apiKey: NEWS_API_KEY
      }
    })
    
    return response.data
  }
}

const getMockNewsData = (searchParams = {}) => {
  console.log('Using mock news data')
  
  const allMockArticles = [
    {
      title: "Multiple missile strikes reported across Ukraine",
      description: "Air defense systems activated as multiple missiles were detected. Several explosions reported in eastern regions.",
      source: { name: "Reuters" },
      publishedAt: new Date().toISOString(),
      url: "https://example.com/article1"
    },
    {
      title: "Drone attack on infrastructure leaves areas without power",
      description: "A series of drone strikes targeted critical infrastructure overnight, resulting in power outages.",
      source: { name: "BBC News" },
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/article2"
    },
    {
      title: "Humanitarian aid reaches affected regions",
      description: "International organizations deliver essential supplies to civilians affected by the ongoing conflict.",
      source: { name: "UN News" },
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/article3"
    },
    {
      title: "Ballistic missile intercepted over Kyiv",
      description: "Air defense forces successfully intercepted a ballistic missile. Debris fell in residential areas, no casualties reported.",
      source: { name: "CNN" },
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/article4"
    },
    {
      title: "Diplomatic efforts continue amid tensions",
      description: "International leaders call for dialogue and de-escalation as diplomatic channels remain open.",
      source: { name: "The Guardian" },
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/article5"
    },
    {
      title: "Fire at industrial facility after overnight shelling",
      description: "Emergency services responding to large fire at industrial complex following artillery strikes.",
      source: { name: "Associated Press" },
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/article6"
    },
    {
      title: "Infrastructure repairs underway in liberated areas",
      description: "Restoration teams working to rebuild power and water systems in recently liberated territories.",
      source: { name: "Al Jazeera" },
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/article7"
    },
    {
      title: "Casualties reported in morning attack on civilian areas",
      description: "Local authorities report multiple killed and injured in attacks on residential neighborhoods.",
      source: { name: "Sky News" },
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/article8"
    }
  ]
  
  // Filter mock data based on search params if provided
  if (searchParams.keywords && searchParams.searchMode === 'keywords') {
    const keywordArray = searchParams.keywords.toLowerCase().trim().split(/\s+/)
    return allMockArticles.filter(article => {
      const content = `${article.title} ${article.description}`.toLowerCase()
      return keywordArray.some(keyword => content.includes(keyword))
    })
  }
  
  // Return first 5 for conflict-related by default
  return allMockArticles.slice(0, 5)
}