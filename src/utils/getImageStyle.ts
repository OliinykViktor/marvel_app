import ErrorImage from "../assets/img/error_data.jpg";

const getImageStyle = (thumbnail: string): string => {
  return thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ? ErrorImage
    : thumbnail;
};

export default getImageStyle;
