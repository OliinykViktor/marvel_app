import useHttp from "../hooks/http.hook";
import { Character, Comic } from "../types/commonTypes";

const useMarvelService = () => {
  const { loading, error, reguest, clearError } = useHttp();

  const _apiBase: string = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey: string = import.meta.env.VITE_REACT_APP_MARVEL_API_KEY;
  const _baseOffSetChar: number = 210;
  const _baseOffSetComics: number = 510;
  const _limitChars: number = 9;
  const _limitComics: number = 8;

  const getAllCharacters = async (
    offset: number = _baseOffSetChar,
    limit: number = _limitChars
  ): Promise<Character[]> => {
    const res = await reguest(
      `${_apiBase}characters?limit=${limit}&offset=${offset}&apikey=${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id: number): Promise<Character> => {
    const res = await reguest(`${_apiBase}/characters/${id}?apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char: any) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? char.description.slice(0, 227) + `...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (
    offset: number = _baseOffSetComics,
    limit: number = _limitComics
  ): Promise<Comic[]> => {
    const res = await reguest(
      `${_apiBase}comics?limit=${limit}&offset=${offset}&apikey=${_apiKey}`
    );
    return res.data.results.map(_transformComic);
  };

  const getComic = async (id: number): Promise<Comic> => {
    const res = await reguest(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
    return _transformComic(res.data.results[0]);
  };

  const _transformComic = (comic: any) => {
    return {
      id: comic.id,
      name: comic.title,
      description: comic.description
        ? `${comic.description}`
        : "There is no description",
      pageCount: comic.pageCount
        ? `${comic.pageCount} pages`
        : "There is no information on the number of pages",
      price: comic.prices[0].price,
      thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
      language: comic.textObjects[0]?.language || "en-us",
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;
