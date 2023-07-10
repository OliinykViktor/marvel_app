import Mjolnir from '../../assets/img/mjolnir.png';
import Thor from '../../assets/img/thor.jpeg'

import './RandomChar.scss';

const RandomChar = () => {
    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={Thor} alt="Random character" className="randomchar__img" />
                <div className="randomchar__info">
                    <p className="randomchar__name">Thor</p>
                    <p className="randomchar__descr">As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</p>
                    <div className="randomchar__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>  
                </div>
            </div>
            <div className="randomchar__static">
                <div>
                    <p className="randomchar__title">
                        Random character from! <br />
                        Do you want to get to know him better? 
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                </div>
                <img src={Mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
};

export default RandomChar;