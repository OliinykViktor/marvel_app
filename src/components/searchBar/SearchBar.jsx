import './SearchBar.scss';

import iconSearch from '../../assets/icon-search.svg'

const SearchBar = () => {
    return (
        <div className='search__bar'>
            <input type="text"  placeholder='type to search ...' className='search__input'/>
            <img src={iconSearch} alt="" className='search__icon'/>
        </div>
    );
};

export default SearchBar;