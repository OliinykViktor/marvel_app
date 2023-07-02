import Avengers from '../../assets/img/Avengers.png';
import AvengersLogo from '../../assets/img/Avengers_logo.png';

import './AppBanner.scss';

const AppBanner = () => {
    return (
        <div className='app__banner'>
            <img src={Avengers} alt="Avengers" />
            <div className="app__banner-text">
                New comics every week! <br />
                Stay tuned!
            </div>
            <img src={AvengersLogo} alt="AvengersLogo" />
        </div>
    );
};

export default AppBanner;