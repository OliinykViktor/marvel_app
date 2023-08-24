import { useEffect, useRef, useState } from 'react';

import useSelectedItem from '../../hooks/selectedItem.hook';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';

import './ComicsList.scss';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ComicsList = () => {
    const [state, setState] = useState({
        comics: [],
        newItemsLoading: false,
        offset: 510,
        comicsEnded: false,
        classActive:'comics__item_selected',
    })

    const nodeRef = useRef();
    const { loading, error, getAllComics, clearError } = useMarvelService();
    const { selectedRefs, focusItem, hadleKeyDown } = useSelectedItem()

    useEffect(() => {
        onRequest(state.offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        error ? clearError() : null,
            setState({
                ...state,
                newItemsLoading: initial ? false : true,
            }),
            getAllComics(offset)
                .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let end = false;
        if (newComicsList.length < 8) {
            end = true;
        }

        setState({
            ...state,
            comics: [...state.comics, ...newComicsList],
            offset: state.offset + 8,
            comicsEnded: end
        })
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <CSSTransition
                nodeRef={nodeRef}
                    key={item.id}
                    classNames={'comics'}
                    timeout={700}
                >
                    <li 
                        className='comics__item'
                        key={[item.id, i]}
                        tabIndex={0}
                        ref={(el) => selectedRefs.current[i] = el}
                        onClick={()=>focusItem(i, state.classActive)}
                        onMouseOver={()=>focusItem(i, state.classActive)}
                        onKeyDown={(e) => hadleKeyDown(e, i, state.classActive)}
    

                        >
                        <Link to = {`${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">${item.price}$</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        });
        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(state.comics);
    const spinner = loading && !state.newItemsLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button onClick={() => onRequest(state.offset)} style={{ 'display': state.comicsEnded ? 'none' : 'block' }} className='button button__main button__long'>
                <div className="inner">Load more</div>
            </button>
        </div>
    );
};

export default ComicsList;