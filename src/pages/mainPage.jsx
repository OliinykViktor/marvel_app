import { useState } from "react";

import RandomChar from "../components/randomChar/RandomChar";
import ErrorBoundary from "../components/ui/errorBoundary/ErrorBoundary";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";

import decoration from '../assets/img/vision.png';

const MainPage = () => {

    const [ selectChar, setSelect] = useState(null)

    const onSelectedChar = (id) => {
      setSelect(id);
    }
    
    return (
            <>
                <RandomChar/> 
                <div className="char__content">
                  <ErrorBoundary>
                      <CharList onSelectedChar = {onSelectedChar}/>
                    </ErrorBoundary>
                    <CharInfo charId = {selectChar}/>
                  </div>
                <img src={decoration} alt="decotarion" className="bg-decoration"/>
            </>
    );
};

export default MainPage;