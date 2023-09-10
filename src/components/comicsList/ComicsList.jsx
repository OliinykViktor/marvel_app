import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useSelectedItem from '../../hooks/selectedItem.hook';
import useMarvelService from '../../services/MarvelService';
import { useCart } from '../../context/CartContext';

import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';
import { BiCartAdd } from 'react-icons/bi';
import ErrorImage from '../../assets/img/error_data.jpg'

import './ComicsList.scss';

const ComicsList = () => {
    const [state, setState] = useState({
        comics: [],
        newItemsLoading: false,
        offset: 510,
        comicsEnded: false,
        classActive: 'comics__item_selected',
    })

    const { addCart } = useCart();
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
            let imgStyle = item.thumbnail;
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = ErrorImage;
            }
            return (
                <CSSTransition
                    nodeRef={nodeRef}
                    key={item.id}
                    classNames={'comics'}
                    timeout={700}
                >
                    <li
                        className='comics__item'
                        key={item.id}
                        tabIndex={0}
                        ref={(el) => selectedRefs.current[i] = el}
                        onClick={() => focusItem(i, state.classActive)}
                        onMouseOver={() => focusItem(i, state.classActive)}
                        onKeyDown={(e) => hadleKeyDown(e, i, state.classActive)}
                    >
                        <Link to={`${item.id}`}>
                            <img src={imgStyle} alt={item.name} className="comics__item-img" />
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">${item.price}$</div>
                        </Link>
                        <BiCartAdd className='comics__add_cart'
                            onClick={() => addCart(item)}
                        />
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