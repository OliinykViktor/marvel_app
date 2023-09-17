import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'

import useSelectedItem from '../../hooks/selectedItem.hook';
import useList from '../../hooks/list';
import getImageStyle from '../../utils/getImageStyle';
import buttonStyle from '../../utils/buttonStyle';
import useMarvelService from '../../services/MarvelService';
import motionListParams from '../../services/motionListParams'
import { useCart } from '../../context/CartContext';

import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';
import { BiCartAdd } from 'react-icons/bi';

import { Comic, ListProps } from '../../types/commonTypes';

import './ComicsList.scss';

const ComicsList: FC<ListProps<Comic>> = () => {

    const classActive: string = 'comics__item_selected';

    const { addCart } = useCart();
    const { loading, error, getAllComics } = useMarvelService();
    const { selectedRefs, focusItem, hadleKeyDown } = useSelectedItem();
    const { itemList, listEnded, newItemsLoading, onRequest, offset } = useList<Comic>(210, 8, getAllComics);

    function renderItems(arr: Comic[]) {
        const items = arr.map((item, i) => {
            const imgStyle = getImageStyle(item.thumbnail);

            return (
                <motion.li {...motionListParams}
                    className='comics__item'
                    key={`${item.id}_${i}`}
                    tabIndex={0}
                    ref={(el) => el && (selectedRefs.current[i] = el)}
                    onClick={() => focusItem(i, classActive)}
                    onMouseOver={() => focusItem(i, classActive)}
                    onKeyDown={(e: React.KeyboardEvent) => hadleKeyDown(e, i, classActive)}
                >
                    <Link to={`${item.id}`}>
                        <img src={imgStyle} alt={item.name} className="comics__item-img" />
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                    <BiCartAdd className='comics__add_cart'
                        onClick={() => addCart(item)}
                    />
                </motion.li>
            )
        });
        return (
            <ul className="comics__grid">
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
        <div className="comics__list">
            {items}
            {errorMessage}
            {spinner}
            <button
                className='button button__main button__long'
                style={buttonEnded}
                disabled={newItemsLoading}
                onClick={() => onRequest(offset, true)}
            >
                <div className="inner">Load more</div>
            </button>

        </div>
    );
};

export default ComicsList;