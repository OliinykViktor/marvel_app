import React, { Suspense, FC } from 'react';

import { NavLink, Outlet, useLocation } from 'react-router-dom';

import Spinner from '../ui/spinner/Spinner';

import SearchBar from '../searchBar/SearchBar';
import ShopCart from "../shopCart/ShopCart";

import './AppHeader.scss';

import Marvel from '../../assets/Marvel_Comics.png'

const AppHeader: FC = () => {
    const location = useLocation();
    const { pathname } = location;

    const appTitle: string = pathname === '/comics' ? 'comics shop' : 'information portal';

    const isActiveColor = ({ isActive }: { isActive: boolean }): { color: string } => ({
        color: isActive ? '#ed1b24' : 'white'
    });

    return (
        <div className='app'>
            <header className='app__header'>
                <nav className="app__nav">
                    <NavLink to='/'>
                        <img src={Marvel} alt="" className='app__nav_img' />
                    </NavLink>
                    <ul>
                        <li><NavLink
                            style={isActiveColor}
                            to='/'>Characters</NavLink></li>
                        <li><NavLink
                            style={isActiveColor}
                            to='/comics'>Comics</NavLink></li>
                    </ul>
                </nav>
                <div className="app__panel">
                    <h1 className='app__title'>
                        {appTitle}
                    </h1>
                    <SearchBar pathname={pathname} />
                    <ShopCart />
                </div>
            </header>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};

export default AppHeader;