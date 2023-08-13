// import { useState } from 'react';

import AppHeader from './components/appHeader/AppHeader';
// import CharInfo from './components/charInfo/CharInfo';
// import CharList from './components/charList/CharList';
import RandomChar from './components/randomChar/RandomChar';
// import ErrorBoundary from './components/ui/errorBoundary/ErrorBoundary';

// import decoration from './assets/img/vision.png';

import './App.css';


const App = () => {

  // const [ selectChar, setSelect] = useState(null)

  // const onSelectedChar = (id) => {
  //   setSelect(id);
  // }
    return (
      <div className='app'>
        <AppHeader/>
        <main>
          <RandomChar/> 
          {/* <div className="char__content">
            <ErrorBoundary>
                <CharList onSelectedChar = {onSelectedChar}/>
              </ErrorBoundary>
              <CharInfo charId = {selectChar}/>
            </div>
            <img src={decoration} alt="decotarion" className="bg-decoration"/> */}
          </main>
      </div>
    )
  }

export default App
