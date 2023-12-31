import React, { useEffect, useState, FC } from 'react';
import useMarvelService from '../../services/MarvelService';
import getImageStyle from '../../utils/getImageStyle';

import { v4 as uuidv4 } from 'uuid';

import ErrorMessage from '../ui/errorMessage/ErrorMessage';
import Spinner from '../ui/spinner/Spinner';
import Skeleton from "../ui/skeleton/Skeleton"

import './CharInfo.scss';
import { CharInfoProps, Character } from '../../types/commonTypes';
import {motion} from 'framer-motion';
import motionParams from '../../services/motionListParams';

const CharInfo: FC<CharInfoProps> = ({ charId }) => {

    const [char, setChar] = useState<Character | null>(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateCharacter()
    }, [charId])

    const updateCharacter = () => {
        clearError()
        if (!charId) {
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded)
    }
    const onCharLoaded = (char: Character) => {
        setChar(char)
    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(errorMessage || spinner || !char) ? <View char={char} /> : null
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

const View = ({ char }) => {

    const imgStyle = getImageStyle(char.thumbnail);

    const elemComics = () => {
        char.comics.length = 10;
        return char.comics.map((elem) => (
                <li 
                    className="char__comics-item"
                    key={uuidv4()}>
                    <a href={elem.url}>{elem.name}</a>
                </li>
        ))
    }

    return (
        <motion.div {...motionParams}>
            <div
                className="char__basics">
                <img src={imgStyle}
                    alt={char.name}
                    className="char__basics-img"
                />
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage}
                            className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki}
                            className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {char.comics.length === 0
                    ? (<div className="char__no-comics">There is no comics with this character</div>)
                    : (elemComics())}

            </ul>
        </motion.div>
    )
}

export default CharInfo;