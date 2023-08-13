import useHttp from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, error, reguest, clearError} = useHttp();
    
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = import.meta.env.VITE_REACT_APP_MARVEL_API_KEY;
    const _baseOffSet = 210;

    const getAllCharacters = async( offset = _baseOffSet) => {
        const res = await reguest(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    
    const getCharacter = async(id) => {
        const res = await reguest(`${_apiBase}/characters/${id}?apikey=${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        
        return {
            id: char.id,
            name:char.name,
            descr:char.description ? char.description.slice(0, 227) + `...` : 'There is no description for this character',
            thumbnail:char.thumbnail.path+'.'+ char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            comics: char.comics.items,
        }
    }

    return {
        loading, 
        error, 
        clearError, 
        getAllCharacters, 
        getCharacter}
}

export default useMarvelService