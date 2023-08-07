import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import ErrorMessage from '../ui/errorMessage/ErrorMessage';
import Spinner from '../ui/spinner/Spinner';
import Skeleton from "../ui/skeleton/Skeleton"
import MarvelService from '../../services/MarvelService';

import './CharInfo.scss';

const CharInfo = (props) => {
    
    const [state, setState] = useState({
        char: null,
        loading: false,
        error: false,
    })
    const marvelService = new MarvelService();
    
    useEffect(() => {
        updateCharacter()
    },[props.charId])
    
    const updateCharacter = () => {
        if (!props.charId) {
            return;
        }
        onCharLoading();
        marvelService
        .getCharacter(props.charId)
        .then(onCharLoaded)
        .catch(onLoadError)
    }
    const onCharLoaded = (char) => {
        setState({
            ...state,
            char,
            loading: false,
        })
    }
    
    const onCharLoading = () => {
        setState({
            ...state,
            loading: true,
        })
    }
    
    const onLoadError = () => {
        setState({
            ...state,
            loading:false,
            error: true,
        })
    }
    

        const skeleton = state.char || state.loading || state.error ? null : <Skeleton/>;
        const errorMessage = state.error ? <ErrorMessage/> : null;
        const spinner = state.loading ? <Spinner/> : null;
        const content = !(errorMessage || spinner || !state.char) ? <View char={state.char}/> : null
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }

const View = ({char}) => {

    let imgStyle = {'objectFit' : 'cover'};
    if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    // console.log(char.char);

    const elemComics = () => {
        // console.log(char.comics.length);
        char.comics.length = 10;
        return char.comics.map((elem) => (
                <>
                    <li className="char__comics-item"
                        key={uuidv4()}>
                        <a href={elem.url}>{elem.name}</a>
                    </li>
                </>    
            ))
    }

    return(
        <>
            <div className="char__basics">
                <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
            
                {char.comics.length == 0 ? (<div className="char__no-comics">There is no comics with this character</div>) : (elemComics())}
                
            </ul>
        </>    
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
    char: PropTypes.array
}

export default CharInfo;