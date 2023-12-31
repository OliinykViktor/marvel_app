import { Link, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState, FC } from 'react';
import { motion } from 'framer-motion'

import useMarvelService from '../../services/MarvelService';
import motionsParams from '../../services/motionsParams';
import Metadata from '../../utils/metadata';

import ErrorMessage from '../../components/ui/errorMessage/ErrorMessage';
import Spinner from '../../components/ui/spinner/Spinner';

import { Comic, ViewProps } from '../../types/commonTypes';

import './InformPage.scss';

const InformPage: FC = () => {
    const location = useLocation();
    const { pathname } = location;
    const isComicsPage = pathname.includes("comics");

    const [comic, setComic] = useState<Comic | null>(null);
    const { getComic, getCharacter, loading, error, clearError } = useMarvelService();

    const { id } = useParams()
    useEffect(() => {
        updateComic(id)
    }, [id]);

    const updateComic = (id: number) => {
        clearError()
        if (isComicsPage) {
            getComic(id)
                .then(onComicLoaded)
        } else {
            getCharacter(id)
                .then(onComicLoaded)
        }
    };

    const onComicLoaded = (comic) => {

        setComic(comic)

    };
    const isComics = location.pathname.includes('comics');
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const metadata = Metadata({
        title: `${isComics ? 'Comics' : 'Character'} page${comic ? `: ${comic.name}` : ''}`,
        content: `${isComics ? `Comics` : `Character`} page${comic ? `: ${comic.name} - ${comic.description}` : ''}`
    })


    const content = !(!comic || errorMessage || spinner) ? <View comic={comic} isComics={isComics} /> : null;

    return (
        <motion.div  {...motionsParams} className="comic__item">
            {metadata}
            {errorMessage}
            {spinner}
            {content}
            <div className="comic__link">
                <Link to={`${isComics ? '/comics' : '/'}`}>Back to all</Link>
            </div>
        </motion.div>
    );
};

const View: FC<ViewProps> = ({ comic, isComics }) => {
    const { name, thumbnail, description, pageCount, language, price } = comic;
    return (
        <>
            <img src={thumbnail}
                alt={name}
                className='comic__item_img' />
            <div className="comic__text">
                <div className="comic__title">
                    {name}
                </div>
                <div className="comic__descr">
                    {description}
                </div>
                {
                    isComics ?
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
                        </> : null
                }
            </div>
        </>
    )
}

export default InformPage;