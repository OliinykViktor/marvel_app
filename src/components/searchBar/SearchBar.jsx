import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import './SearchBar.scss';

import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SearchBar = ({ pathname }) => {
    const [state, setState] = useState([]);
    const [text, setText] = useState('');
    const [settingReg, setSettingReg] = useState({
        offset: 0,
        limit: 100
    });

    const { offset, limit } = settingReg;
    const { getAllCharacters, getAllComics } = useMarvelService();

    const isComicsPage = pathname.includes("comics");


    useEffect(() => {
        onReguest(offset, limit);
    }, [isComicsPage]);

    const onReguest = (offset, limit) => {

        if (isComicsPage) {
            getAllComics(offset, limit)
                .then(setState)
        } else {
            getAllCharacters(offset, limit)
                .then(setState)
        }
    };

    const onChange = (e) => {
        setText(e.target.value)
    };

    const filteredItems = () => {
        return state.filter(item => {
            return item.name && item.name.toLowerCase().includes(text.toLowerCase());
        });
    };

    function ElementList() {
        const maxItemsToShow = 3;
        const itemsToDisplay = filteredItems().slice(0, maxItemsToShow);

        const lists = itemsToDisplay.map((item) => (
            <li key={item.id}>
                {
                    isComicsPage ?
                        <Link to={`/comics/${item.id}`}>{item.name}</Link>
                        :
                        <Link to={`/character/${item.id}`}>{item.name}</Link>

                }
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
                placeholder={`type to search ${isComicsPage ? 'comic' : 'character'}...`}
                className='search__input' />
            <FaSearch className='search__icon' />
            {text ? ElementList() : null}
        </div>
    );
};

export default SearchBar;