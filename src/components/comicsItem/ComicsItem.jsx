import XMen from '../../assets/img/x-men.png'

import './ComicsItem.scss';

const ComicsItem = () => {
    return (
        <div className="comics__item">
            <img src={XMen} alt="X-Men" />
            <div className="comics__text">
                <div className="comics__title">X-Men: Days of Future Past</div>
                <div className="comics__descr">
                Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity&apos;s only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?
                <br /><br />
                144 pages
                <br /><br />
                Language: en-us
                <br /><br />
                <span>9.99$</span>
                </div>
            </div>
            <div className="comics__link">
                <a href="#">Back to all</a>
            </div>
        </div>
    );
};

export default ComicsItem;