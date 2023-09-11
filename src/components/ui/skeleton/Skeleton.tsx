import React, {FC} from 'react';

import './Skeleton.scss';

const Skeleton:FC  = () => {
    return (
        <>
         <p className="char__select">Please select s character to see information</p>
         <div className="skeleton">
            <div className="pulse skeleton__header">
                <div className="pulse skeleton__circle"></div>
                <div className="pulse skeleton__mini"></div>
            </div>
            <div className="pulse skeleton__block"></div>
            <div className="pulse skeleton__block"></div>
            <div className="pulse skeleton__block"></div>
         </div>
        </>
    );
};

export default Skeleton;