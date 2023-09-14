import React, { useEffect, useRef, useState, FC } from 'react';

import useMarvelService from '../../services/MarvelService';
import useSelectedItem from '../../hooks/selectedItem.hook';
import useImgStyle from '../../hooks/imgStyle';

import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';

import { ListProps, Character, ListState } from '../../types/commonTypes';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './CharList.scss';

const CharList: FC<ListProps<Character>> = ({ onSelectedChar }) => {
    const [state, setState] = useState<ListState<Character>>({
        itemList: [],
        newItemsLoading: false,
        offset: 777,
        listEnded: false,
        classActive: 'char__item_selected',
    })

    const nodeRef = useRef()
    const { loading, error, getAllCharacters } = useMarvelService();
    const { selectedRefs, focusItem, hadleKeyDown } = useSelectedItem()

    useEffect(() => {
        onRequest(state.offset, true)
    }, [])

    const onRequest = (offset: number, initial: boolean) => {
        setState((prevState) => ({
            ...prevState,
            newItemsLoading: initial ? false : true
        })),
            getAllCharacters(offset)
                .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList: Character[]) => {
        let end = false;
        if (newCharList.length < 9) {
            end = true;
        }

        setState((prevState) => ({
            ...prevState,
            itemList: [...prevState.itemList, ...newCharList],
            offset: prevState.offset + 9,
            listEnded: end
        }))
    }

    function renderItems(arr: Character[]) {
        const items = arr.map((item, i) => {
            const imgStyle = useImgStyle(item.thumbnail)
            return (
                <CSSTransition
                    nodeRef={nodeRef}
                    key={item.id}
                    classNames={'comics'}
                    timeout={700}
                >
                    <li tabIndex={0}
                        ref={(el) => el && (selectedRefs.current[i] = el)}
                        className="char__item"
                        key={item.id}
                        onMouseOver={() => focusItem(i, state.classActive)}
                        onKeyDown={(e) => hadleKeyDown(e, i, state.classActive)}
                        onClick={() => {
                            onSelectedChar(item.id);
                            focusItem(i, state.classActive)
                        }}
                    >
                        <img
                            src={imgStyle}
                            alt={item.name}
                            className="char__item-img"
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

    const items = renderItems(state.itemList);
    const spinner = loading && !state.newItemsLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="char__list">
            {items}
            {errorMessage}
            {spinner}
            <button
                className="button button__long button__main"
                style={{ 'display': state.listEnded ? 'none' : 'block' }}
                disabled={state.newItemsLoading}
                onClick={() => onRequest(state.offset, true)}
            >
                <div className="inner">Load more</div>
            </button>
        </div>
    )
}

export default CharList;