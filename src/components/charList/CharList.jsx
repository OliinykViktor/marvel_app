import Abyss from '../../assets/img/abyss.jpg'

import './CharList.scss';

const CharList = () => {
    return (
        <div className="char__list">
            <ul className="char__grid">
               <li className="char__item">
                <img src={Abyss} alt="Abyss" />
                <div className="char__name">ABYSS</div>
               </li>
               <li className="char__item char__item_selected">
                <img src={Abyss} alt="Abyss" />
                <div className="char__name">ABYSS</div>
               </li>
               <li className="char__item">
                <img src={Abyss} alt="Abyss" />
                <div className="char__name">ABYSS</div>
               </li>
               <li className="char__item">
                <img src={Abyss} alt="Abyss" />
                <div className="char__name">ABYSS</div>
               </li>
               <li className="char__item">
                <img src={Abyss} alt="Abyss" />
                <div className="char__name">ABYSS</div>
               </li>
               <li className="char__item">
                <img src={Abyss} alt="Abyss" />
                <div className="char__name">ABYSS</div>
               </li>
               <li className="char__item">
                <img src={Abyss} alt="Abyss" />
                <div className="char__name">ABYSS</div>
               </li>
               <li className="char__item">
                <img src={Abyss} alt="Abyss" />
                <div className="char__name">ABYSS</div>
               </li>
               <li className="char__item">
                <img src={Abyss} alt="Abyss" />
                <div className="char__name">ABYSS</div>
               </li> 
            </ul>
            <button className="button button__long button__main">
                <div className="inner">Load more</div>
            </button>
        </div>
    );
};

export default CharList;