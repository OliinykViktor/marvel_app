import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

import PropTypes from 'prop-types';

import ErrorMessage from '../../components/ui/errorMessage/ErrorMessage';
import Spinner from '../../components/ui/spinner/Spinner';

import './ComicPage.scss';

const ComicItem = () => {
    const [comic, setComic] = useState(null)
    const { getComic, loading, error, clearError } = useMarvelService()

    const { id } = useParams()
    useEffect(() => {
        updateComic(id)
    }, [id])

    const updateComic = (id) => {
        clearError()
        getComic(id)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {

        setComic(comic)

    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(!comic || errorMessage || spinner) ? <View comic={comic} /> : null;

    return (
        <div className="comic__item">
            {errorMessage}
            {spinner}
            {content}
            <div className="comic__link">
                <Link to='/comics'>Back to all</Link>
            </div>
        </div>
    );
};



const View = ({ comic }) => {
    const { title, thumbnail, description, pageCount, language, price } = comic;
    return (
        <>
            <img src={thumbnail} alt={title} className='comic__item_img'/>
            <div className="comic__text">
                <div className="comic__title">{title}</div>
                <div className="comic__descr">
                    {description}
                    <br /><br />
                    {pageCount}
                    <br /><br />
                    Language: {language}
                    <br /><br />
                    <span>{price}$</span>
                </div>
            </div>
        </>
    )
}

ComicItem.propTypes = {
    comic: PropTypes.object,
    title: PropTypes.string,
    thumbnail: PropTypes.string

}

export default ComicItem;