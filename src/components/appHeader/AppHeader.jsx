import { Suspense } from 'react';
import './AppHeader.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Spinner from '../ui/spinner/Spinner';
import SearchBar from '../searchBar/SearchBar';
import Marvel from '../../assets/Marvel_Comics.png'
import ShopCart from "../shopCart/ShopCart";

const AppHeader = () => {
    const location = useLocation();
    const { pathname } = location;
    return (
        <div className='app'>
            <header className='app__header'>
                <nav className="app__nav">
                    <NavLink to='/'>
                        <img src={Marvel} alt="" className='app__nav_img' />
                    </NavLink>
                    <ul>
                        <li><NavLink
                            style={({ isActive }) => ({
                                color: isActive ? '#ed1b24' : 'white'
                            })}
                            to='/'>Characters</NavLink></li>
                        <li><NavLink
                            style={({ isActive }) => ({
                                color: isActive ? '#ed1b24' : 'white'
                            })}
                            to='/comics'>Comics</NavLink></li>
                    </ul>
                </nav>
                <div className="app__panel">
                    <h1 className='app__title'>
                        information portal
                    </h1>
                    <SearchBar pathname={pathname} />
                    <ShopCart />
                </div>
            </header>
            <main>
                <Suspense fallback={<Spinner />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};

export default AppHeader;