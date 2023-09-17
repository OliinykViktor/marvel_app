import React, { useEffect, useState, FC, ChangeEvent } from 'react';

import LinkItem from './components/linkItem/LinkItem';

import useMarvelService from '../../services/MarvelService';

import { FaSearch } from 'react-icons/fa';

import { SearchBarProps, SettingReg, ListItem } from '../../types/commonTypes'

import './SearchBar.scss';

const SearchBar: FC<SearchBarProps> = ({ pathname }) => {
    const [state, setState] = useState<ListItem[]>([]);
    const [text, setText] = useState<string>('');
    const [settingReg, setSettingReg] = useState<SettingReg>({
        offset: 0,
        limit: 100
    });

    const { offset, limit } = settingReg;
    const { getAllCharacters, getAllComics } = useMarvelService();

    const isComicsPage = pathname.includes("comics");

    const searchPlaceholder = `type to search ${isComicsPage ? 'comic' : 'character'}...`;

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

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    };

    const filteredItems = (): ListItem[] => {
        return state.filter((item: ListItem) => {
            return item.name && item.name.toLowerCase().includes(text.toLowerCase());
        });
    };

    const ElementList: FC = () => {
        const maxItemsToShow = 3;
        const itemsToDisplay: ListItem[] = filteredItems().slice(0, maxItemsToShow);


        const lists = itemsToDisplay.map((item) => (
            <li key={item.id}>
                <LinkItem isComicsPage={isComicsPage} item={item} />
            </li>
        ));

        return (
            <ul className="search__preview">
                {lists}
            </ul>
        )
    }

    return (
        <div className='search__bar'>
            <input
                onChange={onChange}
                name='search'
                type="text"
                placeholder={searchPlaceholder}
                className='search__input' />
            <FaSearch className='search__icon' />
            {text ? <ElementList /> : null}
        </div>
    );
};

export default SearchBar;