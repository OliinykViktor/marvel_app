import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import useSelectedItem from '../../hooks/selectedItem.hook';

import './CharList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CharList = (props) => {

    const [state, setState] = useState({
        charList: [],
        newItemsLoading: false,
        offset: 1530,
        charEnded: false,
        classActive: 'char__item_selected',
    })

    const nodeRef = useRef()
    const {loading, error, getAllCharacters}  = useMarvelService();
    const {selectedRefs, focusItem, hadleKeyDown} = useSelectedItem()

    useEffect((offset) =>{
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        setState({
            ...state,
            newItemsLoading: initial ? false : true
        }),
        getAllCharacters(offset)
        .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
       let end = false;
       if (newCharList.length < 9) {
            end = true;
       }

        setState({
            ...state,
            charList: [...state.charList, ...newCharList],
            offset: state.offset + 9,
            charEnded: end
        })
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                    <CSSTransition
                        nodeRef={nodeRef}
                        key={item.id}
                        classNames={'comics'}
                        timeout={700}
                        >
                        <li tabIndex={0}
                            ref={(el) => selectedRefs.current[i] = el}
                            className="char__item"
                            key={item.id}
                            onMouseOver={()=>focusItem(i, state.classActive)}
                            onKeyDown={(e) => hadleKeyDown(e, i, state.classActive)}
                            onClick={()=>{
                                props.onSelectedChar(item.id);
                                focusItem(i, state.classActive)
                            }}
                            >
                            <img 
                                src={item.thumbnail} 
                                alt={item.name} 
                                style={imgStyle}
                                />
                            <div className="char__name">{item.name}</div>
                        </li>
                    </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}    
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(state.charList);
    const spinner = loading && !state.newItemsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {items}

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