/* eslint-disable */
const https = require('https');

module.exports = async function (context, req) {
    const newsApiKey = process.env.NEWS_API_KEY;
    
    if (!newsApiKey) {
        context.res = {
            status: 500,
            body: { error: "News API key not configured" }
        };
        return;
    }
    
    try {
        const baseUrl = 'newsapi.org';
        const endpoint = req.query.endpoint || 'everything';
        
        // Build query parameters
        const params = new URLSearchParams();
        Object.keys(req.query).forEach(key => {
            if (key !== 'endpoint') {
                params.append(key, req.query[key]);
            }
        });
        params.append('apiKey', newsApiKey);
        
        const path = `/v2/${endpoint}?${params.toString()}`;
        
        // Make HTTPS request
        const data = await new Promise((resolve, reject) => {
            https.get({
                hostname: baseUrl,
                path: path,
                headers: {
                    'User-Agent': 'Azure-Functions'
                }
            }, (response) => {
                let data = '';
                response.on('data', chunk => data += chunk);
                response.on('end', () => resolve({
                    status: response.statusCode,
                    body: data
                }));
            }).on('error', reject);
        });
        
        context.res = {
            status: data.status,
            headers: { 'Content-Type': 'application/json' },
            body: data.body
        };
    } catch (error) {
        context.log('Error:', error);
        context.res = {
            status: 500,
            body: { error: "Failed to fetch news", details: error.message }
        };
    }
};