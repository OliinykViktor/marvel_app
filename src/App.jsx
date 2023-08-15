import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'

import AppHeader from './components/appHeader/AppHeader';
import { MainPage, ComicsPage} from './pages'

import './App.css';

const App = () => {

    return (
      <Router>
        <div className='app'>
          <AppHeader/>
          <main>
            <Switch>
              <Route exact patch="/">
                <MainPage/>
              </Route>
              <Route exact patch="/comics">
                <ComicsPage/>
              </Route>
            </Switch>
            </main>
        </div>
      </Router>
    )
  }

export default App
