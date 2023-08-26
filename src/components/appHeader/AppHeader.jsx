import { Suspense } from 'react';
import './AppHeader.scss';
import { NavLink, Outlet } from 'react-router-dom';
import Spinner from '../ui/spinner/Spinner';
import SearchBar from '../searchBar/SearchBar';
import Marvel from '../../assets/Marvel_Comics.png'

const AppHeader = () => {
    return (
        <div className='app'>
            <header className='app__header'>
                <div className="app__logo">
                    
                    <NavLink to='/'>
                        <img src={Marvel} alt="" className='app__logo_img'/>
                    </NavLink>
                    
                </div>
                
                <nav className="app__nav">
                <h1 className='app__title'>
                        information portal
                    </h1>
                    <SearchBar/>
                    <ul>
                        <li><NavLink 
                            style={({isActive}) =>({
                                color: isActive? '#ed1b24':'white'
                            })}
                            to='/'>Characters</NavLink></li>
                        <li><NavLink 
                                style={({isActive}) =>({
                                color: isActive? '#ed1b24':'white'
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