export interface MotionParams {
  initial?: {
    opacity: number;
    transform: string;
    transformOrigin?: string;
  };
  animate?: {
    opacity: number;
    transform: string;
    transition?: {
      duration: number;
    };
  };
  exit?: {
    opacity: number;
    transform: string;
    transformOrigin: string;
  };
  transition?: {
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
  description?: string;
  pageCount?: string;
  price: number;
  thumbnail: string;
  language?: string;
}

export interface ViewProps {
  isComics: boolean;
  comic: {
    name: string;
    thumbnail: string;
    description?: string;
    pageCount?: string | undefined;
    language?: string | undefined;
    price?: number | undefined;
  };
}

export interface CarItemProps {
  onClickCart: () => void;
  id: number;
  name: string;
  thumbnail: string;
  quantity: number;
  price: number;
}

export interface SearchBarProps {
  pathname: string;
}

export interface ListItem {
  id: number;
  name: string;
}

export type ViewRandomProps = {
  char: Character;
};

export interface ListProps<T> {
  onSelectedChar?: (charId: number) => void;
}

export interface CharInfoProps {
  charId: number | null;
}

export interface LinkItemProps {
  isComicsPage: boolean;
  item: ListItem;
}

export interface MetadataProps {
  title: string;
  content: string;
}

export interface ListData<T> {
  itemList: T[];
  newItemsLoading: boolean;
  offset: number;
  listEnded: boolean;
  onRequest: (offset: number, initial: boolean) => void;
  loading: boolean;
  error: any;
}

export interface ElementListProps {
  error: null | string;
  isComicsPage: boolean;
  filteredItems: ListItem[];
}
