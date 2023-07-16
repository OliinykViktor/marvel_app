import AppHeader from './components/appHeader/AppHeader';
import CharInfo from './components/charInfo/CharInfo';
import CharList from './components/charList/CharList';
import RandomChar from './components/randomChar/RandomChar';
// import MarvelService from './services/MarvelService';
import decoration from './assets/img/vision.png';

import './App.css';

// const marvelService = new MarvelService();

// marvelService.getCharacter(1011196).then(res=>console.log(res.data.results))


function App() {

  return (
    <div className='app'>
      <AppHeader/>
      <main>
        <RandomChar/>
        <div className="char__content">
          <CharList/>
          <CharInfo/>
        </div>
        <img src={decoration} alt="decotarion" className="bg-decoration" />
      </main>
    </div>
  )
}

export default App
