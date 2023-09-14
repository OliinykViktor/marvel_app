import React, { useEffect, useState, FC } from 'react';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';

import { Character, ViewRandomProps } from '../../types/commonTypes';

import './RandomChar.scss';

import Mjolnir from '../../assets/img/mjolnir.png';
import useImgStyle from '../../hooks/imgStyle';

const RandomChar: FC = () => {

    const [char, setChar] = useState<Character | null>(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateCharacter();
        const timeId = setInterval(updateCharacter, 60000);
        return () => {
            clearInterval(timeId)
        }
    }, [])

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || errorMessage || !char) ? <View char={char} /> : null;

    const onCharLoaded = (char: Character) => {
        setChar(char);
    }

    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded);
    }



    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <div>
                    <p className="randomchar__title">
                        Random character from! <br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={updateCharacter}>
                        <div className="inner">try it</div>
                    </button>
                </div>
                <img src={Mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );

}

const View: FC<ViewRandomProps> = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const imgStyle = useImgStyle(thumbnail);

    return (
        <div className="randomchar__block">
            <img src={imgStyle}
                alt={name}
                className="randomchar__img"
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;