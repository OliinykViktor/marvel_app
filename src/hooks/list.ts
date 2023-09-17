import { useEffect, useState } from "react";
import useMarvelService from "../services/MarvelService";
import { ListData } from "../types/commonTypes";

function useList<T>(
  initialOffset: number,
  limitDowlnload: number,
  fetchFunction: (offset: number) => Promise<T[]>
): ListData<T> {
  const [itemList, setItemsList] = useState<T[]>([]);
  const [newItemsLoading, setItemsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(initialOffset);
  const [listEnded, setListEnded] = useState<boolean>(false);

  const { clearError, loading, error } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset: number, initial: boolean) => {
    clearError();
    setItemsLoading(initial), fetchFunction(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newItemList: T[]) => {
    let end = false;
    if (newItemList.length < limitDowlnload) {
      end = true;
    }

    setItemsList([...itemList, ...newItemList]);
    setOffset((prevOffset) => prevOffset + limitDowlnload);
    setListEnded(end);
    setItemsLoading(false);
  };
  return {
    itemList,
    newItemsLoading,
    offset,
    listEnded,
    onRequest,
    loading,
    error,
  };
}

export default useList;
