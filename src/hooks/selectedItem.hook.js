import { useRef, useState } from "react";

const useSelectedItem = () => {
    const [selectedItemIndex, setSelectedItem] = useState([]);
    const selectedRefs = useRef([])

    const focusItem = (id, className) => {
        selectedRefs.current.forEach(el => el.classList.remove(className));
        selectedRefs.current[id].classList.add(className);
        selectedRefs.current[id].focus();
        setSelectedItem(id);
    }

    const hadleKeyDown = (e, id, className) => {
        if (e.key === ' ' || e.key === 'Enter') {
            focusItem(id, className)
        }
    }
    return { selectedItemIndex, selectedRefs, focusItem, hadleKeyDown }

};

export default useSelectedItem;