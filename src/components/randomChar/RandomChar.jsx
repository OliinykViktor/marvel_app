import { useEffect, useState } from 'react';
import Mjolnir from '../../assets/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

import './RandomChar.scss';
import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';

const RandomChar = () => {

    const [state, setState] = useState({
        char: {},
        loading: false,
        error: false
    })

    useEffect(() => {
        console.log('fdfd');
        updateCharacter()
    },[])
    
    const marvelService = new MarvelService();
    
    const onCharLoading = (char) => {
        setState({
            ...state,
            char,
            loading: false,
        })
    }

    const onLoadError = () => {
        setState({
            ...state,
            loading: false,
            error: true
        })
    }

    const onCharLoaded = () => {
        setState({
            ...state,
            loading: true
        })
    }

    const updateCharacter = () =>{
        const id = Math.floor(Math.random()*(1011400-1011000)+1011000);
        onCharLoaded
        marvelService
        .getCharacter(id)
        .then(onCharLoading)
        .catch(onLoadError)
    }
        const {char, loading, error} = state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(errorMessage || spinner) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <div>
                    <p className="randomchar__title">
                        Random character from! <br />
                        Do you want to get to know him better? 
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={updateCharacter}>
                        <div className="inner">try it</div>
                    </button>
                </div>
                <img src={Mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
    
}

const View = ({char}) =>{
    const {name, descr, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit' : 'contain'}
    }

    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{descr}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>  
            </div>
        </div>
        )
}

export default RandomChar;