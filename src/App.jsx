
import AppBanner from './components/appBanner/AppBanner';
import AppHeader from './components/appHeader/AppHeader';
// import CharInfo from './components/charInfo/CharInfo';
// import CharList from './components/charList/CharList';
// import RandomChar from './components/randomChar/RandomChar';
// import ComicsItem from './components/comicsItem/ComicsItem';
// import CharItem from './components/charItem/CharItem';

// import decoration from './assets/img/vision.png';

import './App.css';
import ComicsList from './components/comicsList/ComicsList';

function App() {

  return (
    <div className='app'>
      <AppHeader/>
      <AppBanner/>
      {/* <CharItem/> */}
      {/* <ComicsItem/> */}
      <main>
        {/* <RandomChar/> */}
        {/* <div className="char__content"> */}
          <ComicsList/>
          {/* <CharList/> */}
          {/* <CharInfo/> */}
        {/* </div> */}
        {/* <img src={decoration} alt="decotarion" className="bg-decoration" /> */}
      </main>
    </div>
  )
}

export default App
