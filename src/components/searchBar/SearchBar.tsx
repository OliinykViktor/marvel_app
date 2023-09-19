import React, { useEffect, useState, useMemo, FC, ChangeEvent } from 'react';

import ElementList from './components/elementList/ElementList';

import useMarvelService from '../../services/MarvelService';
import useInputValidation from '../../hooks/InputValidation';

import { FaSearch } from 'react-icons/fa';

import { SearchBarProps, ListItem } from '../../types/commonTypes'

import './SearchBar.scss';

const SearchBar: FC<SearchBarProps> = ({ pathname }) => {

    const offset: number = 0;
    const limit: number = 100;
    const isComicsPage = pathname.includes("comics");
    const searchPlaceholder = `type to search ${isComicsPage ? 'comic' : 'character'}...`;

    const [state, setState] = useState<ListItem[]>([]);
    const [text, setText] = useState<string>('');
    const { getAllCharacters, getAllComics } = useMarvelService();
    const { error, handleChange } = useInputValidation('');

    useEffect(() => {
        onReguest(offset, limit);
    }, [isComicsPage]);

    const onReguest = (offset: number, limit: number) => {

        if (isComicsPage) {
            getAllComics(offset, limit)
                .then(setState)
        } else {
            getAllCharacters(offset, limit)
                .then(setState)
        }
    };
    console.log('re');


    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setText(e.target.value)
    };

    const filteredItems = useMemo((): ListItem[] => {
        return state.filter((item: ListItem) => {
            return item.name && item.name.toLowerCase().includes(text.toLowerCase());
        });
    }, [text])

    return (
        <div className='search__bar'>
            <input
                onChange={(e) => {
                    onChange(e),
                        handleChange(e)
                }}
                name='search'
                type="text"
                placeholder={searchPlaceholder}
                className='search__input' />
            <FaSearch className='search__icon' />
            {text ? <ElementList filteredItems={filteredItems} error={error} isComicsPage={isComicsPage} /> : null}
        </div>
    );
};

export default SearchBar;