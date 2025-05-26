/* eslint-disable */

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
        // Get parameters from the request
        const { area, dayRange = 1, date, satellite = 'VIIRS_SNPP_NRT' } = req.query;
        
        if (!area) {
            context.res = {
                status: 400,
                body: { error: "Area parameter is required" }
            };
            return;
        }
        
        // Build the FIRMS API URL
        const baseUrl = 'https://firms.modaps.eosdis.nasa.gov/api/area/csv';
        const url = `${baseUrl}/${firmsApiKey}/${satellite}/${area}/${dayRange}${date ? `/${date}` : ''}`;
        
        const response = await fetch(url);
        const data = await response.text();
        
        context.res = {
            status: response.status,
            headers: { 'Content-Type': 'text/csv' },
            body: data
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: "Failed to fetch FIRMS data" }
        };
    }
};