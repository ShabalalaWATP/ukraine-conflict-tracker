/* eslint-disable */
const https = require('https');

module.exports = async function (context, req) {
    const firmsApiKey = process.env.FIRMS_API_KEY;
    
    if (!firmsApiKey) {
        context.res = {
            status: 500,
            body: { error: "FIRMS API key not configured" }
        };
        return;
    }
    
    try {
        const { area, dayRange = 1, date, satellite = 'VIIRS_SNPP_NRT' } = req.query;
        
        if (!area) {
            context.res = {
                status: 400,
                body: { error: "Area parameter is required" }
            };
            return;
        }
        
        // Build the path
        const path = `/api/area/csv/${firmsApiKey}/${satellite}/${area}/${dayRange}${date ? `/${date}` : ''}`;
        
        // Make HTTPS request
        const data = await new Promise((resolve, reject) => {
            https.get({
                hostname: 'firms.modaps.eosdis.nasa.gov',
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
            headers: { 'Content-Type': 'text/csv' },
            body: data.body
        };
    } catch (error) {
        context.log('Error:', error);
        context.res = {
            status: 500,
            body: { error: "Failed to fetch FIRMS data", details: error.message }
        };
    }
};