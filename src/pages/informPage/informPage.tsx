import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import useMarvelService from '../../services/MarvelService';

import PropTypes from 'prop-types';

import ErrorMessage from '../../components/ui/errorMessage/ErrorMessage';
import Spinner from '../../components/ui/spinner/Spinner';

import './InformPage.scss';
import { ViewProps } from '../../types/commonTypes';

const InformPage: FC = () => {
    const location = useLocation();
    const {pathname} = location;
    const isComicsPage = pathname.includes("comics");

    const [comic, setComic] = useState(null);
    const { getComic, getCharacter, loading, error, clearError } = useMarvelService();

    const { id } = useParams()
    useEffect(() => {
        updateComic(id)
    }, [id]);

    const updateComic = (id) => {
        clearError()
        if (isComicsPage) {
            getComic(id)
                .then(onComicLoaded)
        } else{
            getCharacter(id)
                .then(onComicLoaded)
        }
    };

    const onComicLoaded = (comic) => {

        setComic(comic)

    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(!comic || errorMessage || spinner) ? <View comic={comic} /> : null;

    return (
        <div className="comic__item">
            {errorMessage}
            {spinner}
            {content}
            <div className="comic__link">
                <Link to='./'>Back to all</Link>
            </div>
        </div>
    );
};

const View: FC <ViewProps> = ({ comic }) => {
    const { name, thumbnail, description, pageCount, language, price } = comic;
    return (
        <>
            <img src={thumbnail} alt={name} className='comic__item_img'/>
            <div className="comic__text">
                <div className="comic__title">
                    {name}
                </div>
                <div className="comic__descr">
                    {description}
                </div>
                    {
                        location.pathname.includes('comics')? 
                        <>
                            <div className="comic__descr">
                                {pageCount}
                            </div>
                            <div className="comic__descr">
                                Language: {language}
                            </div>
                            <div className="comic__price">
                                {price}$
                            </div>
                        </>:null
                    }
            </div>
        </>
    )
}

InformPage.propTypes = {
    comic: PropTypes.object,
    name: PropTypes.string,
    thumbnail: PropTypes.string

}

export default InformPage;