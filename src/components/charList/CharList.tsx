import React, { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

import useMarvelService from '../../services/MarvelService';
import motionListParams from '../../services/motionListParams';
import useSelectedItem from '../../hooks/selectedItem.hook';
import useList from '../../hooks/list';
import getImageStyle from '../../utils/getImageStyle';
import buttonStyle from '../../utils/buttonStyle';

import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';

import { ListProps, Character } from '../../types/commonTypes';

import './CharList.scss';

const CharList: FC<ListProps<Character>> = ({ onSelectedChar }) => {

    const classActive: string = 'comics__item_selected';

    const { loading, error, getAllCharacters } = useMarvelService();
    const { selectedRefs, focusItem, hadleKeyDown } = useSelectedItem()
    const { itemList, listEnded, newItemsLoading, onRequest, offset } = useList<Character>(777, 9, getAllCharacters);

    function renderItems(arr: Character[]) {
        const items = arr.map((item, i) => {
            const imgStyle = getImageStyle(item.thumbnail)
            return (
                <motion.li {...motionListParams}
                    tabIndex={0}
                    ref={(el) => el && (selectedRefs.current[i] = el)}
                    className="char__item"
                    key={item.id}
                    onMouseOver={() => focusItem(i, classActive)}
                    onKeyDown={(e) => hadleKeyDown(e, i, classActive)}
                    onClick={() => {
                        onSelectedChar(item.id);
                        focusItem(i, classActive)
                    }}
                >
                    <img
                        src={imgStyle}
                        alt={item.name}
                        className="char__item-img"
                    />
                    <div className="char__name">{item.name}</div>
                </motion.li>
            )
        });

        return (
            <ul className="char__grid">
                <AnimatePresence>
                    {items}
                </AnimatePresence>
            </ul>
        )
    }

    const buttonEnded: React.CSSProperties = buttonStyle(listEnded);
    const items = renderItems(itemList);
    const spinner = loading && !newItemsLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="char__list">
            {items}
            {errorMessage}
            {spinner}
            <button
                className="button button__long button__main"
                style={buttonEnded}
                disabled={newItemsLoading}
                onClick={() => onRequest(offset, true)}
            >
                <div className="inner">Load more</div>
            </button>
        </div>
    )
}

export default CharList;