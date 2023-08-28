import {HiShoppingCart} from 'react-icons/hi';

import './ShopCart.scss'
import { useState } from 'react';
import CartItem from './components/cartItem';

const ShopCart = () => {

    const [cartOpen, setCartOpen] = useState(false);

    const onClickCart = () => {
        setCartOpen(!cartOpen)
    }
    return (
<>
            <HiShoppingCart className={`shop__cart ${cartOpen && 'active'}`} onClick={onClickCart}/>
            {cartOpen && <CartItem/>}
</>
   
    )
};

export default ShopCart;