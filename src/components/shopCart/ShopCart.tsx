import React, { useState, FC } from 'react';
import { useCart } from '../../context/CartContext';

import CartItem from './components/cartItem';

import { HiShoppingCart } from 'react-icons/hi';

import './ShopCart.scss';

const ShopCart:FC = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const { cartItems } = useCart();

  const isCartActive = cartOpen || (cartItems.length > 0);

  const onClickCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <div className='shop'>
      <HiShoppingCart
        className={`shop__cart ${isCartActive ? 'active' : ''}`}
        onClick={onClickCart}
      />
      <span className={`shop__counter ${isCartActive ? 'active' : ''}`}>{cartItems.length}</span>
      {cartOpen && <CartItem onClickCart={onClickCart} />}
    </div>
  );
};

export default ShopCart;
