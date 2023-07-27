import { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import ErrorMessage from '../ui/errorMessage/ErrorMessage';
import Spinner from '../ui/spinner/Spinner';
import Skeleton from "../ui/skeleton/Skeleton"
import MarvelService from '../../services/MarvelService';

import './CharInfo.scss';
class CharInfo extends Component {
    state= {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateCharacter();
    }

    componentDidUpdate(prevProps){
        if (prevProps.charId !== this.props.charId) {
            this.updateCharacter()
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }
    
    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }
    
    onLoadError = () => {
        this.setState({
            loading:false,
            error: true,
        })
    }
    
    updateCharacter = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();
        this.marvelService
        .getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onLoadError)
    }

    render(){
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(errorMessage || spinner || !char) ? <View char={char}/> : null
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char}) => {

    const {name, descr, thumbnail, wiki, homepage, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    const elemComics = () => {
        comics.length = 10;
        return comics.map((elem) => (
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
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
            
                {comics.length == 0 ? (<div className="char__no-comics">There is no comics with this character</div>) : (elemComics())}
                
            </ul>
        </>    
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
    char: PropTypes.array
}

export default CharInfo;