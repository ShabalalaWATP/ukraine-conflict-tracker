/* eslint-disable */

module.exports = async function (context, req) {
    // Azure Functions will use NEWS_API_KEY from Application Settings
    // NOT the VITE_ prefixed version (those are for client-side)
    const newsApiKey = process.env.NEWS_API_KEY;
    
    if (!newsApiKey) {
        context.res = {
            status: 500,
            body: { error: "News API key not configured" }
        };
        return;
    }
    
    try {
        const baseUrl = 'https://newsapi.org/v2';
        const endpoint = req.query.endpoint || 'everything';
        
        // Build the URL with all query parameters from the client
        const url = new URL(`${baseUrl}/${endpoint}`);
        Object.keys(req.query).forEach(key => {
            if (key !== 'endpoint') {
                url.searchParams.append(key, req.query[key]);
            }
        });
        url.searchParams.append('apiKey', newsApiKey);
        
        const response = await fetch(url.toString());
        const data = await response.json();
        
        context.res = {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: "Failed to fetch news" }
        };
    }
};