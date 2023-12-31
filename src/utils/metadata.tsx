import React, { FC } from 'react';

import Helmet  from 'react-helmet';

import { MetadataProps } from '../types/commonTypes';

const MetaData: FC<MetadataProps> = ({ title, content }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description"
                content={content} />
        </Helmet>
    );
};

export default MetaData;