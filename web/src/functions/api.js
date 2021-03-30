import metrics from '../metrics';
export default {
    async calculateFrequeny(givenUrl) {
        try {
            const fetchResult = fetch(`${metrics.URL}/calculateFrequeny?givenUrl=${givenUrl}`, {
                method: 'GET'
            })
            const response = await fetchResult;            
            return response.json();
        } catch (e) {
            console.warn(e);
        }
    },

    async calculateSimilarity(givenUrlOne, givenUrlTwo)
    {
        try {
            const fetchResult = fetch(`${metrics.URL}/CalculateSimilarity?givenUrlOne=${givenUrlOne}&givenUrlTwo=${givenUrlTwo}`, {
                method: 'GET'
            })
            const response = await fetchResult;            
            return response.json();
        } catch (e) {
            console.warn(e);
        }
    },
    async indexWebSite(jsonObject)
    {
        try {
            const fetchResult = fetch(`${metrics.URL}/indexAndSort`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonObject)
            })
            const response = await fetchResult;            
            return response.json();
        } catch (e) {
            console.warn(e);
        }
    },
    async semanticAnalyes(jsonObject)
    {
        try {
            const fetchResult = fetch(`${metrics.URL}/semanticAnalyes`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonObject)
            })
            const response = await fetchResult;            
            return response.json();
        } catch (e) {
            console.warn(e);
        }
    }
    
}