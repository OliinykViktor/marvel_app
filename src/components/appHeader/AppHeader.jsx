import { Suspense } from 'react';
import './AppHeader.scss';
import { NavLink, Outlet } from 'react-router-dom';
import Spinner from '../ui/spinner/Spinner';

const AppHeader = () => {
    return (
        <div className='app'>
            <header className='app__header'>
                <h1 className='app__title'>
                    <NavLink to='/'>
                        <span>Marvel</span> information portal
                    </NavLink>
                </h1>
                <nav className="app__nav">
                    <ul>
                        <li><NavLink 
                            style={({isActive}) =>({
                                color: isActive? '#9f0013':'inherit'
                            })}
                            to='/'>Characters</NavLink></li>
                        / 
                        <li><NavLink 
                                style={({isActive}) =>({
                                color: isActive? '#9f0013':'inherit'
                            })}
                            to='/comics'>Comics</NavLink></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Outlet/>
                </Suspense>
            </main>
        </div>
    );
};

export default AppHeader;