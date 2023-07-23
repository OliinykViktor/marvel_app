import { Component } from 'react';

import AppHeader from './components/appHeader/AppHeader';
import CharInfo from './components/charInfo/CharInfo';
import CharList from './components/charList/CharList';
import RandomChar from './components/randomChar/RandomChar';

import decoration from './assets/img/vision.png';

import './App.css';
import ErrorBoundary from './components/ui/errorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    selectChar: null,
  }

  onSelectedChar = (id) => {
    // console.log(id);
    this.setState({
      selectChar:id
    })
  }
  render(){
    return (
      <div className='app'>
        <AppHeader/>
        <main>
          {/* <RandomChar/> */}
          <div className="char__content">
            <ErrorBoundary>
              <CharList onSelectedChar = {this.onSelectedChar}/>
            </ErrorBoundary>
            <CharInfo charId = {this.state.selectChar}/>
          </div>
          <img src={decoration} alt="decotarion" className="bg-decoration" />
        </main>
      </div>
    )
  }
}

export default App
