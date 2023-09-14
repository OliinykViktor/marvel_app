import React, { useEffect, useRef, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useSelectedItem from '../../hooks/selectedItem.hook';
import useMarvelService from '../../services/MarvelService';
import { useCart } from '../../context/CartContext';

import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';
import { BiCartAdd } from 'react-icons/bi';

import { Comic, ListState, ListProps } from '../../types/commonTypes';

import ErrorImage from '../../assets/img/error_data.jpg';

import './ComicsList.scss';
import useImgStyle from '../../hooks/imgStyle';

const ComicsList: FC<ListProps<Comic>> = () => {
    const [state, setState] = useState<ListState<Comic>>({
        itemList: [],
        newItemsLoading: false,
        offset: 510,
        listEnded: false,
        classActive: 'comics__item_selected',
    })

    const { addCart } = useCart();
    const nodeRef = useRef(null);
    const { loading, error, getAllComics, clearError } = useMarvelService();
    const { selectedRefs, focusItem, hadleKeyDown } = useSelectedItem()

    useEffect(() => {
        onRequest(state.offset, true);
    }, [])

    const onRequest = (offset: number, initial: boolean) => {
        clearError();
        setState((prevState) => ({
            ...prevState,
            newItemsLoading: initial ? false : true,
        })),
            getAllComics(offset)
                .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newItemList: Comic[]) => {
        let end = false;
        if (newItemList.length < 8) {
            end = true;
        }

        setState((prevState) => ({
            ...prevState,
            itemList: [...prevState.itemList, ...newItemList],
            offset: prevState.offset + 8,
            listEnded: end
        }))
    }

    function renderItems(arr: Comic[]) {
        const items = arr.map((item, i) => {

            const imgStyle = useImgStyle(item.thumbnail);

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
                        ref={(el) => el && (selectedRefs.current[i] = el)}
                        onClick={() => focusItem(i, state.classActive)}
                        onMouseOver={() => focusItem(i, state.classActive)}
                        onKeyDown={(e: React.KeyboardEvent) => hadleKeyDown(e, i, state.classActive)}
                    >
                        <Link to={`${item.id}`}>
                            <img src={imgStyle} alt={item.name} className="comics__item-img" />
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">{item.price}$</div>
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

    const buttonEnded: React.CSSProperties = { 'display': state.listEnded ? 'none' : 'block' };
    const items = renderItems(state.itemList);
    const spinner = loading && !state.newItemsLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="comics__list">
            {items}
            {errorMessage}
            {spinner}
            <button onClick={() => onRequest(state.offset, true)}
                style={buttonEnded} className='button button__main button__long'>
                <div className="inner">Load more</div>
            </button>

        </div>
    );
};

export default ComicsList;