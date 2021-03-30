import React from 'react';
import IndexerAndAnalyser from '../components/IndexerAndAnalyser'
import api from '../functions/api'
const IndexerPage = props => {
   
    return (
        <IndexerAndAnalyser api ={(jsonObject)=>api.indexWebSite(jsonObject)}/>
    );
        
}

export default IndexerPage;