import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './CharList.scss';
const CharList = (props) => {

    const [state, setState] = useState({
        charList: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 1530,
        charEnded: false,
    })


    const marvelService = new MarvelService();

    useEffect(() =>{
        onRequest()
    }, [])

    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
        .then(onCharListLoaded)
        .catch(onError)
    }

    const onCharListLoaded = (newCharList) => {
       let end = false;
       if (newCharList.length < 9) {
            end = true;
       }

        setState({
            ...state,
            charList: [...state.charList, ...newCharList],
            loading: false,
            newItemsLoading: false,
            offset: state.offset + 9,
            charEnded: end
        })
    }

    const onCharListLoading = () => {
        setState({
            ...state,
            newItemsLoading: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
        })
    }

    const itemRefs = useRef([]);

    const focusChar = (id) => {
        itemRefs.current.forEach(elem => elem.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li tabIndex={0}
                    ref={(el) => itemRefs.current[i] = el}
                    className="char__item"
                    key={item.id} 
                    onClick={()=>{
                        props.onSelectedChar(item.id);
                        focusChar(i)
                    }}
                    onKeyDown={(e) => {
                        if(e.key === ' ' || e.key === 'Enter'){
                            props.onSelectedChar(item.id);
                            focusChar(i)
                        }
                    }}
                    >
                    <img 
                        src={item.thumbnail} 
                        alt={item.name} 
                        style={imgStyle}
                        />
                    <div className="char__name">{item.name}</div>
               </li>
            )
        });

        return (
            <ul className="char__grid">
              {items}    
            </ul>
        )
    }

    const items = renderItems(state.charList);
    const spinner = state.loading ? <Spinner/> : null;
    const errorMessage = state.error ? <ErrorMessage/> : null;
    const content = !(spinner || errorMessage) ? items : null; 

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}

            <button 
                className="button button__long button__main"
                style={{'display' : state.charEnded ? 'none' : 'block'}}
                disabled={state.newItemsLoading}
                onClick={() => onRequest(state.offset)}
                >
                <div className="inner">Load more</div>
            </button>
        </div>
    )
}

CharList.propTypes ={
    charId : PropTypes.number,
    offset : PropTypes.number,
    onSelectedChar: PropTypes.func
}

export default CharList;