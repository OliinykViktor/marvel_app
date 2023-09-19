import React, { FC } from "react";

import LinkItem from './components/linkItem/LinkItem';

import { ListItem, ElementListProps } from "../../../../types/commonTypes";

const ElementList: FC<ElementListProps> = ({ filteredItems, error, isComicsPage }) => {
    const maxItemsToShow = 3;
    const itemsToDisplay: ListItem[] = filteredItems.slice(0, maxItemsToShow);
    let lists;

    if (error) {
        lists = <span style={{ color: 'red', fontSize: '17px' }}>{error}</span>
    } else if (itemsToDisplay.length > 0) {
        lists = itemsToDisplay.map((item) => (
            <li key={item.id}>
                <LinkItem isComicsPage={isComicsPage} item={item} />
            </li>
        ));
    } else {
        lists = <span>Nothing was found for your request. Please specify your request</span>
    }
    return (
        <ul className="search__preview">
            {lists}
        </ul>
    )
}

export default ElementList;