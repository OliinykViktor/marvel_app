import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addCart = (item) => {

        const itemExists = cartItems.find((elem) => elem.id === item.id);

        if (itemExists) {
            setCartItems((prevItems) =>
                prevItems.map((elem) =>
                elem.id === item.id
                    ? { ...elem, quantity: elem.quantity + 1 } 
                    : elem
                )
            )
        } else {
            const newItem ={
                id:item.id,
                quantity: 1,
                name: item.name,
                price: item.price
            };
            setCartItems((prevItems) => [...prevItems, newItem])
        }
    }

    const removeCart = (item) => {
        setCartItems((prevItems) => prevItems.filter((elem) => elem.id !== item.id));
    }

    const clearCart = () => {
        setCartItems([])
    };

    return (
            <CartContext.Provider value = {{cartItems, addCart, removeCart, clearCart}}>
                {children}
            </CartContext.Provider>
        )
}