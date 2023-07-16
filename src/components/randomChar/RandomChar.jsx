import { Component } from 'react';
import Mjolnir from '../../assets/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

import './RandomChar.scss';

class RandomChar extends Component {
    constructor(props){
        super(props);
        this.updateCharacter();
    }

    state={
        char: {}
    }

    marvelService = new MarvelService();

    onCharLoading = (char) => {
        this.setState({char})
    }

    updateCharacter = () =>{
        const id = Math.floor(Math.random()*(1011400-1011000)+1011000);
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoading)
    }
    

    
    render(){
        const {char: {name, descr, thumbnail, homepage, wiki}} = this.state;
        console.log(this.setState.name);
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt={name} className="randomchar__img" />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{descr}</p>
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
                <div className="randomchar__static">
                    <div>
                        <p className="randomchar__title">
                            Random character from! <br />
                            Do you want to get to know him better? 
                        </p>
                        <p className="randomchar__title">
                            Or choose another one
                        </p>
                        <button className="button button__main">
                            <div className="inner">try it</div>
                        </button>
                    </div>
                    <img src={Mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        );
    }
}

export default RandomChar;