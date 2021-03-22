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

    async calculateSimilarity(givenUrl1, givenUrl2)
    {
        try 
        {
            const fetchResult = fetch(`${metrics.URL}/calculateSimilarity?givenUrl1=${givenUrl1}&givenUrl2=${givenUrl2}`, {
                method: 'GET'
            })
            const response = await fetchResult;            
            return response.json();
        } 
        catch (error) 
        {
            console.warn(error);
        }
    }
}