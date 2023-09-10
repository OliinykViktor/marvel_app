export interface MotionParams {
  initial: {
    opacity: number;
    transform: string;
    transformOrigin: string;
  };
  animate: {
    opacity: number;
    transform: string;
  };
  exit: {
    opacity: number;
    transform: string;
    transformOrigin: string;
  };
  transition: {
    duration: number;
  };
}

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  homepage: string;
  wiki: string;
  comics: { name: string }[];
}

export interface Comic {
  id: number;
  name: string;
  description: string;
  pageCount: string;
  price: number;
  thumbnail: string;
  language: string;
}
