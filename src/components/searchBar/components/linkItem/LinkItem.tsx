import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import { LinkItemProps } from '../../../../types/commonTypes';

const LinkItem: FC<LinkItemProps> = ({isComicsPage, item}) => {

    const to: string = isComicsPage ? `/comics/${item.id}`: `/character/${item.id}`

    return <Link to={to}>{item.name}</Link>
};

export default LinkItem;