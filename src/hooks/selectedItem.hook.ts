import React, { useRef, useState } from "react";

const useSelectedItem = () => {
  const [selectedItemIndex, setSelectedItem] = useState<number | null>(null);
  const selectedRefs = useRef<HTMLElement[]>([]);

  const focusItem = (id: number, className: string) => {
    const element = selectedRefs.current[id];
    if (element) {
      selectedRefs.current.forEach((el) => el.classList.remove(className));
      element.classList.add(className);
      element.focus();
      setSelectedItem(id);
    }
  };

  const hadleKeyDown = (
    e: React.KeyboardEvent,
    id: number,
    className: string
  ) => {
    if (e.key === " " || e.key === "Enter") {
      focusItem(id, className);
    }
  };
  return { selectedItemIndex, selectedRefs, focusItem, hadleKeyDown };
};

export default useSelectedItem;
