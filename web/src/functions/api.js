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
    }
}