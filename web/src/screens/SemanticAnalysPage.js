import React from 'react';
import IndexerAndAnalyser from '../components/IndexerAndAnalyser'
import api from '../functions/api'
const SemanticAnalysPage= props=>{
    return(
        <IndexerAndAnalyser api ={(jsonObject)=>api.semanticAnalyes(jsonObject)}/>
    );
}
export default SemanticAnalysPage;