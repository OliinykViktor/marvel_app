import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../ui/spinner/Spinner';
import ErrorMessage from '../ui/errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './CharList.scss';
class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 1530,
        charEnded: false,
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.onRequest()
    }

    // componentDidUpdate(prevProps){
    //     if(prevProps.offset !== this.props.offset){
    //         this.onRequest()
    //     }
    // }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    onCharListLoaded = (newCharList) => {
       let end = false;
       if (newCharList.length < 9) {
            end = true;
       }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: end
        }))
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    itemRef = [];

    setRefs = (ref) => {
        this.itemRef.push[ref]
    };

    focusChar = (id) => {
        this.itemRef.forEach(elem => elem.classList.remove('char__item_selected'));
        this.itemRef[id].classList.add('char__item_selected');
        this.itemRef[id].focus();
    }

    renderItems (arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li tabIndex={0}
                    ref={this.setRefs}
                    className="char__item"
                    key={item.id} 
                    onClick={()=>{
                        this.props.onSelectedChar(item.id);
                        this.focusChar(i)
                    }}
                    onKeyPress={(e) => {
                        if(e.key === ' ' || e.key === 'Enter'){
                            this.props.onSelectedChar(item.id);
                            this.focusChar(i)
                        }
                    }}
                    >
                    <img 
                        src={item.thumbnail} 
                        alt={item.name} 
                        style={imgStyle}
                        />
                    <div className="char__name">{item.name}</div>
               </li>
            )
        });

        return (
            <ul className="char__grid">
              {items}    
            </ul>
        )
    }

    render() {

        const {error, loading, charList, offset, newItemsLoading, charEnded} = this.state;

        const items = this.renderItems(charList);
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(spinner || errorMessage) ? items : null; 

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}

                <button 
                    className="button button__long button__main"
                    style={{'display' : charEnded ? 'none' : 'block'}}
                    disabled={newItemsLoading}
                    onClick={() => this.onRequest(offset)}
                    >
                    <div className="inner">Load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes ={
    charId : PropTypes.number,
    offset : PropTypes.number,
    onSelectedChar: PropTypes.func
}

export default CharList;