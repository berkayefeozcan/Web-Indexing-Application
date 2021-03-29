import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import FreaquencyCalculatorPage from './screens/FreaquencyCalculatorPage';
import SemanticAnalysPage from './screens/SemanticAnalysPage';
import IndexerPage from './screens/IndexerPage';
import SimilarityCalculatorPage from './screens/SimilarityCalculatorPage';
import HomePage from './screens/HomePage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <h3 style={styles.header}>Web İndeksleme Uygulaması</h3>
            </li>
            <li style={styles.li}>
              <NavLink style={styles.link} to="/HomePage" activeStyle={styles.active} >Ana Sayfa</NavLink>
            </li>
            <li style={styles.li}>
              <NavLink style={styles.link} to="/FreaquencyCalculatorPage" activeStyle={styles.active} >Frekans Hesapla</NavLink>
            </li>
            <li style={styles.li}>
              <NavLink style={styles.link} activeStyle={styles.active} to="/SimilarityCalculatorPage">Benzerlik Skorla</NavLink>
            </li>
            <li style={styles.li}>
              <NavLink style={styles.link} activeStyle={styles.active} to="/IndexerPage" >Indexleme</NavLink>
            </li>
            <li style={styles.li}>
              <NavLink style={styles.link} activeStyle={styles.active} to="/SemanticAnalysPage" >Semantik Analiz</NavLink>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}


        <Switch>

        </Switch>
        <Switch>
          <div style={ styles.router}>
            <Route path="/FreaquencyCalculatorPage" exact >
              <FreaquencyCalculatorPage />
            </Route >
            <Route path="/SimilarityCalculatorPage" exact  >
              <SimilarityCalculatorPage />
            </Route>
            <Route path="/IndexerPage" exact  >
              <IndexerPage />
            </Route>
            <Route path="/SemanticAnalysPage" exact >
              <SemanticAnalysPage />
            </Route>
            <Route path="/HomePage" exact><HomePage /></Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}
const styles = {
  router: {
    display: 'flex',
    justifyContent: 'center',
    overflow:'hidden',
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#333'
  },
  link: {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: 16,
    textDecoration: 'none'
  },
  li: {
    float: 'left'
  },
  active: {
    backgroundColor: '#4CAF50'
  },
  header: {
    display: 'flex',
    color: 'white',
    justfySelf: 'center',
    margin: 10
  },
}
export default App;
